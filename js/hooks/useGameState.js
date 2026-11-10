/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Game state hook                                        |
  | Purpose: Owns story progression, inventory flags, achievements, and        |
  |          save/load coordination while keeping persistence mechanics in the |
  |          storage service.                                                  |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { useCallback, useEffect, useState } from "../lib/react.js";
import { ENDINGS, STORY_NODES } from "../data/story.js";
import {
    STORAGE_KEYS,
    isValidSavedGame,
    readJson,
    readStringArray,
    writeJson,
} from "../services/gameStorage.js";
const VALID_ENDING_IDS = new Set(Object.keys(ENDINGS));
const VALID_STORY_NODE_IDS = new Set(Object.keys(STORY_NODES));
const INITIAL_GAME_STATE = Object.freeze({
    variables: Object.freeze({}),
    state: Object.freeze({
        hasOpenedChest: false,
        hasJewel: false,
        hasMap: false,
    }),
    currentNode: null,
    history: Object.freeze([]),
    endingReached: null,
    started: false,
});
/* The hook coordinates game state; story data and storage validation remain separate. */
export function useGameState() {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [achievements, setAchievements] = useState(() =>
        readStringArray(STORAGE_KEYS.achievements, VALID_ENDING_IDS),
    );
    useEffect(() => {
        writeJson(STORAGE_KEYS.achievements, achievements);
    }, [achievements]);
    const startGame = useCallback((variables) => {
        const now = new Date();
        const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        setGameState({
            variables: {
                ...variables,
                formatted_time: formattedTime,
            },
            state: {
                hasOpenedChest: false,
                hasJewel: false,
                hasMap: false,
            },
            currentNode: "beachOpening",
            history: [],
            endingReached: null,
            started: true,
        });
    }, []);
    const makeChoice = useCallback((choice, sourceNodeId) => {
        setGameState((current) => {
            // Ignore duplicate clicks from a choice screen that has already advanced.
            if (current.currentNode !== sourceNodeId) return current;
            const node = STORY_NODES[current.currentNode];
            if (
                !node ||
                node.type !== "choice" ||
                !node.options.some(
                    (option) =>
                        option.value === choice.value &&
                        option.next === choice.next &&
                        option.label === choice.label,
                )
            )
                return current;
            const nextNodeId = choice.next;
            const history = [
                ...current.history,
                {
                    nodeId: current.currentNode,
                    choice: choice.label,
                },
            ];
            const nextNode = STORY_NODES[nextNodeId];
            // Node-owned setState data keeps branch effects declarative instead of hard-coding inventory mutations in UI handlers.
            const nextState = nextNode?.setState
                ? {
                      ...current.state,
                      ...nextNode.setState,
                  }
                : current.state;
            return {
                ...current,
                currentNode: nextNodeId,
                state: nextState,
                history,
            };
        });
    }, []);
    const solveRiddle = useCallback(() => {
        setGameState((current) => {
            const node = STORY_NODES[current.currentNode];
            if (!node || node.type !== "riddle") return current;
            return {
                ...current,
                currentNode: node.next,
                history: [
                    ...current.history,
                    {
                        nodeId: current.currentNode,
                        choice: "echo",
                    },
                ],
            };
        });
    }, []);
    const advanceNode = useCallback(() => {
        setGameState((current) => {
            const node = STORY_NODES[current.currentNode];
            if (!node?.next) return current;
            const nextNode = STORY_NODES[node.next];
            const nextState = nextNode?.setState
                ? {
                      ...current.state,
                      ...nextNode.setState,
                  }
                : current.state;
            return {
                ...current,
                currentNode: node.next,
                state: nextState,
            };
        });
    }, []);
    const reachEnding = useCallback(
        (endingId) => {
            // Do not grant an achievement for an ID unrelated to the active ending.
            if (
                !VALID_ENDING_IDS.has(endingId) ||
                STORY_NODES[gameState.currentNode]?.ending !== endingId
            )
                return;
            // Achievement writes are idempotent so revisiting an ending cannot duplicate progress records.
            setGameState((current) =>
                current.currentNode === gameState.currentNode
                    ? {
                          ...current,
                          endingReached: endingId,
                      }
                    : current,
            );
            setAchievements((current) =>
                current.includes(endingId) ? current : [...current, endingId],
            );
        },
        [gameState.currentNode],
    );
    const resetGame = useCallback(() => {
        setGameState(INITIAL_GAME_STATE);
    }, []);
    const saveGame = useCallback(
        () =>
            isValidSavedGame(
                gameState,
                VALID_STORY_NODE_IDS,
                VALID_ENDING_IDS,
                STORY_NODES,
            ) && writeJson(STORAGE_KEYS.save, gameState),
        [gameState],
    );
    const loadGame = useCallback(() => {
        const saved = readJson(STORAGE_KEYS.save, null);
        /* Reject incompatible saves before they can reference missing story nodes. */
        if (
            !isValidSavedGame(
                saved,
                VALID_STORY_NODE_IDS,
                VALID_ENDING_IDS,
                STORY_NODES,
            )
        )
            return false;
        setGameState(saved);
        return true;
    }, []);
    const hasSave = useCallback(() => {
        const saved = readJson(STORAGE_KEYS.save, null);
        return isValidSavedGame(
            saved,
            VALID_STORY_NODE_IDS,
            VALID_ENDING_IDS,
            STORY_NODES,
        );
    }, []);
    return {
        gameState,
        achievements,
        startGame,
        makeChoice,
        solveRiddle,
        advanceNode,
        reachEnding,
        resetGame,
        saveGame,
        loadGame,
        hasSave,
    };
}
