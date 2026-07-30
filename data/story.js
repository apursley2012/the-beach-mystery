const PERSONALIZATION_QUESTIONS = [
  {
    id: "firstName",
    label: "What is your first name?",
    placeholder: "Enter your name...",
    hint: "Used to greet you at the start of your adventure.",
  },
  {
    id: "favoriteColor",
    label: "What is your favorite color?",
    placeholder: "A color that catches your eye...",
    hint: "Colors the jewel you may discover.",
  },
  {
    id: "favoriteAnimal",
    label: "What is your favorite animal?",
    placeholder: "A creature you love...",
    hint: "May appear during your adventure.",
  },
  {
    id: "cartoonChar",
    label: "Who is your favorite cartoon character?",
    placeholder: "A character you adore...",
    hint: "Featured on the watch you check beside the chest.",
  },
  {
    id: "favoriteJewel",
    label: "What is your favorite jewel?",
    placeholder: "A gemstone you treasure...",
    hint: "The jewel hidden inside the pirate chest.",
  },
];

const RIDDLE = {
  question:
    "I speak without a mouth and hear without ears.\nI have no body, but I come alive with the wind. What am I?",
  answer: "echo",
  hint: "It is a sound that repeats what you say, bouncing back from canyon walls and empty halls.",
};

const ENDINGS = {
  islandTreasure: {
    id: "islandTreasure",
    name: "The Island's Secret",
    description:
      "You trusted the old map, crossed the rough sea, solved the guards' riddle, and uncovered the secret protected by the island.",
    icon: "🏝️",
  },
  hiddenChamber: {
    id: "hiddenChamber",
    name: "The Hidden Treasure Chamber",
    description:
      "You followed the left-hand passage through the cave and found a chamber that had remained hidden for generations.",
    icon: "💎",
  },
  animalDen: {
    id: "animalDen",
    name: "The Guardian's Den",
    description:
      "You followed the right-hand passage and discovered that the cave's greatest treasure was a peaceful magical guardian.",
    icon: "🐾",
  },
  peacefulWalk: {
    id: "peacefulWalk",
    name: "The Peaceful Shore",
    description:
      "You listened to your instincts, left the dark cave unexplored, and carried the mystery of the beach home with you.",
    icon: "🌅",
  },
};

