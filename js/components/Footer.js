/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Shared UI component                                    |
  | Purpose: Provides the reusable site footer in one component so route pages |
  |          do not duplicate footer markup.                                   |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { Link } from "../lib/router.js";
const BRAND_ICON_SRC = new URL(
    "../../assets/icons/icon-180.png",
    import.meta.url,
).href;
export function Footer() {
    return _jsx("footer", {
        className: "footer",
        children: _jsxs("div", {
            className: "container footer__inner",
            children: [
                _jsxs("div", {
                    className: "footer__brand",
                    children: [
                        _jsx("img", {
                            className: "footer__icon",
                            src: BRAND_ICON_SRC,
                            alt: "",
                            "aria-hidden": "true",
                        }),
                        _jsx("span", {
                            children: "The Beach Mystery",
                        }),
                    ],
                }),
                _jsx("p", {
                    className: "footer__tagline",
                    children: "A choose-your-own-adventure story",
                }),
                _jsxs("div", {
                    className: "footer__links",
                    children: [
                        _jsx(Link, {
                            to: "/about",
                            children: "About",
                        }),
                        _jsx(Link, {
                            to: "/case-study",
                            children: "Case Study",
                        }),
                        _jsx(Link, {
                            to: "/blog",
                            children: "Journal",
                        }),
                        _jsx(Link, {
                            to: "/privacy",
                            children: "Privacy",
                        }),
                        _jsx(Link, {
                            to: "/terms",
                            children: "Terms",
                        }),
                        _jsx(Link, {
                            to: "/accessibility",
                            children: "Accessibility",
                        }),
                    ],
                }),
                _jsxs("p", {
                    className: "footer__copy",
                    children: [
                        "Created by Alysha Pursley \u00B7 ",
                        new Date().getFullYear(),
                    ],
                }),
            ],
        }),
    });
}
