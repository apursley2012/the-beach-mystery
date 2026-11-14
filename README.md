<!--

File: README.md

Document Title: The Beach Mystery

Author: Alysha Pursley

Date: August 2026

-->

<div align="center">

<img src="./assets/icons/icon-512.png" alt="The Beach Mystery Logo" width="75%" height=“auto”>

<h1>The Beach Mystery 🏝️</h1>

<p><a href="https://github.com/apursley2012/the-beach-mystery/stargazers"><img src="https://img.shields.io/github/stars/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Stars" alt="Stars"></a> <a href="https://github.com/apursley2012/the-beach-mystery/forks"><img src="https://img.shields.io/github/forks/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Forks" alt="Forks"></a> <a href="https://github.com/apursley2012/the-beach-mystery/issues"><img src="https://img.shields.io/github/issues/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Issues" alt="Issues"></a> <a href="https://github.com/apursley2012/the-beach-mystery/commits"><img src="https://img.shields.io/github/last-commit/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=git&amp;label=Last%20Commit" alt="Last Commit"></a> <a href="https://github.com/apursley2012/the-beach-mystery"><img src="https://img.shields.io/github/repo-size/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Repo%20Size" alt="Repo Size"></a> <a href="https://github.com/apursley2012/the-beach-mystery"><img src="https://img.shields.io/github/languages/top/apursley2012/the-beach-mystery?style=for-the-badge&amp;label=Top%20Language" alt="Top Language"></a> <a href="https://github.com/apursley2012/the-beach-mystery"><img src="https://img.shields.io/github/languages/count/apursley2012/the-beach-mystery?style=for-the-badge&amp;label=Languages" alt="Languages"></a> <a href="https://github.com/apursley2012/the-beach-mystery/graphs/contributors"><img src="https://img.shields.io/github/contributors/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=github&amp;label=Contributors" alt="Contributors"></a> <a href="https://github.com/apursley2012/the-beach-mystery/graphs/commit-activity"><img src="https://img.shields.io/github/commit-activity/m/apursley2012/the-beach-mystery?style=for-the-badge&amp;logo=git&amp;label=Monthly%20Commits" alt="Monthly Commits"></a></p>

<p> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="HTML5"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="CSS3"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=black" alt="JavaScript"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" alt="React"></p>

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

The experience also includes more than simple previous/next navigation. The play interface includes a title screen, instructions, player questions, progress indicators, inventory, a path tracker, save/restart controls, story text, branching choice buttons, riddles, hints, endings, feature cards, preview content, and additional article/blog-style presentation areas. The result is a complete interactive narrative site with a consistent visual system rather than a single branching-code exercise.

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

The design combines a literary beach-adventure mood with a polished interactive-game interface. The opening screen uses a deep-blue-to-light-sky gradient, five animated ocean-wave layers, twinkling white accents, bright title text, and a warm accent treatment for the emphasized title line. Cormorant Garamond gives story headings and narrative text a book-like quality, Outfit keeps interface copy readable, and JetBrains Mono is available for technical or code-like details.

Once the player enters the story, the interface shifts toward warm off-white cards, neutral borders, coral emphasis, ocean-blue status colors, and restrained shadows. This keeps long passages readable while still making choices, progress, inventory, riddles, and actions visually distinct.

The layout also changes according to the task. Story play uses a sidebar beside the main narrative on larger screens, while cards, feature grids, preview sections, and button groups adapt at smaller widths.

</details>

<a id="main-color-palette"></a>

<details open>

<summary><h3><strong>Main Color Palette 🌈</strong></h3></summary>

The current `styles/shared.css` defines Sky, Ocean, Sand, Coral, Teal, Neutral, Success, Warning, and Error color scales, alongside gold and amber accents. The table below lists every defined color token and the role it has in the design system. Where the current stylesheet uses only part of a scale directly, the remaining values are still intentionally available as neighboring shades for consistent hover, border, background, and future component states.

