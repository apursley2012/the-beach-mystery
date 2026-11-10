/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Shared UI component                                    |
  | Purpose: Owns the reusable primary navigation and active-route behavior    |
  |          shared by the browser pages.                                      |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useEffect, useRef, useState } from "../lib/react.js";
import { Link, useLocation } from "../lib/router.js";
const BRAND_ICON_SRC = new URL(
    "../../assets/icons/icon-180.png",
    import.meta.url,
).href;
const NAV_ITEMS = Object.freeze([
    {
        to: "/",
        label: "Start",
    },
    {
        to: "/play",
        label: "Play",
    },
    {
        to: "/endings",
        label: "Endings",
    },
    {
        to: "/gallery",
        label: "Gallery",
    },
    {
        to: "/about",
        label: "About",
    },
    {
        to: "/case-study",
        label: "Case Study",
    },
    {
        to: "/blog",
        label: "Journal",
    },
]);
export function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef(null);
    const location = useLocation();
    const closeMenu = () => setIsOpen(false);
    useEffect(() => {
        if (!isOpen) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);
    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);
    return _jsx("nav", {
        className: "nav",
        "aria-label": "Primary navigation",
        children: _jsxs("div", {
            className: "nav__inner",
            children: [
                _jsxs(Link, {
                    to: "/",
                    className: "nav__brand",
                    onClick: closeMenu,
                    children: [
                        _jsx("img", {
                            className: "nav__brand-icon",
                            src: BRAND_ICON_SRC,
                            alt: "",
                            "aria-hidden": "true",
                        }),
                        _jsx("span", {
                            className: "nav__brand-title-line",
                            children: "The Beach",
                        }),
                        _jsx("span", {
                            className: "nav__brand-title-line--accent",
                            children: "Mystery",
                        }),
                    ],
                }),
                _jsxs("button", {
                    type: "button",
                    ref: toggleRef,
                    className: `nav__toggle ${isOpen ? "nav__toggle--open" : ""}`,
                    onClick: () => setIsOpen((current) => !current),
                    "aria-label": isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu",
                    "aria-expanded": isOpen,
                    "aria-controls": "primary-navigation-links",
                    children: [
                        _jsx("span", {}),
                        _jsx("span", {}),
                        _jsx("span", {}),
                    ],
                }),
                _jsx("ul", {
                    id: "primary-navigation-links",
                    className: `nav__links ${isOpen ? "nav__links--open" : ""}`,
                    children: NAV_ITEMS.map((item) => {
                        const active = isActive(item.to);
                        return _jsx(
                            "li",
                            {
                                children: _jsx(Link, {
                                    to: item.to,
                                    className: `nav__link ${active ? "nav__link--active" : ""}`,
                                    "aria-current": active ? "page" : undefined,
                                    onClick: closeMenu,
                                    children: _jsx("span", {
                                        className: "nav__link-label",
                                        children: item.label,
                                    }),
                                }),
                            },
                            item.to,
                        );
                    }),
                }),
            ],
        }),
    });
}
