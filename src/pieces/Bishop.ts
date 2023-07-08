import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move, MoveTake } from "../moves";
import IPiece, { Team } from "./IPiece";

export default class Bishop implements IPiece {
    private team: Team;

    constructor(team: Team) {
        this.team = team;
    }

    public getTeam(): Team {
        return this.team;
    }

    public getMoves(gameState: GameState, x: number, y: number): IMove[] {
        let output = [];

        // up-right
        let counterX = 1;
        let counterY = -1;
        while (y + counterY >= 0 &&
               x + counterX < gameState.getBoardWidth() &&
               gameState.getPiece(x + counterX, y + counterY) == null
        ) {
            output.push(new Move(x, y, x + counterX, y + counterY));
            ++counterX;
            --counterY;
        }
        let otherPiece = gameState.getPiece(x + counterX, y + counterY);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counterX, y + counterY));

        // down-right
        counterX = 1;
        counterY = 1;
        while (y + counterY < gameState.getBoardHeight() &&
               x + counterX < gameState.getBoardWidth() &&
               gameState.getPiece(x + counterX, y + counterY) == null
        ) {
            output.push(new Move(x, y, x + counterX, y + counterY));
            ++counterX;
            ++counterY;
        }
        otherPiece = gameState.getPiece(x + counterX, y + counterY);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counterX, y + counterY));

        // down-left
        counterX = -1;
        counterY = 1;
        while (y + counterY < gameState.getBoardHeight() &&
               x + counterX >= 0 &&
               gameState.getPiece(x + counterX, y + counterY) == null
        ) {
            output.push(new Move(x, y, x + counterX, y + counterY));
            --counterX;
            ++counterY;
        }
        otherPiece = gameState.getPiece(x + counterX, y + counterY);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counterX, y + counterY));

        // up-left
        counterX = -1;
        counterY = -1;
        while (y + counterY >= 0 &&
               x + counterX >= 0 &&
               gameState.getPiece(x + counterX, y + counterY) == null
        ) {
            output.push(new Move(x, y, x + counterX, y + counterY));
            --counterX;
            --counterY;
        }
        otherPiece = gameState.getPiece(x + counterX, y + counterY);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counterX, y + counterY));

        return output;
    }

    public getImage(): HTMLImageElement {
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.BISHOPB2 : ImageId.BISHOPW2);
    }

    public setMoved() {}

    public static top(): Bishop {
        return new Bishop(Team.TOP);
    }

    public static bottom(): Bishop {
        return new Bishop(Team.BOTTOM);
    }
}