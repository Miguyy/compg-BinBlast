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

const blueBinNoLidImg = new Image();
const redBinNoLidImg = new Image();
const greenBinNoLidImg = new Image();
const yellowBinNoLidImg = new Image();

let cannonImg = new Image();

let backgroundCanvasImg = new Image();
let cloudCanvasImg = new Image();

let blueLoaded = false;
let redLoaded = false;
let greenLoaded = false;
let yellowLoaded = false;

let blueNoLidLoaded = false;
let redNoLidLoaded = false;
let greenNoLidLoaded = false;
let yellowNoLidLoaded = false;

let cannonLoaded = false;

let backgroundCanvasLoaded = false;
let cloudCanvasLoaded = false;

blueBinImg.src = "../images/blue_trashcan_nobg.png";
redBinImg.src = "../images/red_trashcan_nobg.png";
greenBinImg.src = "../images/green_trashcan_nobg.png";
yellowBinImg.src = "../images/yellow_trashcan_nobg.png";

blueBinNoLidImg.src = "../images/blue_trashcan_nobg_nolid.png";
redBinNoLidImg.src = "../images/red_trashcan_nobg_nolid.png";
greenBinNoLidImg.src = "../images/green_trashcan_nobg_nolid.png";
yellowBinNoLidImg.src = "../images/yellow_trashcan_nobg_nolid.png";

cannonImg.src = "../images/cannon_nobg.png";

backgroundCanvasImg.src = "../images/canvas background.png";
cloudCanvasImg.src = "../images/cloud.png";

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

blueBinNoLidImg.onload = () => {
  blueNoLidLoaded = true;
  drawings();
};
redBinNoLidImg.onload = () => {
  redNoLidLoaded = true;
  drawings();
};
greenBinNoLidImg.onload = () => {
  greenNoLidLoaded = true;
  drawings();
};
yellowBinNoLidImg.onload = () => {
  yellowNoLidLoaded = true;
  drawings();
};

cannonImg.onload = () => {
  cannonLoaded = true;
  drawings();
};

backgroundCanvasImg.onload = () => {
  backgroundCanvasLoaded = true;
  drawings();
};
cloudCanvasImg.onload = () => {
  cloudCanvasLoaded = true;
  drawings();
};

function clearCanvas() {
  ctx.clearRect(0, 0, W, H);
  if (backgroundCanvasLoaded) {
    ctx.drawImage(backgroundCanvasImg, 0, 0, W, H);
  }
}

function guidelines() {
  ctx.beginPath();
  ctx.moveTo(guideline1, 0);
  ctx.lineTo(guideline1, H);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(guideline2, 0);
  ctx.lineTo(guideline2, H);
  ctx.strokeStyle = "black";
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

function drawBins() {
  const binPositionsX = [180, 530, 880, 1230];
  const binDrawY = 360;

  const binImages = [
    { img: blueBinImg, loaded: blueLoaded },
    { img: redBinImg, loaded: redLoaded },
    { img: greenBinImg, loaded: greenLoaded },
    { img: yellowBinImg, loaded: yellowLoaded },
  ];

  for (let i = 0; i < binImages.length; i++) {
    const entry = binImages[i];
    if (!entry.loaded) continue;

    let imgToDraw = entry.img;
    if (i === 0 && blueNoLidLoaded) {
      const centerX = binPositionsX[i];
      if (centerX >= guideline1 && centerX <= guideline2) {
        imgToDraw = blueBinNoLidImg;
      }
    }
    if (i === 1 && redNoLidLoaded) {
      const centerX = binPositionsX[i];
      if (centerX >= guideline1 && centerX <= guideline2) {
        imgToDraw = redBinNoLidImg;
      }
    }
    if (i === 2 && greenNoLidLoaded) {
      const centerX = binPositionsX[i];
      if (centerX >= guideline1 && centerX <= guideline2) {
        imgToDraw = greenBinNoLidImg;
      }
    }
    if (i === 3 && yellowNoLidLoaded) {
      const centerX = binPositionsX[i];
      if (centerX >= guideline1 && centerX <= guideline2) {
        imgToDraw = yellowBinNoLidImg;
      }
    }

    const drawW = (imgToDraw.naturalWidth || imgToDraw.width) / 3;
    const drawH = (imgToDraw.naturalHeight || imgToDraw.height) / 3;

    const drawX = binPositionsX[i] - drawW / 2;
    ctx.drawImage(imgToDraw, drawX, binDrawY, drawW, drawH);
  }
}

function drawCannon() {
  const cannonPositionX = 700;
  const cannonPositionY = 507;

  const cannonImages = [{ img: cannonImg, loaded: cannonLoaded }];
  for (let i = 0; i < cannonImages.length; i++) {
    const entry = cannonImages[i];
    if (!entry.loaded) continue;
    let imgToDraw = entry.img;

    const drawW = (imgToDraw.naturalWidth || imgToDraw.width) / 4;
    const drawH = (imgToDraw.naturalHeight || imgToDraw.height) / 4;

    const drawX = cannonPositionX - drawW / 2;
    ctx.drawImage(imgToDraw, drawX, cannonPositionY, drawW, drawH);
  }
}

function drawings() {
  clearCanvas();
  guidelines();
  drawBins();
  drawCannon();
}

drawings();

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLines(-steps);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLines(steps);
  }
});
