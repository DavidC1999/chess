import GameState, { Phase } from "./GameState";
import IMove, { Move, MoveType } from "./moves";
import IPiece from "./pieces/IPiece";
import Renderer from "./Renderer";

export default class View {

    private readonly renderer: Renderer;
    private readonly canvas: HTMLCanvasElement;

    private readonly boardX = 10;
    private readonly boardY = 10;
    private readonly boardW = 780;
    private readonly boardH = 780;

    private cellsX: number;
    private cellsY: number;

    private readonly cellPixelHeight: number;
    private readonly cellPixelWidth: number;

    constructor(cellsX: number, cellsY: number) {
        this.cellsX = cellsX;
        this.cellsY = cellsY;

        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.renderer = new Renderer(this.canvas.width, this.canvas.height);;

        this.cellPixelHeight = this.boardH / this.cellsY;
        this.cellPixelWidth = this.boardW / this.cellsX;

        this.canvas.onclick = (e: MouseEvent) => {
            var rect = this.canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            this.canvasClicked(x, y);
        };
    }

    private renderBoard(board: Array<IPiece>[]) {
        const cellAmtY = board.length;
        if (cellAmtY <= 0) return;
        const cellAmtX = board[0].length;

        const cellPixelHeight = this.boardH / cellAmtY;
        const cellPixelWidth = this.boardW / cellAmtX;

        for (let i = 0; i < board.length; ++i) {
            var row = board[i];
            for (let j = 0; j < row.length; ++j) {
                const cellX = this.boardX + j * cellPixelWidth;
                const cellY = this.boardY + i * cellPixelHeight;
                const width = cellPixelWidth;
                const height = cellPixelHeight;

                var darkColor = (i + j) % 2 == 0;
                if (darkColor)
                    this.renderer.renderSolidRect(cellX, cellY, width, height, "#eee")
                else
                    this.renderer.renderSolidRect(cellX, cellY, width, height, "#222")

                var piece = row[j];
                if (piece == null) continue;

                var image = piece.getImage();

                this.renderer.renderImage(image, cellX, cellY, width, height);
            }
        }
    }

    private drawPossibleMoves(moves: IMove[]) {
        for (let move of moves) {
            switch(move.getType()) {
                case MoveType.MOVE:
                    const padding = 10;

                    var simpleMove = move as Move;
                    this.renderer.renderRect(
                        this.boardX + simpleMove.fromX * this.cellPixelWidth + padding,
                        this.boardY + simpleMove.fromY * this.cellPixelHeight + padding,
                        this.cellPixelWidth - padding * 2,
                        this.cellPixelHeight - padding * 2,
                        "red");

                    this.renderer.renderSolidRect(
                        this.boardX + simpleMove.toX * this.cellPixelWidth + padding,
                        this.boardY + simpleMove.toY * this.cellPixelHeight + padding,
                        this.cellPixelWidth - padding * 2,
                        this.cellPixelHeight - padding * 2,
                        "green");
            }
        }
    }

    public drawGameState(gameState: GameState) {
        this.renderer.clear();
        this.renderBoard(gameState.board);

        if (gameState.getPhase() == Phase.MOVING) {
            this.drawPossibleMoves(gameState.possibleMoves);
        }
    }

    private canvasClicked(x: number, y: number) {
        if ((x >= this.boardX && x <= this.boardX + this.boardW) &&
            (y >= this.boardY && y <= this.boardY + this.boardH)) {
            let relativeX = x - this.boardX;
            let relativeY = y - this.boardY;
            if (this.boardClickCallback != null)
                this.boardClickCallback(Math.floor(relativeX / this.cellPixelWidth), Math.floor(relativeY / this.cellPixelHeight));
        }
    }

    private boardClickCallback: (cellX: number, cellY: number) => void;

    public registerBoardClickEvent(callback: (cellX: number, cellY: number) => void) {
        this.boardClickCallback = callback;
    }
}