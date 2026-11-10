/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Gives an invalid static page route a clear recovery path instead  |
  |          of rendering an empty application shell.                          |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { Link } from "../lib/router.js";
export function NotFoundPage() {
    return _jsx("div", {
        className: "not-found",
        children: _jsxs("div", {
            className: "container not-found__inner",
            children: [
                _jsx("span", {
                    className: "not-found__icon",
                    "aria-hidden": "true",
                    children: "\u2693",
                }),
                _jsx("p", {
                    className: "not-found__code",
                    "aria-hidden": "true",
                    children: "404",
                }),
                _jsx("h1", {
                    className: "not-found__title",
                    children: "This trail ends here.",
                }),
                _jsx("p", {
                    className: "not-found__text",
                    children: "The page you requested could not be found.",
                }),
                _jsx(Link, {
                    className: "btn btn--primary",
                    to: "/",
                    children: "Return to The Beach Mystery",
                }),
            ],
        }),
    });
}
