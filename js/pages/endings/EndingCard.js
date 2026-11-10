/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Owns the repeated discovered/locked ending-card structure used by |
  |          the endings grid.                                                 |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { SceneArt } from "../../components/SceneArt.js";
export function EndingCard({ ending, index, isDiscovered, paths, scene }) {
    return _jsxs(
        "div",
        {
            className: `ending-card ${isDiscovered ? "ending-card--discovered" : "ending-card--locked"} animate-fade-up`,
            style: { animationDelay: `${0.1 * (index + 1)}s` },
            children: [
                _jsxs("div", {
                    className: "ending-card__art",
                    children: [
                        _jsx(SceneArt, {
                            scene,
                            size: "large",
                        }),
                        !isDiscovered &&
                            _jsx("div", {
                                className: "ending-card__lock-overlay",
                                "aria-label": "Locked",
                                children: _jsx("span", {
                                    "aria-hidden": "true",
                                    children: "🔒",
                                }),
                            }),
                    ],
                }),
                _jsxs("div", {
                    className: "ending-card__content",
                    children: [
                        _jsxs("div", {
                            className: "ending-card__header",
                            children: [
                                _jsx("span", {
                                    className: "ending-card__icon",
                                    "aria-hidden": "true",
                                    children: ending.icon,
                                }),
                                _jsx("span", {
                                    className: "ending-card__status",
                                    children: isDiscovered
                                        ? "Discovered"
                                        : "Locked",
                                }),
                            ],
                        }),
                        _jsx("h2", {
                            className: "ending-card__title",
                            children: ending.name,
                        }),
                        _jsx("p", {
                            className: "ending-card__desc",
                            children: isDiscovered
                                ? ending.description
                                : "??? — Play the story to discover this ending.",
                        }),
                        isDiscovered &&
                            _jsxs("div", {
                                className: "ending-card__paths",
                                children: [
                                    _jsx("h4", {
                                        className: "ending-card__paths-title",
                                        children: "Reachable via:",
                                    }),
                                    _jsx("ul", {
                                        className: "ending-card__path-list",
                                        children: paths.map((path) =>
                                            _jsxs(
                                                "li",
                                                {
                                                    className:
                                                        "ending-card__path-item",
                                                    children: [
                                                        _jsx("span", {
                                                            className:
                                                                "ending-card__path-name",
                                                            children: path.name,
                                                        }),
                                                        _jsx("span", {
                                                            className:
                                                                "ending-card__path-steps",
                                                            children:
                                                                path.path.join(
                                                                    " → ",
                                                                ),
                                                        }),
                                                    ],
                                                },
                                                path.id,
                                            ),
                                        ),
                                    }),
                                ],
                            }),
                    ],
                }),
            ],
        },
        ending.id,
    );
}
