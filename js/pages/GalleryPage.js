/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Coordinates gallery state while reusable cards and lightbox       |
  |          presentation live in focused components.                          |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useState } from "../lib/react.js";
import { GalleryCard } from "./gallery/GalleryCard.js";
import { GalleryLightbox } from "./gallery/GalleryLightbox.js";
import { PageHeader } from "../components/PageHeader.js";
import { GALLERY_SCENES } from "../data/story.js";
export function GalleryPage() {
    const [selectedScene, setSelectedScene] = useState(null);
    return _jsx("div", {
        className: "gallery-page",
        children: _jsxs("div", {
            className: "container",
            children: [
                _jsx(PageHeader, {
                    classPrefix: "gallery-page",
                    badgeIcon: "🖼️",
                    badge: "Scene Gallery",
                    title: "The Visual Story",
                    subtitle:
                        "Each scene from the adventure, illustrated with story artwork and subtle interface animation.",
                }),
                _jsx("div", {
                    className: "gallery-page__grid",
                    children: GALLERY_SCENES.map((scene, index) =>
                        _jsx(
                            GalleryCard,
                            {
                                scene,
                                index,
                                onSelect: setSelectedScene,
                            },
                            scene.id,
                        ),
                    ),
                }),
                _jsx(GalleryLightbox, {
                    scene: selectedScene,
                    onClose: () => setSelectedScene(null),
                }),
            ],
        }),
    });
}
