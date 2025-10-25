const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

let guideline1 = 20;
let guideline2 = 330;
const spacing = guideline1 - guideline2;
const steps = 350;

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

function guidelinesCollisions() {}

function moveLines(dx) {
  let newGuideline1 = guideline1 + dx;
  let newGuideline2 = guideline2 + dx;

  if (newGuideline1 >= 0 && newGuideline2 <= W) {
    guideline1 = newGuideline1;
    guideline2 = newGuideline2;
  }

  drawings();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLines(-steps);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLines(steps);
  }
});

function drawBins() {}

function drawCannon() {}

function drawings() {
  clearCanvas();
  guidelines();
  drawBins();
  drawCannon();
}
drawings();
