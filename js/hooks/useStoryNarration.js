/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story narration hook                                   |
  | Purpose: Owns the timed narration reveal and interval cleanup separately   |
  |          from the page's game flow and controls.                           |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { useEffect, useState } from "../lib/react.js";
import { STORY_NODES } from "../data/story.js";
import { interpolateStoryText } from "../utils/storyText.js";
const NARRATION_INTERVAL_MS = 600;
export function useStoryNarration(screen, gameState) {
    const [visibleLines, setVisibleLines] = useState([]);
    const [isNarrationComplete, setIsNarrationComplete] = useState(false);
    useEffect(() => {
        if (screen !== "story" || !gameState.currentNode) return undefined;
        const node = STORY_NODES[gameState.currentNode];
        if (!node) return undefined;
        setVisibleLines([]);
        setIsNarrationComplete(false);
        const renderedLines = (node.lines ?? []).map((line) =>
            interpolateStoryText(line, gameState.variables),
        );
        let lineIndex = 0;
        const timer = window.setInterval(() => {
            if (lineIndex < renderedLines.length) {
                const line = renderedLines[lineIndex];
                setVisibleLines((current) => [...current, line]);
                lineIndex += 1;
            } else {
                window.clearInterval(timer);
                setIsNarrationComplete(true);
            }
        }, NARRATION_INTERVAL_MS);
        return () => window.clearInterval(timer);
    }, [gameState.currentNode, gameState.state, gameState.variables, screen]);
    const resetNarration = () => {
        setVisibleLines([]);
        setIsNarrationComplete(false);
    };
    return {
        visibleLines,
        isNarrationComplete,
        resetNarration,
    };
}
