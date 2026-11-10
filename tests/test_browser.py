# +----------------------------------------------------------------------------+
# | The Beach Mystery | Browser integration tests                              |
# | Purpose: Exercises page rendering, keyboard navigation, story progression, |
# |          storage controls, responsive widths, and the gallery dialog.      |
# | Author: Alysha Pursley                                                     |
# | Copyright (c) 2026 Alysha Pursley.                                         |
# | SPDX-License-Identifier: MIT                                               |
# +----------------------------------------------------------------------------+

"""Browser regressions exercising the real React components in isolated Chromium.

Requires Playwright Chromium and TypeScript only in the test environment. It does not
modify, instrument, or change the deployable site's source or page assets.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path
from html.parser import HTMLParser

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ("/", "/play", "/endings", "/gallery", "/about", "/case-study", "/blog", "/privacy", "/terms", "/accessibility", "*")


class StylesheetLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stylesheets = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "link" and attributes.get("rel") == "stylesheet" and attributes.get("href", "").startswith("."):
            self.stylesheets.append(attributes["href"])


def route_css(route):
    html = ROOT / "index.html" if route == "/" else ROOT / "pages" / f"{('not-found' if route == '*' else route[1:])}.html"
    parser = StylesheetLinks()
    parser.feed(html.read_text(encoding="utf8"))
    return "\n".join((html.parent / filename).resolve().read_text(encoding="utf8") for filename in parser.stylesheets)


class BrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp_directory = tempfile.TemporaryDirectory(prefix="beach-test-")
        bundle = Path(cls.temp_directory.name) / "browser-harness.js"
        subprocess.run(["node", str(ROOT / "tests" / "build_browser_bundle.cjs"), str(bundle)], cwd=ROOT, check=True, capture_output=True)
        cls.bundle = bundle.read_text(encoding="utf8")
        cls.playwright = sync_playwright().start()
        browser_path = shutil.which("chromium") or shutil.which("chromium-browser")
        cls.browser = cls.playwright.chromium.launch(headless=True, **({"executable_path": browser_path} if browser_path else {}))

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.temp_directory.cleanup()

    def page(self, route, width=390, height=844, speed_up_narration=False):
        page = self.browser.new_page(viewport={"width": width, "height": height}, reduced_motion="reduce")
        self.addCleanup(page.close)
        page.set_default_timeout(7000)
        page.set_content(
            '<!doctype html><html lang="en"><head>'
            '<meta name="viewport" content="width=device-width, initial-scale=1">'
            f'<style>{route_css(route)}</style></head>'
            f'<body data-route="{route}"><div id="root"></div></body></html>'
        )
        # about:blank has no persistent storage, so give each test a private browser-like store.
        page.evaluate("""() => {
          const values = new Map();
          Object.defineProperty(window, 'localStorage', { configurable:true, value: {
            getItem: key => values.has(key) ? values.get(key) : null,
            setItem: (key, value) => values.set(key, String(value)),
            removeItem: key => values.delete(key)
          }});
        }""")
        if speed_up_narration:
            page.evaluate("""() => {
              const original = window.setInterval.bind(window);
              window.setInterval = (callback, delay) => original(callback, Math.min(delay, 8));
            }""")
        page_errors = []
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page._beach_errors = page_errors
        page.add_script_tag(content=self.bundle)
        return page

    def complete_personalization(self, page):
        for index, answer in enumerate(("Taylor", "Blue", "Fox", "Luna", "Ruby")):
            page.locator(".play__question-input").fill(answer)
            page.locator(".play__question-form button").click(force=True)
            if index < 4:
                page.wait_for_function(
                    "expected => document.querySelector('.play__question-number')?.textContent.includes('Question ' + expected + ' of 5')",
                    arg=index + 2,
                    timeout=7000,
                )
            else:
                page.locator(".play__story-main").wait_for(state="attached", timeout=7000)

    def test_all_routes_render_without_errors_or_horizontal_overflow(self):
        for route in ROUTES:
            for width in (320, 375, 768, 1024, 1440):
                with self.subTest(route=route, width=width):
                    page = self.page(route, width)
                    issues = page._beach_errors
                    self.assertGreater(len(page.locator("main").inner_text()), 20)
                    self.assertTrue(page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"))
                    self.assertEqual(issues, [])
                    if route == "/":
                        self.assertEqual(page.locator(".start__wave").count(), 5)
                    page.close()

    def test_gallery_dialog_keyboard_focus_and_escape(self):
        page = self.page("/gallery")
        card = page.locator("button.gallery-card").first
        card.click()
        self.assertEqual(page.get_by_role("dialog").count(), 1)
        page.keyboard.press("Escape")
        self.assertEqual(page.get_by_role("dialog").count(), 0)
        self.assertTrue(card.evaluate("element => document.activeElement === element"))

    def test_keyboard_skip_link_and_navigation(self):
        page = self.page("/", 375)
        page.keyboard.press("Tab")
        self.assertEqual(page.evaluate("document.activeElement.getAttribute('href')"), "#main-content")
        toggle = page.locator(".nav__toggle")
        toggle.click()
        self.assertEqual(toggle.get_attribute("aria-expanded"), "true")
        page.keyboard.press("Escape")
        self.assertEqual(toggle.get_attribute("aria-expanded"), "false")

    def test_blank_answer_is_rejected_then_all_questions_can_be_completed(self):
        page = self.page("/play", speed_up_narration=True)
        page.get_by_role("button", name="Begin", exact=True).click()
        page.get_by_role("button", name="Continue", exact=True).click()
        page.locator(".play__question-form button").click(force=True)
        self.assertIn("Please enter an answer", page.locator(".play__input-error").inner_text())
        self.complete_personalization(page)
        self.assertEqual(page.locator(".play__story-main").count(), 1)
        self.assertEqual(page.locator(".play__story-main").count(), 1)

    def test_save_restart_and_continue_restore_progress(self):
        page = self.page("/play", speed_up_narration=True)
        page.get_by_role("button", name="Begin", exact=True).click()
        page.get_by_role("button", name="Continue", exact=True).click()
        self.complete_personalization(page)
        page.locator(".play__save-btn").click(force=True)
        self.assertIn("Progress saved.", page.get_by_role("status").inner_text())
        save = json.loads(page.evaluate("localStorage.getItem('beach-mystery-save')"))
        self.assertEqual(save["currentNode"], "beachOpening")
        self.assertEqual(save["variables"]["firstName"], "Taylor")
        page.on("dialog", lambda dialog: dialog.accept())
        page.locator(".play__restart-btn").click(force=True)
        page.get_by_role("button", name="Continue Saved Game").click(force=True)
        self.assertEqual(page.locator(".play__story-main").count(), 1)
        page.locator(".play__story-main").wait_for(state="attached")
        self.assertEqual(page._beach_errors, [])

    def test_homepage_wave_colors_and_animation_structure_are_preserved(self):
        page = self.page("/", 375)
        values = page.locator(".start__wave").evaluate_all("""elements => elements.map(element => ({
          color: getComputedStyle(element).backgroundColor,
          drift: getComputedStyle(element).animationName,
          duration: getComputedStyle(element).animationDuration
        }))""")
        self.assertEqual(len(values), 5)
        self.assertEqual(len({entry["color"] for entry in values}), 5)
        self.assertEqual(len({entry["duration"] for entry in values}), 1)
        self.assertTrue(all("ocean-wave-drift" in entry["drift"] and "ocean-wave-rise" in entry["drift"] for entry in values))
        self.assertEqual(page._beach_errors, [])

    def test_save_and_privacy_erase_are_browser_local(self):
        page = self.page("/privacy")
        page.evaluate("""() => {
          localStorage.setItem('beach-mystery-save', 'a');
          localStorage.setItem('beach-mystery-achievements', 'b');
          localStorage.setItem('unrelated', 'untouched');
        }""")
        page.on("dialog", lambda dialog: dialog.accept())
        page.get_by_role("button", name="Clear Saved Game and Endings").click()
        self.assertEqual(page.evaluate("localStorage.getItem('beach-mystery-save')"), None)
        self.assertEqual(page.evaluate("localStorage.getItem('beach-mystery-achievements')"), None)
        self.assertEqual(page.evaluate("localStorage.getItem('unrelated')"), "untouched")
        self.assertIn("were cleared", page.get_by_role("status").inner_text())

    def test_all_seven_playthroughs_reach_expected_endings(self):
        # Branch indexes follow the game's real story graph, not fabricated mock outcomes.
        from_routes = (
            ([0, 0], "islandTreasure"),
            ([0, 1, 0, 0], "hiddenChamber"),
            ([0, 1, 0, 1], "animalDen"),
            ([0, 1, 1], "peacefulWalk"),
            ([1, 0, 0], "hiddenChamber"),
            ([1, 0, 1], "animalDen"),
            ([1, 1], "peacefulWalk"),
        )
        selected_route = os.environ.get("BEACH_TEST_ROUTE")
        route_cases = enumerate(from_routes)
        if selected_route is not None:
            route_cases = ((i, item) for i, item in route_cases if i == int(selected_route))
        for route_number, (decisions, ending_id) in route_cases:
            with self.subTest(route=route_number, decisions=decisions, ending=ending_id):
                page = self.page("/play", speed_up_narration=True)
                page.get_by_role("button", name="Begin", exact=True).click()
                page.get_by_role("button", name="Continue", exact=True).click()
                self.complete_personalization(page)
                choice_index = 0
                for _ in range(150):
                    if page.locator(".play__ending").count():
                        break
                    if page.locator(".play__choice-btn").count():
                        self.assertLess(choice_index, len(decisions))
                        page.locator(".play__choice-btn").nth(decisions[choice_index]).click(force=True)
                        choice_index += 1
                    elif page.locator(".play__riddle-input").count():
                        page.locator(".play__riddle-input").fill("wrong")
                        page.locator(".play__riddle-form button").click(force=True)
                        page.locator(".play__riddle-input").fill("wrong")
                        page.locator(".play__riddle-form button").click(force=True)
                        self.assertTrue(page.locator(".play__riddle-hint").count())
                        page.locator(".play__riddle-input").fill("EcHo")
                        page.locator(".play__riddle-form button").click(force=True)
                    elif page.locator(".play__continue-story").count():
                        page.locator(".play__continue-story").click(force=True)
                    else:
                        page.wait_for_timeout(50)
                self.assertEqual(page.locator(".play__ending").count(), 1, f"Failed to reach ending after choices {decisions}: {page.locator('main').inner_text()[-250:]}")
                self.assertEqual(choice_index, len(decisions))
                achievements = json.loads(page.evaluate("localStorage.getItem('beach-mystery-achievements')"))
                self.assertIn(ending_id, achievements)
                page.close()


if __name__ == "__main__":
    unittest.main()
