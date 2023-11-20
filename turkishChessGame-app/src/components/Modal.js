import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserOne } from "../redux/gameslicer"
function Modal() {

    const [name, setname] = useState();
    const dispatch = useDispatch();
    function handleSubmit(e) {

        e.preventDefault();
        if (!name) return
        dispatch(getUserOne(name));
        document.querySelector(".form-control").value = ""
    }
    return (
        <>
            <button type="button" className="btn btn-primary h-100 rounded-0 p-0 m-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Give me User1 Name
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Say Your Name</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} />
                                <div className='text-end'><button data-bs-dismiss="modal" className='btn btn-primary w-25 mt-3'>evet</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal