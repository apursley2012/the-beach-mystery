/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Documents the accessibility features intentionally built into the |
  |          static story without making an unsupported conformance claim.     |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { PageHeader } from "../components/PageHeader.js";
export function AccessibilityPage() {
    return _jsx("div", {
        className: "legal-page",
        children: _jsxs("div", {
            className: "container legal-page__inner",
            children: [
                _jsx(PageHeader, {
                    classPrefix: "legal-page",
                    badgeIcon: "⌨",
                    badge: "Accessibility",
                    title: "Accessibility Information",
                    subtitle:
                        "Accessibility features included in the browser experience.",
                }),
                _jsxs("section", {
                    className: "legal-page__content",
                    children: [
                        _jsx("p", {
                            children:
                                "The Beach Mystery is designed to support keyboard navigation, visible focus states, semantic controls, descriptive image alternatives, labeled form fields, reduced-motion preferences, and readable responsive layouts.",
                        }),
                        _jsx("h2", { children: "Keyboard and focus" }),
                        _jsx("p", {
                            children:
                                "A skip link moves directly to the main content. Interactive controls use native links, buttons, and form fields. The gallery dialog closes with Escape and restores focus when it closes.",
                        }),
                        _jsx("h2", {
                            children: "Motion and visual presentation",
                        }),
                        _jsx("p", {
                            children:
                                "Most interface animations respect the browser’s reduced-motion preference; the decorative homepage ocean waves remain animated. Important states use text or structure in addition to color, and controls retain visible keyboard focus indicators.",
                        }),
                        _jsx("h2", { children: "Conformance status" }),
                        _jsx("p", {
                            children:
                                "The project has been reviewed against accessibility-oriented prelaunch checks, but this page does not claim formal WCAG certification or legal conformance testing by an independent auditor.",
                        }),
                    ],
                }),
            ],
        }),
    });
}
