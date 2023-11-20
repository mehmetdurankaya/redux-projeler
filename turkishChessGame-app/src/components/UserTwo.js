import ModalTwo from "./ModalTwo"
import { useSelector } from "react-redux"
function UserTwo() {
    const userTwo = useSelector(state => state.game.userTwo);

    return (
        <div className='usertwo bg-dark p-0 m-0 '>
            {userTwo.name === "User2" && <ModalTwo />}
            {userTwo.name !== "User2" &&
                <div>
                    <h3 className='text-center mt-3 text-light text-uppercase'>{userTwo.name}</h3>
                    <h3 className='text-center mt-3 text-light fw-bold'>{userTwo.stones}</h3>
                </div>}
        </div>
    )
}

export default UserTwo;