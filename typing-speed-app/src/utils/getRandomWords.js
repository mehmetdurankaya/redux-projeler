import { words as data } from '../data/data';

export const getRandomWords = (language) => {
  const languageList = ['turkish', 'english'];
  if (!languageList.includes(language)) {
    return [];
  }
  const words = data
    .sort(() => Math.random() - 0.5)
    .slice(0, 50)
    .map((word) => ({
      word: word[language],
      color: 'black',
    }));

  return words;
};
