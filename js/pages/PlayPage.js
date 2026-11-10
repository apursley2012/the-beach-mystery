/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Page content or feature UI                             |
  | Purpose: Coordinates onboarding, personalization, narration pacing,        |
  |          choices, riddles, inventory display, and ending presentation for  |
  |          the playable browser story.                                       |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

import { jsx as _jsx, jsxs as _jsxs } from "../lib/jsx-runtime.js";
import { useEffect, useRef, useState } from "../lib/react.js";
import {
    ENDINGS,
    PERSONALIZATION_QUESTIONS,
    STORY_NODES,
} from "../data/story.js";
import { SceneArt } from "../components/SceneArt.js";
import { GameSidebar } from "./play/GameSidebar.js";
import { StoryChoices } from "./play/StoryChoices.js";
import { RiddleForm } from "./play/RiddleForm.js";
import { PlayTitleScreen } from "./play/PlayTitleScreen.js";
import { PlayInstructions } from "./play/PlayInstructions.js";
import { PersonalizationQuestion } from "./play/PersonalizationQuestion.js";
import { GameEnding } from "./play/GameEnding.js";
import { useGameState } from "../hooks/useGameState.js";
import { interpolateStoryText } from "../utils/storyText.js";
import { useStoryNarration } from "../hooks/useStoryNarration.js";
export function PlayPage() {
    const game = useGameState();
    const [screen, setScreen] = useState("title");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questionAnswer, setQuestionAnswer] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [riddleAnswer, setRiddleAnswer] = useState("");
    const [riddleError, setRiddleError] = useState("");
    const [riddleAttempts, setRiddleAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const storyMainRef = useRef(null);
    const questionSubmissionPendingRef = useRef(false);
    // Each answer advances one question, even if a device submits twice before React renders.
    useEffect(() => {
        questionSubmissionPendingRef.current = false;
    }, [questionIndex, screen]);
    const { gameState } = game;
    useEffect(() => {
        if (gameState.started && gameState.currentNode) {
            setScreen(gameState.endingReached ? "ending" : "story");
        }
    }, [gameState.started, gameState.currentNode, gameState.endingReached]);
    const { visibleLines, isNarrationComplete, resetNarration } =
        useStoryNarration(screen, gameState);
    useEffect(() => {
        if (storyMainRef.current) {
            storyMainRef.current.scrollTop = storyMainRef.current.scrollHeight;
        }
    }, [visibleLines, isNarrationComplete]);
    const resetToTitle = () => {
        game.resetGame();
        setScreen("title");
        setQuestionIndex(0);
        setAnswers({});
        setQuestionAnswer("");
        setQuestionError("");
        setRiddleAnswer("");
        setRiddleError("");
        setRiddleAttempts(0);
        setShowHint(false);
        resetNarration();
    };
    if (screen === "title") {
        const continueSavedGame = () => {
            if (game.loadGame()) setScreen("story");
        };
        return _jsx(PlayTitleScreen, {
            hasSavedGame: game.hasSave(),
            onBegin: () => setScreen("instructions"),
            onContinue: continueSavedGame,
        });
    }
    if (screen === "instructions") {
        return _jsx(PlayInstructions, {
            onContinue: () => setScreen("questions"),
        });
    }
    if (screen === "questions") {
        const question = PERSONALIZATION_QUESTIONS[questionIndex];
        const isLastQuestion =
            questionIndex === PERSONALIZATION_QUESTIONS.length - 1;
        const submitAnswer = (event) => {
            event?.preventDefault();
            if (questionSubmissionPendingRef.current) return;
            const trimmedAnswer = questionAnswer.trim();
            if (!trimmedAnswer) {
                setQuestionError("Please enter an answer to continue.");
                return;
            }
            questionSubmissionPendingRef.current = true;
            const nextAnswers = {
                ...answers,
                [question.id]: trimmedAnswer,
            };
            setAnswers(nextAnswers);
            setQuestionAnswer("");
            setQuestionError("");
            if (isLastQuestion) {
                game.startGame(nextAnswers);
                setScreen("story");
                return;
            }
            setQuestionIndex((current) => current + 1);
        };
        return _jsx(PersonalizationQuestion, {
            questions: PERSONALIZATION_QUESTIONS,
            questionIndex,
            answer: questionAnswer,
            error: questionError,
            onAnswerChange: (event) => {
                setQuestionAnswer(event.target.value);
                setQuestionError("");
            },
            onSubmit: submitAnswer,
        });
    }
    if (screen === "story" && gameState.currentNode) {
        const node = STORY_NODES[gameState.currentNode];
        if (!node) {
            return _jsx("div", {
                className: "play",
                children: _jsx("p", {
                    children: "Story node not found.",
                }),
            });
        }
        const submitRiddle = (event) => {
            event.preventDefault();
            if (
                riddleAnswer.trim().toLowerCase() === node.answer.toLowerCase()
            ) {
                setRiddleAnswer("");
                setRiddleError("");
                setRiddleAttempts(0);
                setShowHint(false);
                game.solveRiddle();
                return;
            }
            const nextAttemptCount = riddleAttempts + 1;
            setRiddleAttempts(nextAttemptCount);
            setRiddleError("That answer is incorrect. Please try again.");
            setRiddleAnswer("");
            if (nextAttemptCount >= 2) {
                setShowHint(true);
            }
        };
        const advanceStory = () => {
            if (node.ending) {
                game.reachEnding(node.ending);
                setScreen("ending");
            } else {
                game.advanceNode();
            }
        };
        return _jsx("div", {
            className: "play",
            children: _jsxs("div", {
                className: "play__story-container",
                children: [
                    _jsx(GameSidebar, {
                        gameState,
                        onSave: game.saveGame,
                        onRestart: resetToTitle,
                    }),
                    _jsxs("div", {
                        className: "play__story-main",
                        ref: storyMainRef,
                        children: [
                            node.scene &&
                                _jsx("div", {
                                    className: "play__scene-art animate-fade",
                                    children: _jsx(SceneArt, {
                                        scene: node.scene,
                                        size: "large",
                                    }),
                                }),
                            _jsx("div", {
                                className: "play__story-text",
                                role: "log",
                                "aria-label": "Story narration",
                                "aria-live": "polite",
                                "aria-relevant": "additions",
                                children: visibleLines.map((line, index) =>
                                    _jsx(
                                        "p",
                                        {
                                            className:
                                                "play__story-line animate-fade-up",
                                            style: {
                                                animationDelay: `${index * 0.05}s`,
                                            },
                                            children: line,
                                        },
                                        `${gameState.currentNode}-${index}`,
                                    ),
                                ),
                            }),
                            isNarrationComplete &&
                                node.type === "choice" &&
                                _jsx(StoryChoices, {
                                    prompt: interpolateStoryText(
                                        node.prompt,
                                        gameState.variables,
                                    ),
                                    options: node.options,
                                    nodeId: gameState.currentNode,
                                    onChoose: game.makeChoice,
                                }),
                            isNarrationComplete &&
                                node.type === "riddle" &&
                                _jsx(RiddleForm, {
                                    node,
                                    answer: riddleAnswer,
                                    error: riddleError,
                                    showHint,
                                    onAnswerChange: (event) => {
                                        setRiddleAnswer(event.target.value);
                                        setRiddleError("");
                                    },
                                    onSubmit: submitRiddle,
                                }),
                            isNarrationComplete &&
                                node.type === "narration" &&
                                !node.ending &&
                                node.next &&
                                _jsx("button", {
                                    type: "button",
                                    className:
                                        "btn btn--primary play__continue-story",
                                    onClick: advanceStory,
                                    children: "Continue \u2192",
                                }),
                            isNarrationComplete &&
                                node.ending &&
                                _jsx("button", {
                                    type: "button",
                                    className:
                                        "btn btn--primary play__continue-story",
                                    onClick: () => {
                                        game.reachEnding(node.ending);
                                        setScreen("ending");
                                    },
                                    children: "See Your Ending \u2192",
                                }),
                        ],
                    }),
                ],
            }),
        });
    }
    if (screen === "ending" && gameState.endingReached) {
        const ending = ENDINGS[gameState.endingReached];
        if (!ending) {
            return _jsx("div", {
                className: "play",
                children: _jsx("p", { children: "Ending not found." }),
            });
        }
        return _jsx(GameEnding, {
            ending,
            gameState,
            onRestart: resetToTitle,
        });
    }
    return _jsx("div", {
        className: "play",
        children: _jsx("p", {
            children: "Loading...",
        }),
    });
}
