import Victor from "victor";
import { ctx } from "../app";
import fbImg from "../assets/tiles/fallback.png";
import { tileSize } from "./field";

export abstract class Chess {
  pos: Victor;
  id: string;
  sprite: HTMLImageElement;
  constructor(id: string, pos: Victor) {
    this.id = id;
    this.pos = pos;
    this.sprite = new Image();
    this.loadSprite();
  }

  private async loadSprite() {
    const id = this.id;
    try {
      this.sprite.src = (await import(`../assets/chess/${id}.png`)).default;
    } catch (e) {
      this.sprite.src = fbImg;
    }
  }

  public render() {
    ctx.drawImage(this.sprite, this.pos.x * tileSize, this.pos.y * tileSize);
  }
}

export class General extends Chess {
  constructor(pos: Victor) {
    super("general", pos);
  }
}
