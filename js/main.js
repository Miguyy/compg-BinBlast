//-----------------INDEX-----------------//
//---------------------------------------//
//-----------------BUTTON-----------------//
//---------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("try-game-button");
  if (!btn) return;

  const innerLink = btn.querySelector("a");
  const href = innerLink ? innerLink.getAttribute("href") : null;

  let running = false;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (running) return;
    running = true;

    btn.classList.add("sending");
    btn.style.transform = "scale(1.05)";
  });

  btn.addEventListener("transitionstart", (e) => {
    if (e.propertyName === "transform") {
      btn.textContent = "JOINING...";
    }
  });

  btn.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    btn.style.transform = "scale(1)";

    setTimeout(() => {
      btn.textContent = "JOINED";
      setTimeout(() => {
        if (href) window.location.href = href;
      }, 350);
    }, 80);
  });
});

//-----------------CLOUD IMAGES-----------------//
//---------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".clouds-images-container");
  if (!container) return;

  const CLOUD_SRC = "../images/cloud.png";
  const TOTAL = 12;
  const perBand = Math.ceil(TOTAL / 3);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  const bands = [
    { min: 0.02, max: 0.25 },
    { min: 0.35, max: 0.55 },
    { min: 0.7, max: 0.88 },
  ];

  for (let b = 0; b < 3; b++) {
    for (let i = 0; i < perBand; i++) {
      if (b * perBand + i >= TOTAL) break;

      const img = document.createElement("img");
      img.src = CLOUD_SRC;
      img.alt = "cloud";
      img.className = "cloud";

      const vh = window.innerHeight;
      const yPercent = rand(bands[b].min, bands[b].max);
      const startY = Math.round(vh * yPercent);

      const size = Math.round(rand(70, 260));
      const opacity = rand(0.6, 1);

      const duration = rand(12, 28).toFixed(2) + "s";
      const negDelay = "-" + rand(0, parseFloat(duration)).toFixed(2) + "s";

      const startX = Math.round(
        rand(-window.innerWidth * 0.6, window.innerWidth * 0.8)
      );

      img.style.setProperty("--cloud-x", startX + "px");
      img.style.setProperty("--cloud-y", startY + "px");
      img.style.setProperty("--cloud-width", size + "px");
      img.style.setProperty("--cloud-duration", duration);
      img.style.setProperty("--cloud-delay", negDelay);
      img.style.setProperty("--cloud-opacity", opacity.toFixed(2));

      container.appendChild(img);
    }
  }

  window.addEventListener("resize", () => {
    const clouds = Array.from(container.querySelectorAll(".cloud"));
    clouds.forEach((el) => {
      const bandIndex = Math.floor(Math.random() * 3);
      const vh = window.innerHeight;
      const yPercent = rand(bands[bandIndex].min, bands[bandIndex].max);
      el.style.setProperty("--cloud-y", Math.round(vh * yPercent) + "px");
    });
  });
});

//-----------------NAVBAR EXPLANATIONS-----------------//
//---------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const howLink = document.querySelector('a[href="#how-to-play"]');
  if (!howLink) return;
  howLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "Usa as setas do teclado para apontares para onde queres lançar o resíduo. Carrega na barra de espaço para lançares o resíduo. O objectivo é reciclar o máximo de resíduos possível!!"
    );
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const howLink = document.querySelector('a[href="#about"]');
  if (!howLink) return;
  howLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "BinBlast é um jogo educativo desenvolvido para a disciplina de Computação Gráfica do Instituto Politécnico do Porto - ESMAD. O objetivo do jogo é promover a consciência ambiental e a importância da reciclagem, proporcionando uma experiência divertida e interativa aos jogadores."
    );
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const howLink = document.querySelector('a[href="#credits"]');
  if (!howLink) return;
  howLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "Desenvolvido por Miguel Machado e Manuel Teixeira para a cadeira de Computação Gráfica do Instituto Politécnico do Porto - ESMAD."
    );
  });
});

//-----------------GAME-----------------//
//---------------------------------------//
//-----------------BUTTON-----------------//
//---------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("goback-game-button");
  if (!btn) return;

  const innerLink = btn.querySelector("a");
  const href = innerLink ? innerLink.getAttribute("href") : null;

  let running = false;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (running) return;
    running = true;

    btn.classList.add("sending");
    btn.style.transform = "scale(1.05)";
  });

  btn.addEventListener("transitionstart", (e) => {
    if (e.propertyName === "transform") {
      btn.textContent = "GOING BACK...";
    }
  });

  btn.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    btn.style.transform = "scale(1)";

    setTimeout(() => {
      btn.textContent = "JOINED";
      setTimeout(() => {
        if (href) window.location.href = href;
      }, 350);
    }, 80);
  });
});

