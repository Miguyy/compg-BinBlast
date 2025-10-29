//-----------------INDEX-----------------//
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
