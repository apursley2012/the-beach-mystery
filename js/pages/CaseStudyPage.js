/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Presents a reader-focused project case study grounded in the      |
  |          application's implemented narrative, state, and hosting           |
  |          architecture.                                                     |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { Link } from "../lib/router.js";
function paragraph(content) {
    return _jsx("p", { children: content });
}
function section(title, blocks) {
    return _jsxs("section", {
        className: "case-study__section animate-fade-up",
        children: [
            _jsx("h2", {
                className: "case-study__section-title",
                children: title,
            }),
            ...blocks,
        ],
    });
}
function exampleDiagram() {
    return _jsxs("div", {
        className: "case-study__diagram",
        "aria-label":
            "Story flow: the beach opening leads to chest discovery and a choice to open or skip the chest",
        children: [
            _jsx("div", {
                className: "case-study__diagram-node",
                children: "beachOpening",
            }),
            _jsx("div", {
                className: "case-study__diagram-arrow",
                "aria-hidden": "true",
                children: "↓",
            }),
            _jsx("div", {
                className: "case-study__diagram-node",
                children: "chestDiscovery",
            }),
            _jsx("div", {
                className: "case-study__diagram-arrow",
                "aria-hidden": "true",
                children: "↓",
            }),
            _jsx("div", {
                className:
                    "case-study__diagram-node case-study__diagram-node--choice",
                children: "chestChoice",
            }),
            _jsx("div", {
                className: "case-study__diagram-arrow",
                "aria-hidden": "true",
                children: "↙ ↘",
            }),
            _jsxs("div", {
                className: "case-study__diagram-branch",
                children: [
                    _jsx("span", { children: "chestOpened" }),
                    _jsx("span", { children: "chestSkipped" }),
                ],
            }),
        ],
    });
}
function feature(label, detail) {
    return _jsxs("li", {
        children: [_jsx("strong", { children: `${label}:` }), ` ${detail}`],
    });
}
export function CaseStudyPage() {
    return _jsx("div", {
        className: "case-study",
        children: _jsxs("div", {
            className: "container",
            children: [
                _jsxs("header", {
                    className: "case-study__header animate-fade-up",
                    children: [
                        _jsxs("div", {
                            className: "case-study__badge",
                            children: [
                                _jsx("span", {
                                    "aria-hidden": "true",
                                    children: "📄",
                                }),
                                _jsx("span", { children: "Case Study" }),
                            ],
                        }),
                        _jsx("h1", {
                            className: "case-study__title",
                            children:
                                "The Beach Mystery: From Text Adventure to Interactive Web Experience",
                        }),
                        _jsx("p", {
                            className: "case-study__meta",
                            children:
                                "Interactive Fiction · React · Static Web Architecture · 2026",
                        }),
                    ],
                }),
                _jsxs("article", {
                    className: "case-study__article",
                    children: [
                        section("Project Overview", [
                            paragraph(
                                "The Beach Mystery takes a familiar text-adventure premise and turns it into a self-contained browser experience. A walk along the shore leads to a buried pirate’s chest, a treasure map, a mysterious cave, and a series of choices that can end in very different discoveries. The project’s central question was simple: how can an interactive story feel more immersive without losing the clarity and responsiveness that make choice-driven fiction enjoyable?",
                            ),
                            paragraph(
                                "The finished demo combines seven complete storylines, four distinct endings, five personalization prompts, scene artwork, a riddle, inventory indicators, local save and resume functionality, and progress tracking. It runs through static HTML entry pages with shared React-based interface modules, keeping the experience suitable for static hosting rather than requiring a server, database, or account system.",
                            ),
                            paragraph(
                                "This case study focuses on the work behind that experience: organizing the narrative as data, protecting continuity across branches, separating gameplay from presentation, and choosing visual details that support the writing rather than overpower it.",
                            ),
                        ]),
                        section("The Problem: Choices Have Consequences", [
                            paragraph(
                                "Branching stories are easy to sketch and harder to maintain. Opening a chest, declining a map, or entering a cave may look like a single decision on screen, but each action changes what the character can reasonably know, carry, or encounter later. If those consequences are not modeled consistently, the story can contradict itself. A player might be told they are holding a jewel they never found, or arrive at an ending through a path that should not exist.",
                            ),
                            paragraph(
                                "The interface added another set of constraints. Long passages must stay readable on a phone; choices and form feedback need to be understandable; artwork and motion must not interfere with controls. The application also needs to survive a page refresh or a return visit without relying on a backend. These are different problems, but they all depend on clear boundaries between story data, state, and UI.",
                            ),
                            paragraph(
                                "The goal was not to build the largest possible game. It was to make a focused, replayable adventure whose branches remain coherent, whose progress is understandable, and whose code can be revised without turning each change into a new round of regressions.",
                            ),
                        ]),
                        section(
                            "Architecture: A Story Graph, Not a Chain of Screens",
                            [
                                paragraph(
                                    "The narrative lives in a dedicated story-data module. Each node has an identifier and a role, such as narration, choice, or riddle. Narration nodes provide text and an onward link; choice nodes declare labeled options and their destinations; ending references identify the outcome. The play interface reads the current node and renders the appropriate interaction instead of embedding the entire plot inside component conditionals.",
                                ),
                                paragraph(
                                    "For example, the opening leads to the chest, and the chest offers a choice. That one decision starts two legitimate routes rather than forcing the UI to manage a long sequence of unrelated if/else branches. The example below shows the first divergence in the story graph.",
                                ),
                                exampleDiagram(),
                            ],
                        ),
                        section("Protecting Narrative Continuity", [
                            paragraph(
                                "Opening the chest sets three explicit game-state flags: the player has opened the chest, collected the jewel, and found the map. Leaving it buried sets those flags to false. Those values are then carried forward as the player advances, so the story knows which discoveries are available on that route.",
                            ),
                            paragraph(
                                "The cave scenes demonstrate why that detail matters. The story contains separate left- and right-passage nodes for players with and without the jewel. The versions differ in their descriptions and consequences, preventing a jewel from appearing in a route where it was never collected. This implementation uses distinct branch nodes and state flags; it does not depend on a generic conditional-lines system.",
                            ),
                            paragraph(
                                "Personalization is handled separately. The player supplies a name, favorite color, animal, cartoon character, and jewel at the beginning. A text-interpolation utility substitutes those values into story placeholders when scenes are shown. This keeps player-specific wording in the narrative while avoiding repeated string-handling logic across the interface.",
                            ),
                            _jsx("div", {
                                className: "case-study__code",
                                children: _jsx("pre", {
                                    children:
                                        '// An excerpt of the actual story node\'s state transition.\nsetState: { hasOpenedChest: true, hasJewel: true, hasMap: true },\nnext: "mapChoice",',
                                }),
                            }),
                        ]),
                        section(
                            "Visual Design: Atmosphere With a Clear Purpose",
                            [
                                paragraph(
                                    "A beach adventure benefits from a strong sense of place, but a web interface still has a job to do. The visual direction balances illustrated environments with readable controls, distinct navigation, and a clear hierarchy between story text and supporting information. Scenes such as the shoreline, treasure map, island, and cave give major narrative moments their own visual identity.",
                                ),
                                paragraph(
                                    "The typography pairs Cormorant Garamond for literary headings and narrative emphasis with Outfit for controls and supporting UI. Coastal color families provide atmosphere, while warmer accents distinguish important actions. The homepage uses layered wave movement and small points of light to reinforce the setting, but those effects remain decorative: players should never need an animation to understand what to do next.",
                                ),
                                paragraph(
                                    "The gallery uses the same scene assets as the adventure, helping visitors connect the artwork to the places they encounter during play. Reusing consistent visual components across the site also makes the experience feel like a single product instead of a game surrounded by unrelated portfolio pages.",
                                ),
                            ],
                        ),
                        section("Game State, Saves, and Achievements", [
                            paragraph(
                                "A focused React hook coordinates starting a game, moving between nodes, recording choices, reaching endings, and requesting save or load operations. A separate browser-storage service handles localStorage access and the shape of persisted data. Keeping these responsibilities distinct reduces the chance that a presentation change will accidentally alter the rules of play.",
                            ),
                            paragraph(
                                "The save includes the active story node, personalization values, inventory flags, decision history, and current ending. On load, the application checks the saved structure, data types, and references against known nodes and endings before accepting it. This matters because stored browser data can be missing, outdated, or malformed; treating it as automatically valid would risk sending players into a broken scene.",
                            ),
                            paragraph(
                                "Achievement progress is kept separately from the current run. When a player reaches one of the four endings, the application records that ending once and displays the discoveries on the Endings page. The limitation is intentional: progress is local to a browser and storage profile. It does not synchronize across devices and can be lost if site data is cleared.",
                            ),
                        ]),
                        section("Features That Support Replayability", [
                            paragraph(
                                "The supporting features serve specific player needs rather than simply increasing the feature count. A scene gallery lets readers revisit the artwork; inventory indicators show what a route has revealed; and an optional riddle hint offers a way forward after incorrect attempts. Together, these features make it easier to explore unfamiliar paths without losing track of progress.",
                            ),
                            _jsxs("ul", {
                                className: "case-study__enhancement-list",
                                children: [
                                    feature(
                                        "Save and resume",
                                        "A player can capture the current route and return later in the same browser.",
                                    ),
                                    feature(
                                        "Inventory",
                                        "The jewel and map appear as discoveries rather than always-available items.",
                                    ),
                                    feature(
                                        "Endings and achievements",
                                        "Four unique outcomes are tracked independently of the current run.",
                                    ),
                                    feature(
                                        "Scene gallery",
                                        "Illustrations can be revisited without replaying the entire story.",
                                    ),
                                    feature(
                                        "Riddle hints",
                                        "Incorrect answers can reveal additional guidance instead of creating a dead end.",
                                    ),
                                    feature(
                                        "Validation",
                                        "Choices, riddle input, and stored game data are checked at their respective boundaries.",
                                    ),
                                ],
                            }),
                        ]),
                        section("Accessibility and Responsive Interaction", [
                            paragraph(
                                "Because this is a reading-first experience, typography, spacing, and clear information order are functional requirements. Choices use semantic controls, the riddle has a labeled input, and validation feedback is exposed through accessible error messaging. Focus styling and responsive layouts help keep navigation practical across different screen sizes and input methods.",
                            ),
                            paragraph(
                                "Movement is designed as an enhancement rather than a requirement. The styles respond to reduced-motion preferences, and the story remains understandable without decorative transitions. These source-level decisions provide a foundation, though final accessibility confidence still depends on hands-on keyboard, assistive-technology, and device testing.",
                            ),
                        ]),
                        section("Engineering Decisions and Trade-offs", [
                            paragraph(
                                "Real static HTML entry pages allow the main routes to resolve as files on hosts such as GitHub Pages. Shared client-side components provide a consistent interface, while a lightweight navigation adapter maps route links to the corresponding documents. This avoids making page refreshes depend on server-side route rewriting.",
                            ),
                            paragraph(
                                "Browser-only persistence keeps the project deployable without credentials, accounts, or a database. That is an appropriate trade-off for a standalone portfolio demo, not a substitute for synchronized user profiles. Similarly, separating narrative data from rendering adds some structure up front, but it lowers the cost of changing scenes and checking story references later.",
                            ),
                            paragraph(
                                "The architecture favors a manageable scope: reusable UI, explicit story transitions, local progress, and static hosting. Each decision supports the experience the project actually offers rather than introducing infrastructure for features it does not need.",
                            ),
                        ]),
                        section("Verification and Lessons Learned", [
                            paragraph(
                                "A branching game needs more than a successful homepage load to count as working. Story-graph checks can identify broken node references and missing ending targets. Storage validation protects saved-state boundaries. Syntax checks can catch errors in the browser modules, while route walkthroughs help reveal continuity problems that only appear after several decisions.",
                            ),
                            paragraph(
                                "Those checks do not replace visual review on real screen sizes, keyboard navigation, screen-reader evaluation, or deployment smoke testing. They address different risks. Keeping that distinction clear is important when presenting the project as a demonstration of engineering practice rather than claiming that every possible environment has been certified.",
                            ),
                            paragraph(
                                "The strongest lesson from The Beach Mystery is the value of separating concerns in a project that looks simple from the outside. Clear story data protects narrative logic; independent state and storage code protect progress; and disciplined visual design keeps the experience readable. The result is a small adventure with enough complexity to demonstrate practical front-end architecture and thoughtful interaction design.",
                            ),
                        ]),
                    ],
                }),
                _jsxs("div", {
                    className: "case-study__cta animate-fade-up",
                    children: [
                        _jsx(Link, {
                            to: "/play",
                            className: "btn btn--primary btn--lg",
                            children: "Explore the Story →",
                        }),
                        _jsx(Link, {
                            to: "/blog",
                            className: "btn btn--light btn--lg",
                            children: "Behind the Build",
                        }),
                    ],
                }),
            ],
        }),
    });
}
