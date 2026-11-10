/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Browser runtime adapter                                |
  | Purpose: Maps shared component links to real HTML page entry files while   |
  |          exposing the current page path to reusable navigation code.       |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import React from "./react.js";
const ROUTE_FILES = Object.freeze({
    "/": "home.html",
    "/play": "play.html",
    "/endings": "endings.html",
    "/gallery": "gallery.html",
    "/about": "about.html",
    "/case-study": "case-study.html",
    "/blog": "blog.html",
    "/privacy": "privacy.html",
    "/terms": "terms.html",
    "/accessibility": "accessibility.html",
});
function getCurrentRoute() {
    return document.body?.dataset?.route || "/";
}
function getRouteHref(route) {
    const filename = ROUTE_FILES[route] || "not-found.html";
    // Resolve from the installed application module, not the current URL: the
    // GitHub Pages 404 fallback can be served from arbitrarily nested paths.
    return new URL(`../../pages/${filename}`, import.meta.url).pathname;
}
export function useLocation() {
    return { pathname: getCurrentRoute() };
}
export function Link({ to, children, ...props }) {
    return React.createElement(
        "a",
        {
            ...props,
            href: getRouteHref(to),
        },
        children,
    );
}
export function Route() {
    return null;
}
export function Routes({ children }) {
    const pathname = getCurrentRoute();
    const routes = React.Children.toArray(children);
    const match =
        routes.find((route) => route?.props?.path === pathname) ??
        routes.find((route) => route?.props?.path === "*");
    return match?.props?.element ?? null;
}
