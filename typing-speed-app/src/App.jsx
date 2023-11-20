import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Header from './components/Header';
import WordDisplay from './components/WordDisplay';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import Footer from './components/Footer';

const App = () => {
  const { timer } = useSelector((state) => state.typingSpeed);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (timer === 0) {
      setShowConfetti(true);
      timeoutId = setTimeout(() => setShowConfetti(false), 7000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timer]);

  let resultOrConfetti = null;
  if (timer === 0) {
    resultOrConfetti = (
      <>
        <Results />
        {showConfetti && <Confetti width={width} height={height} />}
      </>
    );
  }

  return (
    <>
      <Header />
      <main className='main container'>
        <WordDisplay />
        <TypingArea />
        {resultOrConfetti}
      </main>
      <Footer />
    </>
  );
};

export default App;
