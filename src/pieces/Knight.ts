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

    public getMoves(gameState: GameState, x: number, y: number): IMove[] {
        let output = [];

        const coords = [
            [x + 1, y + 2],
            [x - 1, y + 2],
            [x + 2, y + 1],
            [x + 2, y - 1],
            [x - 1, y - 2],
            [x + 1, y - 2],
            [x - 2, y + 1],
            [x - 2, y - 1],
        ]

        for (const [jumpX, jumpY] of coords) {
            const otherPiece = gameState.getPiece(jumpX, jumpY);
            if (otherPiece == null)
                output.push(new Move(x, y, jumpX, jumpY));
            else if(otherPiece.getTeam() != this.getTeam())
                output.push(new MoveTake(x, y, jumpX, jumpY));
        }

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