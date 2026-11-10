/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Owns the opening artwork and start/continue actions without owning |
  |          game-state transitions.                                           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { SceneArt } from "../../components/SceneArt.js";
export function PlayTitleScreen({ hasSavedGame, onBegin, onContinue }) {
    return _jsx("div", {
        className: "play",
        children: _jsxs("div", {
            className: "play__title-screen",
            children: [
                _jsx("div", {
                    className: "play__title-art",
                    children: _jsx(SceneArt, {
                        scene: "beach",
                        size: "large",
                        priority: true,
                    }),
                }),
                _jsx("div", {
                    className: "play__title-box animate-scale",
                    children: _jsx("h1", {
                        className: "play__title-heading",
                        children: "The Beach Mystery",
                    }),
                }),
                _jsx("p", {
                    className: "play__title-subtitle",
                    children: "An Interactive Choose-Your-Own-Adventure",
                }),
                _jsx("button", {
                    type: "button",
                    className: "btn btn--primary btn--lg play__start-btn",
                    onClick: onBegin,
                    children: "Begin",
                }),
                hasSavedGame &&
                    _jsx("button", {
                        type: "button",
                        className: "btn btn--ghost play__continue-btn",
                        onClick: onContinue,
                        children: "Continue Saved Game",
                    }),
            ],
        }),
    });
}
