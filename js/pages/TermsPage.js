/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Provides the Terms of Use content rendered through the shared     |
  |          legal-page layout.                                                |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { PageHeader } from "../components/PageHeader.js";
export function TermsPage() {
    return _jsx("div", {
        className: "legal-page",
        children: _jsxs("div", {
            className: "container legal-page__inner",
            children: [
                _jsx(PageHeader, {
                    classPrefix: "legal-page",
                    badge: "Terms",
                    title: "Terms of Use",
                    subtitle:
                        "Guidelines for using this free interactive story.",
                }),
                _jsxs("section", {
                    className: "legal-page__content",
                    children: [
                        _jsx("h2", { children: "About this project" }),
                        _jsx("p", {
                            children:
                                "The Beach Mystery is a free, browser-based interactive fiction and portfolio demonstration. It is provided for personal exploration and educational viewing.",
                        }),
                        _jsx("h2", {
                            children: "Availability and saved progress",
                        }),
                        _jsx("p", {
                            children:
                                "The experience is provided as available, without a guarantee of uninterrupted access or preservation of browser-local saves. Clearing browser storage, switching devices, or browser settings may remove progress.",
                        }),
                        _jsx("h2", {
                            children: "Software license and content rights",
                        }),
                        _jsx("p", {
                            children:
                                "The project's software is provided under the MIT License, which permits use, copying, modification, and redistribution subject to its conditions. The software license does not automatically establish reuse rights for third-party materials, fonts, or creative assets whose provenance has not been confirmed.",
                        }),
                        _jsx("p", {
                            children: _jsxs("span", {
                                children: [
                                    "Read the ",
                                    _jsx("a", {
                                        href: "../LICENSE",
                                        children: "MIT software license",
                                    }),
                                    " and ",
                                    _jsx("a", {
                                        href: "../assets/vendor/THIRD_PARTY_LICENSES.txt",
                                        children: "third-party runtime notices",
                                    }),
                                    ".",
                                ],
                            }),
                        }),
                        _jsx("h2", { children: "Acceptable use" }),
                        _jsx("p", {
                            children:
                                "Please use the site lawfully and avoid interfering with its operation or attempting to compromise the hosting service. External services and linked websites have their own terms and policies.",
                        }),
                        _jsx("h2", { children: "Changes" }),
                        _jsx("p", {
                            children:
                                "The content and features of this demonstration may change or be withdrawn. These terms may be updated as the project evolves.",
                        }),
                    ],
                }),
            ],
        }),
    });
}
