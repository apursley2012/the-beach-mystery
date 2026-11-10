/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Presents the About page content and markup using shared layout and |
  |          style components.                                                 |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { Link } from "../lib/router.js";
import { SceneArt } from "../components/SceneArt.js";
const FEATURES = Object.freeze([
    [
        "🎮",
        "Interactive Branching",
        "Every choice opens a new path. Seven storylines branch from a single beach.",
    ],
    [
        "👤",
        "Personalized Story",
        "Your answers to five questions are woven directly into the narrative.",
    ],
    [
        "💎",
        "Inventory System",
        "The jewel and map you collect affect later story moments and endings.",
    ],
    [
        "🏆",
        "Achievements",
        "Each of the four endings you discover is saved and tracked across sessions.",
    ],
    [
        "💾",
        "Save & Continue",
        "Save your progress mid-story and pick up exactly where you left off.",
    ],
    [
        "🧩",
        "Riddle Challenge",
        "Solve the riddle of the guards to reach the island treasure ending.",
    ],
    [
        "🎨",
        "Custom Artwork",
        "Each major story location has its own scene artwork paired with subtle interface animation.",
    ],
]);
const TECH = [
    "React",
    "Static Multi-Page Navigation",
    "Scene Artwork",
    "CSS Animations",
    "LocalStorage",
];
const STORY_STATS = [
    ["5", "Personalization Questions"],
    ["4", "Main Decision Points"],
    ["7", "Complete Storylines"],
    ["4", "Unique Endings"],
];
export function AboutPage() {
    return _jsx("div", {
        className: "about-page",
        children: _jsxs("div", {
            className: "container",
            children: [
                _jsxs("header", {
                    className: "about-page__header animate-fade-up",
                    children: [
                        _jsxs("div", {
                            className: "about-page__badge",
                            children: [
                                _jsx("span", {
                                    "aria-hidden": "true",
                                    children: "\u2139\uFE0F",
                                }),
                                _jsx("span", {
                                    children: "About the Project",
                                }),
                            ],
                        }),
                        _jsx("h1", {
                            className: "about-page__title",
                            children: "The Beach Mystery",
                        }),
                        _jsx("p", {
                            className: "about-page__tagline",
                            children:
                                "An interactive choose-your-own-adventure story where every choice shapes your journey along the shore.",
                        }),
                    ],
                }),
                _jsx("div", {
                    className: "about-page__hero animate-fade-up delay-1",
                    children: _jsx(SceneArt, {
                        scene: "beach",
                        size: "large",
                    }),
                }),
                _jsxs("section", {
                    className: "about-page__section animate-fade-up",
                    children: [
                        _jsx("h2", {
                            className: "about-page__section-title",
                            children: "What Is This?",
                        }),
                        _jsxs("div", {
                            className: "about-page__prose",
                            children: [
                                _jsx("p", {
                                    children:
                                        "The Beach Mystery is a reimagining of a classic text-based adventure, rebuilt as a modern, interactive web experience. The story begins on a sunlit beach where you stumble upon a pirate's chest buried in the sand. From there, every decision you make branches the narrative in a new direction.",
                                }),
                                _jsx("p", {
                                    children:
                                        "You'll answer five personalization questions whose answers are woven directly into the story. Your name, favorite color, animal, cartoon character, and jewel all appear as part of the narrative. Then you'll decide whether to open the chest, follow the treasure map, enter the cave, and which passage to take.",
                                }),
                                _jsx("p", {
                                    children:
                                        "With seven complete storylines and four unique endings, the story tracks what you've discovered and celebrates each new ending you reach.",
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs("section", {
                    className: "about-page__features animate-fade-up",
                    children: [
                        _jsx("h2", {
                            className: "about-page__section-title",
                            children: "Features",
                        }),
                        _jsx("div", {
                            className: "about-page__feature-grid",
                            children: FEATURES.map(([icon, title, text]) =>
                                _jsxs(
                                    "div",
                                    {
                                        className: "about-feature",
                                        children: [
                                            _jsx("span", {
                                                className:
                                                    "about-feature__icon",
                                                "aria-hidden": "true",
                                                children: icon,
                                            }),
                                            _jsx("h3", {
                                                children: title,
                                            }),
                                            _jsx("p", {
                                                children: text,
                                            }),
                                        ],
                                    },
                                    title,
                                ),
                            ),
                        }),
                    ],
                }),
                _jsxs("section", {
                    className: "about-page__tech animate-fade-up",
                    children: [
                        _jsx("h2", {
                            className: "about-page__section-title",
                            children: "Built With",
                        }),
                        _jsx("div", {
                            className: "about-page__tech-list",
                            children: TECH.map((item) =>
                                _jsx(
                                    "span",
                                    {
                                        className: "about-page__tech-item",
                                        children: item,
                                    },
                                    item,
                                ),
                            ),
                        }),
                        _jsx("p", {
                            className: "about-page__tech-note",
                            children:
                                "Designed for GitHub Pages. No backend is required, and progress is saved locally in your browser.",
                        }),
                    ],
                }),
                _jsxs("section", {
                    className: "about-page__story animate-fade-up",
                    children: [
                        _jsx("h2", {
                            className: "about-page__section-title",
                            children: "The Story Structure",
                        }),
                        _jsx("div", {
                            className: "about-page__story-stats",
                            children: STORY_STATS.map(([number, label]) =>
                                _jsxs(
                                    "div",
                                    {
                                        className: "about-page__story-stat",
                                        children: [
                                            _jsx("span", {
                                                className:
                                                    "about-page__story-num",
                                                children: number,
                                            }),
                                            _jsx("span", {
                                                className:
                                                    "about-page__story-label",
                                                children: label,
                                            }),
                                        ],
                                    },
                                    label,
                                ),
                            ),
                        }),
                    ],
                }),
                _jsxs("div", {
                    className: "about-page__cta animate-fade-up",
                    children: [
                        _jsx(Link, {
                            to: "/play",
                            className: "btn btn--primary btn--lg",
                            children: "Play the Story \u2192",
                        }),
                        _jsx(Link, {
                            to: "/case-study",
                            className: "btn btn--light btn--lg",
                            children: "Read the Case Study",
                        }),
                    ],
                }),
            ],
        }),
    });
}
