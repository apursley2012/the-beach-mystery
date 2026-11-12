<!--
File: README.md
Document Title: The Beach Mystery
Author: Alysha Pursley
Date: August 2026
-->

<div align="center">

<img src="./assets/icons/icon-512.png" alt="The Beach Mystery Logo" width="65%" height=“auto”>

<h1>The Beach Mystery 🏝️</h1>

<p><a href="https://github.com/apursley2012/the-beach-mystery/stargazers"><img src="https://img.shields.io/github/stars/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Stars" alt="Stars"></a> <a href="https://github.com/apursley2012/the-beach-mystery/forks"><img src="https://img.shields.io/github/forks/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Forks" alt="Forks"></a> <a href="https://github.com/apursley2012/the-beach-mystery/issues"><img src="https://img.shields.io/github/issues/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Issues" alt="Issues"></a> <a href="https://github.com/apursley2012/the-beach-mystery/commits"><img src="https://img.shields.io/github/last-commit/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=git&amp;label=Last%20Commit" alt="Last Commit"></a> <a href="https://github.com/apursley2012/the-beach-mystery"><img src="https://img.shields.io/github/repo-size/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Repo%20Size" alt="Repo Size"></a> <a href="https://github.com/apursley2012/the-beach-mystery"><img src="https://img.shields.io/github/languages/top/apursley2012/the-beach-mystery?style=for-the-badge&amp;label=Top%20Language" alt="Top Language"></a> <a href="https://github.com/apursley2012/the-beach-mystery"><img src="https://img.shields.io/github/languages/count/apursley2012/the-beach-mystery?style=for-the-badge&amp;label=Languages" alt="Languages"></a> <a href="https://github.com/apursley2012/the-beach-mystery/graphs/contributors"><img src="https://img.shields.io/github/contributors/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Contributors" alt="Contributors"></a> <a href="https://github.com/apursley2012/the-beach-mystery/graphs/commit-activity"><img src="https://img.shields.io/github/commit-activity/m/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=git&amp;label=Monthly%20Commits" alt="Monthly Commits"></a></p>

<p><a href="https://apursley2012.github.io/the-beach-mystery/"><img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-222222?style=for-the-badge&amp;logo=githubpages&amp;logoColor=white" alt="Live Demo"></a> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="HTML5"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="CSS3"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=black" alt="JavaScript"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" alt="React"></p>

<p><strong>An interactive choose-your-own-adventure beach mystery where player decisions change the route through the story, inventory and progress are tracked during play, and scene artwork turns the branching logic into a complete narrative experience.</strong></p>

<p><a href="https://apursley2012.github.io/the-beach-mystery/">Open the live project</a> · <a href="https://github.com/apursley2012/the-beach-mystery">View the repository</a> · <a href="https://github.com/apursley2012/the-beach-mystery/issues/new/choose">Report an issue or request an addition</a></p>

</div>

---

## Table of Contents 📖

