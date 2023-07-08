import Renderer from "./Renderer";

import IPiece, { Team } from "./pieces/IPiece";
import Pawn from "./pieces/Pawn";

import AssetRepository from "./ImageRepository";
import GameState, { Phase } from "./GameState";
import View from "./View";

const cellsX = 8;
const cellsY = 8;

const view = new View(cellsX, cellsY);

const gameState = new GameState(createInitialBoard());

gameState.registerCallback(Phase.INITIALIZING, (oldPhase) => {
    gameState.turn = Team.TOP;
    gameState.setPhase(Phase.PLAYING);

    view.drawGameState(gameState);
});

// gameState.registerCallback();

view.registerBoardClickEvent((cellX, cellY) => {
    switch(gameState.getPhase()) {
        case Phase.PLAYING:
            let piece = gameState.board[cellY][cellX];
            if (piece != null && piece.getTeam() == gameState.turn) {
                gameState.possibleMoves = piece.getMoves(gameState, cellX, cellY);
                if (gameState.possibleMoves.length <= 0) return;

                console.log(gameState.possibleMoves);

                gameState.setPhase(Phase.MOVING);
            }
            break;
        case Phase.MOVING:
            for (let move of gameState.possibleMoves) {
                let [x, y] = move.getInteractionCell();
                if (x == cellX && y == cellY) {
                    move.execute(gameState);
                    gameState.turn = gameState.turn == Team.TOP ? Team.BOTTOM : Team.TOP;
                }
                gameState.setPhase(Phase.PLAYING);
            }
            break;
    }

    view.drawGameState(gameState);
});

AssetRepository.onReady = () => gameState.setPhase(Phase.INITIALIZING);

AssetRepository.init();

function createInitialBoard(): Array<IPiece>[] {
    var output: Array<IPiece>[] = [
        [ null         , null         , null         , null         , null         , null         , null         , null          ],
        [ Pawn.top()   , Pawn.top()   , Pawn.top()   , Pawn.top()   , Pawn.top()   , Pawn.top()   , Pawn.top()   , Pawn.top()    ],
        [ null         , null         , null         , null         , null         , null         , null         , null          ],
        [ null         , null         , null         , null         , null         , null         , null         , null          ],
        [ null         , null         , null         , null         , null         , null         , null         , null          ],
        [ null         , null         , null         , null         , null         , null         , null         , null          ],
        [ Pawn.bottom(), Pawn.bottom(), Pawn.bottom(), Pawn.bottom(), Pawn.bottom(), Pawn.bottom(), Pawn.bottom(), Pawn.bottom() ],
        [ null         , null         , null         , null         , null         , null         , null         , null          ],
    ];

    if (output.length != cellsY || output[0].length != cellsX) {
        throw new Error("Invalid board shape");
    }

    var rowLen = output[0].length;
    for (let i = 1; i < output.length; ++i) {
        if (output[i].length != rowLen) {
            throw new Error("Invalid board shape");
        }
    }

    return output;
}