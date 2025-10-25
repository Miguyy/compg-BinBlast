const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

let guideline1 = 20;
let guideline2 = 330;
const spacing = guideline2 - guideline1;
const steps = 350;

const blueBinImg = new Image();
const redBinImg = new Image();
const greenBinImg = new Image();
const yellowBinImg = new Image();

let blueLoaded = false;
let redLoaded = false;
let greenLoaded = false;
let yellowLoaded = false;

blueBinImg.src = "../images/blue_trashcan_nobg.png";
redBinImg.src = "../images/red_trashcan_nobg.png";
greenBinImg.src = "../images/green_trashcan_nobg.png";
yellowBinImg.src = "../images/yellow_trashcan_nobg.png";

blueBinImg.onload = () => {
  blueLoaded = true;
  drawings();
};
redBinImg.onload = () => {
  redLoaded = true;
  drawings();
};
greenBinImg.onload = () => {
  greenLoaded = true;
  drawings();
};
yellowBinImg.onload = () => {
  yellowLoaded = true;
  drawings();
};

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

const binPositionsX = [180, 530, 880, 1230];
const binDrawY = 150;

function drawBins() {
  const binImages = [
    { img: blueBinImg, loaded: blueLoaded },
    { img: redBinImg, loaded: redLoaded },
    { img: greenBinImg, loaded: greenLoaded },
    { img: yellowBinImg, loaded: yellowLoaded },
  ];

  for (let i = 0; i < binImages.length; i++) {
    const entry = binImages[i];
    if (!entry.loaded) continue;

    const img = entry.img;
    const drawW = (img.naturalWidth || img.width) / 3;
    const drawH = (img.naturalHeight || img.height) / 3;

    const drawX = binPositionsX[i] - drawW / 2;
    ctx.drawImage(img, drawX, binDrawY, drawW, drawH);
  }
}

function drawCannon() {}

function drawings() {
  clearCanvas();
  guidelines();
  drawBins();
  drawCannon();
}

drawings();
