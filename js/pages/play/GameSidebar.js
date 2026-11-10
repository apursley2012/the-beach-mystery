/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story UI component                                     |
  | Purpose: Owns inventory, path history, save feedback, and restart controls |
  |          shown beside the active story.                                    |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { useEffect, useState } from "../../lib/react.js";
export function GameSidebar({ gameState, onSave, onRestart }) {
    const [saveMessage, setSaveMessage] = useState("");
    // Once the player advances, the previous save confirmation is no longer current.
    useEffect(() => {
        setSaveMessage("");
    }, [gameState.currentNode]);
    const saveProgress = () => {
        const saved = onSave();
        setSaveMessage(
            saved === false
                ? "Progress could not be saved in this browser."
                : "Progress saved.",
        );
    };
    const confirmRestart = () => {
        if (
            window.confirm(
                "Restart the adventure? Your current unsaved progress will be lost.",
            )
        ) {
            onRestart();
        }
    };
    return _jsxs("aside", {
        className: "play__sidebar",
        children: [
            _jsxs("div", {
                className: "play__inventory",
                children: [
                    _jsx("h3", {
                        className: "play__sidebar-title",
                        children: "Inventory",
                    }),
                    _jsxs("div", {
                        className: "play__inventory-items",
                        children: [
                            _jsxs("div", {
                                className: `play__inventory-item ${gameState.state.hasJewel ? "play__inventory-item--active" : ""}`,
                                children: [
                                    _jsx("span", {
                                        className: "play__inventory-icon",
                                        "aria-hidden": "true",
                                        children: "💎",
                                    }),
                                    _jsx("span", {
                                        className: "play__inventory-label",
                                        children:
                                            gameState.variables.favoriteJewel ||
                                            "Jewel",
                                    }),
                                    !gameState.state.hasJewel &&
                                        _jsx("span", {
                                            className: "play__inventory-locked",
                                            children: "?",
                                        }),
                                ],
                            }),
                            _jsxs("div", {
                                className: `play__inventory-item ${gameState.state.hasMap ? "play__inventory-item--active" : ""}`,
                                children: [
                                    _jsx("span", {
                                        className: "play__inventory-icon",
                                        "aria-hidden": "true",
                                        children: "🗺️",
                                    }),
                                    _jsx("span", {
                                        className: "play__inventory-label",
                                        children: "Treasure Map",
                                    }),
                                    !gameState.state.hasMap &&
                                        _jsx("span", {
                                            className: "play__inventory-locked",
                                            children: "?",
                                        }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs("div", {
                className: "play__progress-tracker",
                children: [
                    _jsx("h3", {
                        className: "play__sidebar-title",
                        children: "Your Path",
                    }),
                    gameState.history.length === 0
                        ? _jsx("p", {
                              className: "play__path-empty",
                              children: "Your choices will appear here.",
                          })
                        : _jsx("ol", {
                              className: "play__path-list",
                              children: gameState.history.map(
                                  (historyItem, index) =>
                                      _jsxs(
                                          "li",
                                          {
                                              className:
                                                  "play__path-item animate-fade",
                                              children: [
                                                  _jsx("span", {
                                                      className:
                                                          "play__path-check",
                                                      "aria-hidden": "true",
                                                      children: "✓",
                                                  }),
                                                  _jsx("span", {
                                                      className:
                                                          "play__path-text",
                                                      children:
                                                          historyItem.choice,
                                                  }),
                                              ],
                                          },
                                          `${historyItem.nodeId}-${index}`,
                                      ),
                              ),
                          }),
                ],
            }),
            _jsxs("div", {
                className: "play__sidebar-actions",
                children: [
                    _jsx("button", {
                        type: "button",
                        className: "play__save-btn",
                        onClick: saveProgress,
                        children: "💾 Save Progress",
                    }),
                    _jsx("p", {
                        className: "play__save-status",
                        role: "status",
                        "aria-live": "polite",
                        children: saveMessage,
                    }),
                    _jsx("button", {
                        type: "button",
                        className: "play__restart-btn",
                        onClick: confirmRestart,
                        children: "↻ Restart",
                    }),
                ],
            }),
        ],
    });
}
