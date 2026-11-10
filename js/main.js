/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Application bootstrap                                  |
  | Purpose: Bootstraps the shared React application inside each real static   |
  |          HTML page entry while preserving reusable components and          |
  |          page-specific controllers.                                        |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx } from "./lib/jsx-runtime.js";
import React from "./lib/react.js";
import ReactDOM from "./lib/react-dom-client.js";
import { App } from "./App.js";
ReactDOM.createRoot(document.getElementById("root")).render(
    _jsx(React.StrictMode, {
        children: _jsx(App, {}),
    }),
);
