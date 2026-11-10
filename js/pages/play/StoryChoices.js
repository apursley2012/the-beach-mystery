/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Owns the repeated choice prompt and option-button presentation for |
  |          branching nodes.                                                  |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
export function StoryChoices({ prompt, options, nodeId, onChoose }) {
    return _jsxs("div", {
        className: "play__choices animate-fade-up",
        children: [
            _jsx("p", {
                className: "play__choice-prompt",
                id: `choice-prompt-${nodeId}`,
                children: prompt,
            }),
            _jsx("div", {
                className: "play__choice-buttons",
                role: "group",
                "aria-labelledby": `choice-prompt-${nodeId}`,
                children: options.map((option) =>
                    _jsxs(
                        "button",
                        {
                            type: "button",
                            className: "play__choice-btn",
                            onClick: () => onChoose(option, nodeId),
                            children: [
                                _jsx("span", {
                                    className: "play__choice-btn-label",
                                    children: option.label,
                                }),
                                _jsx("span", {
                                    className: "play__choice-btn-arrow",
                                    "aria-hidden": "true",
                                    children: "→",
                                }),
                            ],
                        },
                        option.value,
                    ),
                ),
            }),
        ],
    });
}
