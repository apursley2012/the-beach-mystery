/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Owns the repeated linked feature-card structure used on the home  |
  |          page.                                                             |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../../lib/jsx-runtime.js";
import { Link } from "../../lib/router.js";
import { SceneArt } from "../../components/SceneArt.js";
export function FeatureCard({ to, scene, title, delay, children }) {
    return _jsxs(Link, {
        to,
        className: `feature-card animate-fade-up ${delay}`,
        children: [
            _jsx("div", {
                className: "feature-card__art",
                children: _jsx(SceneArt, {
                    scene,
                    size: "small",
                    decorative: true,
                }),
            }),
            _jsx("h3", { children: title }),
            _jsx("p", { children }),
        ],
    });
}
