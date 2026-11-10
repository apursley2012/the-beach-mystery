/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Gallery UI component                                   |
  | Purpose: Owns the repeated scene-preview card structure used by the gallery |
  |          grid.                                                             |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { SceneArt } from "../../components/SceneArt.js";
export function GalleryCard({ scene, index, onSelect }) {
    return _jsxs(
        "button",
        {
            type: "button",
            className: "gallery-card animate-fade-up",
            "aria-label": `View ${scene.title} artwork`,
            style: { animationDelay: `${0.05 * index}s` },
            onClick: () => onSelect(scene),
            children: [
                _jsx("div", {
                    className: "gallery-card__art",
                    children: _jsx(SceneArt, {
                        scene: scene.scene,
                        size: "large",
                    }),
                }),
                _jsxs("div", {
                    className: "gallery-card__overlay",
                    children: [
                        _jsx("h3", {
                            className: "gallery-card__title",
                            children: scene.title,
                        }),
                        _jsx("p", {
                            className: "gallery-card__desc",
                            children: scene.description,
                        }),
                        _jsx("span", {
                            className: "gallery-card__view",
                            children: "View →",
                        }),
                    ],
                }),
            ],
        },
        scene.id,
    );
}