//-----------------CANVAS-----------------//
//---------------------------------------//
const canvas = document.getElementById("binBlastCanvas");
const ctx = canvas.getContext("2d");

function fitCanvas() {
  canvas.width = canvas.clientWidth || 1400;
  canvas.height = canvas.clientHeight || 700;
}
fitCanvas();
window.addEventListener("resize", () => {
  fitCanvas();
});

const STEP = 350;
const ANIM_DURATION = 250;

function makeImg(src) {
  const img = new Image();
  img.src = src;
  img._loaded = false;
  img.onload = () => {
    img._loaded = true;
  };
  return img;
}

//-----------------IMAGES-----------------//
//---------------------------------------//
const images = {
  background: makeImg("../images/streetBackground.png"),
  cloud: makeImg("../images/cloud.png"),
  cannon: makeImg("../images/cannon_nobg.png"),
  bins: {
    blue: {
      img: makeImg("../images/blue_trashcan_nobg.png"),
      noLid: makeImg("../images/blue_trashcan_nobg_nolid.png"),
      binType: "paper",
    },
    red: {
      img: makeImg("../images/red_trashcan_nobg.png"),
      noLid: makeImg("../images/red_trashcan_nobg_nolid.png"),
      binType: "battery",
    },
    green: {
      img: makeImg("../images/green_trashcan_nobg.png"),
      noLid: makeImg("../images/green_trashcan_nobg_nolid.png"),
      binType: "glass",
    },
    yellow: {
      img: makeImg("../images/yellow_trashcan_nobg.png"),
      noLid: makeImg("../images/yellow_trashcan_nobg_nolid.png"),
      binType: "plasticMetal",
    },
  },
  residuals: {
    wine: { img: makeImg("../images/residual1.png"), residualType: "glass" },
    perfume: { img: makeImg("../images/residual2.png"), residualType: "glass" },
    cocaCola: {
      img: makeImg("../images/residual3.png"),
      residualType: "glass",
    },
    cocaColaCanFake: {
      img: makeImg("../images/residual4.png"),
      residualType: "plasticMetal",
    },
    tuna: {
      img: makeImg("../images/residual5.png"),
      residualType: "plasticMetal",
    },
    waterBottle: {
      img: makeImg("../images/residual6.png"),
      residualType: "plasticMetal",
    },
    paper: { img: makeImg("../images/residual7.png"), residualType: "paper" },
    box: { img: makeImg("../images/residual8.png"), residualType: "paper" },
    toiletPaper: {
      img: makeImg("../images/residual9.png"),
      residualType: "paper",
    },
    battery1: {
      img: makeImg("../images/residual10.png"),
      residualType: "battery",
    },
    battery2: {
      img: makeImg("../images/residual11.png"),
      residualType: "battery",
    },
    battery3: {
      img: makeImg("../images/residual12.png"),
      residualType: "battery",
    },
  },
};

//-----------------BINS PART-----------------//
//---------------------------------------//
const binIds = ["green", "blue", "yellow", "red"];
let centerIndex = 1;

let animOffset = 0;
let animating = false;
let animStartTime = 0;
let animFrom = 0;
let animTo = 0;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function slotXs() {
  const cx = canvas.width / 2;
  return [cx - STEP, cx, cx + STEP];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (images.background._loaded)
    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
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
    { x: xs[2] + animOffset, id: binIds[right] },
  ];
  const drawY = 440;
  slots.forEach((s) => {
    const entry = images.bins[s.id];
    if (!entry.img._loaded) return;
    const centerX = s.x;

    const isCenterSlot = s.id === binIds[center];
    const useNoLid = entry.noLid._loaded && isCenterSlot;
    const useImg = useNoLid ? entry.noLid : entry.img;

    const drawW = (useImg.naturalWidth || useImg.width) / 5;
    const drawH = (useImg.naturalHeight || useImg.height) / 5;
    const drawX = centerX - drawW / 2;
    if (drawX + drawW < 0 || drawX > canvas.width) return;
    ctx.drawImage(useImg, drawX, drawY, drawW, drawH);
  });
}

//-----------------CANNON PART-----------------//
//---------------------------------------//
function drawCannon() {
  if (!images.cannon._loaded) return;
  const img = images.cannon;
  const drawW = (img.naturalWidth || img.width) / 4;
  const drawH = (img.naturalHeight || img.height) / 4;
  const drawX = canvas.width / 2 - drawW / 2;
  ctx.drawImage(img, drawX, 570, drawW, drawH);
}