const STORY_NODES = {
  beachOpening: {
    id: "beachOpening",
    type: "narration",
    scene: "beach",
    lines: [
      "Hello, {firstName}!",
      "It is a beautiful day on the beach. Sunlight dances across the water, gulls circle overhead, and a warm breeze carries the salty smell of the ocean.",
      "You walk close to the shoreline, enjoying the sound of the waves and the feeling of cool sand beneath your toes.",
      "Just as you begin to wonder how far you have wandered, your foot bumps against something hard beneath the sand.",
      "At first you think it is a rock, but one straight wooden edge is visible. Curious, you kneel and start digging with both hands.",
      "The object is much larger than you expected. After clearing away the last heavy layer of sand, you finally uncover what has been hidden there.",
    ],
    next: "chestDiscovery",
  },
  chestDiscovery: {
    id: "chestDiscovery",
    type: "narration",
    scene: "chest",
    lines: [
      "It is an old pirate's chest!",
      "Its wood is weathered and its metal bands are crusted with salt, as if the sea buried it long ago.",
      "You brush the sand from its heavy lid and glance at your {cartoonChar} watch. It is {formatted_time}.",
      "The beach is empty in both directions. Whatever is inside has been waiting a very long time for someone to find it.",
    ],
    next: "chestChoice",
  },
  chestChoice: {
    id: "chestChoice",
    type: "choice",
    scene: "chest",
    prompt: "Do you have time to open the chest?",
    options: [
      { label: "Yes", value: "yes", next: "chestOpened" },
      { label: "No", value: "no", next: "chestSkipped" },
    ],
  },
  chestOpened: {
    id: "chestOpened",
    type: "narration",
    scene: "chest-open",
    lines: [
      "You grip the lid and pull. It refuses to move at first, but with one last burst of strength the rusted latch breaks free.",
      "Inside, wrapped in faded blue cloth, you find an old treasure map and one brilliant {favoriteColor} {favoriteJewel}.",
      "The jewel catches the sunlight so brightly that the inside of the chest seems to glow.",
      "You carefully pocket the {favoriteJewel}, unfold the map, and smooth its brittle corners against the lid.",
      "A dotted route begins at this very beach and crosses the water to a small island marked with an X beneath an ancient tree.",
    ],
    setState: { hasOpenedChest: true, hasJewel: true, hasMap: true },
    next: "mapChoice",
  },
  chestSkipped: {
    id: "chestSkipped",
    type: "narration",
    scene: "beach-walk",
    lines: [
      "You decide not to disturb the chest. Some mysteries can wait, and you still want to enjoy the rest of your walk.",
      "You cover it with enough sand to keep it hidden, then continue along the curving shoreline.",
      "Beyond a ridge of black rocks, the bright beach narrows and the air turns noticeably cooler.",
      "Set into the cliff ahead is the mouth of a dark cave. A faint current of air whispers from somewhere deep inside.",
    ],
    setState: { hasOpenedChest: false, hasJewel: false, hasMap: false },
    next: "caveChoiceWithoutMap",
  },
  mapChoice: {
    id: "mapChoice",
    type: "choice",
    scene: "map",
    prompt: "Do you want to follow the map?",
    options: [
      { label: "Yes", value: "yes", next: "followMap" },
      { label: "No", value: "no", next: "skipMap" },
    ],
  },
  followMap: {
    id: "followMap",
    type: "narration",
    scene: "island",
    lines: [
      "The map feels too important to ignore. You rent a small boat from the beach dock and point its bow toward the island drawn in faded ink.",
      "The trip is rougher than it looked from shore. Waves slap the hull, spray stings your face, and for a while the island disappears behind a bank of mist.",
      "At last the mist thins. A green island rises ahead, exactly where the map promised it would be.",
      "You guide the boat onto a strip of white sand and pull it safely above the tide line.",
      "Two silent men stand where a narrow path disappears into thick brush. One carries a lantern, and the other wears a brass key around his neck.",
      'The first guard studies the paper in your hand and says, "Only the one with the map may pass."',
      'The second guard steps forward. "A map brought you here, but an answer must take you farther. Solve my riddle, and the island path is yours."',
    ],
    next: "riddleIntro",
  },
  riddleIntro: {
    id: "riddleIntro",
    type: "riddle",
    scene: "riddle",
    riddleText: RIDDLE.question,
    answer: RIDDLE.answer,
    hint: RIDDLE.hint,
    next: "riddleSolved",
  },
  riddleSolved: {
    id: "riddleSolved",
    type: "narration",
    scene: "island-path",
    lines: [
      '"An echo," you answer.',
      "The guards exchange a surprised smile. The man with the key unlocks a vine-covered gate, and both step aside.",
      "You follow the narrow trail through ferns taller than your shoulders. The marks on the map guide you past three carved stones and across a shallow stream.",
      "The trail ends in a sunlit clearing dominated by a huge, gnarled oak tree—the same tree drawn beside the X.",
      "A beam of sunlight shines through its branches onto a mound of old coins and golden objects nestled between the roots.",
      "Beside the treasure, a beautiful {favoriteAnimal} sleeps peacefully in the warm grass. Around its neck is a small tag bearing the same symbol as your {favoriteColor} {favoriteJewel}.",
      "The animal wakes, looks at you without fear, and nudges a wooden box from beneath one root. Inside is a note explaining that the treasure belongs to whoever reaches the island with courage, wisdom, and respect.",
      "You take only a single gold coin as proof of your journey. When you leave, the guardian watches from beneath the oak, and the hidden island fades into the mist behind your boat.",
      "Back on the beach, the coin and jewel remain warm in your hand. You know the island was real—and that its secret is now safe with you.",
    ],
    ending: "islandTreasure",
  },
  skipMap: {
    id: "skipMap",
    type: "narration",
    scene: "beach-walk",
    lines: [
      "The map promises adventure, but crossing unfamiliar water alone feels too risky today.",
      "You fold it carefully, return it to the chest for safekeeping, and keep the {favoriteColor} {favoriteJewel} in your pocket.",
      "Farther down the shore, the beach curves behind a wall of dark rock. There you discover a cave opening almost hidden by hanging vines.",
      "The air drifting from it is cool and smells of seawater. A faint sparkle deep inside reminds you of the jewel you just found.",
    ],
    next: "caveChoiceWithJewel",
  },
  caveChoiceWithJewel: {
    id: "caveChoiceWithJewel",
    type: "choice",
    scene: "cave-entrance",
    prompt: "The cave looks spooky. Do you want to enter with the jewel?",
    options: [
      { label: "Yes", value: "yes", next: "caveEnteredWithJewel" },
      { label: "No", value: "no", next: "caveSkippedWithJewel" },
    ],
  },
  caveChoiceWithoutMap: {
    id: "caveChoiceWithoutMap",
    type: "choice",
    scene: "cave-entrance",
    prompt: "The cave looks spooky. Do you want to enter?",
    options: [
      { label: "Yes", value: "yes", next: "caveEnteredWithoutJewel" },
      { label: "No", value: "no", next: "caveSkippedWithoutJewel" },
    ],
  },
  caveEnteredWithJewel: {
    id: "caveEnteredWithJewel",
    type: "narration",
    scene: "cave-interior",
    lines: [
      "You take a steadying breath and step inside. The noise of the beach quickly fades behind you.",
      "The cave air is damp and smells of seaweed, stone, and mildew. Water drips in a slow rhythm somewhere ahead.",
      "When the darkness becomes too thick to see, the {favoriteColor} {favoriteJewel} begins to glow softly through your pocket.",
      "Its light reveals old arrows scratched into the wall and leads you safely to a fork where the tunnel splits in two.",
      "The left passage carries a cool breeze and a faint golden shimmer. The right passage is warmer, and from it comes the quiet sound of breathing.",
    ],
    next: "cavePathChoiceWithJewel",
  },
  caveEnteredWithoutJewel: {
    id: "caveEnteredWithoutJewel",
    type: "narration",
    scene: "cave-interior",
    lines: [
      "Curiosity wins. You cautiously enter, keeping one hand against the cool stone wall so you can find your way back.",
      "The air is damp and smells of seaweed and mildew. Behind you, the bright cave entrance shrinks to a thin blue arch.",
      "A line of pale shells embedded in the rock catches what little light remains and guides you deeper.",
      "Soon you reach a fork where the cave splits into two passages.",
      "A cool breeze slips from the left tunnel. The right tunnel is warmer, and from somewhere beyond its bend comes the quiet sound of breathing.",
    ],
    next: "cavePathChoiceWithoutJewel",
  },
  cavePathChoiceWithJewel: {
    id: "cavePathChoiceWithJewel",
    type: "choice",
    scene: "cave-fork",
    prompt: "Which path will you take?",
    options: [
      { label: "Left", value: "left", next: "caveLeftWithJewel" },
      { label: "Right", value: "right", next: "caveRightWithJewel" },
    ],
  },
  cavePathChoiceWithoutJewel: {
    id: "cavePathChoiceWithoutJewel",
    type: "choice",
    scene: "cave-fork",
    prompt: "Which path will you take?",
    options: [
      { label: "Left", value: "left", next: "caveLeftWithoutJewel" },
      { label: "Right", value: "right", next: "caveRightWithoutJewel" },
    ],
  },
  caveLeftWithJewel: {
    id: "caveLeftWithJewel",
    type: "narration",
    scene: "treasure-chamber",
    lines: [
      "You turn left and follow the cool breeze through a narrow corridor. The glow of your {favoriteJewel} grows brighter with every step.",
      "At the end, its light falls across a stone door carved with the same symbol that appears on the treasure map.",
      "When you hold the jewel near the carving, the door rumbles open and reveals a hidden chamber filled with old coins, jeweled cups, and silver crowns.",
      "Your {favoriteColor} {favoriteJewel} fits perfectly into an empty place at the center of a carved pedestal, but you decide not to leave it behind.",
      "Instead, you take one small coin and close the door. You found the chamber because you were brave enough to explore, not because you wanted to empty it.",
      "Following the cool breeze leads you to another opening farther down the beach. The jewel stops glowing once you return to the sun, but now you understand that it is a key to mysteries still waiting beneath the shore.",
    ],
    ending: "hiddenChamber",
  },
  caveLeftWithoutJewel: {
    id: "caveLeftWithoutJewel",
    type: "narration",
    scene: "treasure-chamber",
    lines: [
      "You choose the left passage and follow the cool breeze. The tunnel narrows until you have to turn sideways between the rocks.",
      "Just when you consider going back, the passage opens into a chamber lit by shafts of sunlight from cracks high above.",
      "Coins, jeweled cups, and silver crowns glitter across the floor. A stone pedestal in the center has an empty jewel-shaped space carved into it.",
      "You realize the chest on the beach and this chamber must be connected. Perhaps the missing jewel is still inside the chest you chose not to open.",
      "You take one weathered coin, enough to prove what you found, and leave the rest untouched.",
      "A second tunnel returns you to the beach. Looking back toward the buried chest, you smile. You may not know every part of the mystery yet, but you now know exactly where your next adventure should begin.",
    ],
    ending: "hiddenChamber",
  },
  caveRightWithJewel: {
    id: "caveRightWithJewel",
    type: "narration",
    scene: "animal-den",
    lines: [
      "You follow the warmer right-hand passage. The sound of breathing becomes clearer, but it is slow and peaceful rather than threatening.",
      "The tunnel opens into a cozy den lined with dry grass, shells, and bits of sea glass.",
      "Curled in the center is a beautiful {favoriteAnimal}. The same symbol marked on your {favoriteColor} {favoriteJewel} glows faintly above its bed.",
      "The animal wakes and watches you. When you place the jewel on the ground to show that you mean no harm, it gently pushes the stone back toward you.",
      "Then it leads you to a hidden opening overlooking the sea. From there, you can see the distant island drawn on the map.",
      "You understand that this creature is not trapped here. It is a guardian watching over both the cave and the island.",
      "After you share a quiet moment beside the opening, the guardian guides you safely outside. You leave with the jewel, a new friend, and the feeling that the beach's mysteries have only begun.",
    ],
    ending: "animalDen",
  },
  caveRightWithoutJewel: {
    id: "caveRightWithoutJewel",
    type: "narration",
    scene: "animal-den",
    lines: [
      "You follow the warmer right-hand passage. The quiet breathing grows louder around the next bend.",
      "The tunnel opens into a cozy den lined with dry grass, smooth shells, and colorful pieces of sea glass.",
      "Curled safely in the center is a beautiful {favoriteAnimal}. It opens one eye, studies you, and seems to decide that you are not a danger.",
      "You sit at the edge of the den rather than moving closer. After a moment, the animal rises and leads you through a side tunnel.",
      "The passage ends at a hidden opening above the ocean. Fresh air and sunlight spill inside, and the animal wears a small tag shaped like a treasure map.",
      "You realize the cave has a guardian, and that the buried chest may be one part of a much larger secret.",
      "The guardian shows you a safe path back to the shore. You leave the cave without gold or jewels, but with a discovery far rarer than either.",
    ],
    ending: "animalDen",
  },
  caveSkippedWithJewel: {
    id: "caveSkippedWithJewel",
    type: "narration",
    scene: "beach-sunset",
    lines: [
      "The darkness beyond the entrance feels too uncertain, so you decide not to enter the cave today.",
      "As you continue along the shore, your fingers close around the smooth {favoriteJewel} in your pocket.",
      "You may not have followed the map or explored the cave, but the jewel and the memory of the buried chest are adventure enough for one afternoon.",
      "By the time you turn back, the sky has become a wash of orange, pink, and violet. The tide has erased your earlier footprints, leaving the beach quiet and new.",
      "You make a promise to keep the jewel safe and return when you are ready to learn how the chest, cave, and distant island are connected.",
      "For now, you head home beneath the first evening stars, carrying one beautiful piece of the mystery with you.",
    ],
    ending: "peacefulWalk",
  },
  caveSkippedWithoutJewel: {
    id: "caveSkippedWithoutJewel",
    type: "narration",
    scene: "beach-sunset",
    lines: [
      "The cave is too dark to explore without a light, so you trust your instincts and stay on the open shore.",
      "You spend the rest of the afternoon collecting shells, watching seabirds dive, and listening to waves echo faintly inside the cliff.",
      "As sunset colors the water gold, you pass the place where the old chest is still hidden beneath the sand.",
      "You leave it undisturbed. A mystery does not have to be solved the moment it is found.",
      "On the walk home, you think about the chest and the cave and wonder whether they are connected.",
      "It was still a very good walk—and perhaps the beginning of another adventure, whenever you decide to return.",
    ],
    ending: "peacefulWalk",
  },
};