| Hex | Color Token / Name | Complete Use in the Interface |
| --- | --- | --- |
| `#E5F5FD` | Sky 50 | sky palette shade available through `--sky-50` for consistent styling |
| `#BAE5F9` | Sky 100 | sky palette shade available through `--sky-100` for consistent styling |
| `#8FD5F5` | Sky 200 | sky palette shade available through `--sky-200` for consistent styling |
| `#64C5F1` | Sky 300 | sky palette shade available through `--sky-300` for consistent styling |
| `#39B5ED` | Sky 400 | `--primary-bright`; bright blue for primary accents |
| `#0EA5E9` | Sky 500 | `--primary`; primary links and actions |
| `#0C8EC8` | Sky 600 | sky palette shade available through `--sky-600` for consistent styling |
| `#0A77A8` | Sky 700 | sky palette shade available through `--sky-700` for consistent styling |
| `#085F87` | Sky 800 | Top stop of the landing-page ocean-sky gradient |
| `#064867` | Sky 900 | sky palette shade available through `--sky-900` for consistent styling |
| `#043146` | Sky 950 | sky palette shade available through `--sky-950` for consistent styling |
| `#DCF0F4` | Ocean 50 | ocean palette shade available through `--ocean-50` for consistent styling |
| `#B0D9E0` | Ocean 100 | ocean palette shade available through `--ocean-100` for consistent styling |
| `#84C1CD` | Ocean 200 | Fifth animated wave layer on the home page |
| `#59AAB9` | Ocean 300 | Third animated wave layer |
| `#2D92A6` | Ocean 400 | Fourth animated wave layer |
| `#017B92` | Ocean 500 | First animated wave layer |
| `#016C80` | Ocean 600 | Second animated wave layer |
| `#015D6F` | Ocean 700 | ocean palette shade available through `--ocean-700` for consistent styling |
| `#014F5D` | Ocean 800 | ocean palette shade available through `--ocean-800` for consistent styling |
| `#01404C` | Ocean 900 | ocean palette shade available through `--ocean-900` for consistent styling |
| `#01313A` | Ocean 950 | ocean palette shade available through `--ocean-950` for consistent styling |
| `#FEF9F5` | Sand 50 | sand palette shade available through `--sand-50` for consistent styling |
| `#FDEFE4` | Sand 100 | sand palette shade available through `--sand-100` for consistent styling |
| `#FBE4D3` | Sand 200 | sand palette shade available through `--sand-200` for consistent styling |
| `#FADAC1` | Sand 300 | sand palette shade available through `--sand-300` for consistent styling |
| `#F8CFB0` | Sand 400 | `--highlight`; warm highlight color |
| `#F7C59F` | Sand 500 | sand palette shade available through `--sand-500` for consistent styling |
| `#D4A989` | Sand 600 | `--highlight-deep`; deeper sand accent |
| `#B28E72` | Sand 700 | sand palette shade available through `--sand-700` for consistent styling |
| `#8F725C` | Sand 800 | sand palette shade available through `--sand-800` for consistent styling |
| `#6D5745` | Sand 900 | sand palette shade available through `--sand-900` for consistent styling |
| `#4A3B2F` | Sand 950 | sand palette shade available through `--sand-950` for consistent styling |
| `#FEF2F1` | Coral 50 | coral palette shade available through `--coral-50` for consistent styling |
| `#FDDCD9` | Coral 100 | coral palette shade available through `--coral-100` for consistent styling |
| `#FCC6C1` | Coral 200 | coral palette shade available through `--coral-200` for consistent styling |
| `#FAAFA9` | Coral 300 | Text-selection background |
| `#F99991` | Coral 400 | coral palette shade available through `--coral-400` for consistent styling |
| `#F88379` | Coral 500 | coral palette shade available through `--coral-500` for consistent styling |
| `#D57168` | Coral 600 | `--accent`; main coral accent |
| `#B25F57` | Coral 700 | `--accent-bright`; primary button gradient start |
| `#904C46` | Coral 800 | `--accent-deep`; primary button gradient end |
| `#6D3A35` | Coral 900 | coral palette shade available through `--coral-900` for consistent styling |
| `#4A2824` | Coral 950 | coral palette shade available through `--coral-950` for consistent styling |
| `#DCF4F2` | Teal 50 | teal palette shade available through `--teal-50` for consistent styling |
| `#B0E1DC` | Teal 100 | teal palette shade available through `--teal-100` for consistent styling |
| `#85CDC7` | Teal 200 | teal palette shade available through `--teal-200` for consistent styling |
| `#59BAB1` | Teal 300 | teal palette shade available through `--teal-300` for consistent styling |
| `#2EA69C` | Teal 400 | teal palette shade available through `--teal-400` for consistent styling |
| `#029386` | Teal 500 | teal palette shade available through `--teal-500` for consistent styling |
| `#027E73` | Teal 600 | teal palette shade available through `--teal-600` for consistent styling |
| `#016A61` | Teal 700 | teal palette shade available through `--teal-700` for consistent styling |
| `#01554E` | Teal 800 | teal palette shade available through `--teal-800` for consistent styling |
| `#00413C` | Teal 900 | teal palette shade available through `--teal-900` for consistent styling |
| `#002C29` | Teal 950 | teal palette shade available through `--teal-950` for consistent styling |
| `#FFFFFF` | Neutral 0 / White | `--bg-card` and `--bg-elevated`; white card and elevated surfaces |
| `#FAFAFA` | Neutral 50 | `--bg` and `--text-on-dark`; main page background and light text on dark surfaces |
| `#F5F5F5` | Neutral 100 | neutral palette shade available through `--neutral-100` for consistent styling |
| `#E5E5E5` | Neutral 200 | neutral palette shade available through `--neutral-200` for consistent styling |
| `#D4D4D4` | Neutral 300 | `--text-muted-on-dark`; muted light text |
| `#A3A3A3` | Neutral 400 | neutral palette shade available through `--neutral-400` for consistent styling |
| `#737373` | Neutral 500 | neutral palette shade available through `--neutral-500` for consistent styling |
| `#525252` | Neutral 600 | `--text-muted`; secondary text |
| `#404040` | Neutral 700 | neutral palette shade available through `--neutral-700` for consistent styling |
| `#262626` | Neutral 800 | `--text`; main body text |
| `#171717` | Neutral 900 | `--bg-dark` and `--text-bright`; dark surfaces and strong text |
| `#0A0A0A` | Neutral 950 | neutral palette shade available through `--neutral-950` for consistent styling |
| `#4ADE80` | Success 400 | Light success green |
| `#22C55E` | Success 500 | Success and completion indicator |
| `#15803D` | Success 600 | Dark success green |
| `#FBBF24` | Warning 400 | Light warning yellow |
| `#F59E0B` | Warning 500 | Warning and hint color |
| `#F87171` | Error 400 | Light error red |
| `#EF4444` | Error 500 | Error and invalid-input feedback |
| `#FFD700` | Gold | `--gold`; gold accent token |
| `#FFC30B` | Honey Gold 500 | `--honey-gold-500`; honey-gold accent |
| `#FFC30B80` | Soft Honey Gold | `--gold-500-soft`; translucent honey-gold accent |
| `#FFBF00` | Amber 500 | `--amber-500`; amber accent |
| `#FFBF0080` | Soft Amber | `--amber-500-soft`; translucent amber accent |

