/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story regression tests                                 |
  | Purpose: Verify that every story branch, personalization placeholder, and  |
  |          ending remains reachable.                                         |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import assert from "node:assert/strict";
import test from "node:test";
import { ENDINGS, PERSONALIZATION_QUESTIONS, STORY_NODES } from "../js/data/story.js";
import { validateStoryGraph } from "../js/utils/storyGraph.js";
import { interpolateStoryText } from "../js/utils/storyText.js";
const opening = "beachOpening";
const endingIds = new Set(Object.keys(ENDINGS));
function visit(nodeId, ancestors, outcomes, visited, choices) {
  assert.ok(STORY_NODES[nodeId], `Missing story node ${nodeId}`);
  assert.ok(!ancestors.has(nodeId), `Cycle in story at ${nodeId}`);
  const nextAncestors = new Set([...ancestors, nodeId]);
  visited.add(nodeId);
  const node = STORY_NODES[nodeId];
  assert.equal(node.id, nodeId);
  if (node.ending) {
    outcomes.push(node.ending);
    return;
  }
  if (node.type === "choice") {
    assert.ok(node.options.length > 1, `Choices missing at ${nodeId}`);
    for (const option of node.options) {
      choices.add(`${nodeId}:${option.value}`);
      visit(option.next, nextAncestors, outcomes, visited, choices);
    }
    return;
  }
  assert.ok(node.next, `Dead end at ${nodeId}`);
  visit(node.next, nextAncestors, outcomes, visited, choices);
}
test("every story reference and ending is valid, reachable, and acyclic", () => {
  assert.deepEqual(validateStoryGraph(STORY_NODES, ENDINGS), []);
  const outcomes = [];
  const visited = new Set();
  const choices = new Set();
  visit(opening, new Set(), outcomes, visited, choices);
  assert.equal(visited.size, Object.keys(STORY_NODES).length);
  assert.deepEqual(new Set(outcomes), endingIds);
  assert.equal(outcomes.length, 7, "The game should preserve its seven complete adventure paths");
  assert.equal(choices.size, 12, "Every displayed choice option must remain reachable");
});
test("all five unique personalization prompts have corresponding text variables", () => {
  const keys = PERSONALIZATION_QUESTIONS.map((question) => question.id);
  assert.equal(keys.length, 5);
  assert.equal(new Set(keys).size, keys.length);
  assert.deepEqual(keys, ["firstName", "favoriteColor", "favoriteAnimal", "cartoonChar", "favoriteJewel"]);
  for (const question of PERSONALIZATION_QUESTIONS) {
    assert.ok(question.label);
    assert.ok(question.hint);
  }
});
test("personalization renders literal user input without removing unknown placeholders", () => {
  const name = '<img src=x onerror="alert(1)">';
  const interpolated = interpolateStoryText("Hello, {firstName}! {unknown}", { firstName: name });
  assert.equal(interpolated, `Hello, ${name}! {unknown}`);
  assert.equal(interpolateStoryText("Hello, {firstName}!"), "Hello, traveler!");
});
test("all story lines and prompts use only defined personalization placeholders", () => {
  const allowed = new Set([...PERSONALIZATION_QUESTIONS.map((question) => question.id), "formatted_time"]);
  for (const node of Object.values(STORY_NODES)) {
    for (const line of [...(node.lines ?? []), ...(node.prompt ? [node.prompt] : [])]) {
      for (const [, placeholder] of line.matchAll(/\{(\w+)\}/g)) {
        assert.ok(allowed.has(placeholder), `Unknown placeholder ${placeholder} in ${node.id}`);
      }
    }
  }
});
test("the island riddle retains its answer, feedback, and hint contract", () => {
  const riddles = Object.values(STORY_NODES).filter((node) => node.type === "riddle");
  assert.equal(riddles.length, 1);
  assert.equal(riddles[0].answer, "echo");
  assert.ok(riddles[0].hint.length > 10);
  assert.ok(STORY_NODES[riddles[0].next]);
});
test("missing story references are reported instead of silently ignored", () => {
  const result = validateStoryGraph({ opening: { next: "missing", options: [{ label: "Try", next: "alsoMissing" }], ending: "invalid" } }, {});
  assert.equal(result.length, 3);
  assert.ok(result.every((message) => message.includes("missing") || message.includes("invalid")));
});
