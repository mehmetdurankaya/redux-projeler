
import './App.css';
import Board from './components/Board';
import UserOne from './components/UserOne';
import UserTwo from './components/UserTwo';
import { useSelector } from "react-redux"
import BoardClose from './components/BoardClose';
function App() {
  const userOne = useSelector(state => state.game.userOne);
  const userTwo = useSelector(state => state.game.userTwo);

  return (
    <>
      <div className='App' style={{ backgroundColor: `${userOne.inTurn ? "white" : "black"}` }}>

        <UserOne />
        {((userOne.name === "User1") || (userTwo.name === "User2")) && < BoardClose />}
        {(userOne.stones < 1) && < BoardClose />}
        {(userTwo.stones < 1) && < BoardClose />}
        {(userTwo.stones === 1) && (userOne.stones === 1) && < BoardClose />}
        <Board />
        <UserTwo />
      </div>

    </>

  );
}

export default App;