*   [Project Overview 🔎](#project-overview)
    *   [Purpose 🎯](#purpose)
    *   [Design Style and Inspiration 🎨](#design-style-and-inspiration)
    *   [Main Color Palette 🌈](#main-color-palette)
    *   [Preview Screenshots 🖼️](#preview-screenshots)
*   [Key Features ✨](#key-features)
*   [Tech Stack 🛠️](#tech-stack)
*   [Live Demo 🚀](#live-demo)
*   [Installation 📦](#installation)
    *   [Local Use 💻](#local-use)
    *   [GitHub Pages Deployment 🌐](#github-pages-deployment)
*   [Usage 🧭](#usage)
*   [Project Structure 🗂️](#project-structure)
    *   [Pages Included 📄](#pages-included)
    *   [Core Files and Architecture 🧩](#core-files-and-architecture)
    *   [File and Folder Structure 🌳](#file-and-folder-structure)
*   [Story and Game-State Architecture 🎮](#story-and-game-state-architecture)
*   [Customization Guide 🎨](#customization-guide)
*   [Accessibility and Browser Compatibility ♿](#accessibility-and-browser-compatibility)
*   [Repository Relationship 🔗](#repository-relationship)
*   [Project Scope and Limitations 📌](#project-scope-and-limitations)
*   [Possible Future Enhancements 💡](#possible-future-enhancements)
*   [Contributing 🤝](#contributing)
    *   [Reporting Issues 🐛](#reporting-issues)
    *   [Requesting Additions 📝](#requesting-additions)
*   [License 📜](#license)
*   [Important Links 🔗](#important-links)
*   [Attribution ℹ️️](#attribution)

---

<a id="project-overview"></a>

<details open>
<summary><h2><strong>Project Overview 🔎</strong></h2></summary>

**The Beach Mystery** is an interactive branching-story application that treats a beach adventure as a stateful game rather than a sequence of static pages. The player begins with an introduction, moves through questions and story scenes, makes choices that determine the next branch, collects or unlocks progress-related information, and can continue toward different outcomes through the same application shell.

The project is organized so the story itself is data-driven. Scene information and image mappings live separately from navigation, footer, scene-art rendering, and game-state behavior. That makes the application easier to extend because story content does not have to be hard-coded into every visual component.

The experience also includes more than simple previous/next navigation. The stylesheet documents a title screen, instructions, player questions, progress indicators, inventory, a path tracker, save/restart controls, story text, branching choice buttons, riddles, hints, endings, feature cards, preview content, and additional article/blog-style presentation areas. The result is a complete interactive narrative site with a consistent visual system rather than a single branching-code exercise.

</details>

<a id="purpose"></a>

<details open>
<summary><h3><strong>Purpose 🎯</strong></h3></summary>

I built The Beach Mystery to turn branching logic and state management into something a person can actually explore. A conditional tree is technically useful, but it becomes much easier to understand when each branch changes a visible scene, unlocks a different route, affects progress, or asks the player to make another meaningful decision.

The story format also gave me a reason to separate content, state, and presentation properly. Story data can define what happens; the game-state hook can track where the player is and what they have done; reusable components can render the surrounding interface; and the scene-art mapping can control imagery without embedding asset paths throughout the game logic.

That structure means the project can grow without becoming a chain of duplicated pages. New scenes, choices, riddles, images, inventory items, or endings can be added within the existing architecture while keeping the same navigation and visual language.

</details>

<a id="design-style-and-inspiration"></a>

<details open>
<summary><h3><strong>Design Style and Inspiration 🎨</strong></h3></summary>

The design combines a literary beach-adventure mood with a polished interactive-game interface. The opening screen uses deep ocean blues fading into teal, star-like sand accents, bright white title text, and a sand/coral gradient for the emphasized title line. Cormorant Garamond gives story headings and narrative text a book-like quality, Outfit keeps interface copy readable, and JetBrains Mono is available for technical or code-like details.

Once the player enters the story, the interface shifts toward warm off-white cards, neutral borders, coral emphasis, ocean-blue status colors, and restrained shadows. This keeps long passages readable while still making choices, progress, inventory, riddles, and actions visually distinct.

The layout also changes according to the task. Story play uses a sidebar beside the main narrative on larger screens, while cards, feature grids, preview sections, and button groups adapt at smaller widths.

</details>

<a id="main-color-palette"></a>

<details open>
<summary><h3><strong>Main Color Palette 🌈</strong></h3></summary>

The current `assets/main.css` defines full Ocean, Sand, Coral, Teal, Neutral, Success, Warning, and Error scales. The table below lists every defined color token and the role it has in the design system. Where the current stylesheet uses only part of a scale directly, the remaining values are still intentionally available as neighboring shades for consistent hover, border, background, and future component states.

| Hex | Color Token / Name | Complete Use in the Interface |
| --- | --- | --- |
| `#F0F9FF` | Ocean 50 | Lightest ocean tint available for pale blue backgrounds and subtle primary-state surfaces |
| `#E0F2FE` | Ocean 100 | Very light ocean surface/border tint |
| `#BAE6FD` | Ocean 200 | Light ocean accent/border shade |
| `#7DD3FC` | Ocean 300 | Soft bright-blue accent shade |
| `#38BDF8` | Ocean 400 | Completed progress indicators and bright blue primary accents |
| `#0EA5E9` | Ocean 500 | Bright primary blue; save-action tints and blue translucent component backgrounds derive from this value |
| `#0284C7` | Ocean 600 | Semantic `--primary`; primary blue links/actions where the design calls for the main ocean color |
| `#0369A1` | Ocean 700 | Deepest visible opening-screen gradient stop and title-screen subtitle |
| `#075985` | Ocean 800 | Dark ocean shade available for stronger primary contrast |
| `#0C4A6E` | Ocean 900 | Deep ocean shade available for the darkest blue emphasis |
| `#FEFDFB` | Sand 50 | Lightest warm sand/off-white surface |
| `#FDF8F0` | Sand 100 | Pale warm paper/sand background option |
| `#F9EDD9` | Sand 200 | Star-like opening-screen dots; first light stop in the title accent gradient; warm highlight text |
| `#F3DCB8` | Sand 300 | Light warm title-gradient/highlight shade |
| `#ECC590` | Sand 400 | Semantic `--highlight`; warm highlight accents |
| `#E0A968` | Sand 500 | Mid sand accent |
| `#C8854A` | Sand 600 | Semantic `--highlight-deep`; title-screen accent gradient and stronger warm emphasis |
| `#A66838` | Sand 700 | Dark warm sand/brown accent |
| `#855030` | Sand 800 | Deep sand/brown accent |
| `#6B4028` | Sand 900 | Darkest sand/brown scale value |
| `#FEF3F0` | Coral 50 | Very pale coral surface |
| `#FDE0D9` | Coral 100 | Pale coral background/accent |
| `#FAC5B8` | Coral 200 | Hovered feature-card border and soft coral outlines |
| `#F59E8A` | Coral 300 | Opening title accent gradient |
| `#EF7A5F` | Coral 400 | Semantic `--accent-bright`; primary-button gradient and bright coral emphasis |
| `#E25A3C` | Coral 500 | Semantic `--accent`; headings, prompts, choice arrows, focus borders, active progress, translucent choice/riddle/blog backgrounds, glow/shadow source |
| `#C84528` | Coral 600 | Semantic `--accent-deep`; primary-button gradient and stronger coral action state |
| `#A33A22` | Coral 700 | Dark coral shade available for pressed/deeper accents |
| `#823120` | Coral 800 | Deeper coral/red-brown accent |
| `#6A2A1D` | Coral 900 | Darkest coral scale value |
| `#F0FDFA` | Teal 50 | Very light teal tint |
| `#CCFBF1` | Teal 100 | Pale teal surface |
| `#99F6E4` | Teal 200 | Light teal accent |
| `#5EEAD4` | Teal 300 | Bright soft teal accent |
| `#2DD4BF` | Teal 400 | Final stop in the opening ocean-to-teal background gradient |
| `#14B8A6` | Teal 500 | Mid teal accent available for interactive/status use |
| `#0D9488` | Teal 600 | Strong teal accent |
| `#0F766E` | Teal 700 | Deep teal accent |
| `#115E59` | Teal 800 | Dark teal accent |
| `#134E4A` | Teal 900 | Darkest teal value |
| `#4ADE80` | Success 400 | Light success-state green |
| `#22C55E` | Success 500 | Completed path checkmarks and primary success state |
| `#16A34A` | Success 600 | Darker success-state green |
| `#FBBF24` | Warning 400 | Light warning/highlight yellow |
| `#F59E0B` | Warning 500 | Riddle-hint text and warning state |
| `#F87171` | Error 400 | Light error-state red |
| `#EF4444` | Error 500 | Input/riddle error messages and restart-action red tint/source |
| `#FFFFFF` | Neutral 0 / White | Semantic elevated/card surface; bright title text; translucent white opening-screen overlays are derived from white |
| `#FAF9F7` | Neutral 50 | Semantic page background and light form/control surface; ghost-button text |
| `#F4F2EE` | Neutral 100 | Secondary button/control background |
| `#E8E4DC` | Neutral 200 | Card, input, progress, and choice borders; inactive progress bars; secondary-button hover |
| `#D1CABD` | Neutral 300 | Muted-on-dark semantic text |
| `#A89F8E` | Neutral 400 | Input placeholders and locked/disabled supporting details |
| `#837A68` | Neutral 500 | Semantic muted text used for hints, labels, metadata, and secondary copy |
| `#6B6354` | Neutral 600 | Medium-dark neutral available for supporting text |
| `#524B3F` | Neutral 700 | Dark neutral available for stronger secondary text |
| `#3A342B` | Neutral 800 | Semantic primary text |
| `#25201A` | Neutral 900 | Semantic brightest/dark text and dark-background token; also the source of neutral shadow colors |

The stylesheet then maps those raw colors into semantic tokens: `--bg`, `--bg-elevated`, `--bg-card`, `--bg-dark`, `--text`, `--text-muted`, `--text-bright`, `--text-on-dark`, `--text-muted-on-dark`, `--accent`, `--accent-bright`, `--accent-deep`, `--primary`, `--primary-bright`, `--highlight`, and `--highlight-deep`. This lets the same raw color serve a consistent interface job instead of being assigned differently in every component.

</details>

<a id="preview-screenshots"></a>

<details open>
<summary><h3><strong>Preview Screenshots 🖼️</strong></h3></summary>

The current repository includes a dedicated `assets/story-art/` collection used by the application, but I did not find a separately named repository screenshot gallery in the current GitHub source. I have not mislabeled story artwork as a screenshot or invented screenshot filenames.

The live project remains the verified visual reference until dedicated screenshots are added.

</details>


---

<a id="key-features"></a>

<details open>
<summary><h2><strong>Key Features ✨</strong></h2></summary>

* Interactive branching choose-your-own-adventure story
* Opening hero/title experience with animated ocean/star atmosphere
* Instructions flow before story play
* Player-question sequence with validation
* Story scenes rendered from structured data
* Choice buttons that determine branching paths
* Scene artwork mapped separately from story logic
* Inventory display with locked and active states
* Path/progress tracker with completed-state indicators
* Save and restart controls represented in the story UI
* Riddle interactions with input validation and hints
* Multiple ending presentation
* Responsive feature-card and preview sections
* Sticky story sidebar on larger screens
* Reusable navigation, footer, and scene-art components
* Separate game-state hook to keep progression logic out of presentation components

</details>


---

<a id="tech-stack"></a>

<details open>
<summary><h2><strong>Tech Stack 🛠️</strong></h2></summary>

* **JavaScript**
* **React / JSX runtime architecture** in the compiled static application
* **CSS3** with custom properties, gradients, animation, responsive layouts, and semantic color tokens
* **Cormorant Garamond** for display/story typography
* **Outfit** for interface/body typography
* **JetBrains Mono** for monospaced technical text
* **GitHub Pages** for static deployment

</details>


---

<a id="live-demo"></a>

<details open>
<summary><h2><strong>Live Demo 🚀</strong></h2></summary>

[https://apursley2012.github.io/the-beach-mystery/](https://apursley2012.github.io/the-beach-mystery/)

</details>


---

<a id="installation"></a>

<details open>
<summary><h2><strong>Installation 📦</strong></h2></summary>

The repository already contains the browser-ready compiled assets referenced by `index.html`. The published version does not require a server runtime to play the current story.

</details>

<a id="local-use"></a>

<details open>
<summary><h3><strong>Local Use 💻</strong></h3></summary>

1. Clone or download the repository.
2. Preserve the existing `assets/`, `components/`, `data/`, and `hooks/` paths.
3. Serve or open the root `index.html` in a modern browser.
4. Test start, instructions, questions, branching choices, riddles, inventory/progress behavior, restart/save behavior, endings, navigation, and responsive layouts after changes.

</details>

<a id="github-pages-deployment"></a>

<details open>
<summary><h3><strong>GitHub Pages Deployment 🌐</strong></h3></summary>

The root `index.html` uses relative module and stylesheet paths, so the current static build is structured for GitHub Pages. Publish from **Settings → Pages → Deploy from a branch → main → / (root)** while keeping the compiled assets and supporting modules at their current relative locations.

</details>


---

<a id="usage"></a>

<details open>
<summary><h2><strong>Usage 🧭</strong></h2></summary>

Open the live project and begin from the title screen. Follow the introductory instructions and enter the requested player information. Once the story begins, read the current scene and choose from the available actions.

The sidebar provides supporting progress information such as inventory, visited/completed path information, and story controls. Some scenes can present a riddle instead of ordinary choices; enter an answer or use the available hint when provided.

Different decisions lead through different branches and toward different outcomes, so replaying the story is part of the experience rather than an error state.

</details>


---

<a id="project-structure"></a>

<details open>
<summary><h2><strong>Project Structure 🗂️</strong></h2></summary>

The project separates compiled browser assets, reusable components, story data, and state behavior. That keeps the narrative content from being welded directly to the site chrome and makes individual concerns easier to change.

</details>

<a id="pages-included"></a>

<details open>
<summary><h3><strong>Pages Included 📄</strong></h3></summary>

The current project is primarily a single-page application loaded through `index.html`, but the interface contains several distinct application areas rather than a single screen:

| Area | Purpose |
| --- | --- |
| Start / Hero | Introduces the mystery and visual setting |
| Feature / Preview content | Explains the experience and gives a visual lead-in |
| Title Screen | Presents the story before play begins |
| Instructions | Explains how the interactive experience works |
| Player Questions | Collects validated setup information |
| Story View | Renders the current scene and story text |
| Sidebar | Shows inventory, path/progress information, save, and restart controls |
| Choice Area | Presents the current branching decisions |
| Riddle Area | Handles puzzle input, errors, and hints |
| Ending Area | Presents the outcome reached through the player’s route |

</details>

<a id="core-files-and-architecture"></a>

<details open>
<summary><h3><strong>Core Files and Architecture 🧩</strong></h3></summary>

The verified source includes `components/Nav.js`, `components/Footer.js`, and `components/SceneArt.js`. Navigation and footer behavior are therefore reusable instead of copied into story scenes. `SceneArt.js` isolates the job of presenting scene imagery from the data that decides which scene is active.

The root application loads modules from `components/`, `data/`, and `hooks/`, and `index.html` preloads those modules for the browser-ready build. That separation is especially useful in a branching story because the UI shell should not need to know the details of every scene.

The `assets/` directory contains the compiled JavaScript and CSS used by the live site, including `main.js`, `main.css`, shared navigation/footer styles, runtime modules, and `story-art/`. The root page also preloads `data/sceneImages.js`, `data/story.js`, and `hooks/useGameState.js`, showing the intended relationship between story content, artwork lookup, and state management.

</details>

<a id="file-and-folder-structure"></a>

<details open>
<summary><h3><strong>File and Folder Structure 🌳</strong></h3></summary>

```text
the-beach-mystery/
├── README.md
├── index.html
├── assets/
│   ├── main.js
│   ├── main.css
│   ├── Nav.css
│   ├── Footer.css
│   ├── index.js
│   ├── index2.js
│   ├── jsx-runtime.js
│   └── story-art/
├── components/
│   ├── Nav.js
│   ├── Footer.js
│   └── SceneArt.js
├── data/
│   ├── sceneImages.js
│   └── story.js
└── hooks/
    └── useGameState.js
```

The tree above reflects the files explicitly referenced or verified in the current repository rather than inventing an unverified source layout.

</details>


---

<a id="story-and-game-state-architecture"></a>

<details open>
<summary><h2><strong>Story and Game-State Architecture 🎮</strong></h2></summary>

The most important architectural decision is the separation of **story data**, **scene art**, **state**, and **rendering**. `data/story.js` can describe the narrative and branches. `data/sceneImages.js` maps scenes to visuals. `hooks/useGameState.js` owns progression and state-oriented behavior. `SceneArt.js` renders the visual for the active scene. The main application composes those pieces into the playable interface.

The stylesheet reflects that same separation in the UI. Inventory, path tracking, choices, riddles, errors, hints, and endings each have their own component-level classes and states. That makes it possible to change how a riddle looks without changing story data, or add a scene without rewriting the shared navigation.

This architecture also supports replayability. Because the route is state-driven instead of page-driven, restart or save behavior can act on the game state while the overall application shell remains mounted.

The color system is deliberately broader than a handful of one-off hex values. Ocean, Sand, Coral, Teal, Neutral, Success, Warning, and Error each form a scale so nearby shades are available for base states, hover states, low-contrast surfaces, borders, and stronger emphasis.

Semantic aliases then convert those raw scales into interface jobs. For example, Coral 500 is not simply “orange-red”; it is the application accent used for choice emphasis, headings, focus borders, active progress, and multiple tinted interactive backgrounds. Ocean 600 is the primary blue. Neutral 50 is the page background. Neutral 0 is the card/elevated surface. Neutral 800 is body text, and Neutral 900 is the strongest text/dark-background tone.

That two-layer system is useful because visual changes can be made centrally. A future redesign can adjust the semantic aliases while preserving the components that refer to `--accent`, `--primary`, `--bg-card`, or `--text-muted`.

</details>


---

<a id="customization-guide"></a>

<details open>
<summary><h2><strong>Customization Guide 🎨</strong></h2></summary>

Story changes should begin in the story/data layer instead of by duplicating presentation components. Add or modify scene content in `data/story.js`, update `data/sceneImages.js` when a scene needs different art, and preserve the existing state transitions expected by `useGameState.js`.

Visual changes belong in the CSS token system first. Update a raw scale or semantic alias rather than scattering new hard-coded colors across components. Recheck the opening gradient, card contrast, choice hover/focus states, riddle states, error/warning/success colors, and mobile layouts whenever the palette changes.

Reusable navigation, footer, and scene-art behavior should stay in their existing components so a story-content change does not create several slightly different copies of the same UI.

</details>


---

<a id="accessibility-and-browser-compatibility"></a>

<details open>
<summary><h2><strong>Accessibility and Browser Compatibility ♿</strong></h2></summary>

Interactive choices, form inputs, riddle controls, save/restart actions, and navigation should remain reachable by keyboard with visible focus states. Story artwork should have meaningful text alternatives where it conveys narrative information. Error, success, and progress states should not rely on color alone.

The CSS uses responsive grids, flexible wrapping, and breakpoint-specific layouts so major sections can collapse on smaller screens. The current static build is intended for modern Safari, Chrome, Firefox, and Edge.

</details>


---

<a id="repository-relationship"></a>

<details open>
<summary><h2><strong>Repository Relationship 🔗</strong></h2></summary>

The story data, game-state hook, scene artwork, reusable components, compiled assets, and live GitHub Pages presentation are parts of one project. The compiled files under `assets/` are the browser-ready implementation; the modules under `components/`, `data/`, and `hooks/` preserve the project structure and responsibilities that produce the experience.

</details>


---

<a id="project-scope-and-limitations"></a>

<details open>
<summary><h2><strong>Project Scope and Limitations 📌</strong></h2></summary>

The current deployment is a static browser experience. It can run branching story logic, maintain client-side state during use, render scene artwork, validate local inputs, and display multiple routes without a backend.

A static GitHub Pages deployment does not by itself provide shared cloud saves, user accounts, server databases, cross-device synchronization, or multiplayer state. Any future feature requiring those capabilities would need an appropriate backend or external service.

</details>


---

<a id="possible-future-enhancements"></a>

<details open>
<summary><h2><strong>Possible Future Enhancements 💡</strong></h2></summary>

* Add dedicated verified repository screenshots separate from story artwork
* Expand the story with additional branches, riddles, inventory items, and endings
* Add optional local persistence for resumable play across browser sessions
* Add route/ending statistics without exposing spoilers during the first playthrough
* Add automated tests for story transitions and invalid/unreachable states
* Add a reduced-motion mode for atmospheric animation beyond the browser preference handling already expected of the interface

</details>


---

<a id="contributing"></a>

<details open>
<summary><h2><strong>Contributing 🤝</strong></h2></summary>

Contributions and practical improvement suggestions are welcome when they preserve the project’s branching-story structure, atmospheric design, and separation between content, state, and presentation.

</details>

<a id="reporting-issues"></a>

<details open>
<summary><h3><strong>Reporting Issues 🐛</strong></h3></summary>

Include the scene or route involved, the choice made, what you expected to happen, what happened instead, and browser/device information when relevant. Screenshots are especially useful for layout or scene-art problems.

</details>

<a id="requesting-additions"></a>

<details open>
<summary><h3><strong>Requesting Additions 📝</strong></h3></summary>

Feature requests should explain how the addition improves the interactive story, replayability, accessibility, or maintainability rather than adding unrelated application features.

</details>


---

<a id="license"></a>

<details open>
<summary><h2><strong>License 📜</strong></h2></summary>

No license terms are assumed. If a `LICENSE` file is added to the repository, that file controls reuse. Otherwise normal copyright applies.

</details>


---

<a id="important-links"></a>

<details open>
<summary><h2><strong>Important Links 🔗</strong></h2></summary>

* **Live Project:** [https://apursley2012.github.io/the-beach-mystery/](https://apursley2012.github.io/the-beach-mystery/)
* **Repository:** [https://github.com/apursley2012/the-beach-mystery](https://github.com/apursley2012/the-beach-mystery)

</details>


---

<a id="attribution"></a>

<details open>
<summary><h2><strong>Attribution ℹ️</strong></h2></summary>


Project documentation and original project materials are credited to their respective sources where applicable.

</details>

---

<div align=center>
   
***Made with ❤️ and a bit of 🪄.***
<br>
**©️ 2026 Alysha Pursley. All Rights Reserved.**

</div>