The stylesheet then maps those raw colors into semantic tokens: `--bg`, `--bg-elevated`, `--bg-card`, `--bg-dark`, `--text`, `--text-muted`, `--text-bright`, `--text-on-dark`, `--text-muted-on-dark`, `--accent`, `--accent-bright`, `--accent-deep`, `--primary`, `--primary-bright`, `--highlight`, and `--highlight-deep`, along with gold and amber accent tokens. This lets the same raw color serve a consistent interface job instead of being assigned differently in every component.

</details>

<a id="preview-screenshots"></a>

<details open>

<summary><h3><strong>Preview Screenshots 🖼️</strong></h3></summary>

The repository includes `assets/story-art/` illustrations and an interactive Gallery page for viewing the story scenes. Story illustrations are not screenshots of the running interface.

The live project is the reference for the actual interface; dedicated interface screenshots are not listed here.

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

* Functional local-browser save, resume, and restart controls

* Riddle interactions with input validation and hints

* Four endings, seven story routes, and locally tracked ending achievements

* Responsive feature-card and preview sections, gallery with lightbox, endings tracker, case study, and project journal

* Sticky story sidebar on larger screens

* Reusable navigation, footer, and scene-art components

* Separate game-state hook to keep progression logic out of presentation components

</details>

---

<a id="tech-stack"></a>

<details open>

<summary><h2><strong>Tech Stack 🛠️</strong></h2></summary>

* **JavaScript**

* **React / JSX runtime architecture** using browser-ready JavaScript modules

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

The repository contains browser-ready JavaScript modules and CSS referenced by the individual HTML page entries. The published version does not require a backend server to play the story.

</details>

<a id="local-use"></a>

<details open>

<summary><h3><strong>Local Use 💻</strong></h3></summary>

1. Clone or download the repository.

2. Preserve the existing `assets/`, `js/`, `styles/`, and `pages/` paths.

3. Serve the repository root using a local HTTP server and open `index.html` in a modern browser. JavaScript ES modules should not be loaded directly through a `file://` URL.

4. Test start, instructions, questions, branching choices, riddles, inventory/progress behavior, restart/save behavior, endings, navigation, and responsive layouts after changes.

