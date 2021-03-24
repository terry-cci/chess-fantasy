import { canvas, field } from "../app";
import { tileSize } from "./field";

export class Camera {
  x = 0;
  y = 0;
  lastPos: { x: number; y: number } | null = null;
  panStart: { x: number; y: number } | null = null;

  startPan(x: number, y: number) {
    this.lastPos = { x: this.x, y: this.y };
    this.panStart = { x, y };
  }

  updatePan(x: number, y: number) {
    if (this.lastPos && this.panStart) {
      this.x = this.lastPos.x - x + this.panStart.x;
      this.y = this.lastPos.y - y + this.panStart.y;

      this.x = Math.max(
        Math.min(this.x, field.tileMap[0].length * tileSize),
        0
      );
      this.y = Math.max(Math.min(this.y, field.tileMap.length * tileSize), 0);
    }
  }

  endPan() {
    this.lastPos = null;
    this.panStart = null;
  }
}
