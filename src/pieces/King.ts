import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move, MoveTake } from "../moves";
import IPiece, { Team } from "./IPiece";

export default class King implements IPiece {
    private team: Team;

    constructor(team: Team) {
        this.team = team;
    }

    public getTeam(): Team {
        return this.team;
    }

    public getMoves(gameState: GameState, x: number, y: number): IMove[] {
        let output = [];

        const coords = [
            [x + 0, y - 1],
            [x + 1, y - 1],
            [x + 1, y + 0],
            [x + 1, y + 1],
            [x + 0, y + 1],
            [x - 1, y + 1],
            [x - 1, y + 0],
            [x - 1, y - 1],
        ]

        for (const [moveX, moveY] of coords) {
            if (moveX < 0 || moveX >= gameState.getBoardWidth() || moveY < 0 || moveY >= gameState.getBoardHeight())
                continue;

            const otherPiece = gameState.getPiece(moveX, moveY);
            if (otherPiece == null)
                output.push(new Move(x, y, moveX, moveY));
            else if(otherPiece.getTeam() != this.getTeam())
                output.push(new MoveTake(x, y, moveX, moveY));
        }

        return output;
    }

    public getImage(): HTMLImageElement {
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.KINGB2 : ImageId.KINGW2);
    }

    public setMoved() {}

    public static top(): King {
        return new King(Team.TOP);
    }

    public static bottom(): King {
        return new King(Team.BOTTOM);
    }
}