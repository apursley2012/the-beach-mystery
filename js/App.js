/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Application shell                                      |
  | Purpose: Composes the shared navigation/footer around the browser routes so |
  |          route ownership stays centralized.                                |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "./lib/jsx-runtime.js";
import { Route, Routes } from "./lib/router.js";
import { Nav } from "./components/Nav.js";
import { SkipLink } from "./components/SkipLink.js";
import { Footer } from "./components/Footer.js";
import { AboutPage } from "./pages/AboutPage.js";
import { BlogPage } from "./pages/BlogPage.js";
import { CaseStudyPage } from "./pages/CaseStudyPage.js";
import { EndingsPage } from "./pages/EndingsPage.js";
import { GalleryPage } from "./pages/GalleryPage.js";
import { HomePage } from "./pages/HomePage.js";
import { PlayPage } from "./pages/PlayPage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { PrivacyPage } from "./pages/PrivacyPage.js";
import { TermsPage } from "./pages/TermsPage.js";
import { AccessibilityPage } from "./pages/AccessibilityPage.js";
export function App() {
    return _jsxs("div", {
        className: "app",
        children: [
            _jsx(SkipLink, {}),
            _jsx(Nav, {}),
            _jsx("main", {
                id: "main-content",
                className: "app__main",
                tabIndex: -1,
                children: _jsxs(Routes, {
                    children: [
                        _jsx(Route, {
                            path: "/",
                            element: _jsx(HomePage, {}),
                        }),
                        _jsx(Route, {
                            path: "/play",
                            element: _jsx(PlayPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/endings",
                            element: _jsx(EndingsPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/gallery",
                            element: _jsx(GalleryPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/about",
                            element: _jsx(AboutPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/case-study",
                            element: _jsx(CaseStudyPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/blog",
                            element: _jsx(BlogPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/privacy",
                            element: _jsx(PrivacyPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/terms",
                            element: _jsx(TermsPage, {}),
                        }),
                        _jsx(Route, {
                            path: "/accessibility",
                            element: _jsx(AccessibilityPage, {}),
                        }),
                        _jsx(Route, {
                            path: "*",
                            element: _jsx(NotFoundPage, {}),
                        }),
                    ],
                }),
            }),
            _jsx(Footer, {}),
        ],
    });
}