const STORYLINES = [
  {
    id: 1,
    name: "The Island Adventurer",
    path: ["Open Chest → Yes", "Follow Map → Yes", "Riddle → Echo"],
    ending: "islandTreasure",
  },
  {
    id: 2,
    name: "The Jewel-Lit Explorer",
    path: [
      "Open Chest → Yes",
      "Follow Map → No",
      "Enter Cave → Yes",
      "Path → Left",
    ],
    ending: "hiddenChamber",
  },
  {
    id: 3,
    name: "The Guardian's Friend",
    path: [
      "Open Chest → Yes",
      "Follow Map → No",
      "Enter Cave → Yes",
      "Path → Right",
    ],
    ending: "animalDen",
  },
  {
    id: 4,
    name: "The Jewel Keeper",
    path: ["Open Chest → Yes", "Follow Map → No", "Enter Cave → No"],
    ending: "peacefulWalk",
  },
  {
    id: 5,
    name: "The Wary Treasure Hunter",
    path: ["Open Chest → No", "Enter Cave → Yes", "Path → Left"],
    ending: "hiddenChamber",
  },
  {
    id: 6,
    name: "The Gentle Explorer",
    path: ["Open Chest → No", "Enter Cave → Yes", "Path → Right"],
    ending: "animalDen",
  },
  {
    id: 7,
    name: "The Peaceful Walker",
    path: ["Open Chest → No", "Enter Cave → No"],
    ending: "peacefulWalk",
  },
];

