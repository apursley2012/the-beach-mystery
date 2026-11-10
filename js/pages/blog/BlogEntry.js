/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Owns the repeated expandable article structure used by the journal |
  |          page.                                                             |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
export function BlogEntry({ post, index, isOpen, onOpen, onClose }) {
    const contentId = `journal-entry-${post.id}`;
    return _jsxs(
        "article",
        {
            className: "blog-entry animate-fade-up",
            style: { animationDelay: `${0.05 * index}s` },
            children: [
                _jsxs("div", {
                    className: "blog-entry__meta",
                    children: [
                        _jsx("span", {
                            className: "blog-entry__category",
                            children: post.category,
                        }),
                        _jsx("span", {
                            className: "blog-entry__date",
                            children: post.date,
                        }),
                    ],
                }),
                _jsx("h2", {
                    className: "blog-entry__title",
                    children: post.title,
                }),
                _jsx("p", {
                    className: "blog-entry__excerpt",
                    children: post.excerpt,
                }),
                _jsx("div", {
                    id: contentId,
                    hidden: !isOpen,
                    className: "blog-entry__content animate-fade",
                    children: post.content.map((paragraph, paragraphIndex) =>
                        _jsx(
                            "p",
                            {
                                children: paragraph,
                            },
                            paragraphIndex,
                        ),
                    ),
                }),
                _jsx("button", {
                    type: "button",
                    className: "blog-entry__toggle",
                    "aria-expanded": isOpen,
                    "aria-label": `${isOpen ? "Show less from" : "Read more from"} ${post.title}`,
                    "aria-controls": contentId,
                    onClick: isOpen ? onClose : onOpen,
                    children: isOpen ? "Show less ↑" : "Read more ↓",
                }),
            ],
        },
        post.id,
    );
}