//-----------------CANNON (RESIDUALS) PART-----------------//
//---------------------------------------//
let activeResiduals = [];
let nextResidual = null;

let currentBinResidual = [[], [], [], []];

let scoreMessage = null;
let scoreMessageTime = 0;

function getRandomResidual() {
  const residualKeys = Object.keys(images.residuals);
  const randomKey =
    residualKeys[Math.floor(Math.random() * residualKeys.length)];
  return images.residuals[randomKey];
}

function loadNextResidual() {
  nextResidual = getRandomResidual();
  const label = document.getElementById("nextResidualLabel");
  const imgEl = document.getElementById("nextResidualImage");
  if (label) {
    label.style.background = "white";
    label.style.color = "#863228";
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "8px";
  }
  if (imgEl && nextResidual) {
    imgEl.src = nextResidual.img.src;
    imgEl.style.display = "inline-block";
  }
}

loadNextResidual();

function updateNextResidualUI() {
  const label = document.getElementById("nextResidualLabel");
  const imgEl = document.getElementById("nextResidualImage");
  if (!label || !imgEl) return false;

  label.style.background = "white";
  label.style.color = "#863228";
  label.style.display = "flex";
  label.style.alignItems = "center";
  label.style.gap = "8px";

  if (nextResidual && nextResidual.img && nextResidual.img._loaded) {
    imgEl.src = nextResidual.img.src;
    imgEl.style.display = "inline-block";
  } else if (nextResidual && nextResidual.img) {
    imgEl.src = nextResidual.img.src;
    imgEl.style.display = "inline-block";
    nextResidual.img.onload = () => {
      imgEl.style.display = "inline-block";
    };
  }
  return true;
}

if (!updateNextResidualUI()) {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      updateNextResidualUI();
    },
    { once: true }
  );
}

function fireResidual() {
  if (!nextResidual) loadNextResidual();
  const residualData = nextResidual;
  if (!residualData) return;

  const img = residualData.img;

  const startX = canvas.width / 2;
  const startY = 570;

  const xs = slotXs();
  const centerBinX = xs[1];

  const speed = 12;
  const velocityX = centerBinX > startX ? speed : -speed;
  const velocityY = 0;

  activeResiduals.push({
    x: startX,
    y: startY,
    img,
    type: residualData.residualType,
    velocityX,
    velocityY,
    targetBinX: centerBinX,
  });

  loadNextResidual();
}

//-----------------CLOUDS-----------------//
//---------------------------------------//
let canvasClouds = [];
let cloudsInited = false;
let _lastCloudUpdate = performance.now();

function initCanvasClouds(count = 4) {
  canvasClouds = [];
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  const bands = [
    { min: 0.06, max: 0.18 },
    { min: 0.32, max: 0.5 },
  ];

  for (let i = 0; i < count; i++) {
    const band = bands[i % bands.length];
    const size = Math.round(rand(80, 220));
    const aX = Math.round(rand(-300, 50));
    const bX = Math.round(rand(canvas.width - 50, canvas.width + 300));
    const y = Math.round(
      rand(canvas.height * band.min, canvas.height * band.max)
    );
    const duration = Math.round(rand(4000, 12000));
    const startT = Math.random();
    const dir = Math.random() < 0.5 ? 1 : -1;
    const opacity = rand(0.65, 1);

    canvasClouds.push({
      a: { x: aX, y },
      b: { x: bX, y },
      t: startT,
      dir,
      size,
      duration,
      opacity,
    });
  }
}

function drawCanvasClouds() {
  if (!images.cloud._loaded) return;

  if (!cloudsInited) {
    initCanvasClouds(3);
    cloudsInited = true;
    _lastCloudUpdate = performance.now();
  }

  const now = performance.now();
  const dt = now - _lastCloudUpdate;
  _lastCloudUpdate = now;

  const img = images.cloud;
  const imgW = img.naturalWidth || img.width || 1;
  const imgH = img.naturalHeight || img.height || imgW * 0.5;

  for (const c of canvasClouds) {
    c.t += (dt / c.duration) * c.dir;
    if (c.t >= 1) {
      c.t = 1;
      c.dir = -1;
    } else if (c.t <= 0) {
      c.t = 0;
      c.dir = 1;
    }

    const x = c.a.x + (c.b.x - c.a.x) * c.t;
    const y = c.a.y;

    const drawW = c.size;
    const drawH = Math.round((imgH / imgW) * drawW);

    ctx.save();
    ctx.globalAlpha = c.opacity;
    ctx.drawImage(img, x - drawW / 2, y - drawH / 2, drawW, drawH);
    ctx.restore();
  }
}

