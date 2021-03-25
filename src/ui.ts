import { ctx } from "./app";
import moveIcon from "./assets/ui/move.png";

export const uiCanvas = document.createElement("canvas");
export const uiCtx = uiCanvas.getContext("2d");
export let movingPoint = 0;

const moveImg = new Image();
moveImg.src = moveIcon;

export function draw(dt: number) {
  if (uiCtx) {
    uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

    // moving
    uiCtx.save();
    uiCtx.translate(uiCanvas.width - 50, 50);

    uiCtx.fillStyle = "red";

    uiCtx.beginPath();
    uiCtx.arc(0, 0, 30, 0, 2 * Math.PI);
    uiCtx.fill();

    uiCtx.save();

    uiCtx.globalCompositeOperation = "source-in";
    uiCtx.drawImage(moveImg, -30, -30, 60, 60);

    uiCtx.restore();

    uiCtx.lineWidth = 5;
    uiCtx.beginPath();

    if (movingPoint < 2) {
      movingPoint += (dt / 1000) * 0.5;
      movingPoint = Math.min(movingPoint, 2);

      uiCtx.fillStyle = "red";
      uiCtx.strokeStyle = "red";
      uiCtx.arc(0, 0, 30, 0, (movingPoint % 1) * 2 * Math.PI);
    } else {
      uiCtx.fillStyle = "green";
      uiCtx.strokeStyle = "green";
      uiCtx.arc(0, 0, 30, 0, 2 * Math.PI);
    }

    uiCtx.stroke();

    uiCtx.save();

    uiCtx.translate(33, -33);
    uiCtx.beginPath();
    uiCtx.arc(0, 0, 10, 0, 2 * Math.PI);
    uiCtx.fill();

    uiCtx.fillStyle = "white";
    uiCtx.font = "13px sans-serif";
    uiCtx.fillText(Math.floor(movingPoint).toString(), -3, 3);

    uiCtx.restore();

    uiCtx.restore();
  }
}

function resizeCanvas() {
  uiCanvas.width = window.innerWidth;
  uiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
