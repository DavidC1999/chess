import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move, MoveTake } from "../moves";
import IPiece, { Team } from "./IPiece";

export default class Rook implements IPiece {
    private team: Team;

    constructor(team: Team) {
        this.team = team;
    }

    public getTeam(): Team {
        return this.team;
    }

    public getMoves(gameState: GameState, x: number, y: number): IMove[] {
        let output = [];

        // up
        let counter = -1;
        while (y + counter >= 0 && gameState.getPiece(x, y + counter) == null) {
            output.push(new Move(x, y, x, y + counter));
            --counter;
        }
        let otherPiece = gameState.getPiece(x, y + counter);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x, y + counter));

        // right
        counter = 1;
        while (x + counter < gameState.getBoardWidth() && gameState.getPiece(x + counter, y) == null) {
            output.push(new Move(x, y, x + counter, y));
            ++counter;
        }
        otherPiece = gameState.getPiece(x + counter, y);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counter, y));

        // down
        counter = 1;
        while (y + counter < gameState.getBoardHeight() && gameState.getPiece(x, y + counter) == null) {
            output.push(new Move(x, y, x, y + counter));
            ++counter;
        }
        otherPiece = gameState.getPiece(x, y + counter);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x, y + counter));

        // left
        counter = -1;
        while (x + counter >= 0 && gameState.getPiece(x + counter, y) == null) {
            output.push(new Move(x, y, x + counter, y));
            --counter;
        }
        otherPiece = gameState.getPiece(x + counter, y);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counter, y));

        return output;
    }

    public getImage(): HTMLImageElement {
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.ROOKB2 : ImageId.ROOKW2);
    }

    public setMoved() {}

    public static top(): Rook {
        return new Rook(Team.TOP);
    }

    public static bottom(): Rook {
        return new Rook(Team.BOTTOM);
    }
}