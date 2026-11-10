/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Owns the static how-to-play presentation while leaving screen     |
  |          transitions to the route controller.                              |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
export function PlayInstructions({ onContinue }) {
    return _jsx("div", {
        className: "play",
        children: _jsx("div", {
            className: "play__instructions animate-fade-up",
            children: _jsxs("div", {
                className: "play__instructions-card",
                children: [
                    _jsx("h2", {
                        className: "play__instructions-title",
                        children: "How to Play",
                    }),
                    _jsxs("div", {
                        className: "play__instructions-text",
                        children: [
                            _jsx("p", {
                                children:
                                    "Answer five short questions to personalize your adventure.",
                            }),
                            _jsx("p", {
                                children:
                                    "Read each scene at your own pace. When choices appear, select a button to continue.",
                            }),
                            _jsx("p", {
                                children:
                                    "Your decisions lead to different story routes and endings.",
                            }),
                            _jsx("p", {
                                children:
                                    "Some scenes include a riddle. Enter an answer to continue; a hint appears after two incorrect attempts.",
                            }),
                            _jsx("p", {
                                children:
                                    "Use Save Progress to continue your story later, and visit Endings to see what you've discovered.",
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "play__continue-prompt",
                        children: [
                            _jsx("span", {
                                className: "play__continue-icon",
                                "aria-hidden": "true",
                                children: "\u2328",
                            }),
                            "Continue when you are ready.",
                        ],
                    }),
                    _jsx("button", {
                        type: "button",
                        className: "btn btn--primary btn--lg",
                        onClick: onContinue,
                        children: "Continue",
                    }),
                ],
            }),
        }),
    });
}
