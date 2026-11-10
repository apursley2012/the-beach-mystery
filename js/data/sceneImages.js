/*
  +----------------------------------------------------------------------------+
  | The Beach Mystery | Story data                                             |
  | Purpose: Centralizes story-art paths and alternative text so presentation  |
  |          components do not duplicate asset metadata.                       |
  | Author: Alysha Pursley                                                     |
  | Copyright (c) 2026 Alysha Pursley.                                         |
  | SPDX-License-Identifier: MIT                                               |
  +----------------------------------------------------------------------------+
*/

const getStoryArtUrl = (fileName) =>
    new URL(`../../assets/story-art/${fileName}`, import.meta.url).href;
// Ending artwork belongs beside the scene definitions so all ending views agree.
export const ENDING_SCENES = Object.freeze({
    islandTreasure: "island-path",
    hiddenChamber: "treasure-chamber",
    animalDen: "animal-den",
    peacefulWalk: "beach-sunset",
});
const SCENE_IMAGES = {
    beach: {
        src: getStoryArtUrl("beach-shore.webp"),
        alt: "Storybook illustration of a sunny beach shore with turquoise waves, driftwood, shells, and flowers",
    },
    chest: {
        src: getStoryArtUrl("buried-treasure-chest.webp"),
        alt: "Storybook illustration of a treasure chest buried in golden beach sand",
    },
    "chest-open": {
        src: getStoryArtUrl("buried-treasure-chest.webp"),
        alt: "Storybook illustration of a treasure chest buried in golden beach sand",
    },
    "beach-walk": {
        src: getStoryArtUrl("beach-shore.webp"),
        alt: "Storybook illustration of the beach shore where the walk continues",
    },
    map: {
        src: getStoryArtUrl("treasure-map.webp"),
        alt: "Storybook illustration of an old treasure map showing a boat route to an island marked with an X",
    },
    island: {
        src: getStoryArtUrl("treasure-island.webp"),
        alt: "Storybook illustration of a lush island surrounded by bright turquoise water",
    },
    "island-path": {
        src: getStoryArtUrl("treasure-island.webp"),
        alt: "Storybook illustration of the mysterious island the map leads to",
    },
    riddle: {
        src: getStoryArtUrl("treasure-island.webp"),
        alt: "Storybook illustration of the mysterious island where the riddle is given",
    },
    "cave-entrance": {
        src: getStoryArtUrl("cave-entrance.webp"),
        alt: "Storybook illustration of a dark cave entrance with rocky walls and glowing crystals",
    },
    "cave-interior": {
        src: getStoryArtUrl("dark-cave.webp"),
        alt: "Storybook illustration of a dark cave interior with magical crystals",
    },
    "cave-fork": {
        src: getStoryArtUrl("cave-fork.webp"),
        alt: "Storybook illustration of a fork in a cave with paths leading left and right",
    },
    "treasure-chamber": {
        src: getStoryArtUrl("hidden-cave-treasure.webp"),
        alt: "Storybook illustration of hidden treasure glittering inside a cave",
    },
    "animal-den": {
        src: getStoryArtUrl("magical-creature-den.webp"),
        alt: "Storybook illustration of a cozy cave den with a magical creature sleeping peacefully",
    },
    "beach-sunset": {
        src: getStoryArtUrl("beach-sunset.webp"),
        alt: "Storybook illustration of a peaceful sunset on the same beach shore",
    },
};
export function getSceneImage(scene) {
    return SCENE_IMAGES[scene] ?? SCENE_IMAGES.beach;
}