//-----------------FUNCTION THAT CALLS ALL THE DRAWING FUNCTIONS-----------------//
//---------------------------------------//
function drawAll() {
  clearCanvas();
  drawBins();
  drawCannon();
  drawCanvasClouds();
}

//-----------------FUNCTION TO RENDER EVERYTHING-----------------//
//---------------------------------------//
function render(timestamp) {
  if (animating) {
    if (!animStartTime) animStartTime = timestamp;
    const elapsed = timestamp - animStartTime;
    const t = Math.min(1, elapsed / ANIM_DURATION);
    const eased = easeOutCubic(t);
    animOffset = animFrom + (animTo - animFrom) * eased;

    if (t >= 1) {
      if (animTo < animFrom) {
        centerIndex = (centerIndex + 1) % binIds.length;
      } else if (animTo > animFrom) {
        centerIndex = (centerIndex - 1 + binIds.length) % binIds.length;
      }
      animOffset = 0;
      animating = false;
      animStartTime = 0;
      animFrom = 0;
      animTo = 0;
    }
  }

  drawAll();

  if (activeResiduals.length) {
    for (let i = activeResiduals.length - 1; i >= 0; i--) {
      const r = activeResiduals[i];
      r.x += r.velocityX;
      r.y += r.velocityY;

      if (r.img._loaded) {
        const w = (r.img.naturalWidth || r.img.width) / 5;
        const h = (r.img.naturalHeight || r.img.height) / 5;
        ctx.drawImage(r.img, r.x - w / 2, r.y - h / 2, w, h);
      }

      const xs = slotXs();
      const centerBinX = xs[1];

      if (
        (r.velocityX > 0 && r.x >= centerBinX) ||
        (r.velocityX < 0 && r.x <= centerBinX)
      ) {
        r.x = centerBinX;
        r.velocityX = 0;
        r.velocityY = 0;

        const binId = binIds[centerIndex % binIds.length];
        const binType = images.bins[binId].binType;

        currentBinResidual[centerIndex].push({
          imgSrc: r.img.src,
          type: r.type,
          placedAt: performance.now(),
        });

        //-----------------MESSAGES-----------------//
        //---------------------------------------//
        if (r.type === binType) {
          scoreMessage = { text: "Acertaste!!!", color: "green" };
        } else {
          scoreMessage = { text: "Erraste!!!", color: "red" };
        }
        scoreMessageTime = performance.now();

        activeResiduals.splice(i, 1);
      }
    }
  }

  if (scoreMessage) {
    const elapsed = timestamp - scoreMessageTime;
    if (elapsed < 1000) {
      ctx.font = "40px Arial";
      ctx.fillStyle = scoreMessage.color;
      ctx.textAlign = "center";
      ctx.fillText(scoreMessage.text, canvas.width / 2, 200);
    } else {
      scoreMessage = null;
    }
  }

  requestAnimationFrame(render);
}

//-----------------END OF THE RENDER FUNCTION-----------------//
//---------------------------------------//
requestAnimationFrame(render);

//-----------------EVENTS (BINS)-----------------//
//---------------------------------------//
window.addEventListener("keydown", (e) => {
  if (animating) return;
  if (e.key === "ArrowRight") {
    e.preventDefault();
    animating = true;
    animStartTime = 0;
    animFrom = 0;
    animTo = -STEP;
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    animating = true;
    animStartTime = 0;
    animFrom = 0;
    animTo = +STEP;
  }
});

//-----------------EVENTS (CANNON)-----------------//
//---------------------------------------//
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault();
    fireResidual();
  }
});

//-----------------ML5.js-----------------//
//---------------------------------------//
const canvas2 = document.getElementById("videoCanvas");
const ctx2 = canvas2.getContext("2d");

const W2 = canvas2.width;
const H2 = canvas2.height;

let handPose2;
let hands2 = [];
let video2;

let circleX2 = W2 / 2;
let circleY2 = H2 / 2;
const smoothing2 = 0.2;

async function preload2() {
  video2 = await getVideo2();
  handPose2 = await ml5.handPose({ flipped: true });
  await handPose2.detectStart(video2, gotHands2);
  render2();
}

window.addEventListener("DOMContentLoaded", preload2);

function gotHands2(results) {
  hands2 = results;
}

