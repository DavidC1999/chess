import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move } from "../moves";
import IPiece, { Team } from "./IPiece";

export default class Pawn implements IPiece {
    private team: Team;
    private movedBefore = false;

    constructor(team: Team) {
        this.team = team;
    }

    public getTeam(): Team {
        return this.team;
    }

    public getMoves(gameState: GameState, x: number, y: number): Move[] {
        let offset = this.team == Team.TOP ? 1 : -1;

        let output = [];

        if (gameState.board[y + offset][x] == null) {
            output.push(new Move(x, y, x, y + offset));
        }

        if (!this.movedBefore && gameState.board[y + offset * 2][x] == null) {
            output.push(new Move(x, y, x, y + offset * 2));
        }

        return output;
    }

    public getImage(): HTMLImageElement {
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.PAWNW2 : ImageId.PAWNB2);
    }

    public setMoved() {
        this.movedBefore = true;
    }

    public static top(): Pawn {
        return new Pawn(Team.TOP);
    }

    public static bottom(): Pawn {
        return new Pawn(Team.BOTTOM);
    }
}