</details>

<a id="github-pages-deployment"></a>

<details open>

<summary><h3><strong>GitHub Pages Deployment 🌐</strong></h3></summary>

The root `index.html` and the HTML entries under `pages/` use relative JavaScript and stylesheet paths, so the current static site is structured for GitHub Pages. Publish from **Settings → Pages → Deploy from a branch → main → / (root)** while keeping the compiled assets and supporting modules at their current relative locations.

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

The current project provides separate HTML entry pages with a shared React application shell. The following routes and game areas serve distinct purposes:

| Area | Purpose |
| --- | --- |
| Home / Start | Introduces the mystery, animated ocean backdrop, features, and entry point to the game |
| Play | Runs the title screen, instructions, personalized questions, story, choices, riddles, inventory, and save/restart controls |
| Endings | Shows the four possible endings and locally recorded discovery progress |
| Gallery | Displays story-scene illustrations with a selectable lightbox |
| About | Explains the project and its interactive-fiction concept |
| Case Study | Documents the project's design and development decisions |
| Journal / Blog | Presents articles about the design and engineering of the adventure |
| Privacy | Describes browser-stored information and external services |
| Terms | Presents the site's terms of use |
| Accessibility | Explains accessibility considerations for the site |
| Not Found / 404 | Provides a branded fallback for unsupported routes |
| Story Sidebar | Shows current inventory, path history, and game controls during play |
| Choice and Riddle Areas | Handles branching decisions, puzzle answers, hints, and validation |
</details>

<a id="core-files-and-architecture"></a>

<details open>

<summary><h3><strong>Core Files and Architecture 🧩</strong></h3></summary>

The shared application starts in `js/main.js`, which mounts `js/App.js` into the page's `#root` element. `js/App.js` owns the routes and composes the reusable `js/components/Nav.js`, `Footer.js`, and `SkipLink.js` around the page content.

`js/data/story.js` defines story nodes, personalization questions, riddles, route summaries, and endings. `js/data/sceneImages.js` maps those scenes to images and alternative text. `js/hooks/useGameState.js` manages progression, inventory, achievements, and save/load coordination; `js/services/gameStorage.js` handles browser storage and validation. `js/pages/PlayPage.js` coordinates the playable experience with focused components for questions, choices, riddles, the sidebar, and endings.

`styles/shared.css` contains the design tokens and shared presentation rules, while `styles/pages/` holds route-specific CSS. Each static HTML entry references the shared stylesheet, its own page stylesheet, and `js/main.js`. `assets/story-art/` contains scene illustrations, and `assets/icons/` contains branding and app icons.
</details>

<a id="file-and-folder-structure"></a>

<details open>

<summary><h3><strong>File and Folder Structure 🌳</strong></h3></summary>

```text
the-beach-mystery/
├── README.md
├── THIRD_PARTY_NOTICES.md
├── index.html
├── manifest.webmanifest
├── assets/
│   ├── icons/                  # Favicons, app icons, and social preview
│   └── story-art/              # Illustrated scenes used by the story/gallery
├── pages/                      # HTML entries for the site's routes
├── js/
│   ├── main.js                 # Mounts the React application
│   ├── App.js                  # Shared shell and route definitions
│   ├── components/             # Navigation, footer, artwork, shared UI
│   ├── data/
│   │   ├── sceneImages.js      # Scene artwork and alternative text
│   │   └── story.js            # Story nodes, questions, routes, endings
│   ├── hooks/
│   │   ├── useGameState.js     # Progression, achievements, save/load
│   │   └── useStoryNarration.js # Narration pacing
│   ├── pages/                  # Route views and feature subcomponents
│   ├── services/
│   │   └── gameStorage.js      # Browser persistence and save validation
│   ├── utils/                  # Story-text helpers
│   └── lib/                    # Browser-ready runtime dependencies
└── styles/
    ├── shared.css              # Shared tokens, layout, and controls
    └── pages/                  # Page-specific presentation rules
```

The tree summarizes the verified application structure and key files rather than listing every asset and page-specific module.

</details>

---

<a id="story-and-game-state-architecture"></a>

<details open>

<summary><h2><strong>Story and Game-State Architecture 🎮</strong></h2></summary>

The most important architectural decision is the separation of **story data**, **scene art**, **state**, and **rendering**. `js/data/story.js` can describe the narrative and branches. `js/data/sceneImages.js` maps scenes to visuals. `js/hooks/useGameState.js` owns progression and state-oriented behavior. `js/components/SceneArt.js` renders the visual for the active scene. The main application composes those pieces into the playable interface.