const GALLERY_SCENES = [
  {
    id: "beach",
    title: "The Shore",
    description: "Where your journey begins—sun, sand, and the sound of waves.",
    scene: "beach",
  },
  {
    id: "chest",
    title: "The Pirate's Chest",
    description: "An old wooden chest buried beneath the beach.",
    scene: "chest",
  },
  {
    id: "map",
    title: "The Treasure Map",
    description: "A weathered route pointing across the sea to a hidden island.",
    scene: "map",
  },
  {
    id: "island",
    title: "The Hidden Island",
    description: "A mist-covered island protected by two mysterious guards.",
    scene: "island",
  },
  {
    id: "cave",
    title: "The Dark Cave",
    description: "A damp passage connecting the beach to secrets underground.",
    scene: "cave-entrance",
  },
  {
    id: "treasure",
    title: "The Hidden Chamber",
    description: "An ancient collection of treasure concealed beneath the cliffs.",
    scene: "treasure-chamber",
  },
  {
    id: "den",
    title: "The Guardian's Den",
    description: "A warm, peaceful refuge hidden deep inside the cave.",
    scene: "animal-den",
  },
  {
    id: "sunset",
    title: "The Peaceful Shore",
    description: "A quiet ending—and the promise of another adventure.",
    scene: "beach-sunset",
  },
];

export {
  ENDINGS as E,
  GALLERY_SCENES as G,
  PERSONALIZATION_QUESTIONS as P,
  STORY_NODES as S,
  STORYLINES as a,
};
