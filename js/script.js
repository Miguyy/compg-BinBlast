const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

let guideline1 = 30;
let guideline2 = 270;
const moveStep = 300;

/* let binImg = new Image();
img.src = "../images/blue_trashcan_nobg.png"; */

function clearCanvas() {
  ctx.clearRect(0, 0, W, H);
}

function guidelines() {
  ctx.beginPath();
  ctx.moveTo(guideline1, 0);
  ctx.lineTo(guideline1, H);
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(guideline2, 0);
  ctx.lineTo(guideline2, H);
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function moveLines(dx) {
  guideline1 = Math.max(0, Math.min(W, guideline1 + dx));
  guideline2 = Math.max(0, Math.min(W, guideline2 + dx));
  drawings();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLines(-moveStep);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLines(moveStep);
  }
});

function drawings() {
  clearCanvas();
  guidelines();
  drawBins();
  drawCannon();
}

drawings();

function drawBins() {
  /* const binWidth = guideline2 - guideline1; */
}

function drawCannon() {}
