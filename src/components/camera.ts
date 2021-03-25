import { canvas, field } from "../app";
import { tileSize } from "./field";

import Victor from "victor";

export class Camera {
  pos = new Victor(0, 0);
  lastPos = this.pos.clone();
  panStart = this.pos.clone();
  panning = false;
  zoom = 2;

  public startPan(start: Victor) {
    this.panStart = start;
    this.lastPos = this.pos;
    this.panning = true;
  }

  public updatePan(cur: Victor) {
    if (this.panning) {
      this.pos = this.lastPos
        .clone()
        .add(
          cur.clone().subtract(this.panStart).invert().divideScalar(this.zoom)
        );

      this.pos.x = Math.max(
        Math.min(this.pos.x, field.tileMap[0].length * tileSize),
        canvas.width / 4 / this.zoom
      );

      this.pos.y = Math.max(
        Math.min(this.pos.y, field.tileMap.length * tileSize),
        canvas.height / 4 / this.zoom
      );
    }
  }

  endPan() {
    this.panning = false;
  }
}
