import GameState from "./GameState";

export default interface IMove {
    getType(): MoveType;
    getInteractionCell(): [number, number];
    execute(gameState: GameState): void;
}

export enum MoveType {
    MOVE,
    TAKE,
}

export class Move implements IMove {
    public readonly fromX: number;
    public readonly fromY: number;
    public readonly toX: number;
    public readonly toY: number;

    constructor(fromX: number, fromY: number, toX: number, toY: number) {
        this.fromX = fromX;
        this.fromY = fromY;
        this.toX = toX;
        this.toY = toY;
    }

    getType(): MoveType {
        return MoveType.MOVE;
    }

    getInteractionCell(): [number, number] {
        return [this.toX, this.toY];
    }

    execute(gameState: GameState): void {
        gameState.board[this.toY][this.toX] = gameState.board[this.fromY][this.fromX];
        gameState.board[this.fromY][this.fromX] = null;

        gameState.board[this.toY][this.toX].setMoved();
    }
}

// export class MoveTake implements IMove {
//     public readonly fromX: number;
//     public readonly fromY: number;
//     public readonly toX: number;
//     public readonly toY: number;
//     public readonly takeX: number;
//     public readonly takeY: number;

//     constructor(fromX: number, fromY: number, toX: number, toY: number, takeX: number, takeY: number) {
//         this.fromX = fromX;
//         this.fromY = fromY;
//         this.toX = toX;
//         this.toY = toY;
//         this.takeX = takeX;
//         this.takeY = takeY;
//     }

//     getInteractionCell(): [number, number] {
//         return [this.toX, this.toY];
//     }

//     getType(): MoveType {
//         return MoveType.TAKE;
//     }
// }