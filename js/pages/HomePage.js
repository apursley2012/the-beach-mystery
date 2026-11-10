/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Owns the landing-page content, feature summary, and calls to      |
  |          action while reusing shared site components and styles.           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useMemo } from "../lib/react.js";
import { Link } from "../lib/router.js";
import { SceneArt } from "../components/SceneArt.js";
import { FeatureCard } from "./home/FeatureCard.js";
// All five CSS waves share one horizontal drift and one vertical swell cycle.
// Even-numbered layers are half a cycle out of phase with odd-numbered ones.
const WAVE_LAYERS = Object.freeze([1, 2, 3, 4, 5]);
export function HomePage() {
    const stars = useMemo(
        () =>
            Array.from(
                {
                    length: 30,
                },
                (_, id) => ({
                    id,
                    left: 3 + Math.random() * 94,
                    top: 3 + Math.random() * 49,
                    size: 2.3 + Math.random() * 0.4,
                    delay: -Math.random() * 6,
                    duration: 2.5 + Math.random() * 3.5,
                }),
            ),
        [],
    );
    return _jsxs("div", {
        className: "start",
        children: [
            _jsxs("div", {
                className: "start__bg",
                "aria-hidden": "true",
                children: [
                    ...WAVE_LAYERS.map((layer) =>
                        _jsx(
                            "div",
                            {
                                className: `start__wave start__wave--${layer}`,
                            },
                            layer,
                        ),
                    ),
                    _jsx("div", {
                        className: "start__stars",
                        children: stars.map((star) =>
                            _jsx(
                                "span",
                                {
                                    className: "start__star",
                                    style: {
                                        left: `${star.left}%`,
                                        top: `${star.top}%`,
                                        "--star-size": `${star.size}px`,
                                        animationDelay: `${star.delay}s`,
                                        animationDuration: `${star.duration}s`,
                                    },
                                },
                                star.id,
                            ),
                        ),
                    }),
                ],
            }),
            _jsxs("section", {
                className: "start__hero container",
                children: [
                    _jsxs("h1", {
                        className: "start__title animate-fade-up delay-1",
                        children: [
                            _jsx("span", {
                                className: "start__title-line",
                                children: "The Beach",
                            }),
                            _jsx("span", {
                                className:
                                    "start__title-line start__title-line--accent",
                                children: "Mystery",
                            }),
                        ],
                    }),
                    _jsx("p", {
                        className: "start__subtitle animate-fade-up delay-2",
                        children:
                            "A pirate's chest buried in the sand. A treasure map. A dark cave. Your choices shape the story \u2014 seven paths, four endings, one adventure.",
                    }),
                    _jsxs("div", {
                        className: "start__actions animate-fade-up delay-3",
                        children: [
                            _jsxs(Link, {
                                to: "/play",
                                className: "btn btn--primary btn--lg",
                                children: [
                                    _jsx("span", {
                                        children: "Begin Your Adventure",
                                    }),
                                    _jsx("span", {
                                        className: "btn__arrow",
                                        "aria-hidden": "true",
                                        children: "\u2192",
                                    }),
                                ],
                            }),
                            _jsx(Link, {
                                to: "/about",
                                className: "btn btn--ghost btn--lg",
                                children: "Learn More",
                            }),
                        ],
                    }),
                    _jsxs("div", {
                        className: "start__stats animate-fade-up delay-4",
                        children: [
                            _jsxs("div", {
                                className: "start__stat",
                                children: [
                                    _jsx("span", {
                                        className: "start__stat-num",
                                        children: "7",
                                    }),
                                    _jsx("span", {
                                        className: "start__stat-label",
                                        children: "Storylines",
                                    }),
                                ],
                            }),
                            _jsx("div", {
                                className: "start__stat-divider",
                            }),
                            _jsxs("div", {
                                className: "start__stat",
                                children: [
                                    _jsx("span", {
                                        className: "start__stat-num",
                                        children: "4",
                                    }),
                                    _jsx("span", {
                                        className: "start__stat-label",
                                        children: "Endings",
                                    }),
                                ],
                            }),
                            _jsx("div", {
                                className: "start__stat-divider",
                            }),
                            _jsxs("div", {
                                className: "start__stat",
                                children: [
                                    _jsx("span", {
                                        className: "start__stat-num",
                                        children: "5",
                                    }),
                                    _jsx("span", {
                                        className: "start__stat-label",
                                        children: "Questions",
                                    }),
                                ],
                            }),
                            _jsx("div", {
                                className: "start__stat-divider",
                            }),
                            _jsxs("div", {
                                className: "start__stat",
                                children: [
                                    _jsx("span", {
                                        className: "start__stat-num",
                                        children: "1",
                                    }),
                                    _jsx("span", {
                                        className: "start__stat-label",
                                        children: "Riddle",
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs("section", {
                className: "start__features container",
                children: [
                    _jsx("h2", {
                        className: "start__section-title animate-fade-up",
                        children: "What Awaits You",
                    }),
                    _jsxs("div", {
                        className: "start__feature-grid",
                        children: [
                            _jsx(FeatureCard, {
                                to: "/play",
                                scene: "chest",
                                title: "Interactive Story",
                                delay: "delay-1",
                                children:
                                    "Make choices that branch the narrative. Open the chest, follow the map, or explore the cave.",
                            }),
                            _jsx(FeatureCard, {
                                to: "/gallery",
                                scene: "island",
                                title: "Scene Gallery",
                                delay: "delay-3",
                                children:
                                    "Explore the artwork from each story moment \u2014 the beach, the chest, the island, the cave.",
                            }),
                            _jsx(FeatureCard, {
                                to: "/endings",
                                scene: "treasure-chamber",
                                title: "Four Endings",
                                delay: "delay-4",
                                children:
                                    "From island treasure to a peaceful walk \u2014 each ending is shaped by the choices you make.",
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs("section", {
                className: "start__preview container",
                children: [
                    _jsxs("div", {
                        className: "start__preview-content",
                        children: [
                            _jsx("h2", {
                                className: "start__section-title",
                                children: "A Glimpse of the Tale",
                            }),
                            _jsxs("div", {
                                className: "start__preview-text",
                                children: [
                                    _jsx("p", {
                                        className: "start__preview-line",
                                        children:
                                            "It is a beautiful day on the beach.",
                                    }),
                                    _jsx("p", {
                                        className: "start__preview-line",
                                        children:
                                            "You are walking, enjoying the sounds of the ocean & the sand beneath your toes.",
                                    }),
                                    _jsx("p", {
                                        className: "start__preview-line",
                                        children:
                                            "As you are walking along, your foot bumps something hard...",
                                    }),
                                    _jsx("p", {
                                        className:
                                            "start__preview-line start__preview-line--accent",
                                        children: "Curious, you start digging.",
                                    }),
                                ],
                            }),
                            _jsx(Link, {
                                to: "/play",
                                className: "btn btn--primary",
                                children: "Start Digging \u2192",
                            }),
                        ],
                    }),
                    _jsx("div", {
                        className: "start__preview-art",
                        children: _jsx(SceneArt, {
                            scene: "beach",
                            size: "large",
                        }),
                    }),
                ],
            }),
        ],
    });
}
