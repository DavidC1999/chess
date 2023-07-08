export default class Renderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(w: number, h: number) {
        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = w;
        this.canvas.height = h;
    }

    public clear() {
        this.ctx.fillStyle = "#777";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public renderImage(image: HTMLImageElement, x: number, y: number, w: number, h: number) {
        this.ctx.drawImage(image, x, y, w, h);
    }

    public renderSolidRect(x: number, y: number, w: number, h: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    public renderRect(x: number, y: number, w: number, h: number, color: string) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }
}