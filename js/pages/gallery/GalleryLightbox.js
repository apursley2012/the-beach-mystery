/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Gallery UI component                                   |
  | Purpose: Owns the reusable lightbox structure and close interactions for a |
  |          selected scene.                                                   |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { useEffect, useRef } from "../../lib/react.js";
import { SceneArt } from "../../components/SceneArt.js";
export function GalleryLightbox({ scene, onClose }) {
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    useEffect(() => {
        if (!scene) return undefined;
        previousFocusRef.current = document.activeElement;
        closeButtonRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            // The close control is the dialog's only interactive element, so keep Tab inside the modal.
            if (event.key === "Tab") {
                event.preventDefault();
                closeButtonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocusRef.current?.focus?.();
        };
    }, [scene, onClose]);
    if (!scene) return null;
    return _jsx("div", {
        className: "gallery-lightbox animate-fade",
        onClick: onClose,
        role: "presentation",
        children: _jsxs("div", {
            className: "gallery-lightbox__content animate-scale",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "gallery-lightbox-title",
            "aria-describedby": "gallery-lightbox-description",
            onClick: (event) => event.stopPropagation(),
            children: [
                _jsx("button", {
                    type: "button",
                    ref: closeButtonRef,
                    className: "gallery-lightbox__close",
                    onClick: onClose,
                    "aria-label": "Close gallery image",
                    children: "✕",
                }),
                _jsx("div", {
                    className: "gallery-lightbox__art",
                    children: _jsx(SceneArt, {
                        scene: scene.scene,
                        size: "large",
                    }),
                }),
                _jsx("h2", {
                    id: "gallery-lightbox-title",
                    className: "gallery-lightbox__title",
                    children: scene.title,
                }),
                _jsx("p", {
                    id: "gallery-lightbox-description",
                    className: "gallery-lightbox__desc",
                    children: scene.description,
                }),
            ],
        }),
    });
}
