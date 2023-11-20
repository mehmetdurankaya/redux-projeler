import React from 'react';
import { useSelector } from 'react-redux';
import SelectLang from '../SelectLang';

const WordDisplay = () => {
  const wordsList = useSelector((state) => state.typingSpeed.wordsList);
  const current = useSelector((state) => state.typingSpeed.currentWord);

  return (
    <section className='row justify-content-md-center'>
      <div className='col-auto col-md-10'>
        <SelectLang />
        <div className='card my-2'>
          <div className='card-body h-100 p-3 text-left overflow-auto'>
            {wordsList.map((word, index) => (
              <span key={index}>
                <span
                  className='p-2 fw-medium fs-5 text-nowrap'
                  style={{
                    backgroundColor:
                      index === current.index ? current.backgroundColor : '',
                    color: word.color,
                  }}
                >
                  {word.word}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordDisplay;
