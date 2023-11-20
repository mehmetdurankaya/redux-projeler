import React from 'react';
import { useSelector } from 'react-redux';

const Results = () => {
  const {
    correctKeyPress,
    totalKeyPress,
    correctWordCount,
    incorrectWordCount,
  } = useSelector((state) => state.typingSpeed);

  const calculateWpm = () => {
    const wpm = (correctKeyPress / 5).toFixed(0);
    return wpm;
  };

  const calculateAccuracyRate = () => {
    let accuracyRate = 0;
    if (totalKeyPress > 0) {
      accuracyRate = ((correctKeyPress / totalKeyPress) * 100).toFixed(2);
    }
    return accuracyRate;
  };

  return (
    <section className='row justify-content-md-center my-2'>
      <div className='col-auto col-md-10'>
        <div className='card border-0 shadow' style={{ width: '20rem' }}>
          <div className='card-header bg-primary text-light fs-6'>Sonuç</div>
          <ul className='list-group my-list-group text-dark fs-6'>
            <li className='list-group-item p-md-3 p-2 text-center fw-bold fs-3 fs-md-1 text-success'>
              {calculateWpm()} WPM
            </li>
            <li className='list-group-item'>
              <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='d'>Tuş vuruşu</div>
                <span>{totalKeyPress}</span>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='d'>Doğruluk</div>
                <span>{calculateAccuracyRate()}%</span>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='d'>Doğru Kelime</div>
                <span className='text-warning fw-bold'>{correctWordCount}</span>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='d'>Yanlış Kelime</div>
                <span className='text-danger fw-bold'>
                  {incorrectWordCount}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Results;
