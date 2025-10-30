const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

const W = canvas.width,
  H = canvas.height;

let bgImg = new Image();
bgImg.src = "../images/canvas background.png";

bgImg.onload = function () {
  setInterval(render, 1000 / 60); //start animation AFTER image load! - 15 fps
};

//sprite frame counter
let frameIndex = 0;
let bgX = 0;

function render() {
  /* ctx.clearRect(0, 0, W, H); */

  ctx.drawImage(bgImg, bgX++, 0, W, H);
  ctx.drawImage(bgImg, bgX - W, 0, W, H);

  if (bgX - W >= 0) {
    bgX = 0;
  }

  ctx.drawImage(
    image,
    0,
    frameIndex * 100,
    100,
    100,
    W / 2 - 50,
    H / 2 + 25,
    100,
    100
  );

  frameIndex++;
  if (frameIndex == 5) frameIndex = 0; //reset the number of frames counter
}
