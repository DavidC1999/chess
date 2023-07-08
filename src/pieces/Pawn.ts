import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move, MoveTake } from "../moves";
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
        let delta = this.team == Team.TOP ? 1 : -1;

        let output = [];

        if (gameState.getPiece(x, y + delta) == null) {
            output.push(new Move(x, y, x, y + delta));
            
            if (!this.movedBefore && gameState.getPiece(x, y + delta * 2) == null) {
                output.push(new Move(x, y, x, y + delta * 2));
            }
        }

        let otherPiece = gameState.getPiece(x - 1, y + delta);
        if (otherPiece != null && otherPiece.getTeam() != this.getTeam()) {
            output.push(new MoveTake(x, y, x - 1, y + delta, x - 1, y + delta));
        }

        otherPiece = gameState.getPiece(x + 1, y + delta);
        if (otherPiece != null && otherPiece.getTeam() != this.getTeam()) {
            output.push(new MoveTake(x, y, x + 1, y + delta, x + 1, y + delta));
        }

        return output;
    }

    public getImage(): HTMLImageElement {
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.PAWNB2 : ImageId.PAWNW2);
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