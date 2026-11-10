# +----------------------------------------------------------------------------+
# | The Beach Mystery | Source structure tests                                 |
# | Purpose: Checks first-party source completeness, module imports, page      |
# |          routes, stylesheet ownership, artwork paths, and vendor           |
# |          separation.                                                       |
# | Author: Alysha Pursley                                                     |
# | Copyright (c) 2026 Alysha Pursley.                                         |
# | SPDX-License-Identifier: MIT                                               |
# +----------------------------------------------------------------------------+

"""Architecture and complete-source regressions for the checked-in static project.

The project deliberately ships editable browser ES modules rather than a Vite
source/dist pair. Third-party runtime bundles are audited for presence and
license notices, but are not misidentified as first-party maintainable source.
"""

from __future__ import annotations

import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
JS_ROOT = ROOT / "js"
PAGES = ROOT / "pages"
STYLES = ROOT / "styles"


class EntryParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.body_route = None
        self.styles = []
        self.scripts = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "body":
            self.body_route = attrs.get("data-route")
        if tag == "link" and attrs.get("rel") == "stylesheet" and not attrs.get("href", "").startswith(("http:", "https:")):
            self.styles.append(attrs["href"])
        if tag == "script" and attrs.get("type") == "module":
            self.scripts.append(attrs.get("src"))
        if attrs.get("id"):
            self.ids.append(attrs["id"])


