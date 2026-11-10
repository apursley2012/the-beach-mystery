/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Explains browser-local storage and external fonts, and provides   |
  |          controls for clearing saved game data.                            |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useState } from "../lib/react.js";
import { PageHeader } from "../components/PageHeader.js";
import { clearGameData } from "../services/gameStorage.js";
export function PrivacyPage() {
    const [clearMessage, setClearMessage] = useState("");
    const clearStoredProgress = () => {
        if (
            !window.confirm(
                "Delete this browser's saved game and discovered endings? This cannot be undone.",
            )
        )
            return;
        setClearMessage(
            clearGameData()
                ? "Saved game and discovered endings were cleared from this browser."
                : "Some stored data could not be cleared. You can remove this site's data in your browser settings.",
        );
    };
    return _jsx("div", {
        className: "legal-page",
        children: _jsxs("div", {
            className: "container legal-page__inner",
            children: [
                _jsx(PageHeader, {
                    classPrefix: "legal-page",
                    badgeIcon: "🔒",
                    badge: "Privacy",
                    title: "Privacy Information",
                    subtitle:
                        "What this static story stores and what it does not collect.",
                }),
                _jsxs("section", {
                    className: "legal-page__content",
                    children: [
                        _jsx("h2", { children: "Browser-local game data" }),
                        _jsx("p", {
                            children:
                                "When you choose Save Progress, The Beach Mystery stores your game state, including your answers to the opening questions, in this browser's localStorage. Discovered endings are stored automatically. This data is not transmitted to a project server, but anyone using the same browser profile may be able to access it.",
                        }),
                        _jsx("h2", {
                            children: "Accounts, analytics, and cookies",
                        }),
                        _jsx("p", {
                            children:
                                "This static version does not provide user accounts, advertising, analytics tracking, payment processing, or project-set cookies.",
                        }),
                        _jsx("h2", { children: "Fonts" }),
                        _jsx("p", {
                            children:
                                "The interface requests its display fonts from Google Fonts. Your browser connects to Google's font service to retrieve those files, so that request is governed by Google's own privacy practices.",
                        }),
                        _jsx("h2", { children: "Clearing saved data" }),
                        _jsx("p", {
                            children:
                                "You can delete both your saved game and discovered endings using the button below, or by clearing this site's data in your browser settings. Restarting the story resets the active game but does not erase previously discovered endings.",
                        }),
                        _jsx("button", {
                            type: "button",
                            className: "btn btn--light",
                            onClick: clearStoredProgress,
                            children: "Clear Saved Game and Endings",
                        }),
                        _jsx("p", {
                            role: "status",
                            "aria-live": "polite",
                            children: clearMessage,
                        }),
                    ],
                }),
            ],
        }),
    });
}
