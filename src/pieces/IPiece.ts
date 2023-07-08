import GameState from "../GameState";
import Move from "../moves";

export default interface IPiece {
    getImage(): HTMLImageElement;
    getMoves(gameState: GameState, x: number, y: number): Move[];
    getTeam(): Team;

    setMoved(): void;
}

export enum Team {
    TOP,
    BOTTOM
}