/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Browser runtime adapter                                |
  | Purpose: Re-exports the React runtime from the bundled vendor module so    |
  |          application imports have a stable internal path.                  |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { r as React } from "../../assets/vendor/react-runtime.js";
const { useCallback, useEffect, useMemo, useRef, useState } = React;
export default React;
export { useCallback, useEffect, useMemo, useRef, useState };
