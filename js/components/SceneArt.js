/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Shared UI component                                    |
  | Purpose: Renders scene artwork, accessible alternative text, and the       |
  |          image-fallback behavior used across story views.                  |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useEffect, useState } from "../lib/react.js";
import { getSceneImage } from "../data/sceneImages.js";
export function SceneArt({
    scene,
    size = "large",
    decorative = false,
    priority = false,
}) {
    const [hasError, setHasError] = useState(false);
    const image = getSceneImage(scene);
    // Reset fallback state when navigating to a different scene.
    useEffect(() => {
        setHasError(false);
    }, [scene]);
    return _jsxs("div", {
        className: `scene-art scene-art--${scene} scene-art--${size}`,
        "aria-hidden": decorative || undefined,
        children: [
            !hasError
                ? _jsx("img", {
                      src: image.src,
                      alt: decorative ? "" : image.alt,
                      className: "scene-art__img",
                      width: 1448,
                      height: 1086,
                      loading: priority ? "eager" : "lazy",
                      fetchPriority: priority ? "high" : "auto",
                      decoding: "async",
                      onError: () => setHasError(true),
                  })
                : _jsx("div", {
                      className: "scene-art__fallback",
                      role: decorative ? undefined : "img",
                      "aria-label": decorative ? undefined : image.alt,
                      children: _jsx("span", {
                          className: "scene-art__fallback-icon",
                          children: "\uD83C\uDFD6\uFE0F",
                      }),
                  }),
            _jsx("div", {
                className: `scene-art__overlay scene-art__overlay--${scene}`,
                "aria-hidden": "true",
            }),
        ],
    });
}
