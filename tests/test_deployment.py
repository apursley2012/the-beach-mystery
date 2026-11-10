# +----------------------------------------------------------------------------+
# | The Beach Mystery | Deployment regression tests                            |
# | Purpose: Verifies static-site staging, repository URL variants, public-only |
# |          output, and error handling for missing assets.                    |
# | Author: Alysha Pursley                                                     |
# | Copyright (c) 2026 Alysha Pursley.                                         |
# | SPDX-License-Identifier: MIT                                               |
# +----------------------------------------------------------------------------+

"""Dependency-free deployment regression checks for the real GitHub Pages staging tools."""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERIFY = ROOT / ".github" / "scripts" / "verify_site.py"
STAGE = ROOT / ".github" / "scripts" / "stage_site.py"


class DeploymentTests(unittest.TestCase):
    def setUp(self):
        self.scratch = tempfile.TemporaryDirectory(prefix="beach-pages-")
        self.addCleanup(self.scratch.cleanup)
        self.staged = Path(self.scratch.name) / "_site"

    def command(self, *arguments):
        return subprocess.run([sys.executable, *map(str, arguments)], cwd=ROOT, text=True, capture_output=True)

    def test_checked_in_static_source_passes_deployment_validation(self):
        result = self.command(VERIFY, ROOT)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("passed", result.stdout)

    def test_project_pages_staging_preserves_assets_and_hides_repository_files(self):
        result = self.command(STAGE, "--repository", "example/beach-demo", "--source", ROOT, "--destination", self.staged)
        self.assertEqual(result.returncode, 0, result.stderr)
        checked = self.command(VERIFY, self.staged, "--public-url", "https://example.github.io/beach-demo/")
        self.assertEqual(checked.returncode, 0, checked.stderr)
        self.assertTrue((self.staged / "pages" / "play.html").is_file())
        self.assertTrue((self.staged / "styles" / "pages" / "HomePage.css").is_file())
        self.assertFalse((self.staged / "tests").exists())
        self.assertFalse((self.staged / "README.md").exists())
        self.assertFalse((self.staged / ".github").exists())

    def test_owner_root_pages_staging_uses_root_url(self):
        result = self.command(STAGE, "--repository", "example/example.github.io", "--source", ROOT, "--destination", self.staged)
        self.assertEqual(result.returncode, 0, result.stderr)
        checked = self.command(VERIFY, self.staged, "--public-url", "https://example.github.io/")
        self.assertEqual(checked.returncode, 0, checked.stderr)

    def test_missing_critical_asset_blocks_publication(self):
        result = self.command(STAGE, "--repository", "example/beach-demo", "--source", ROOT, "--destination", self.staged)
        self.assertEqual(result.returncode, 0, result.stderr)
        (self.staged / "js" / "main.js").unlink()
        validation = self.command(VERIFY, self.staged)
        self.assertNotEqual(validation.returncode, 0)
        self.assertIn("main.js", validation.stderr)


if __name__ == "__main__":
    unittest.main()
