import { Camera } from "./components/camera";
import { Field } from "./components/field";
import "./style.css";

import Victor from "victor";

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export let canvasRect = canvas.getClientRects();
export const field = new Field();
export const camera = new Camera();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasRect = canvas.getClientRects();
  camera.pos = new Victor(0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    // field
    ctx.drawImage(
      field.renderer,
      camera.pos.x - canvas.width / 2 / camera.zoom,
      camera.pos.y - canvas.height / 2 / camera.zoom,
      canvas.width / camera.zoom,
      canvas.height / camera.zoom,
      0,
      0,
      canvas.width,
      canvas.height
    );

    requestAnimationFrame(draw);
  }
}

canvas.addEventListener("wheel", (e) => {
  camera.zoom += -e.deltaY / 400;
  camera.zoom = Math.max(Math.min(camera.zoom, 4), 1);
});
canvas.addEventListener("touchstart", (e) => {
  const { clientX: x, clientY: y } = e.touches[0];
  camera.startPan(new Victor(x, y));
});
canvas.addEventListener("mousedown", (e) => {
  const { clientX: x, clientY: y } = e;
  camera.startPan(new Victor(x, y));
});
canvas.addEventListener("touchmove", (e) => {
  const { clientX: x, clientY: y } = e.touches[0];
  camera.updatePan(new Victor(x, y));
});
canvas.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  camera.updatePan(new Victor(x, y));
});
document.addEventListener("touchend", () => {
  camera.endPan();
});
document.addEventListener("mouseup", () => {
  camera.endPan();
});
draw();
