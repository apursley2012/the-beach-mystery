/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Browser runtime adapter                                |
  | Purpose: Adapts the vendor JSX runtime import so application components can |
  |          use a stable project-local module path.                           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { j as runtime } from "../../assets/vendor/jsx-runtime.js";
const { Fragment, jsx, jsxs } = runtime;
export { Fragment, jsx, jsxs };
