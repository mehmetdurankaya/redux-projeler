import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestartButton from '../RestartButton';
import Timer from '../Timer';
import {
  checkTypedWord,
  updateWordState,
  resetGame,
} from '../../redux/typingSpeedSlice';

const TypingArea = ({ handleTimerEnd }) => {
  const [typedWord, setTypedWord] = useState('');

  const dispatch = useDispatch();
  const timer = useSelector((state) => state.typingSpeed.timer);

  const handleInputChange = (e) => {
    if (e.target.value.endsWith(' ')) {
      dispatch(updateWordState(e.target.value.slice(0, -1)));
      setTypedWord('');
    } else {
      dispatch(checkTypedWord(e.target.value));
      setTypedWord(e.target.value);
    }
  };

  const handleRestartClick = () => {
    setTypedWord('');
    dispatch(resetGame());
  };

  return (
    <section className='row justify-content-md-center'>
      <div className='col col-md-10 d-flex justify-content-between'>
        <input
          className='form-control form-control-lg me-2'
          type='text'
          value={typedWord}
          onChange={handleInputChange}
          disabled={timer === 0}
        />
        <Timer />
        <RestartButton handleRestartClick={handleRestartClick} />
      </div>
    </section>
  );
};

export default TypingArea;
