/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Owns the project-journal content and route-specific markup without |
  |          moving ordinary page copy into shared application data.           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useState } from "../lib/react.js";
import { BlogEntry } from "./blog/BlogEntry.js";
import { PageHeader } from "../components/PageHeader.js";
const POSTS = [
    {
        id: "design-philosophy",
        title: "Designing an Adventure You Can Feel, Not Just Read",
        date: "July 2026",
        category: "Design",
        excerpt:
            "How illustration, typography, and restrained motion create atmosphere without getting between the player and the story.",
        content: [
            "A buried pirate’s chest is an intriguing opening, but an interactive story needs more than a good premise to hold someone’s attention. Every screen has to invite the next decision. For The Beach Mystery, the design challenge was to make a text-led adventure feel atmospheric while keeping the choices, directions, and feedback unmistakably clear. The interface needed to support the story rather than compete for the spotlight.",
            "I started with the experience I wanted readers to have: arrive at a beach, discover something unexpected, and feel that each decision changes what happens next. That led to a visual hierarchy with a prominent story area, distinct action buttons, and quieter supporting information. A player should be able to locate the next choice in seconds, even when the scene contains vivid artwork or animation.",
            "Illustrations do much of the storytelling work before a paragraph is read. The bright shoreline establishes the opening mood; a weathered treasure map suggests possibility; and darker cave imagery signals a different kind of risk. Rather than adding decorative art everywhere, the gallery and story use recognizable scenes at important transitions. Reusing the same imagery across those experiences helps the adventure feel like a connected world.",
            "Typography establishes a second layer of hierarchy. Cormorant Garamond gives titles and story moments a literary character, while Outfit keeps navigation, labels, forms, and controls straightforward. The pairing provides contrast without relying on excessive font sizes or decorative treatments. Consistent spacing and card styling carry the same visual language through the supporting pages.",
            "Color works best when it has a purpose. Coastal blues and teal hues establish the sea and the atmosphere, while warm coral and sand tones add contrast around important actions. In the hero, layered waves and softly twinkling points of light add movement. Those effects should never obscure the heading, lower the readability of a button, or make the page feel constantly busy.",
            "Animation was deliberately treated as a supporting detail. Gentle movement can suggest water, create a sense of place, and bring the first screen to life, but it cannot be the only way to understand progress or identify a control. Reduced-motion preferences allow the decorative effects to step aside when needed. Clear labels and persistent visual structure remain the foundation of the experience.",
            "The larger lesson was that atmosphere and usability are not opposing goals. A more immersive illustration is only successful if the reader still knows where to look and what to do. The Beach Mystery became a useful exercise in choosing what to emphasize, what to simplify, and when the most effective design decision is to let the story speak for itself.",
        ],
    },
    {
        id: "story-architecture",
        title: "Seven Storylines, One Maintainable Narrative",
        date: "July 2026",
        category: "Engineering",
        excerpt:
            "Inside the node-based story structure that keeps choices, inventory, and outcomes connected without tangled rendering logic.",
        content: [
            "Branching fiction has a hidden engineering challenge: every new choice creates another possible version of the story. A small adventure can quickly become difficult to maintain if its dialogue, navigation, and consequences live in one growing collection of conditionals. The Beach Mystery has seven complete routes leading to four endings, which made predictable story structure more important than clever rendering code.",
            "I approached the narrative as data. Each scene is represented by a node with an identifier and a defined role, such as narration, choice, or riddle. Narration nodes contain story lines and a next destination. Choice nodes provide labeled options and their target nodes. This lets the interface determine which component to display based on the current node instead of containing the story itself.",
            "The opening shows why this separation matters. After finding the chest, the player can open it or leave it buried. Opening it leads to the map and jewel; skipping it leads toward the cave without either item. Those branches are not just different pieces of prose. They establish different game states, and later scenes must reflect what the player actually did.",
            "The story data records those consequences explicitly. An opened chest sets flags for the chest, jewel, and map. At the cave, separate paths handle whether the player carries the jewel. That decision avoids a subtle narrative error: describing a glowing jewel on a route where the player never picked one up. In the current implementation, the different cave scenes are represented by distinct nodes rather than by a conditional-lines feature.",
            "Personalization follows a related but separate mechanism. The player supplies five details at the beginning of the adventure. The story text contains placeholders for those values, and a text utility substitutes the saved answers when the lines are displayed. Keeping this process outside the scene components avoids writing custom formatting logic for every paragraph.",
            "The graph structure also makes defects easier to look for. A validation utility can examine whether a node’s next destination exists, whether each choice points to a real node, and whether ending references are valid. Route traversal can then exercise the different decision paths and confirm that the intended outcomes are reachable. These checks are valuable because the most damaging story bugs often appear only after several earlier choices.",
            "This design is not about making a small game unnecessarily complicated. It is about putting different responsibilities in the right places: narrative data describes what can happen, game state remembers what has happened, and interface components decide how to present the current moment. As a result, revising a scene does not require dismantling the surrounding navigation.",
            "The main lesson was that maintainability is also a storytelling concern. A clear data model protects continuity, makes alternative routes easier to reason about, and gives writers more freedom to improve the prose without accidentally changing how the adventure works.",
        ],
    },
    {
        id: "no-backend",
        title: "Saving an Adventure Without a Server",
        date: "July 2026",
        category: "Architecture",
        excerpt:
            "Why browser storage and real static page entries were a practical fit for a self-contained interactive-fiction demo.",
        content: [
            "A player should be able to step away from an adventure and return without losing every decision. That is a straightforward expectation, but it raises an architectural question: where does progress live when the project is hosted as static files? For The Beach Mystery, the answer is intentionally local. The browser runs the experience and stores its own save data, without requiring a server or user account.",
            "The application has real HTML entry documents for its major pages and shares its React-based interface modules across them. This matters on a static host such as GitHub Pages, where a direct link or page refresh must resolve to an actual file. The project-owned navigation adapter maps page routes to those documents rather than assuming a server will handle every URL.",
            "Gameplay state includes the current story node, personalization answers, inventory flags, decision history, and the ending reached. A dedicated hook coordinates the player’s actions, while a separate storage service handles reading, writing, and checking saved data. Keeping those responsibilities apart makes it easier to change the save format or story logic without entangling them with buttons and page markup.",
            "Saving is not simply a matter of placing an object in localStorage and hoping it will always be correct. Storage can contain old data, malformed JSON, or unexpected values. The load path therefore checks that the saved node exists, required values have appropriate types, and references to endings and previous choices are valid before restoring a game. If a save fails those checks, the application declines to load it instead of navigating to an invalid scene.",
            "Achievements are stored separately from an active playthrough. Reaching one of the four endings adds its identifier to the discovered-ending list, and revisiting the same ending does not add a duplicate. This allows a player to restart the story, explore another path, and keep a running record of discoveries. The Endings page turns that state into visible progress.",
            "Local storage is useful here because it keeps the demo self-contained, but its limitations need to be clear. A save belongs to a particular browser and storage profile; it does not follow someone to another device. Private browsing, clearing site data, or storage restrictions can remove or prevent saved progress. The application does not promise cloud backup or cross-device synchronization.",
            "The trade-off is worth it for this project. Static deployment keeps the hosting footprint small and avoids account management, authentication, and backend operations that the experience does not need. At the same time, the save-validation boundary provides a more dependable experience than assuming every stored value is safe to use.",
            "The important architectural decision was choosing the smallest system that satisfied the actual requirements. The result is a standalone adventure with persistent local progress, discoverable achievements, and direct page navigation, without pretending that a browser-based save is a full online account system.",
        ],
    },
    {
        id: "accessibility",
        title: "Making Every Choice Easier to Navigate",
        date: "July 2026",
        category: "Accessibility",
        excerpt:
            "Practical accessibility decisions for story choices, input forms, movement, and long-form reading.",
        content: [
            "Interactive fiction may be primarily text, but that does not make it automatically accessible. A story can be readable and still be difficult to play if a keyboard user cannot reach the next choice, a form error is unclear, or an animation distracts from the text. In The Beach Mystery, the goal was to make the interaction itself understandable, not merely the paragraphs on the screen.",
            "The interface treats decisions as real controls rather than decorative text with click handlers. Buttons and form inputs carry the actions, and visible focus styling helps people track their position when navigating by keyboard. Clear prompts tell players what information is expected before they continue. This approach also gives assistive technologies more meaningful structure to interpret.",
            "The riddle is a useful example because it combines an input, validation, feedback, and an optional hint. The answer field has an accessible label, error messages are exposed as alerts, and descriptive relationships connect the field to feedback or hint text. A player who enters an incorrect answer needs to know what happened and what to try next, regardless of whether they noticed a visual style change.",
            "The supporting pages matter just as much as the story itself. Consistent headings and navigation help visitors understand where they are, while descriptive control labels make the gallery, journal, and case-study content easier to use. Readable line lengths, spacing, and responsive layouts are particularly important when much of the experience involves reading and making decisions.",
            "Motion introduces a different consideration. Waves, stars, transitions, and small animations can add atmosphere, but people should not have to watch movement to understand the plot or operate the controls. The styling includes reduced-motion behavior so decorative animation can be limited when the operating system requests it. Content and interactive elements remain present when that motion is reduced.",
            "Accessibility also requires careful language about verification. Semantic markup and source-level checks improve the baseline, but they are not proof that the entire experience works perfectly with every assistive technology. Keyboard walkthroughs, screen-reader sessions, touch-device testing, and contrast checks are distinct parts of evaluating the finished site.",
            "The key lesson is that accessibility belongs in interaction design from the beginning. It influences the choice of elements, how errors are communicated, and whether the interface remains understandable when visual effects are removed. Those decisions help make the game more usable for a wider range of players, and they usually make it clearer for everyone else too.",
        ],
    },
];
export function BlogPage() {
    const [openPostId, setOpenPostId] = useState(null);
    return _jsx("div", {
        className: "blog-page",
        children: _jsxs("div", {
            className: "container",
            children: [
                _jsx(PageHeader, {
                    classPrefix: "blog-page",
                    badgeIcon: "📖",
                    badge: "Project Journal",
                    title: "Behind the Build",
                    subtitle:
                        "A closer look at the design choices, technical challenges, and lessons behind this interactive adventure.",
                }),
                _jsx("div", {
                    className: "blog-page__list",
                    children: POSTS.map((post, index) =>
                        _jsx(
                            BlogEntry,
                            {
                                post,
                                index,
                                isOpen: openPostId === post.id,
                                onOpen: () => setOpenPostId(post.id),
                                onClose: () => setOpenPostId(null),
                            },
                            post.id,
                        ),
                    ),
                }),
            ],
        }),
    });
}
