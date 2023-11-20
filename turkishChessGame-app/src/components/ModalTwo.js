import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserTwo } from "../redux/gameslicer"
function ModalTwo() {

    const [nameTwo, setnameTwo] = useState();
    const dispatch = useDispatch();
    function handleSubmitTwo(e) {
        e.preventDefault();
        if (!nameTwo) return
        dispatch(getUserTwo(nameTwo));
        document.querySelector(".form-control").value = ""
    }
    return (
        <>
            <button type="button" className="btn btn-danger h-100 rounded-0 p-0 m-0" data-bs-toggle="modal" data-bs-target="#exampleModalTwo">
                Give me User2 Name
            </button>
            <div className="modal fade" id="exampleModalTwo" tabIndex="-1" aria-labelledby="exampleModalTwo" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Say Your Name</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmitTwo(e)}>
                                <input type="text" className='form-control' onChange={(e) => setnameTwo(e.target.value)} />
                                <div className='text-end'><button data-bs-dismiss="modal" className='btn btn-danger w-25 mt-3'>evet</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalTwo