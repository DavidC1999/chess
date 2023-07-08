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
        const myPiece = gameState.getPiece(this.fromX, this.fromY);

        gameState.setPiece(this.toX, this.toY, myPiece);
        gameState.setPiece(this.fromX, this.fromY, null);

        myPiece.setMoved();
    }
}

export class MoveTake implements IMove {
    public readonly fromX: number;
    public readonly fromY: number;
    public readonly toX: number;
    public readonly toY: number;
    public readonly takeX: number;
    public readonly takeY: number;

    constructor(fromX: number, fromY: number, toX: number, toY: number, takeX: number, takeY: number) {
        this.fromX = fromX;
        this.fromY = fromY;
        this.toX = toX;
        this.toY = toY;
        this.takeX = takeX;
        this.takeY = takeY;
    }

    getType(): MoveType {
        return MoveType.TAKE;
    }

    getInteractionCell(): [number, number] {
        return [this.toX, this.toY];
    }

    execute(gameState: GameState): void {
        const myPiece = gameState.getPiece(this.fromX, this.fromY);

        gameState.setPiece(this.takeX, this.takeY, null);
        gameState.setPiece(this.fromX, this.fromY, null);
        gameState.setPiece(this.toX, this.toY, myPiece);

        myPiece.setMoved();
    }
}