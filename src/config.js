// ===================================================
// BIRTHDAY SURPRISE - MASTER CONFIGURATION
// Edit everything here. Do NOT touch animation logic.
// ===================================================

// ---- ACCESS GATE ----
export const SECRET_CODE = "10102006";
export const SECRET_CLUE =
  "Your secret code is your BF's favorite person's birthdate in DDMMYYYY format. 😉";
export const GIRLFRIEND_NAME = "Riddhuuuu";
export const WRONG_CODE_MESSAGES = [
  "Oops! That's not it 😝 Try again!",
  "Hmm... not quite 🙈 Try once more!",
  "Noppeee 😂 That's not the magic number!",
  "So close but nooo 🥺 Try again!",
];

// ---- BALLOONS (each balloon reveals ONE word, together they form a sentence) ----
export const BALLOON_SENTENCE = "You make my world beautiful ❤️";
export const BALLOONS = [
  { id: 1, colorAlt: "#fda4af", word: "You", emoji: "💗" },
  { id: 2, colorAlt: "#c4b5fd", word: "make", emoji: "💜" },
  { id: 3, colorAlt: "#fecdd3", word: "my", emoji: "💕" },
  { id: 4, colorAlt: "#fb7185", word: "world", emoji: "🌎" },
  { id: 5, colorAlt: "#e8a0bf", word: "beautiful ❤️", emoji: "✨" },
];

// ---- EARLY PHOTO SURPRISES (shown during balloon scene) ----
export const EARLY_PHOTOS = [
  { src: "/assets/photos/photo1.jpg", caption: "My favorite smile ❤️" },
  { src: "/assets/photos/photo2.jpg", caption: "How are you this cute? 🥰" },
];
export const PHOTO_REVEAL_AFTER = 2;

// ---- BOUQUET / MESSAGE CARDS (4-5 romantic popup messages) ----
export const ROMANTIC_MESSAGES = [
  "Forever yours ❤️",
  "You make my world beautiful 🌎💗",
  "You are my sunshine ☀️",
  "You are my favorite person 🥰",
  `Happy Birthday ${GIRLFRIEND_NAME} 🎂❤️`,
];

// ---- LOVE LETTER ----
export const LOVE_LETTER_PARAGRAPHS = [
  "Happy Birthday to the cutest person in my world! 🥰",
  "I don't know if words can ever explain how special you are to me...",
  "You have brought so much happiness, love and beautiful memories into my life.",
  "Your smile is one of my favorite things in this world.",
  "Thank you for being you.",
  "I hope this new year of your life brings you everything your heart wishes for.",
  "I hope I get to celebrate many, many more birthdays with you.",
  "Keep smiling, keep shining and always remember how deeply you are loved. ❤️",
  "With all my love, Your Special Someone 💗",
];
export const TYPING_SPEED = 35;
export const PARAGRAPH_PAUSE = 800;

// ---- PHOTO MEMORIES ----
export const PHOTO_MEMORIES = [
  { src: "/assets/photos/photo1.jpg", caption: "My favorite smile ❤️" },
  { src: "/assets/photos/photo2.jpg", caption: "How can someone be this cute? 🥺" },
  { src: "/assets/photos/photo3.jpg", caption: "One of my favorite memories 💗" },
  { src: "/assets/photos/photo4.jpg", caption: "This day was so special 🥰" },
  { src: "/assets/photos/photo5.jpg", caption: "You looking absolutely beautiful ✨" },
  { src: "/assets/photos/photo6.jpg", caption: "Can I keep this moment forever? 🥺❤️" },
  { src: "/assets/photos/photo7.jpg", caption: "Pure happiness right here 💕" },
  { src: "/assets/photos/photo8.jpg", caption: "You and me, always 🥰💗" },
];
export const PHOTO_MESSAGES = [
  { afterIndex: 1, text: "Still can't believe I got someone this cute 😭❤️" },
  { afterIndex: 3, text: "Okay, this one is definitely one of my favorites 🥰" },
  { afterIndex: 5, text: "Your smile >>> everything ❤️" },
  { afterIndex: 7, text: "Can I just keep this moment forever? 🥺" },
];
export const SPECIAL_PHOTO_INDEX = 5;

// ---- FINAL GIFT ----
export const FINAL_GIFT_HEADING = "🎁 One Last Little Gift 🎁";
export const FINAL_GIFT_MESSAGES = [
  "Lots of love for you ❤️",
  `Once again, Happy Birthday ${GIRLFRIEND_NAME}! 🎂🥰`,
  "I hope you liked this little surprise I made just for you.",
  "You deserve all the happiness in the world. ❤️",
  "Keep smiling, keep shining and always remember that you are very special to me. 💗",
];

// ---- AUDIO (place files in /public/assets/audio/) ----
export const AUDIO = {
  music: "/assets/audio/music.mp3",
  balloonPop: "/assets/audio/balloon-pop.mp3",
  candleBlow: "/assets/audio/candle-blow.mp3",
  envelopeOpen: "/assets/audio/envelope-open.mp3",
  celebration: "/assets/audio/celebration.mp3",
};

// ---- SCENE IDS ----
export const SCENES = {
  PRIVATE_ACCESS: "PRIVATE_ACCESS",
  WELCOME: "WELCOME",
  YES_NO: "YES_NO",
  BALLOON: "BALLOON",
  CAKE: "CAKE",
  WISH: "WISH",
  BOUQUET: "BOUQUET",
  ENVELOPE: "ENVELOPE",
  LOVE_LETTER: "LOVE_LETTER",
  PHOTO_MEMORIES: "PHOTO_MEMORIES",
  FINAL_GIFT: "FINAL_GIFT",
};