function render2() {
  ctx2.clearRect(0, 0, W2, H2);

  ctx2.save();
  ctx2.globalAlpha = 0.6;
  ctx2.translate(W2, 0);
  ctx2.scale(-1, 1);
  ctx2.drawImage(video2, 0, 0, W2, H2);
  ctx2.restore();
  ctx2.globalAlpha = 1.0;

  ctx2.fillStyle = "rgba(255,255,255,0.15)";
  ctx2.fillRect(0, 0, W2, H2);

  //-----------------FOR THE LEFT HAND-----------------//
  //---------------------------------------//
  if (hands2.length > 0) {
    const leftHand = hands2.find(
      (h) => h.handedness && h.handedness.toLowerCase() === "left"
    );

    if (leftHand) {
      const indexMcp = leftHand.keypoints.find(
        (kp) => kp.name === "index_finger_mcp"
      );
      const indexTip = leftHand.keypoints.find(
        (kp) => kp.name === "index_finger_tip"
      );

      if (indexTip) {
        circleX2 += (indexTip.x - circleX2) * smoothing2;
        circleY2 += (indexTip.y - circleY2) * smoothing2;
        ctx2.fillStyle = "#863228"; 
        ctx2.beginPath();
        ctx2.arc(circleX2, circleY2, 8, 0, 2 * Math.PI);
        ctx2.fill();
      }

      if (indexMcp && indexTip) {
        const dx = indexTip.x - indexMcp.x;
        const dy = indexTip.y - indexMcp.y;
        let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angleDeg < 0) angleDeg += 360;

        ctx2.fillStyle = "white";
        ctx2.beginPath();
        ctx2.arc(indexTip.x, indexTip.y, 5, 0, 2 * Math.PI);
        ctx2.fill();

        if (!render2.movedRecently) {
          if ((angleDeg >= 315 || angleDeg <= 45) && !animating) {
            animating = true;
            animStartTime = 0;
            animFrom = 0;
            animTo = +STEP;
            render2.movedRecently = true;
            setTimeout(() => {
              render2.movedRecently = false;
              animating = false;
            }, 400);
          } else if (angleDeg >= 135 && angleDeg <= 225 && !animating) {
            animating = true;
            animStartTime = 0;
            animFrom = 0;
            animTo = -STEP;
            render2.movedRecently = true;
            setTimeout(() => {
              render2.movedRecently = false;
              animating = false;
            }, 400);
          }
        }
      }
    }

    //-----------------FOR THE RIGHT HAND-----------------//
    //---------------------------------------//
    const rightHand = hands2.find(
      (h) => h.handedness && h.handedness.toLowerCase() === "right"
    );

    if (rightHand) {
      const thumbTip = rightHand.keypoints.find(
        (kp) => kp.name === "thumb_tip"
      );
      const indexTip = rightHand.keypoints.find(
        (kp) => kp.name === "index_finger_tip"
      );

      if (thumbTip && indexTip) {
        const centerX = (indexTip.x + thumbTip.x) / 2;
        const centerY = (indexTip.y + thumbTip.y) / 2;

        const dx = indexTip.x - thumbTip.x;
        const dy = indexTip.y - thumbTip.y;
        const pinchDist = Math.sqrt(dx * dx + dy * dy);

        ctx2.fillStyle = "rgba(134, 50, 40, 0.6)";
        ctx2.strokeStyle = "#000";
        ctx2.lineWidth = 2;
        ctx2.beginPath();
        ctx2.arc(centerX, centerY, pinchDist / 2, 0, 2 * Math.PI);
        ctx2.fill();
        ctx2.stroke();

        if (pinchDist > 100 && !render2.lastFired) {
          fireResidual();
          render2.lastFired = true;
          setTimeout(() => (render2.lastFired = false), 1000);
        }
      }
    }
  }

  requestAnimationFrame(render2);
}

async function getVideo2() {
  const videoElement2 = document.getElementById("video");
  videoElement2.width = W2;
  videoElement2.height = H2;

  const capture2 = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  videoElement2.srcObject = capture2;
  videoElement2.play();

  return videoElement2;
}

//-----------------VARIABLES + CLASSES FOR THE BINS AND THE RESIDUALS-----------------//
//---------------------------------------//
const currentBin = ["green", "blue", "yellow", "red"];
const currentResidual = [
  "glass",
  "paper",
  "plastic",
  "plasticMetal",
  "battery",
];

class Bin {
  constructor(binType) {
    this.binType = binType;
  }
}

class Residual {
  constructor(residualType) {
    this.residualType = residualType;
  }
}
