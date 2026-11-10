/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story utility                                          |
  | Purpose: Applies personalization variables to story text while leaving     |
  |          unknown placeholders visible for authoring diagnostics.           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

const DEFAULT_STORY_VARIABLES = Object.freeze({
    firstName: "traveler",
    favoriteColor: "blue",
    favoriteAnimal: "cat",
    cartoonChar: "Mickey",
    favoriteJewel: "ruby",
    formatted_time: "12:00",
});
/*
 * Replaces story placeholders without embedding personalization rules in UI code.
 * Unknown placeholders are left intact so authoring mistakes stay visible.
 */
export function interpolateStoryText(text, variables = {}) {
    const values = {
        ...DEFAULT_STORY_VARIABLES,
        ...variables,
    };
    return text.replace(/\{(\w+)\}/g, (placeholder, key) =>
        Object.prototype.hasOwnProperty.call(values, key)
            ? values[key]
            : placeholder,
    );
}
