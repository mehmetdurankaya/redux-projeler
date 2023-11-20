import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementTimeLeft } from '../../redux/typingSpeedSlice';
import { formatTime } from '../../utils/formatTime';

const Timer = () => {
  const dispatch = useDispatch();
  const isFinished = useSelector((state) => state.typingSpeed.isFinished);
  const timer = useSelector((state) => state.typingSpeed.timer);

  useEffect(() => {
    if (isFinished) {
      const interval = window.setInterval(() => {
        dispatch(decrementTimeLeft());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isFinished, dispatch]);

  return (
    <div className='d-flex align-items-center'>
      <div className='btn btn-dark me-2'>
        <span className='fs-4'>{formatTime(timer)}</span>
      </div>
    </div>
  );
};

export default Timer;
