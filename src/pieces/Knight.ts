import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move, MoveTake } from "../moves";
import IPiece, { Team } from "./IPiece";

export default class Knight implements IPiece {
    private team: Team;

    constructor(team: Team) {
        this.team = team;
    }

    public getTeam(): Team {
        return this.team;
    }

    public getMoves(gameState: GameState, x: number, y: number): Move[] {
        let output = [];

        if (gameState.getPiece(x + 1, y + 2) == null)
            output.push(new Move(x, y, x + 1, y + 2));

        if (gameState.getPiece(x - 1, y + 2) == null)
            output.push(new Move(x, y, x - 1, y + 2));

        if (gameState.getPiece(x + 2, y + 1) == null)
            output.push(new Move(x, y, x + 2, y + 1));

        if (gameState.getPiece(x + 2, y - 1) == null)
            output.push(new Move(x, y, x + 2, y - 1));

        if (gameState.getPiece(x - 1, y - 2) == null)
            output.push(new Move(x, y, x - 1, y - 2));

        if (gameState.getPiece(x + 1, y - 2) == null)
            output.push(new Move(x, y, x + 1, y - 2));

        if (gameState.getPiece(x - 2, y + 1) == null)
            output.push(new Move(x, y, x - 2, y + 1));

        if (gameState.getPiece(x - 2, y - 1) == null)
            output.push(new Move(x, y, x - 2, y - 1));


        return output;
    }

    public getImage(): HTMLImageElement {
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.KNIGHTB2 : ImageId.KNIGHTW2);
    }

    public setMoved() {}

    public static top(): Knight {
        return new Knight(Team.TOP);
    }

    public static bottom(): Knight {
        return new Knight(Team.BOTTOM);
    }
}