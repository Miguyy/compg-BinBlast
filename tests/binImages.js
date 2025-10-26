const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;

let cannonImg = new Image();
cannonImg.src = "../images/cannon_nobg.png";

function clearCanvas() {
  ctx.clearRect(0, 0, W, H);
}

function drawBins() {
  cannonImg.onload = function () {
    ctx.drawImage(
      cannonImg,
      W / 2 - 230,
      460,
      cannonImg.width / 3,
      cannonImg.height / 3
    );
  };
}

function drawings() {
  clearCanvas();

  drawBins();
}
drawings();
