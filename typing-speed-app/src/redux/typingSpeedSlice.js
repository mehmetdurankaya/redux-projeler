import { createSlice } from '@reduxjs/toolkit';
import { getRandomWords } from '../utils/getRandomWords';

const initialState = {
  language: 'turkish',
  wordsList: getRandomWords('turkish'),
  currentWord: {
    index: 0,
    backgroundColor: '#99b4bf',
  },
  correctWordCount: 0,
  incorrectWordCount: 0,
  isFinished: false,
  totalKeyPress: 0,
  correctKeyPress: 0,
  timer: 60,
};

const typingSpeedSlice = createSlice({
  name: 'typingSpeed',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.wordsList = getRandomWords(action.payload);
      state.currentWord.index = 0;
      state.currentWord.backgroundColor = '#99b4bf';
    },
    checkTypedWord: (state, action) => {
      const { wordsList, currentWord } = state;
      const { index } = currentWord;
      const typedWord = action.payload;
      const currentWordObj = wordsList[index];

      state.totalKeyPress += 1;
      if (!state.isFinished) state.isFinished = true;

      if (currentWordObj.word.startsWith(typedWord)) {
        state.correctKeyPress += 1;
        state.currentWord.backgroundColor =
          currentWordObj.backgroundColor === 'red'
            ? '#99b4bf'
            : currentWordObj.backgroundColor;
      } else {
        state.currentWord.backgroundColor = 'red';
      }
    },
    updateWordState: (state, action) => {
      state.totalKeyPress += 1;
      const currentWord = state.wordsList[state.currentWord.index].word;
      const typedWord = action.payload;

      if (currentWord === typedWord) {
        state.wordsList[state.currentWord.index].color = 'green';
        state.correctWordCount += 1;
        state.correctKeyPress += 1;
      } else {
        state.wordsList[state.currentWord.index].color = 'red';
        state.incorrectWordCount += 1;
      }

      state.currentWord.backgroundColor = '#99b4bf';

      if (state.currentWord.index === state.wordsList.length - 1) {
        state.wordsList = getRandomWords(state.language);
        state.currentWord.index = 0;
      } else {
        state.currentWord.index += 1;
      }
    },
    resetGame: (state) => {
      state.wordsList = getRandomWords(state.language);
      state.currentWord.index = 0;
      state.currentWord.backgroundColor = '#99b4bf';
      if (state.isFinished) {
        state.correctWordCount = 0;
        state.incorrectWordCount = 0;
        state.isFinished = false;
        state.totalKeyPress = 0;
        state.correctKeyPress = 0;
        state.timer = 60;
        state.isModalOpen = false;
      }
    },
    decrementTimeLeft: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
  },
});

export const {
  setLanguage,
  checkTypedWord,
  updateWordState,
  resetGame,
  decrementTimeLeft,
} = typingSpeedSlice.actions;

export default typingSpeedSlice.reducer;
