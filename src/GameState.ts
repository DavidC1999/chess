import IMove from "./moves";
import IPiece, { Team } from "./pieces/IPiece";
import Pawn from "./pieces/Pawn";

export enum Phase {
    LOADING,
    INITIALIZING,
    PLAYING,
    MOVING,
    END
}

export default class GameState {
    public board: Array<IPiece>[];

    private callbacks: { [key in Phase]?: (prevPhase: Phase) => void } = {};
    private phase: Phase;

    public turn: Team;
    public possibleMoves: IMove[];
    
    public registerCallback(phase: Phase, callback: (prevPhase: Phase) => void) {
        this.callbacks[phase] = callback;
    }

    public setPhase(newPhase: Phase) {
        let oldPhase = this.phase;
        this.phase = newPhase;

        if (newPhase in this.callbacks) {
            this.callbacks[newPhase](oldPhase);
        }
    }

    public getPhase(): Phase {
        return this.phase;
    }

    constructor(initialBoard: Array<IPiece>[]) {
        this.board = initialBoard;
    }
}