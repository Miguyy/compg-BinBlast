const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

// sizing
function fitCanvas() {
  canvas.width = canvas.clientWidth || 1400;
  canvas.height = canvas.clientHeight || 700;
}
fitCanvas();
window.addEventListener("resize", () => { fitCanvas(); /* don't call drawAll here, render loop handles it */ });

const STEP = 350; // distance between visible slots
const ANIM_DURATION = 420; // ms, adjust for speed

// helper to create Image with onload flag
function makeImg(src) {
  const img = new Image();
  img.src = src;
  img._loaded = false;
  img.onload = () => { img._loaded = true; /* no direct drawing - render loop will redraw */ };
  return img;
}

// images
const images = {
  background: makeImg("../images/canvas background.png"),
  cloud: makeImg("../images/cloud.png"),
  cannon: makeImg("../images/cannon_nobg.png"),
  bins: {
    blue: { img: makeImg("../images/blue_trashcan_nobg.png"), noLid: makeImg("../images/blue_trashcan_nobg_nolid.png") },
    red:  { img: makeImg("../images/red_trashcan_nobg.png"),  noLid: makeImg("../images/red_trashcan_nobg_nolid.png")  },
    green:{ img: makeImg("../images/green_trashcan_nobg.png"),noLid: makeImg("../images/green_trashcan_nobg_nolid.png")},
    yellow:{img: makeImg("../images/yellow_trashcan_nobg.png"),noLid: makeImg("../images/yellow_trashcan_nobg_nolid.png")},
  }
};

// logical bins sequence (circular)
const binIds = ["green", "blue", "yellow", "red"]; // duplicated green to have 5 bins for testing
let centerIndex = 1; // index in binIds that is center visible

// animation state (time-based)
let animOffset = 0;        // used by drawBins
let animating = false;
let animStartTime = 0;
let animFrom = 0;
let animTo = 0;

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

// compute 3 slot x positions (left, center, right)
function slotXs() {
  const cx = canvas.width / 2;
  return [cx - STEP, cx, cx + STEP];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (images.background._loaded) ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
}

function drawBins() {
  const xs = slotXs();
  const n = binIds.length;
  const left = (centerIndex - 1 + n) % n;
  const center = centerIndex % n;
  const right = (centerIndex + 1) % n;
  const slots = [
    { x: xs[0] + animOffset, id: binIds[left] },
    { x: xs[1] + animOffset, id: binIds[center] },
    { x: xs[2] + animOffset, id: binIds[right] }
  ];
  const drawY = 360;
  slots.forEach(s => {
    const entry = images.bins[s.id];
    if (!entry.img._loaded) return;
    const centerX = s.x;

    // only center slot uses no-lid image
    const isCenterSlot = s.id === binIds[center];
    const useNoLid = entry.noLid._loaded && isCenterSlot;
    const useImg = useNoLid ? entry.noLid : entry.img;

    const drawW = (useImg.naturalWidth || useImg.width) / 3;
    const drawH = (useImg.naturalHeight || useImg.height) / 3;
    const drawX = centerX - drawW / 2;
    if (drawX + drawW < 0 || drawX > canvas.width) return;
    ctx.drawImage(useImg, drawX, drawY, drawW, drawH);
  });
}

function drawCannon() {
  if (!images.cannon._loaded) return;
  const img = images.cannon;
  const drawW = (img.naturalWidth || img.width) / 4;
  const drawH = (img.naturalHeight || img.height) / 4;
  const drawX = canvas.width / 2 - drawW / 2;
  ctx.drawImage(img, drawX, 507, drawW, drawH);
}

function drawAll() {
  clearCanvas();
  drawBins();
  drawCannon();
}

// Continuous render loop (based on your example)
function render(timestamp) {
  // update animation state if animating
  if (animating) {
    if (!animStartTime) animStartTime = timestamp;
    const elapsed = timestamp - animStartTime;
    const t = Math.min(1, elapsed / ANIM_DURATION);
    const eased = easeOutCubic(t);
    animOffset = animFrom + (animTo - animFrom) * eased;

    if (t >= 1) {
      // animation finished -> rotate centerIndex accordingly
      if (animTo < animFrom) {
        // moved left (show next)
        centerIndex = (centerIndex + 1) % binIds.length;
      } else if (animTo > animFrom) {
        // moved right (show previous)
        centerIndex = (centerIndex - 1 + binIds.length) % binIds.length;
      }
      // reset animation
      animOffset = 0;
      animating = false;
      animStartTime = 0;
      animFrom = 0;
      animTo = 0;
    }
  }

  // redraw every frame
  drawAll();

  // next frame
  requestAnimationFrame(render);
}

// start the loop
requestAnimationFrame(render);

// keyboard: start an animation cycle (render loop does the per-frame updates)
window.addEventListener("keydown", (e) => {
  if (animating) return;
  if (e.key === "ArrowRight") {
    e.preventDefault();
    animating = true;
    animStartTime = 0;
    animFrom = 0;
    animTo = -STEP; // slide left (show next)
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    animating = true;
    animStartTime = 0;
    animFrom = 0;
    animTo = +STEP; // slide right (show previous)
  }
});
