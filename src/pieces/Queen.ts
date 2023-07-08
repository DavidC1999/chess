import GameState from "../GameState";
import { ImageId } from "../generated/ImageId";
import AssetRepository from "../ImageRepository";
import IMove, { Move, MoveTake } from "../moves";
import IPiece, { Team } from "./IPiece";

export default class Queen implements IPiece {
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
        otherPiece = gameState.getPiece(x + counterX, y + counterY);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counterX, y + counterY));

        // right
        counter = 1;
        while (x + counter < gameState.getBoardWidth() && gameState.getPiece(x + counter, y) == null) {
            output.push(new Move(x, y, x + counter, y));
            ++counter;
        }
        otherPiece = gameState.getPiece(x + counter, y);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counter, y));

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

        // down
        counter = 1;
        while (y + counter < gameState.getBoardHeight() && gameState.getPiece(x, y + counter) == null) {
            output.push(new Move(x, y, x, y + counter));
            ++counter;
        }
        otherPiece = gameState.getPiece(x, y + counter);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x, y + counter));

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

        // left
        counter = -1;
        while (x + counter >= 0 && gameState.getPiece(x + counter, y) == null) {
            output.push(new Move(x, y, x + counter, y));
            --counter;
        }
        otherPiece = gameState.getPiece(x + counter, y);
        if(otherPiece != null && otherPiece.getTeam() != this.getTeam())
            output.push(new MoveTake(x, y, x + counter, y));

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
        return AssetRepository.getImage(this.team == Team.TOP ? ImageId.QUEENB2 : ImageId.QUEENW2);
    }

    public setMoved() {}

    public static top(): Queen {
        return new Queen(Team.TOP);
    }

    public static bottom(): Queen {
        return new Queen(Team.BOTTOM);
    }
}