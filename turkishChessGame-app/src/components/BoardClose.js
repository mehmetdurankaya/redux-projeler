import { useSelector } from "react-redux"

function BoardClose() {
    const userOne = useSelector(state => state.game.userOne);
    const userTwo = useSelector(state => state.game.userTwo);
    return (
        <div className='boardclose'>
            <div className='note'>
                {((userOne.name === "User1") || (userTwo.name === "User2")) && "Gamer names entry and start"}
                {(userOne.stones < 1) && (userTwo.stones !== 0) && "Black wins"}
                {(userTwo.stones < 1) && (userOne.stones !== 0) && "white wins"}
                {(userTwo.stones === 1) && (userOne.stones === 1) && "No wins"}
                <button className="btn btn-success d-block m-auto fw-bolder" onClick={() => { document.location.reload(); }}>Reset</button>
            </div>
        </div>
    )
}

export default BoardClose