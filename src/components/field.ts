import { ctx } from "../app";
import mapStr from "../data/map/0";
import fbImg from "../assets/fallback.png";

function parseTileMap(str: string) {
  return str.split("\n").map((r) => r.split(""));
}

export const tileSize = 64;

export class Field {
  tileMap: string[][];
  renderer: HTMLCanvasElement;
  rendererCtx: CanvasRenderingContext2D;

  constructor() {
    this.tileMap = parseTileMap(mapStr);

    const renderer = document.createElement("canvas");
    renderer.style.display = "none";
    renderer.width = 9999;
    renderer.height = 9999;
    document.body.appendChild(renderer);
    this.renderer = renderer;
    this.rendererCtx = renderer.getContext("2d") as CanvasRenderingContext2D;
    this.prerender();
  }

  private prerender() {
    this.tileMap.forEach((r, i) =>
      r.forEach(async (t, j) => {
        const img = new Image();

        try {
          img.src = (await import(`../assets/${t}.png`)).default;
        } catch (e) {
          img.src = fbImg;
        }

        img.onload = () => {
          this.rendererCtx.drawImage(
            img,
            j * tileSize,
            i * tileSize,
            tileSize,
            tileSize
          );
        };
      })
    );
  }
}
