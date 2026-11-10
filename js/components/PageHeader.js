/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Shared UI component                                    |
  | Purpose: Centralizes the shared badge, title, and supporting-text structure |
  |          used by content pages while allowing page-specific class prefixes |
  |          and badge content.                                                |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
export function PageHeader({
    classPrefix,
    badge,
    badgeIcon,
    title,
    subtitle,
    badgeIconClass = "",
}) {
    return _jsxs("header", {
        className: `${classPrefix}__header animate-fade-up`,
        children: [
            _jsxs("div", {
                className: `${classPrefix}__badge`,
                children: [
                    _jsx("span", {
                        className: badgeIconClass || undefined,
                        "aria-hidden": "true",
                        children: badgeIcon,
                    }),
                    _jsx("span", { children: badge }),
                ],
            }),
            _jsx("h1", {
                className: `${classPrefix}__title`,
                children: title,
            }),
            _jsx("p", {
                className: `${classPrefix}__subtitle`,
                children: subtitle,
            }),
        ],
    });
}
