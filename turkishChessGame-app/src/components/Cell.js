

import { useDispatch, useSelector } from 'react-redux'
import { getWhiteActive, getBlackActive, MoveStone } from "../redux/gameslicer"
function Cell({ cell }) {
    const whiteStones = useSelector(state => state.game.whiteStones);
    const blackStones = useSelector(state => state.game.blackStones);


    function handleMove(cell) {
        if (cell.haveStone) return
        if (!cell.chosen) return
        dispatch(MoveStone(cell))
    }

    const dispatch = useDispatch();

    return (
        <div onClick={() => { handleMove(cell) }} className={`${cell.chosen ? "green" : ""} cell ${cell.color === "black" ? "black" : "white"}`} id={cell.id} key={cell.id}>
            {
                whiteStones.map(f => (f.x === cell.x && f.y === cell.y) ? <div onClick={() => { dispatch(getWhiteActive(f)) }} className={`whitestone ${f.isActive ? "active" : null} ${f.superStone ? "super" : null}`} key={f.id} id={f.id}></div> : null)
            }
            {blackStones.map(f => (f.x === cell.x && f.y === cell.y) ? <div className={`blackstone ${f.isActive ? "active" : null} ${f.superStone ? "super" : null}`} onClick={() => { dispatch(getBlackActive(f)) }} key={f.id} id={f.id}></div> : null)}
        </div >
    )
}

export default Cell