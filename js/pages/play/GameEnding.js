/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Renders the discovered ending, retained jewel, journey history,   |
  |          and replay/navigation actions.                                    |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { Link } from "../../lib/router.js";
import { SceneArt } from "../../components/SceneArt.js";
import { ENDING_SCENES } from "../../data/sceneImages.js";
export function GameEnding({ ending, gameState, onRestart }) {
    const endingScene = ENDING_SCENES[ending.id] ?? "beach-sunset";
    return _jsx("div", {
        className: "play",
        children: _jsxs("div", {
            className: "play__ending",
            children: [
                _jsx("div", {
                    className: "play__ending-art animate-scale",
                    children: _jsx(SceneArt, {
                        scene: endingScene,
                        size: "large",
                    }),
                }),
                _jsxs("div", {
                    className: "play__ending-content animate-fade-up delay-1",
                    children: [
                        _jsxs("div", {
                            className: "play__ending-badge",
                            children: [
                                _jsx("span", {
                                    className: "play__ending-icon",
                                    "aria-hidden": "true",
                                    children: ending.icon,
                                }),
                                _jsx("span", { children: "Ending Discovered" }),
                            ],
                        }),
                        _jsx("h1", {
                            className: "play__ending-title",
                            children: ending.name,
                        }),
                        _jsx("p", {
                            className: "play__ending-description",
                            children: ending.description,
                        }),
                        gameState.state.hasJewel &&
                            _jsxs("div", {
                                className:
                                    "play__ending-jewel animate-fade-up delay-2",
                                children: [
                                    _jsx("span", {
                                        className: "play__ending-jewel-icon",
                                        "aria-hidden": "true",
                                        children: "\uD83D\uDC8E",
                                    }),
                                    _jsxs("span", {
                                        children: [
                                            "You kept your ",
                                            gameState.variables.favoriteJewel,
                                            "!",
                                        ],
                                    }),
                                ],
                            }),
                        _jsxs("div", {
                            className:
                                "play__ending-path animate-fade-up delay-2",
                            children: [
                                _jsx("h3", { children: "Your Journey" }),
                                _jsx("ol", {
                                    className: "play__ending-path-list",
                                    children: gameState.history.map(
                                        (historyItem, index) =>
                                            _jsxs(
                                                "li",
                                                {
                                                    children: [
                                                        _jsx("span", {
                                                            className:
                                                                "play__path-check",
                                                            "aria-hidden":
                                                                "true",
                                                            children: "\u2713",
                                                        }),
                                                        historyItem.choice,
                                                    ],
                                                },
                                                `${historyItem.nodeId}-${index}`,
                                            ),
                                    ),
                                }),
                            ],
                        }),
                        _jsxs("div", {
                            className:
                                "play__ending-actions animate-fade-up delay-3",
                            children: [
                                _jsx("button", {
                                    type: "button",
                                    className: "btn btn--primary btn--lg",
                                    onClick: onRestart,
                                    children: "\u21BB Play Again",
                                }),
                                _jsx(Link, {
                                    to: "/endings",
                                    className: "btn btn--light btn--lg",
                                    children: "View All Endings",
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    });
}
