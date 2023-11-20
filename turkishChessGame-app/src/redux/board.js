import { nanoid } from "@reduxjs/toolkit"
export const board = []
for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
        if ((i + j) % 2 === 0) {
            board.push({ id: nanoid(), color: "white", haveStone: false, x: i, y: j, chosen: false })
        } else {
            board.push({ id: nanoid(), color: "black", haveStone: false, x: i, y: j, chosen: false })
        }

    }

}

export const whiteStones = board.filter(c => c.x === 6 || c.x === 7).map(s => {
    s.haveStone = true
    return { id: nanoid(), x: s.x, y: s.y, onMove: false, isActive: false, stoneColor: "white", superStone: false }
})
export const blackStones = board.filter(c => c.x === 2 || c.x === 3).map(s => {
    s.haveStone = true
    return { id: nanoid(), x: s.x, y: s.y, onMove: false, isActive: false, stoneColor: "black", superStone: false }
})
