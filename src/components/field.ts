import mapStr from "../data/map/0";
import fbImg from "../assets/fallback.png";
import Victor from "victor";
import { camera, canvas } from "../app";

function parseTileMap(str: string) {
  return str.split("\n").map((r) => r.split(""));
}

export const tileSize = 32;

export class Field {
  tileMap: string[][];
  renderer: HTMLCanvasElement;
  rendererCtx: CanvasRenderingContext2D;

  constructor() {
    this.tileMap = parseTileMap(mapStr);

    const renderer = document.createElement("canvas");
    renderer.width = this.tileMap[0].length * tileSize;
    renderer.height = this.tileMap.length * tileSize;
    this.renderer = renderer;

    this.rendererCtx = renderer.getContext("2d") as CanvasRenderingContext2D;
    this.rendererCtx.imageSmoothingEnabled = false;
    this.prerender();
  }

  private prerender() {
    this.rendererCtx.clearRect(0, 0, this.renderer.width, this.renderer.height);

    this.tileMap.forEach((r, i) =>
      r.forEach(async (t, j) => {
        const tilePos = new Victor(j * tileSize, i * tileSize);

        const img = new Image();

        try {
          img.src = (await import(`../assets/${t}.png`)).default;
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
}
