import { Camera } from "./components/camera";
import { Field } from "./components/field";
import "./style.css";

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export let canvasRect = canvas.getClientRects();

function resizeCanvas() {
  canvas.style.width = window.innerWidth * 0.8 + "px";
  canvas.style.height = window.innerWidth * 0.45 + "px";
  canvasRect = canvas.getClientRects();
}

const camera = new Camera();

function draw() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // field
    ctx.drawImage(
      field.renderer,
      camera.x - canvas.width / 2,
      camera.y - canvas.height / 2,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    requestAnimationFrame(draw);
  }
}

canvas.width = 800;
canvas.height = canvas.width * 0.5625;

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("touchstart", (e) => {
  const { clientX: x, clientY: y } = e.touches[0];
  camera.startPan(x, y);
});
document.addEventListener("mousedown", (e) => {
  const { clientX: x, clientY: y } = e;
  camera.startPan(x, y);
});
document.addEventListener("touchmove", (e) => {
  const { clientX: x, clientY: y } = e.touches[0];
  camera.updatePan(x, y);
});
document.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  camera.updatePan(x, y);
});
document.addEventListener("touchend", () => {
  camera.endPan();
});
document.addEventListener("mouseup", () => {
  camera.endPan();
});

export const field = new Field();
draw();
