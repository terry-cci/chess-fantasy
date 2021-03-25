import { tileMap, chesses } from "../data/map/0";
import fbImg from "../assets/tiles/fallback.png";
import Victor from "victor";
import { camera, canvas, ctx } from "../app";
import { Chess, General } from "./chess";

function parseTileMap(str: string) {
  return str.split("\n").map((r) => r.split(""));
}

export const tileSize = 32;

export class Field {
  tileMap: string[][];
  renderer: HTMLCanvasElement;
  rendererCtx: CanvasRenderingContext2D;

  chess: Chess[][] = [];

  constructor() {
    this.tileMap = parseTileMap(tileMap);
    this.parseChessMap(chesses);

    const renderer = document.createElement("canvas");
    renderer.width = this.tileMap[0].length * tileSize;
    renderer.height = this.tileMap.length * tileSize;
    this.renderer = renderer;

    this.rendererCtx = renderer.getContext("2d") as CanvasRenderingContext2D;
    this.rendererCtx.imageSmoothingEnabled = false;
    this.prerender();
  }

  private parseChessMap(chesses: Chess[]) {
    chesses.forEach((c) => {
      if (!this.chess[c.pos.x]) this.chess[c.pos.x] = [];
      this.chess[c.pos.x][c.pos.y] = c;
    });
  }

  private prerender() {
    this.rendererCtx.clearRect(0, 0, this.renderer.width, this.renderer.height);

    this.tileMap.forEach((r, i) =>
      r.forEach(async (t, j) => {
        const tilePos = new Victor(j * tileSize, i * tileSize);

        const img = new Image();

        try {
          img.src = (await import(`../assets/tiles/${t}.png`)).default;
        } catch (e) {
          img.src = fbImg;
        }

        img.addEventListener("load", () => {
          this.rendererCtx.drawImage(
            img,
            tilePos.x,
            tilePos.y,
            tileSize,
            tileSize
          );
        });
      })
    );
  }

  public render() {
    ctx.drawImage(
      this.renderer,
      camera.pos.x - canvas.width / 2 / camera.zoom,
      camera.pos.y - canvas.height / 2 / camera.zoom,
      canvas.width / camera.zoom,
      canvas.height / camera.zoom,
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-camera.pos.x, -camera.pos.y);

    this.chess.forEach((r) => {
      r.forEach((c) => {
        c.render();
      });
    });

    ctx.restore();
  }
}
