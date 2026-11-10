/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Shared UI component                                    |
  | Purpose: Moves focus directly to the application main region without       |
  |          changing the current static page route.                           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx } from "../lib/jsx-runtime.js";
export function SkipLink() {
    const skipToMain = (event) => {
        event.preventDefault();
        document.getElementById("main-content")?.focus();
    };
    return _jsx("a", {
        className: "skip-link",
        href: "#main-content",
        onClick: skipToMain,
        children: "Skip to main content",
    });
}
