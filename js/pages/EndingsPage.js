/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Displays discovered-ending progress and ending details using      |
  |          achievement state stored by the browser game service.             |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from "../lib/jsx-runtime.js";
import { useState } from "../lib/react.js";
import { Link } from "../lib/router.js";
import { EndingCard } from "./endings/EndingCard.js";
import { PageHeader } from "../components/PageHeader.js";
import { ENDINGS, STORYLINES } from "../data/story.js";
import { ENDING_SCENES } from "../data/sceneImages.js";
import { STORAGE_KEYS, readStringArray } from "../services/gameStorage.js";
const ENDING_IDS = new Set(Object.keys(ENDINGS));
const PROGRESS_RING_CIRCUMFERENCE = 327;
export function EndingsPage() {
    const [achievements] = useState(() =>
        readStringArray(STORAGE_KEYS.achievements, ENDING_IDS),
    );
    const endings = Object.values(ENDINGS);
    const discoveredCount = achievements.length;
    const progress = endings.length
        ? (discoveredCount / endings.length) * PROGRESS_RING_CIRCUMFERENCE
        : 0;
    const remainingCount = endings.length - discoveredCount;
    return _jsx("div", {
        className: "endings-page",
        children: _jsxs("div", {
            className: "container",
            children: [
                _jsx(PageHeader, {
                    classPrefix: "endings-page",
                    badgeIcon: "🏆",
                    badgeIconClass: "endings-page__badge-icon",
                    badge: `${discoveredCount} of ${endings.length} Discovered`,
                    title: "Story Endings",
                    subtitle:
                        "Four unique endings await. Each is shaped by the choices you make. Will you find them all?",
                }),
                _jsx("div", {
                    className: "endings-page__progress animate-fade-up delay-1",
                    children: _jsxs("div", {
                        className: "endings-page__progress-ring",
                        children: [
                            _jsxs("svg", {
                                viewBox: "0 0 120 120",
                                className: "endings-page__progress-svg",
                                "aria-hidden": "true",
                                children: [
                                    _jsx("circle", {
                                        cx: "60",
                                        cy: "60",
                                        r: "52",
                                        fill: "none",
                                        stroke: "var(--gold-500-soft)",
                                        strokeWidth: "8",
                                    }),
                                    _jsx("circle", {
                                        cx: "60",
                                        cy: "60",
                                        r: "52",
                                        fill: "none",
                                        stroke: "var(--gold)",
                                        strokeWidth: "8",
                                        strokeLinecap: "round",
                                        strokeDasharray: `${progress} ${PROGRESS_RING_CIRCUMFERENCE}`,
                                        transform: "rotate(-90 60 60)",
                                        className:
                                            "endings-page__progress-circle",
                                    }),
                                ],
                            }),
                            _jsxs("div", {
                                className: "endings-page__progress-text",
                                children: [
                                    _jsx("span", {
                                        className: "endings-page__progress-num",
                                        children: discoveredCount,
                                    }),
                                    _jsxs("span", {
                                        className:
                                            "endings-page__progress-label",
                                        children: ["of ", endings.length],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
                _jsx("div", {
                    className: "endings-page__grid",
                    children: endings.map((ending, index) => {
                        const isDiscovered = achievements.includes(ending.id);
                        const paths = STORYLINES.filter(
                            (storyline) => storyline.ending === ending.id,
                        );
                        const scene =
                            ENDING_SCENES[ending.id] ?? "beach-sunset";
                        return _jsx(
                            EndingCard,
                            {
                                ending,
                                index,
                                isDiscovered,
                                paths,
                                scene,
                            },
                            ending.id,
                        );
                    }),
                }),
                _jsx("div", {
                    className: "endings-page__cta animate-fade-up",
                    children:
                        remainingCount > 0
                            ? _jsxs(_Fragment, {
                                  children: [
                                      _jsxs("p", {
                                          children: [
                                              remainingCount,
                                              " ending",
                                              remainingCount > 1 ? "s" : "",
                                              " still waiting to be found...",
                                          ],
                                      }),
                                      _jsx(Link, {
                                          to: "/play",
                                          className: "btn btn--primary btn--lg",
                                          children: "Continue Exploring \u2192",
                                      }),
                                  ],
                              })
                            : _jsxs(_Fragment, {
                                  children: [
                                      _jsx("p", {
                                          children:
                                              "You've discovered every ending! You are a true Beach Mystery explorer.",
                                      }),
                                      _jsx(Link, {
                                          to: "/play",
                                          className: "btn btn--primary btn--lg",
                                          children: "Play Again \u2192",
                                      }),
                                  ],
                              }),
                }),
            ],
        }),
    });
}
