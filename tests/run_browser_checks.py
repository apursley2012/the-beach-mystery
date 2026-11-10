# +----------------------------------------------------------------------------+
# | The Beach Mystery | Browser regression runner                              |
# | Purpose: Runs isolated Chromium test scenarios so story routes and user    |
# |          journeys can be verified without shared browser state.            |
# | Author: Alysha Pursley                                                     |
# | Copyright (c) 2026 Alysha Pursley.                                         |
# | SPDX-License-Identifier: MIT                                               |
# +----------------------------------------------------------------------------+

"""Run browser regression scenarios in isolated processes to prevent shared-browser flakiness."""

from __future__ import annotations

import os
import subprocess
import sys

TEST_NAMES = (
    "test_all_routes_render_without_errors_or_horizontal_overflow",
    "test_all_seven_playthroughs_reach_expected_endings",
    "test_blank_answer_is_rejected_then_all_questions_can_be_completed",
    "test_gallery_dialog_keyboard_focus_and_escape",
    "test_save_restart_and_continue_restore_progress",
    "test_homepage_wave_colors_and_animation_structure_are_preserved",
    "test_keyboard_skip_link_and_navigation",
    "test_save_and_privacy_erase_are_browser_local",
)


def main() -> int:
    executed = 0
    for name in TEST_NAMES:
        routes = range(7) if name == "test_all_seven_playthroughs_reach_expected_endings" else (None,)
        for route in routes:
            label = f"{name} (path {route + 1}/7)" if route is not None else name
            print(f"Running {label}", flush=True)
            environment = os.environ.copy()
            if route is not None:
                environment["BEACH_TEST_ROUTE"] = str(route)
            result = subprocess.run(
                [sys.executable, "-m", "unittest", "discover", "-s", "tests", "-p", "test_browser.py", "-k", name, "-v"],
                timeout=75,
                env=environment,
            )
            if result.returncode:
                print(f"Browser regression failed: {label}", file=sys.stderr)
                return result.returncode
            executed += 1
    print(f"All {executed} isolated Chromium scenarios passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
