import GameState from "../GameState";
import IMove from "../moves";
import Move from "../moves";

export default interface IPiece {
    getImage(): HTMLImageElement;
    getMoves(gameState: GameState, x: number, y: number): IMove[];
    getTeam(): Team;

    setMoved(): void;
}

export enum Team {
    TOP,
    BOTTOM
}