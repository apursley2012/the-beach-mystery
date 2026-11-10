/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Owns the riddle form, error, and hint UI while the page retains   |
  |          answer-state orchestration.                                       |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
export function RiddleForm({
    node,
    answer,
    error,
    showHint,
    onAnswerChange,
    onSubmit,
}) {
    return _jsxs("div", {
        className: "play__riddle animate-fade-up",
        children: [
            _jsx("div", {
                className: "play__riddle-box",
                children: _jsx("p", {
                    className: "play__riddle-text",
                    id: "riddle-question",
                    children: node.riddleText,
                }),
            }),
            _jsxs("form", {
                onSubmit,
                className: "play__riddle-form",
                children: [
                    _jsx("input", {
                        type: "text",
                        className: "play__riddle-input",
                        placeholder: "Enter your answer...",
                        value: answer,
                        onChange: onAnswerChange,
                        autoFocus: true,
                        maxLength: 100,
                        "aria-label": "Riddle answer",
                        "aria-required": true,
                        "aria-invalid": Boolean(error),
                        "aria-describedby":
                            [
                                "riddle-question",
                                error && "riddle-error",
                                showHint && "riddle-hint",
                            ]
                                .filter(Boolean)
                                .join(" ") || undefined,
                    }),
                    _jsx("button", {
                        type: "submit",
                        className: "btn btn--primary",
                        children: "Submit",
                    }),
                ],
            }),
            error &&
                _jsx("p", {
                    id: "riddle-error",
                    className: "play__riddle-error",
                    role: "alert",
                    children: error,
                }),
            showHint &&
                _jsxs("div", {
                    id: "riddle-hint",
                    className: "play__riddle-hint animate-fade",
                    children: [
                        _jsx("span", {
                            className: "play__hint-icon",
                            "aria-hidden": "true",
                            children: "💡",
                        }),
                        _jsxs("span", { children: ["Hint: ", node.hint] }),
                    ],
                }),
        ],
    });
}