The route-specific styles reflect that same separation in the UI. Inventory, path tracking, choices, riddles, errors, hints, and endings each have their own component-level classes and states. That makes it possible to change how a riddle looks without changing story data, or add a scene without rewriting the shared navigation.

This architecture also supports replayability. Because story progression is state-driven, restart and local save/load behavior operate on game state without requiring a separate HTML page for each scene.

The color system is deliberately broader than a handful of one-off hex values. Sky, Ocean, Sand, Coral, Teal, Neutral, Success, Warning, and Error provide scales so nearby shades are available for base states, hover states, low-contrast surfaces, borders, and stronger emphasis.

Semantic aliases then convert those raw scales into interface jobs. For example, Coral 600 is not simply “orange-red”; it is the application accent used for choice emphasis, headings, focus borders, active progress, and multiple tinted interactive backgrounds. Sky 500 is the primary blue. Neutral 50 is the page background. Neutral 0 is the card/elevated surface. Neutral 800 is body text, and Neutral 900 is the strongest text/dark-background tone.

That two-layer system is useful because visual changes can be made centrally. A future redesign can adjust the semantic aliases while preserving the components that refer to `--accent`, `--primary`, `--bg-card`, or `--text-muted`.

</details>

---

<a id="customization-guide"></a>

<details open>

<summary><h2><strong>Customization Guide 🎨</strong></h2></summary>

Story changes should begin in the story/data layer instead of by duplicating presentation components. Add or modify scene content in `js/data/story.js`, update `js/data/sceneImages.js` when a scene needs different art, and preserve the existing state transitions expected by `useGameState.js`.

Visual changes belong in the CSS token system first. Update a raw scale or semantic alias rather than scattering new hard-coded colors across components. Recheck the opening gradient, card contrast, choice hover/focus states, riddle states, error/warning/success colors, and mobile layouts whenever the palette changes.

Reusable navigation, footer, and scene-art behavior should stay in their existing components so a story-content change does not create several slightly different copies of the same UI.

</details>

---

<a id="accessibility-and-browser-compatibility"></a>

<details open>

<summary><h2><strong>Accessibility and Browser Compatibility ♿</strong></h2></summary>

Interactive choices, form inputs, riddle controls, save/restart actions, and navigation should remain reachable by keyboard with visible focus states. Story artwork should have meaningful text alternatives where it conveys narrative information. Error, success, and progress states should not rely on color alone.

The CSS uses responsive grids, flexible wrapping, and breakpoint-specific layouts so major sections can collapse on smaller screens. The static ES-module build targets modern Safari, Chrome, Firefox, and Edge.

</details>

---

<a id="repository-relationship"></a>

<details open>

<summary><h2><strong>Repository Relationship 🔗</strong></h2></summary>

The story data, game-state hook, scene artwork, reusable components, browser-ready modules, and GitHub Pages presentation are parts of one project. The browser-ready modules under `js/`, page entry points under `pages/`, shared and page-specific styles under `styles/`, and illustrations under `assets/` together produce the published experience.

</details>

---

<a id="project-scope-and-limitations"></a>

<details open>

<summary><h2><strong>Project Scope and Limitations 📌</strong></h2></summary>

The current deployment is a static browser experience. It runs branching story logic, maintains client-side state, stores saved games and ending achievements in browser storage, renders scene artwork, validates local inputs, and displays multiple routes without a backend.

A static GitHub Pages deployment does not by itself provide shared cloud saves, user accounts, server databases, cross-device synchronization, or multiplayer state. Any future feature requiring those capabilities would need an appropriate backend or external service.

</details>

---

<a id="possible-future-enhancements"></a>

<details open>

<summary><h2><strong>Possible Future Enhancements 💡</strong></h2></summary>

* Add dedicated verified repository screenshots separate from story artwork

* Expand the story with additional branches, riddles, inventory items, and endings

* Extend the existing local save system with multiple named save slots

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

The repository includes `THIRD_PARTY_NOTICES.md` for bundled software and externally loaded fonts. No root `LICENSE` file was found during this review; third-party licenses do not automatically license the original project materials.

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

Original project materials are credited to Alysha Pursley. Third-party software and externally hosted fonts are identified with their licenses and upstream sources in `THIRD_PARTY_NOTICES.md`.

</details>

---

<div align=center>

   

***Made with ❤️ and a bit of 🪄.***

<br>

**©️ 2026 Alysha Pursley. All Rights Reserved.**

</div>
