
import Modal from './Modal';
import { useSelector } from "react-redux"
function UserOne() {
    const userOne = useSelector(state => state.game.userOne);

    return (
        <>

            <div className='userone bg-light m-0 p-0'>
                {userOne.name === "User1" && <Modal />}
                {userOne.name !== "User1" &&
                    <div>
                        <h3 className='text-center mt-3 text-dark text-uppercase'>{userOne.name}</h3>
                        <h3 className='text-center mt-3 text-dark fw-bold'>{userOne.stones}</h3>
                    </div>}
            </div>
        </>

    )
}

export default UserOne