class ProjectStructureTests(unittest.TestCase):
    def test_all_expected_source_groups_are_present(self):
        for directory in (
            "js/components", "js/data", "js/hooks", "js/lib", "js/pages",
            "js/pages/home", "js/pages/blog", "js/pages/play",
            "js/pages/gallery", "js/pages/endings", "js/services", "js/utils",
            "styles/pages", "assets/story-art", "assets/icons", "assets/vendor",
            "tests", ".github/scripts", ".github/workflows",
        ):
            with self.subTest(directory=directory):
                self.assertTrue((ROOT / directory).is_dir())
        for file in (
            "index.html", "404.html", ".nojekyll", "manifest.webmanifest",
            "README.md", "CREDITS.md", "LICENSE", "assets/vendor/THIRD_PARTY_LICENSES.txt",
            ".github/scripts/verify_site.py", ".github/scripts/stage_site.py",
        ):
            with self.subTest(file=file):
                self.assertTrue((ROOT / file).is_file())

    def test_first_party_source_is_complete_editable_and_not_placeholder_only(self):
        files = [*JS_ROOT.rglob("*.js"), *STYLES.rglob("*.css")]
        self.assertEqual(len(list(JS_ROOT.rglob("*.js"))), 41)
        self.assertEqual(len(list(STYLES.rglob("*.css"))), 10)
        placeholder = re.compile(
            r"(?:TODO\s*:\s*(?:implement|finish|replace)|"
            r"FIXME\s*:\s*(?:implement|finish)|"
            r"implementation\s+(?:omitted|goes\s+here)|"
            r"rest\s+unchanged|existing\s+code\s+here|"
            r"paste\s+your\s+code\s+here|<placeholder>)",
            re.IGNORECASE,
        )
        for source in files:
            with self.subTest(source=source.relative_to(ROOT).as_posix()):
                contents = source.read_text(encoding="utf8")
                self.assertGreater(len(contents), 180, "Suspiciously empty source file")
                self.assertIn("The Beach Mystery", contents[:420], "File header missing")
                self.assertNotRegex(contents, placeholder)
                self.assertGreater(contents.count("\n"), 5, "Source may be compressed/minified")
                self.assertFalse(any(len(line) > 2500 for line in contents.splitlines()), "Long minified source line")

    def test_source_imports_resolve_with_exact_case_without_cycles(self):
        modules = {p.resolve(): p for p in JS_ROOT.rglob("*.js")}
        pattern = re.compile(r'(?:\bfrom\s*|\bimport\s*)["\'](\.[^"\']+)["\']')
        graph = {}
        for module in modules:
            dependencies = []
            for reference in pattern.findall(module.read_text(encoding="utf8")):
                target = (module.parent / reference).resolve()
                self.assertTrue(target.is_file() and target.is_relative_to(ROOT), f"Missing or mis-cased module {module.relative_to(ROOT)} -> {reference}")
                if target in modules:
                    dependencies.append(target)
            graph[module] = dependencies
        self.assertGreaterEqual(sum(len(v) for v in graph.values()), 75)
        in_progress, finished = set(), set()

        def visit(module):
            self.assertNotIn(module, in_progress, f"Circular module import at {module.relative_to(ROOT)}")
            if module in finished:
                return
            in_progress.add(module)
            for dependency in graph[module]:
                visit(dependency)
            in_progress.remove(module)
            finished.add(module)

        for module in modules:
            visit(module)
        self.assertEqual(len(finished), len(modules))

    def test_every_route_has_correct_html_entry_and_layered_css(self):
        routes = {
            "/": ("home.html", "HomePage.css"),
            "/play": ("play.html", "PlayPage.css"),
            "/endings": ("endings.html", "EndingsPage.css"),
            "/gallery": ("gallery.html", "GalleryPage.css"),
            "/about": ("about.html", "AboutPage.css"),
            "/case-study": ("case-study.html", "CaseStudyPage.css"),
            "/blog": ("blog.html", "BlogPage.css"),
            "/privacy": ("privacy.html", "LegalPage.css"),
            "/terms": ("terms.html", "LegalPage.css"),
            "/accessibility": ("accessibility.html", "LegalPage.css"),
        }
        source = (JS_ROOT / "lib" / "router.js").read_text(encoding="utf8")
        app = (JS_ROOT / "App.js").read_text(encoding="utf8")
        for route, (filename, css_name) in routes.items():
            with self.subTest(route=route):
                self.assertIn(f'"{route}": "{filename}"', source)
                self.assertIn(f'path: "{route}"', app)
                html_file = PAGES / filename
                self.assertTrue(html_file.is_file())
                parser = EntryParser()
                parser.feed(html_file.read_text(encoding="utf8"))
                self.assertEqual(parser.body_route, route)
                self.assertEqual([Path(name).name for name in parser.styles], ["shared.css", css_name])
                self.assertEqual(len(parser.scripts), 1)
                self.assertEqual((html_file.parent / parser.scripts[0]).resolve(), JS_ROOT / "main.js")
                self.assertEqual(len(parser.ids), len(set(parser.ids)))
                for href in parser.styles:
                    self.assertTrue((html_file.parent / href).is_file())
        self.assertIn('path: "*"', app)
        for entrypoint, route, css_name in (
            (ROOT / "index.html", "/", "HomePage.css"),
            (ROOT / "404.html", "*", "NotFoundPage.css"),
            (PAGES / "not-found.html", "*", "NotFoundPage.css"),
        ):
            parser = EntryParser()
            parser.feed(entrypoint.read_text(encoding="utf8"))
            self.assertEqual(parser.body_route, route)
            self.assertEqual([Path(name).name for name in parser.styles], ["shared.css", css_name])

    def test_scene_metadata_references_real_art_without_duplicate_ownership(self):
        images = (JS_ROOT / "data" / "sceneImages.js").read_text(encoding="utf8")
        references = re.findall(r'getStoryArtUrl\("([\w-]+\.webp)"\)', images)
        self.assertGreaterEqual(len(references), 10)
        included = {p.name for p in (ROOT / "assets/story-art").glob("*.webp")}
        self.assertEqual(set(references), included, "Missing art or art that is not represented in metadata")
        self.assertIn("export function getSceneImage", images)
        story = (JS_ROOT / "data" / "story.js").read_text(encoding="utf8")
        self.assertIn("STORY_NODES", story)
        self.assertIn("ENDINGS", story)
        self.assertNotIn('getStoryArtUrl(', story)

    def test_vendor_runtime_has_clear_separate_owner_and_license(self):
        vendor = ROOT / "assets/vendor"
        self.assertTrue((vendor / "react-runtime.js").is_file())
        self.assertTrue((vendor / "react-dom-runtime.js").is_file())
        self.assertTrue((vendor / "jsx-runtime.js").is_file())
        notice = (vendor / "THIRD_PARTY_LICENSES.txt").read_text(encoding="utf8")
        self.assertIn("React", notice)
        self.assertIn("MIT", notice)
        self.assertTrue((JS_ROOT / "lib" / "react.js").is_file())
        self.assertTrue((JS_ROOT / "lib" / "jsx-runtime.js").is_file())

    def test_generated_website_publishes_without_repository_tests_or_tooling(self):
        stage_script = (ROOT / ".github/scripts/stage_site.py").read_text(encoding="utf8")
        self.assertIn('"assets", "js", "pages", "styles"', stage_script)
        self.assertNotIn('"tests"', stage_script)
        for generated in ("dist", "build", "node_modules", "_site"):
            self.assertFalse((ROOT / generated).is_dir(), f"Generated directory should not be checked into the project: {generated}")
        self.assertTrue((ROOT / ".nojekyll").is_file())


if __name__ == "__main__":
    unittest.main()
