/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Renders one of the five opening questions, progress, validation   |
  |          feedback, and submission controls.                                |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { MAX_PERSONALIZATION_LENGTH } from "../../services/gameStorage.js";
export function PersonalizationQuestion({
    questions,
    questionIndex,
    answer,
    error,
    onAnswerChange,
    onSubmit,
}) {
    const question = questions[questionIndex];
    const isLastQuestion = questionIndex === questions.length - 1;
    return _jsx("div", {
        className: "play",
        children: _jsxs("div", {
            className: "play__questions",
            children: [
                _jsx("div", {
                    className: "play__progress-bar",
                    role: "progressbar",
                    "aria-label": "Personalization questions",
                    "aria-valuemin": 1,
                    "aria-valuemax": questions.length,
                    "aria-valuenow": questionIndex + 1,
                    "aria-valuetext": `Question ${questionIndex + 1} of ${questions.length}`,
                    children: questions.map((item, index) =>
                        _jsx(
                            "div",
                            {
                                "aria-hidden": "true",
                                className: `play__progress-dot ${index < questionIndex ? "play__progress-dot--done" : ""} ${index === questionIndex ? "play__progress-dot--active" : ""}`,
                            },
                            item.id,
                        ),
                    ),
                }),
                _jsxs(
                    "div",
                    {
                        className: "play__question-card animate-fade-up",
                        children: [
                            _jsxs("div", {
                                className: "play__question-number",
                                children: [
                                    "Question ",
                                    questionIndex + 1,
                                    " of ",
                                    questions.length,
                                ],
                            }),
                            _jsx("h2", {
                                className: "play__question-label",
                                children: question.label,
                            }),
                            _jsx("p", {
                                className: "play__question-hint",
                                id: `question-hint-${question.id}`,
                                children: question.hint,
                            }),
                            _jsxs("form", {
                                onSubmit: onSubmit,
                                className: "play__question-form",
                                children: [
                                    _jsx("label", {
                                        htmlFor: `question-${question.id}`,
                                        className: "sr-only",
                                        children: question.label,
                                    }),
                                    _jsx("input", {
                                        id: `question-${question.id}`,
                                        type: "text",
                                        className: "play__question-input",
                                        placeholder: question.placeholder,
                                        value: answer,
                                        onChange: onAnswerChange,
                                        autoFocus: true,
                                        maxLength: MAX_PERSONALIZATION_LENGTH,
                                        "aria-label": question.label,
                                        "aria-required": true,
                                        "aria-invalid": Boolean(error),
                                        "aria-describedby": [
                                            `question-hint-${question.id}`,
                                            error &&
                                                `question-error-${question.id}`,
                                        ]
                                            .filter(Boolean)
                                            .join(" "),
                                    }),
                                    error &&
                                        _jsx("p", {
                                            id: `question-error-${question.id}`,
                                            className: "play__input-error",
                                            role: "alert",
                                            children: error,
                                        }),
                                    _jsx("button", {
                                        type: "submit",
                                        className: "btn btn--primary",
                                        children: isLastQuestion
                                            ? "Begin Adventure →"
                                            : "Next →",
                                    }),
                                ],
                            }),
                        ],
                    },
                    question.id,
                ),
            ],
        }),
    });
}
