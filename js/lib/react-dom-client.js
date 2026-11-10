/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Browser runtime adapter                                |
  | Purpose: Re-exports the React DOM browser renderer without presenting the  |
  |          vendored implementation as project-owned code.                    |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { r as ReactDOMClient } from "../../assets/vendor/react-dom-runtime.js";
export default ReactDOMClient;
