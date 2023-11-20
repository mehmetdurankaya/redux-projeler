import { createSlice, nanoid } from "@reduxjs/toolkit";
import { board, blackStones, whiteStones } from "./board";

const gameslicer = createSlice({
    name: "game",
    initialState: {
        board: board,
        userOne: { id: 1, name: "User1", color: "white", stones: 16, inTurn: true },
        userTwo: { id: 2, name: "User2", color: "black", stones: 16, inTurn: false },
        whiteStones: whiteStones,
        blackStones: blackStones,
        activeWhiteStone: "",
        activeBlackStone: "",
        MoveUp: "",
        MoveLeft: "",
        MoveRight: "",
        target: "",
        removeStone: "",
        superX: "",
        superY: "",
        sameStoneY: "",
        sameStoneX: "",
        diffStoneY: "",
        diffStoneX: ""


    },
    reducers: {
        getUserOne(state, action) {
            state.userOne.name = action.payload
        },
        getUserTwo(state, action) {
            state.userTwo.name = action.payload
        },

        getWhiteActive(state, action) {
            if (state.userOne.inTurn) {
                state.activeBlackStone = ""
                state.whiteStones.map(w => w.isActive = false)
                state.board.map(w => w.chosen = false)
                state.blackStones.map(b => b.isActive = false)
                state.activeWhiteStone = state.whiteStones.filter(w => w.id === action.payload.id);
                state.activeWhiteStone[0].isActive = true;

                if (!action.payload.superStone) {
                    state.MoveUp = state.board.filter(c => c.x === state.activeWhiteStone[0].x - 1 && c.y === state.activeWhiteStone[0].y && c.haveStone === false)[0] || (state.board.filter(c => c.x === state.activeWhiteStone[0].x - 2 && c.y === state.activeWhiteStone[0].y && c.haveStone === false)[0])
                    state.MoveLeft = state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.y === state.activeWhiteStone[0].y - 1 && c.haveStone === false)[0] || (state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.y === state.activeWhiteStone[0].y - 2 && c.haveStone === false)[0])
                    state.MoveRight = state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.y === state.activeWhiteStone[0].y + 1 && c.haveStone === false)[0] || (state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.y === state.activeWhiteStone[0].y + 2 && c.haveStone === false)[0])
                    if (state.MoveUp && !state.whiteStones.filter(w => w.x === state.activeWhiteStone[0].x - 1 && w.y === state.activeWhiteStone[0].y)[0]) state.MoveUp.chosen = true
                    if (state.MoveLeft && !state.whiteStones.filter(w => w.x === state.activeWhiteStone[0].x && w.y === state.activeWhiteStone[0].y - 1)[0]) state.MoveLeft.chosen = true
                    if (state.MoveRight && !state.whiteStones.filter(w => w.x === state.activeWhiteStone[0].x && w.y === state.activeWhiteStone[0].y + 1)[0]) state.MoveRight.chosen = true
                }
                if (action.payload.superStone) {
                    state.sameStoneY = state.whiteStones.filter(w => w.y === state.activeWhiteStone[0].y && w.x !== state.activeWhiteStone[0].x)
                    state.sameStoneX = state.whiteStones.filter(w => w.x === state.activeWhiteStone[0].x && w.y !== state.activeWhiteStone[0].y)
                    state.diffStoneY = state.blackStones.filter(b => b.y === state.activeWhiteStone[0].y)
                    state.diffStoneX = state.blackStones.filter(b => b.x === state.activeWhiteStone[0].x)

                    /*state.superX = state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.haveStone === false);*/
                    /*state.superY = state.board.filter(c => c.y === state.activeWhiteStone[0].y && c.haveStone === false);*/


                    if (!state.diffStoneY.length) {
                        if (state.sameStoneY.length) {
                            if (state.activeWhiteStone[0].x < state.sameStoneY[0].x) {
                                state.superY = state.board.filter(c => c.x < state.sameStoneY[0].x && c.haveStone === false && c.y === state.sameStoneY[0].y);

                            }
                            if (state.activeWhiteStone[0].x > state.sameStoneY[state.sameStoneY.length - 1].x) {
                                state.superY = state.board.filter(c => c.x > state.sameStoneY[state.sameStoneY.length - 1].x && c.haveStone === false && c.y === state.sameStoneY[state.sameStoneY.length - 1].y)
                            }
                            if ((state.activeWhiteStone[0].x < state.sameStoneY[state.sameStoneY.length - 1].x && state.activeWhiteStone[0].x > state.sameStoneY[0].x) && state.sameStoneY.length > 1) {
                                state.superY = state.board.filter(c => c.x < state.sameStoneY[state.sameStoneY.length - 1].x && c.x > state.sameStoneY[0].x && c.haveStone === false && c.y === state.sameStoneY[state.sameStoneY.length - 1].y)
                            }
                            if ((state.activeWhiteStone[0].x > state.sameStoneY[state.sameStoneY.length - 1].x && state.activeWhiteStone[0].x < state.sameStoneY[0].x) && state.sameStoneY.length > 1) {
                                state.superY = state.board.filter(c => c.x > state.sameStoneY[state.sameStoneY.length - 1].x && c.x < state.sameStoneY[0].x && c.haveStone === false && c.y === state.sameStoneY[state.sameStoneY.length - 1].y)
                            }

                        };
                    }
                    if (state.diffStoneY.length) {
                        if (state.activeWhiteStone[0].x < state.diffStoneY[0].x) {
                            state.superY = state.board.filter(c => c.x > state.diffStoneY[0].x && c.haveStone === false && c.y === state.activeWhiteStone[0].y);
                        }
                        if (state.activeWhiteStone[0].x > state.diffStoneY[state.diffStoneY.length - 1].x) {
                            state.superY = state.board.filter(c => c.x < state.diffStoneY[state.diffStoneY.length - 1].x && c.haveStone === false && c.y === state.activeWhiteStone[0].y)
                        }
                        if ((state.activeWhiteStone[0].x < state.diffStoneY[state.diffStoneY.length - 1].x && state.activeWhiteStone[0].x > state.diffStoneY[0].x) && state.diffStoneY.length > 1) {
                            state.superY = state.board.filter(c => (c.x > state.diffStoneY[state.diffStoneY.length - 1].x || c.x < state.diffStoneY[0].x) && c.haveStone === false && c.y === state.activeWhiteStone[0].y)
                        }
                        if ((state.activeWhiteStone[0].x > state.diffStoneY[state.diffStoneY.length - 1].x && state.activeWhiteStone[0].x < state.diffStoneY[0].x) && state.diffStoneY.length > 1) {
                            state.superY = state.board.filter(c => (c.x < state.diffStoneY[state.diffStoneY.length - 1].x || c.x > state.diffStoneY[0].x) && c.haveStone === false && c.y === state.activeWhiteStone[0].y)
                        }
                    }

                    if (!state.diffStoneX.length) {

                        if (state.sameStoneX.length) {
                            //ssx
                            if (state.activeWhiteStone[0].y < state.sameStoneX[0].y) {
                                state.superX = state.board.filter(c => c.y < state.sameStoneX[0].y && c.haveStone === false && c.x === state.activeWhiteStone[0].x)

                            }
                            if (state.activeWhiteStone[0].y > state.sameStoneX[state.sameStoneX.length - 1].y) {
                                state.superX = state.board.filter(c => c.y > state.sameStoneX[state.sameStoneX.length - 1].y && c.haveStone === false && c.x === state.activeWhiteStone[0].x)

                            }
                            if ((state.activeWhiteStone[0].y < state.sameStoneX[state.sameStoneX.length - 1].y && state.activeWhiteStone[0].y > state.sameStoneX[0].y) && state.sameStoneX.length > 1) {
                                state.superX = state.board.filter(c => c.y < state.sameStoneX[state.sameStoneX.length - 1].y && c.y > state.sameStoneX[0].y && c.haveStone === false && c.x === state.activeWhiteStone[0].x)
                            }
                            if ((state.activeWhiteStone[0].y > state.sameStoneX[state.sameStoneX.length - 1].y && state.activeWhiteStone[0].y < state.sameStoneX[0].y) && state.sameStoneX.length > 1) {
                                state.superX = state.board.filter(c => c.y > state.sameStoneX[state.sameStoneX.length - 1].y && c.y < state.sameStoneX[0].y && c.haveStone === false && c.x === state.activeWhiteStone[0].x)
                            }
                        }
                    }
                    if (state.diffStoneX.length) {
                        if (state.activeWhiteStone[0].y < state.diffStoneX[0].y) {
                            state.superX = state.board.filter(c => c.y > state.diffStoneX[0].y && c.haveStone === false && c.x === state.activeWhiteStone[0].x)

                        }
                        if (state.activeWhiteStone[0].y > state.diffStoneX[state.diffStoneX.length - 1].y) {
                            state.superX = state.board.filter(c => c.y < state.diffStoneX[state.diffStoneX.length - 1].y && c.haveStone === false && c.x === state.activeWhiteStone[0].x)

                        }
                        if ((state.activeWhiteStone[0].y < state.diffStoneX[state.diffStoneX.length - 1].y && state.activeWhiteStone[0].y > state.diffStoneX[0].y) && state.diffStoneX.length > 1) {
                            state.superX = state.board.filter(c => (c.y > state.diffStoneX[state.diffStoneX.length - 1].y || c.y < state.diffStoneX[0].y) && c.haveStone === false && c.x === state.activeWhiteStone[0].x)

                        }
                        if ((state.activeWhiteStone[0].y > state.diffStoneX[state.diffStoneX.length - 1].y && state.activeWhiteStone[0].y < state.diffStoneX[0].y) && state.diffStoneX.length > 1) {
                            state.superX = state.board.filter(c => (c.y < state.diffStoneX[state.diffStoneX.length - 1].y || c.y > state.diffStoneX[0].y) && c.haveStone === false && c.x === state.activeWhiteStone[0].x)

                        }
                    }


                    if (!state.sameStoneY.length && !state.diffStoneY.length) {
                        state.superY = state.board.filter(c => c.y === state.activeWhiteStone[0].y && c.haveStone === false)
                    }
                    if (!state.sameStoneX.length && !state.diffStoneX.length) {
                        state.superX = state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.haveStone === false);

                    }
                    if (state.superX) {
                        state.superX.forEach(x => x.chosen = true)
                    }
                    if (state.superY) {
                        state.superY.forEach(y => y.chosen = true)
                    }



                }

            }

        },
        getBlackActive(state, action) {
            if (state.userTwo.inTurn) {
                state.activeWhiteStone = ""
                state.board.map(w => w.chosen = false)
                state.whiteStones.map(w => w.isActive = false)
                state.blackStones.map(b => b.isActive = false)
                state.activeBlackStone = state.blackStones.filter(w => w.id === action.payload.id);
                state.activeBlackStone[0].isActive = true;

                if (!action.payload.superStone) {
                    state.MoveUp = (state.board.filter(c => c.x === state.activeBlackStone[0].x + 1 && c.y === state.activeBlackStone[0].y && c.haveStone === false)[0]) || ((state.board.filter(c => c.x === state.activeBlackStone[0].x + 2 && c.y === state.activeBlackStone[0].y && c.haveStone === false)[0]))
                    state.MoveLeft = state.board.filter(c => c.x === state.activeBlackStone[0].x && c.y === state.activeBlackStone[0].y - 1 && c.haveStone === false)[0] || (state.board.filter(c => c.x === state.activeBlackStone[0].x && c.y === state.activeBlackStone[0].y - 2 && c.haveStone === false)[0])
                    state.MoveRight = state.board.filter(c => c.x === state.activeBlackStone[0].x && c.y === state.activeBlackStone[0].y + 1 && c.haveStone === false)[0] || (state.board.filter(c => c.x === state.activeBlackStone[0].x && c.y === state.activeBlackStone[0].y + 2 && c.haveStone === false)[0])
                    if (state.MoveUp && !state.blackStones.filter(w => w.x === state.activeBlackStone[0].x + 1 && w.y === state.activeBlackStone[0].y)[0]) state.MoveUp.chosen = true
                    if (state.MoveLeft && !state.blackStones.filter(w => w.x === state.activeBlackStone[0].x && w.y === state.activeBlackStone[0].y - 1)[0]) state.MoveLeft.chosen = true
                    if (state.MoveRight && !state.blackStones.filter(w => w.x === state.activeBlackStone[0].x && w.y === state.activeBlackStone[0].y + 1)[0]) state.MoveRight.chosen = true
                }
                if (action.payload.superStone) {
                    state.sameStoneY = state.blackStones.filter(w => w.y === state.activeBlackStone[0].y && w.x !== state.activeBlackStone[0].x)
                    state.sameStoneX = state.blackStones.filter(w => w.x === state.activeBlackStone[0].x && w.y !== state.activeBlackStone[0].y)
                    /*state.superX = state.board.filter(c => c.x === state.activeWhiteStone[0].x && c.haveStone === false);*/
                    /*state.superY = state.board.filter(c => c.y === state.activeWhiteStone[0].y && c.haveStone === false);*/
                    state.diffStoneY = state.whiteStones.filter(b => b.y === state.activeBlackStone[0].y)
                    state.diffStoneX = state.whiteStones.filter(b => b.x === state.activeBlackStone[0].x)
                    if (!state.diffStoneY.length) {
                        if (state.sameStoneY.length) {
                            if (state.activeBlackStone[0].x < state.sameStoneY[0].x) {
                                state.superY = state.board.filter(c => c.x < state.sameStoneY[0].x && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                            }
                            if (state.activeBlackStone[0].x > state.sameStoneY[state.sameStoneY.length - 1].x) {
                                state.superY = state.board.filter(c => c.x > state.sameStoneY[state.sameStoneY.length - 1].x && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                            }
                            if ((state.activeBlackStone[0].x < state.sameStoneY[state.sameStoneY.length - 1].x && state.activeBlackStone[0].x > state.sameStoneY[0].x) && state.sameStoneY.length > 1) {
                                state.superY = state.board.filter(c => c.x < state.sameStoneY[state.sameStoneY.length - 1].x && c.x > state.sameStoneY[0].x && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                            }
                            if ((state.activeBlackStone[0].x > state.sameStoneY[state.sameStoneY.length - 1].x && state.activeBlackStone[0].x < state.sameStoneY[0].x) && state.sameStoneY.length > 1) {
                                state.superY = state.board.filter(c => c.x > state.sameStoneY[state.sameStoneY.length - 1].x && c.x < state.sameStoneY[0].x && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                            }

                        }
                    }
                    if (state.diffStoneY.length) {
                        if (state.activeBlackStone[0].x < state.diffStoneY[0].x) {
                            state.superY = state.board.filter(c => c.x > state.diffStoneY[0].x && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                        }
                        if (state.activeBlackStone[0].x > state.diffStoneY[state.diffStoneY.length - 1].x) {
                            state.superY = state.board.filter(c => c.x < state.diffStoneY[state.diffStoneY.length - 1].x && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                        }
                        if ((state.activeBlackStone[0].x < state.diffStoneY[state.diffStoneY.length - 1].x && state.activeBlackStone[0].x > state.diffStoneY[0].x) && state.diffStoneY.length > 1) {
                            state.superY = state.board.filter(c => (c.x > state.diffStoneY[state.diffStoneY.length - 1].x || c.x < state.diffStoneY[0].x) && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                        }
                        if ((state.activeBlackStone[0].x > state.diffStoneY[state.diffStoneY.length - 1].x && state.activeBlackStone[0].x < state.diffStoneY[0].x) && state.diffStoneY.length > 1) {
                            state.superY = state.board.filter(c => (c.x < state.diffStoneY[state.diffStoneY.length - 1].x || c.x > state.diffStoneY[0].x) && c.haveStone === false && c.y === state.activeBlackStone[0].y)
                        }
                    }
                    if (!state.diffStoneX.length) {
                        if (state.sameStoneX.length) {
                            //ssx
                            if (state.activeBlackStone[0].y < state.sameStoneX[0].y) {
                                state.superX = state.board.filter(c => c.y < state.sameStoneX[0].y && c.haveStone === false && c.x === state.activeBlackStone[0].x)

                            }
                            if (state.activeBlackStone[0].y > state.sameStoneX[state.sameStoneX.length - 1].y) {
                                state.superX = state.board.filter(c => c.y > state.sameStoneX[state.sameStoneX.length - 1].y && c.haveStone === false && c.x === state.activeBlackStone[0].x)

                            }
                            if ((state.activeBlackStone[0].y < state.sameStoneX[state.sameStoneX.length - 1].y && state.activeBlackStone[0].y > state.sameStoneX[0].y) && state.sameStoneX.length > 1) {
                                state.superX = state.board.filter(c => (c.y < state.sameStoneX[state.sameStoneX.length - 1].y && c.y > state.sameStoneX[0].y) && c.haveStone === false && c.x === state.activeBlackStone[0].x)
                            }
                            if ((state.activeBlackStone[0].y > state.sameStoneX[state.sameStoneX.length - 1].y && state.activeBlackStone[0].y < state.sameStoneX[0].y) && state.sameStoneX.length > 1) {
                                state.superX = state.board.filter(c => (c.y > state.sameStoneX[state.sameStoneX.length - 1].y && c.y < state.sameStoneX[0].y) && c.haveStone === false && c.x === state.activeBlackStone[0].x)
                            }
                        }
                    }
                    if (state.diffStoneX.length) {
                        if (state.activeBlackStone[0].y < state.diffStoneX[0].y) {
                            state.superX = state.board.filter(c => c.y > state.diffStoneX[0].y && c.haveStone === false && c.x === state.activeBlackStone[0].x)

                        }
                        if (state.activeBlackStone[0].y > state.diffStoneX[state.diffStoneX.length - 1].y) {
                            state.superX = state.board.filter(c => c.y < state.diffStoneX[state.diffStoneX.length - 1].y && c.haveStone === false && c.x === state.activeBlackStone[0].x)

                        }
                        if ((state.activeBlackStone[0].y < state.diffStoneX[state.diffStoneX.length - 1].y && state.activeBlackStone[0].y > state.diffStoneX[0].y) && state.diffStoneX.length > 1) {
                            state.superX = state.board.filter(c => (c.y > state.diffStoneX[state.diffStoneX.length - 1].y || c.y < state.diffStoneX[0].y) && c.haveStone === false && c.x === state.activeBlackStone[0].x)
                        }
                        if ((state.activeBlackStone[0].y > state.diffStoneX[state.diffStoneX.length - 1].y && state.activeBlackStone[0].y < state.diffStoneX[0].y) && state.diffStoneX.length > 1) {
                            state.superX = state.board.filter(c => (c.y < state.diffStoneX[state.diffStoneX.length - 1].y || c.y > state.diffStoneX[0].y) && c.haveStone === false && c.x === state.activeBlackStone[0].x)
                        }
                    }
                    if (!state.sameStoneY.length && !state.diffStoneY.length) {
                        state.superY = state.board.filter(c => c.y === state.activeBlackStone[0].y && c.haveStone === false)
                    }
                    if (!state.sameStoneX.length && !state.diffStoneY.length) {
                        state.superX = state.board.filter(c => c.x === state.activeBlackStone[0].x && c.haveStone === false);

                    }
                    if (state.superX) {
                        state.superX.forEach(x => x.chosen = true)
                    }
                    if (state.superY) {
                        state.superY.forEach(y => y.chosen = true)
                    }



                }

            }
        },
        MoveStone(state, action) {
            state.target = state.board.filter(c => c.id === action.payload.id)[0];
            if (state.activeWhiteStone[0]) {
                state.board.filter(w => w.x === state.activeWhiteStone[0].x && w.y === state.activeWhiteStone[0].y)[0].haveStone = false
                state.whiteStones.filter(w => w.id === state.activeWhiteStone[0].id)[0].x = action.payload.x
                state.whiteStones.filter(w => w.id === state.activeWhiteStone[0].id)[0].y = action.payload.y
                state.target.haveStone = true
                state.userOne.inTurn = false;
                state.userTwo.inTurn = true;
                if (action.payload.x === 1) state.whiteStones.filter(w => w.id === state.activeWhiteStone[0].id)[0].superStone = true
                if (state.blackStones.filter(b => b.x <= state.activeWhiteStone[0].x - 1 && b.y === state.activeWhiteStone[0].y) && action.payload.x <= state.activeWhiteStone[0].x - 2) {
                    state.removeStone = state.blackStones.filter(b => b.x > action.payload.x && b.x < state.activeWhiteStone[0].x && b.y === action.payload.y);

                    if (state.removeStone.length) {
                        state.blackStones = state.blackStones.filter(b => b.id !== state.removeStone[0].id);
                        state.userTwo.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[0].x && c.y === state.removeStone[0].y)[0].haveStone = false;
                        state.userOne.inTurn = true;
                        state.userTwo.inTurn = false;
                    }
                }
                if (state.blackStones.filter(b => b.x >= state.activeWhiteStone[0].x + 1 && b.y === state.activeWhiteStone[0].y) && action.payload.x >= state.activeWhiteStone[0].x + 2) {
                    state.removeStone = state.blackStones.filter(b => b.x < action.payload.x && b.x > state.activeWhiteStone[0].x && b.y === action.payload.y);

                    if (state.removeStone.length) {
                        state.blackStones = state.blackStones.filter(b => b.id !== state.removeStone[state.removeStone.length - 1].id);
                        state.userTwo.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[state.removeStone.length - 1].x && c.y === state.removeStone[state.removeStone.length - 1].y)[0].haveStone = false;
                        state.userOne.inTurn = true;
                        state.userTwo.inTurn = false;
                    }
                }
                if (state.blackStones.filter(b => b.x === state.activeWhiteStone[0].x && b.y <= state.activeWhiteStone[0].y - 1) && action.payload.y <= state.activeWhiteStone[0].y - 2) {
                    state.removeStone = state.blackStones.filter(b => b.x === action.payload.x && b.y > action.payload.y && b.y < state.activeWhiteStone[0].y);

                    if (state.removeStone.length) {
                        state.blackStones = state.blackStones.filter(b => b.id !== state.removeStone[0].id)
                        state.userTwo.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[0].x && c.y === state.removeStone[0].y)[0].haveStone = false;
                        state.userOne.inTurn = true;
                        state.userTwo.inTurn = false;
                    }
                }
                if (state.blackStones.filter(b => b.x === state.activeWhiteStone[0].x && b.y >= state.activeWhiteStone[0].y + 1) && action.payload.y >= state.activeWhiteStone[0].y + 2) {
                    state.removeStone = state.blackStones.filter(b => b.x === action.payload.x && b.y < action.payload.y + 1 & b.y > state.activeWhiteStone[0].y);


                    if (state.removeStone.length) {
                        state.blackStones = state.blackStones.filter(b => b.id !== state.removeStone[state.removeStone.length - 1].id)
                        state.userTwo.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[state.removeStone.length - 1].x && c.y === state.removeStone[state.removeStone.length - 1].y)[0].haveStone = false;
                        state.userOne.inTurn = true;
                        state.userTwo.inTurn = false;
                    }
                }
            }
            if (state.activeBlackStone[0]) {
                state.board.filter(w => w.x === state.activeBlackStone[0].x && w.y === state.activeBlackStone[0].y)[0].haveStone = false
                state.blackStones.filter(w => w.id === state.activeBlackStone[0].id)[0].x = action.payload.x
                state.blackStones.filter(w => w.id === state.activeBlackStone[0].id)[0].y = action.payload.y
                state.target.haveStone = true;
                state.userOne.inTurn = true;
                state.userTwo.inTurn = false;
                if (action.payload.x === 8) state.blackStones.filter(w => w.id === state.activeBlackStone[0].id)[0].superStone = true
                if (state.whiteStones.filter(b => b.x >= state.activeBlackStone[0].x + 1 && b.y === state.activeBlackStone[0].y) && action.payload.x >= state.activeBlackStone[0].x + 2) {
                    state.removeStone = state.whiteStones.filter(b => b.x < action.payload.x && b.x > state.activeBlackStone[0].x && b.y === action.payload.y);

                    if (state.removeStone.length) {
                        state.whiteStones = state.whiteStones.filter(b => b.id !== state.removeStone[state.removeStone.length - 1].id)
                        state.userOne.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[state.removeStone.length - 1].x && c.y === state.removeStone[state.removeStone.length - 1].y)[0].haveStone = false;
                        state.userOne.inTurn = false;
                        state.userTwo.inTurn = true;
                    }
                }
                if (state.whiteStones.filter(b => b.x <= state.activeBlackStone[0].x - 1 && b.y === state.activeBlackStone[0].y) && action.payload.x <= state.activeBlackStone[0].x - 2) {
                    state.removeStone = state.whiteStones.filter(b => b.x > action.payload.x && b.x < state.activeBlackStone[0].x && b.y === action.payload.y);

                    if (state.removeStone.length) {
                        state.whiteStones = state.whiteStones.filter(b => b.id !== state.removeStone[0].id)
                        state.userOne.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[0].x && c.y === state.removeStone[0].y)[0].haveStone = false;
                        state.userOne.inTurn = false;
                        state.userTwo.inTurn = true;
                    }
                }
                if (state.whiteStones.filter(b => b.x === state.activeBlackStone[0].x && b.y <= state.activeBlackStone[0].y - 1) && action.payload.y <= state.activeBlackStone[0].y - 2) {
                    state.removeStone = state.whiteStones.filter(b => b.x === action.payload.x && b.y > action.payload.y && b.y < state.activeBlackStone[0].y);

                    if (state.removeStone.length) {
                        state.whiteStones = state.whiteStones.filter(b => b.id !== state.removeStone[0].id)
                        state.userOne.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[0].x && c.y === state.removeStone[0].y)[0].haveStone = false;
                        state.userOne.inTurn = false;
                        state.userTwo.inTurn = true;
                    }
                }
                if (state.whiteStones.filter(b => b.x === state.activeBlackStone[0].x && b.y >= state.activeBlackStone[0].y + 1) && action.payload.y >= state.activeBlackStone[0].y + 2) {
                    state.removeStone = state.whiteStones.filter(b => b.x === state.activeBlackStone[0].x && b.y < action.payload.y && b.y > state.activeBlackStone[0].y);

                    if (state.removeStone.length) {
                        state.whiteStones = state.whiteStones.filter(b => b.id !== state.removeStone[state.removeStone.length - 1].id)
                        state.userOne.stones -= 1;
                        state.board.filter(c => c.x === state.removeStone[state.removeStone.length - 1].x && c.y === state.removeStone[state.removeStone.length - 1].y)[0].haveStone = false;
                        state.userOne.inTurn = false;
                        state.userTwo.inTurn = true;
                    }

                }

            }
            state.activeBlackStone = "";
            state.activeWhiteStone = ""
            state.board.map(w => w.chosen = false)


        }
    }
})

export default gameslicer.reducer;
export const { getUserOne, getUserTwo, getWhiteActive, getBlackActive, MoveStone } = gameslicer.actions