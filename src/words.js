const WORDS = {
  4: [
    "ARAP",
    "PARA",
    "SAAT",
    "AAAA",
    "BBBB",
    "CCCC",
    "DDDD",
    "EEEE",
    "FFFF",
    "GGGG",
    "HHHH",
    "1122",
  ],
  5: [],
  6: [],
  7: [],
};

export const getRandomWord = (length) => {
  const randomIndex = Math.floor(Math.random() * WORDS[length].length);
  return WORDS[length][randomIndex];
};
