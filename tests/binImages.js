const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

let blueBinImg = new Image();
blueBinImg.src = "../images/blue_trashcan_nobg.png";
let redBinImg = new Image();
redBinImg.src = "../images/red_trashcan_nobg.png";
let greenBinImg = new Image();
greenBinImg.src = "../images/green_trashcan_nobg.png";
let yellowBinImg = new Image();
yellowBinImg.src = "../images/yellow_trashcan_nobg.png";

function clearCanvas() {
  ctx.clearRect(0, 0, W, H);
}

function drawBins() {
  blueBinImg.onload = function () {
    ctx.drawImage(
      blueBinImg,
      25,
      150,
      blueBinImg.width / 3,
      blueBinImg.height / 3
    );
  };
  redBinImg.onload = function () {
    ctx.drawImage(
      redBinImg,
      325,
      150,
      redBinImg.width / 3,
      redBinImg.height / 3
    );
  };
  greenBinImg.onload = function () {
    ctx.drawImage(
      greenBinImg,
      625,
      150,
      greenBinImg.width / 3,
      greenBinImg.height / 3
    );
  };
  yellowBinImg.onload = function () {
    ctx.drawImage(
      yellowBinImg,
      925,
      150,
      yellowBinImg.width / 3,
      yellowBinImg.height / 3
    );
  };
}

function drawings() {
  clearCanvas();

  drawBins();
}
drawings();
