/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Persistence service                                    |
  | Purpose: Centralizes localStorage keys, schema checks, and guarded JSON    |
  |          operations so persisted browser data cannot destabilize the UI.   |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

export const STORAGE_KEYS = Object.freeze({
    save: "beach-mystery-save",
    achievements: "beach-mystery-achievements",
});
const PERSONALIZATION_KEYS = Object.freeze([
    "firstName",
    "favoriteColor",
    "favoriteAnimal",
    "cartoonChar",
    "favoriteJewel",
]);
const PERSONALIZATION_KEY_SET = new Set(PERSONALIZATION_KEYS);
const VARIABLE_KEYS = new Set([...PERSONALIZATION_KEYS, "formatted_time"]);
const STATE_KEYS = new Set(["hasOpenedChest", "hasJewel", "hasMap"]);
const SAVED_GAME_KEYS = new Set([
    "variables",
    "state",
    "currentNode",
    "history",
    "endingReached",
    "started",
]);
export const MAX_PERSONALIZATION_LENGTH = 60;
const MAX_HISTORY_CHOICE_LENGTH = 120;
// Browser storage is untrusted. Normal game records are small; do not parse
// arbitrarily large values supplied by extensions or manually edited storage.
const MAX_STORED_JSON_LENGTH = 32 * 1024;
const MAX_STORED_ACHIEVEMENTS = 16;
function hasOnlyKeys(value, allowedKeys) {
    return Object.keys(value).every((key) => allowedKeys.has(key));
}
function hasValidVariables(variables) {
    if (!variables || typeof variables !== "object" || Array.isArray(variables))
        return false;
    if (!hasOnlyKeys(variables, VARIABLE_KEYS)) return false;
    for (const key of PERSONALIZATION_KEY_SET) {
        if (
            typeof variables[key] !== "string" ||
            variables[key].length === 0 ||
            variables[key].length > MAX_PERSONALIZATION_LENGTH ||
            variables[key].trim() !== variables[key] ||
            variables[key].trim().length === 0
        )
            return false;
    }
    return (
        typeof variables.formatted_time === "string" &&
        /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(variables.formatted_time)
    );
}
function hasValidState(state) {
    if (!state || typeof state !== "object" || Array.isArray(state))
        return false;
    return (
        Object.keys(state).length === STATE_KEYS.size &&
        hasOnlyKeys(state, STATE_KEYS) &&
        [...STATE_KEYS].every((key) => typeof state[key] === "boolean")
    );
}
// Reconstruct the path instead of trusting browser-edited history, inventory,
// or ending flags. Each entry must lead from the opening scene to the saved
// node along a real story branch; ordinary narration advances without a choice.
function hasConsistentStoryProgress(saved, storyNodes) {
    let nodeId = "beachOpening";
    let choiceIndex = 0;
    const derivedState = {
        hasOpenedChest: false,
        hasJewel: false,
        hasMap: false,
    };
    const maxSteps = Object.keys(storyNodes).length + saved.history.length + 1;
    for (let step = 0; step < maxSteps; step += 1) {
        const node = storyNodes[nodeId];
        if (!node) return false;
        if (node.setState) {
            for (const [key, value] of Object.entries(node.setState)) {
                if (!STATE_KEYS.has(key) || typeof value !== "boolean")
                    return false;
                derivedState[key] = value;
            }
        }
        if (
            choiceIndex === saved.history.length &&
            nodeId === saved.currentNode
        ) {
            return (
                [...STATE_KEYS].every(
                    (key) => saved.state[key] === derivedState[key],
                ) &&
                (saved.endingReached === null ||
                    node.ending === saved.endingReached)
            );
        }
        if (node.type === "choice") {
            const recorded = saved.history[choiceIndex];
            const option = node.options?.find(
                (item) => item.label === recorded?.choice,
            );
            if (recorded?.nodeId !== nodeId || !option) return false;
            nodeId = option.next;
            choiceIndex += 1;
        } else if (node.type === "riddle") {
            const recorded = saved.history[choiceIndex];
            if (recorded?.nodeId !== nodeId || recorded.choice !== "echo")
                return false;
            nodeId = node.next;
            choiceIndex += 1;
        } else if (node.next) nodeId = node.next;
        else return false;
    }
    return false;
}
// Saved data is untrusted: enforce exact keys, bounded history, and current graph IDs.
export function isValidSavedGame(
    value,
    validNodeIds,
    validEndingIds,
    storyNodes = null,
) {
    if (
        !value ||
        typeof value !== "object" ||
        Array.isArray(value) ||
        value.started !== true
    )
        return false;
    if (
        Object.keys(value).length !== SAVED_GAME_KEYS.size ||
        !hasOnlyKeys(value, SAVED_GAME_KEYS)
    )
        return false;
    if (
        typeof value.currentNode !== "string" ||
        !validNodeIds.has(value.currentNode)
    )
        return false;
    if (!hasValidVariables(value.variables) || !hasValidState(value.state))
        return false;
    if (
        !Array.isArray(value.history) ||
        value.history.length > validNodeIds.size
    )
        return false;
    if (
        !value.history.every(
            (entry) =>
                entry &&
                typeof entry === "object" &&
                !Array.isArray(entry) &&
                Object.keys(entry).length === 2 &&
                Object.keys(entry).every(
                    (key) => key === "nodeId" || key === "choice",
                ) &&
                typeof entry.nodeId === "string" &&
                validNodeIds.has(entry.nodeId) &&
                typeof entry.choice === "string" &&
                entry.choice.length > 0 &&
                entry.choice.length <= MAX_HISTORY_CHOICE_LENGTH,
        )
    ) {
        return false;
    }
    if (storyNodes && !hasConsistentStoryProgress(value, storyNodes))
        return false;
    return (
        value.endingReached === null ||
        (typeof value.endingReached === "string" &&
            validEndingIds.has(value.endingReached))
    );
}
export function readJson(key, fallback) {
    try {
        const rawValue = localStorage.getItem(key);
        return rawValue === null || rawValue.length > MAX_STORED_JSON_LENGTH
            ? fallback
            : JSON.parse(rawValue);
    } catch {
        return fallback;
    }
}
export function readStringArray(key, allowedValues = null) {
    const value = readJson(key, []);
    if (!Array.isArray(value) || value.length > MAX_STORED_ACHIEVEMENTS)
        return [];
    return [...new Set(value)].filter(
        (item) =>
            typeof item === "string" &&
            (!allowedValues || allowedValues.has(item)),
    );
}
// Storage may be disabled or full; return false so the caller can show save feedback.
export function writeJson(key, value) {
    try {
        const serialized = JSON.stringify(value);
        if (
            typeof serialized !== "string" ||
            serialized.length > MAX_STORED_JSON_LENGTH
        )
            return false;
        localStorage.setItem(key, serialized);
        return true;
    } catch {
        return false;
    }
}
// Remove only this project's two keys. Verify both are absent before reporting
// success; browser storage permissions can be denied or changed at any time.
export function clearGameData() {
    let removed = true;
    for (const key of Object.values(STORAGE_KEYS)) {
        try {
            localStorage.removeItem(key);
            if (localStorage.getItem(key) !== null) removed = false;
        } catch {
            removed = false;
        }
    }
    return removed;
}
