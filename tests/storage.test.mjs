/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Persistence and data-integrity regression tests        |
  | Purpose: Test actual save/load validators, denied storage, data corruption, |
  |          and every real story route.                                       |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { ENDINGS, STORY_NODES } from "../js/data/story.js";
import { MAX_PERSONALIZATION_LENGTH, STORAGE_KEYS, clearGameData, isValidSavedGame, readJson, readStringArray, writeJson, } from "../js/services/gameStorage.js";
const nodeIds = new Set(Object.keys(STORY_NODES));
const endingIds = new Set(Object.keys(ENDINGS));
const answers = Object.freeze({
  firstName: "Taylor",
  favoriteColor: "Blue",
  favoriteAnimal: "Fox",
  cartoonChar: "Luna",
  favoriteJewel: "Ruby",
  formatted_time: "12:30",
});
const emptyInventory = Object.freeze({ hasOpenedChest: false, hasJewel: false, hasMap: false });
const data = new Map();
let access = "allowed";
globalThis.localStorage = {
  getItem(key) {
    if (access === "denied")
      throw Error("Access denied");
    return data.has(key) ? data.get(key) : null;
  },
  setItem(key, value) {
    if (access !== "allowed")
      throw Error("Storage unavailable");
    data.set(key, String(value));
  },
  removeItem(key) {
    if (access === "denied")
      throw Error("Access denied");
    data.delete(key);
  },
};
afterEach(() => {
  data.clear();
  access = "allowed";
});
function snapshot(overrides = {}) {
  return {
    variables: { ...answers },
    state: { ...emptyInventory },
    currentNode: "beachOpening",
    history: [],
    endingReached: null,
    started: true,
    ...overrides,
  };
}
function valid(value) {
  return isValidSavedGame(value, nodeIds, endingIds, STORY_NODES);
}
function* snapshots(nodeId = "beachOpening", inventory = emptyInventory, history = []) {
  const node = STORY_NODES[nodeId];
  const newState = { ...inventory, ...(node.setState ?? {}) };
  yield snapshot({ currentNode: nodeId, state: newState, history, endingReached: null });
  if (node.ending) {
    yield snapshot({ currentNode: nodeId, state: newState, history, endingReached: node.ending });
  }
  else if (node.type === "choice") {
    for (const option of node.options) {
      yield* snapshots(option.next, newState, [...history, { nodeId, choice: option.label }]);
    }
  }
  else if (node.type === "riddle") {
    yield* snapshots(node.next, newState, [...history, { nodeId, choice: "echo" }]);
  }
  else if (node.next) {
    yield* snapshots(node.next, newState, history);
  }
}
test("all valid story-path snapshots can be serialized, restored, and validated", () => {
  let count = 0;
  for (const saved of snapshots()) {
    assert.ok(valid(saved), `Valid story node rejected: ${saved.currentNode}`);
    assert.ok(writeJson(STORAGE_KEYS.save, saved));
    assert.deepEqual(readJson(STORAGE_KEYS.save, null), saved);
    assert.ok(valid(readJson(STORAGE_KEYS.save, null)));
    count++;
  }
  assert.ok(count > 25, `Expected many intermediate/terminal states; found ${count}`);
});
test("invalid or manipulated saved data cannot be restored", () => {
  const original = snapshot();
  const tampered = [
    null, {}, [], { ...original, started: false }, { ...original, currentNode: "missing" },
    { ...original, endingReached: "fake" }, { ...original, state: { ...original.state, hasMap: true } },
    { ...original, state: { ...original.state, hasMap: "true" } },
    { ...original, history: [{ nodeId: "beachOpening", choice: "Fake" }] },
    { ...original, history: Array(100).fill({ nodeId: "chestChoice", choice: "Yes" }) },
    { ...original, extraProperty: "not allowed" },
    { ...original, variables: { ...answers, unknown: "bad" } },
    { ...original, variables: { ...answers, firstName: "" } },
    { ...original, variables: { ...answers, firstName: "  " } },
    { ...original, variables: { ...answers, firstName: " Taylor " } },
    { ...original, variables: { ...answers, firstName: "A".repeat(MAX_PERSONALIZATION_LENGTH + 1) } },
    { ...original, variables: { ...answers, formatted_time: "25:99" } },
  ];
  for (const candidate of tampered) {
    assert.equal(valid(candidate), false, `Rejected invalid save: ${JSON.stringify(candidate)?.slice(0, 180)}`);
  }
});
test("malformed and oversized stored JSON safely fall back", () => {
  data.set(STORAGE_KEYS.save, "{not-json");
  assert.equal(readJson(STORAGE_KEYS.save, "fallback"), "fallback");
  data.set(STORAGE_KEYS.save, "x".repeat(40000));
  assert.equal(readJson(STORAGE_KEYS.save, "fallback"), "fallback");
  assert.equal(writeJson(STORAGE_KEYS.save, { value: "x".repeat(40000) }), false);
});
test("only known ending achievements survive loading, and duplicates are removed", () => {
  const ending = Object.keys(ENDINGS)[0];
  data.set(STORAGE_KEYS.achievements, JSON.stringify([ending, ending, "notAnEnding"]));
  assert.deepEqual(readStringArray(STORAGE_KEYS.achievements, endingIds), [ending]);
  data.set(STORAGE_KEYS.achievements, JSON.stringify(Array(17).fill(ending)));
  assert.deepEqual(readStringArray(STORAGE_KEYS.achievements, endingIds), []);
});
test("clearGameData deletes only the game's two keys", () => {
  data.set(STORAGE_KEYS.save, "saved");
  data.set(STORAGE_KEYS.achievements, "achievements");
  data.set("unrelated-site-key", "untouched");
  assert.equal(clearGameData(), true);
  assert.equal(data.has(STORAGE_KEYS.save), false);
  assert.equal(data.has(STORAGE_KEYS.achievements), false);
  assert.equal(data.get("unrelated-site-key"), "untouched");
});
test("denied and exhausted browser storage fail gracefully", () => {
  access = "denied";
  assert.equal(readJson(STORAGE_KEYS.save, "safe"), "safe");
  assert.equal(writeJson(STORAGE_KEYS.save, snapshot()), false);
  assert.equal(clearGameData(), false);
  access = "quota";
  assert.equal(writeJson(STORAGE_KEYS.save, snapshot()), false);
});
