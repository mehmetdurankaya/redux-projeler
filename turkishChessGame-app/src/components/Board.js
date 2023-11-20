import React from 'react'

import { useSelector } from "react-redux"
import Cell from './Cell'
function Board() {
    const board = useSelector(state => state.game.board)
    return (
        <>
            <div className='board'>
                {board.map(cell => {
                    return (
                        <Cell cell={cell} key={cell.id} />
                    )
                })}
            </div>

        </>

    )
}

export default Board