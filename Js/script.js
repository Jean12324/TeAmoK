/* =====================================
   NIEBLA – NUBES QUE PASAN, NO TODO LLENO
===================================== */

const fogCanvas = document.getElementById("fog-layer");
const fogCtx = fogCanvas.getContext("2d");

function resizeFog() {
  fogCanvas.width = window.innerWidth;
  fogCanvas.height = window.innerHeight;
}
resizeFog();
window.addEventListener("resize", resizeFog);

// creamos varias “nubes” de niebla
const cloudCount = 8;
const clouds = [];

for (let i = 0; i < cloudCount; i++) {
  clouds.push({
    x: Math.random(),        // 0–1 (posición relativa)
    y: Math.random() * 0.8,  // más o menos zona media
    radius: 0.25 + Math.random() * 0.35, // tamaño relativo
    speedX: (Math.random() * 0.0005 + 0.00015) * (Math.random() < 0.5 ? -1 : 1),
    offsetY: (Math.random() - 0.5) * 0.0004,
    phase: Math.random() * Math.PI * 2,
    lifeOffset: Math.random() * 1000
  });
}

let fogTime = 0;

function drawFog() {
  const w = fogCanvas.width;
  const h = fogCanvas.height;

  fogCtx.clearRect(0, 0, w, h);

  fogCtx.globalCompositeOperation = "lighter";

  clouds.forEach((c) => {
    // movimiento base (horizontal + pequeña variación vertical)
    c.x += c.speedX;
    c.y += c.offsetY;

    // si sale completamente de la pantalla, lo reubicamos al otro lado
    if (c.x < -0.5) c.x = 1.3;
    if (c.x > 1.3) c.x = -0.5;
    if (c.y < -0.2) c.y = 1.1;
    if (c.y > 1.1) c.y = -0.2;

    const cx = c.x * w;
    const cy = c.y * h;

    const baseRadius = c.radius * Math.max(w, h);

    // “respiración” de la nube (cambia su forma)
    const pulse = 0.82 + 0.28 * Math.sin(fogTime * 0.4 + c.phase);
    const r = baseRadius * pulse;

    // alpha dinámico: la nube aparece, se vuelve más fuerte y luego se va
    const life = (Math.sin((fogTime * 0.15) + c.lifeOffset) + 1) / 2; // 0–1
    const alpha = 0.08 + life * 0.22; // máximo ~0.3

    const grad = fogCtx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r);
    grad.addColorStop(0, `rgba(210, 245, 225, ${alpha})`);
    grad.addColorStop(0.4, `rgba(170, 230, 210, ${alpha * 0.55})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");

    fogCtx.fillStyle = grad;
    fogCtx.beginPath();
    fogCtx.arc(cx, cy, r, 0, Math.PI * 2);
    fogCtx.fill();
  });

  fogTime += 0.01;
  requestAnimationFrame(drawFog);
}

drawFog();

/* =====================================
          PÉTALOS REALISTAS
===================================== */

function startPetalos() {
  const cont = document.getElementById("floating-objects");

  function crearPetalo() {
    const p = document.createElement("div");
    p.className = "petalo";

    const size = 16 + Math.random() * 30;
    p.style.width = size + "px";
    p.style.height = size * 1.4 + "px";

    p.style.left = Math.random() * 100 + "%";
    p.style.top = "110%";

    const wind = (Math.random() - 0.5) * 250;
    const rot = 90 + Math.random() * 240;
    const dur = 9000 + Math.random() * 9000;

    p.animate(
      [
        { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate3d(${wind}px, -130vh, 0) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      { duration: dur, easing: "linear" }
    ).onfinish = () => p.remove();

    cont.appendChild(p);
  }

  setInterval(crearPetalo, 60);
}
startPetalos();

/* =====================================
        BRILLITOS PROFESIONALES
===================================== */

function startSparkles() {
  const layer = document.getElementById("sparkles-layer");
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2 - 40;

  function createSparkle() {
    const s = document.createElement("div");
    s.className = "sparkle";

    const offsetX = -80 + Math.random() * 160;
    const offsetY = -60 + Math.random() * 120;

    s.style.left = cx + offsetX + "px";
    s.style.top = cy + offsetY + "px";

    const d = 1400 + Math.random() * 1800;
    const delay = Math.random() * 1000;

    s.style.animationDuration = d + "ms";
    s.style.animationDelay = delay + "ms";

    layer.appendChild(s);

    setTimeout(() => s.remove(), d + delay + 200);
  }

  setInterval(createSparkle, 240);
}
startSparkles();

/* =====================================
               TEXTO AMOROSO
===================================== */

const subtitleText = "Hoy, 14 de noviembre, día de entregar coronitas, esta es la tuya, mi amor.";
const bodyText = `Mi amor, esta corona es para ti, porque de todas las personas del mundo,
tú eres la única que convierte mis días normales en algo especial.

No es de oro ni de esmeraldas de verdad, pero todo lo que ves aquí
lo hice pensando en ti, en tu sonrisa y en lo que siento por ti.

Gracias por quedarte, por aguantar mis locuras y por ser mi reina
aunque a veces yo sea un desastre. Te amo más de lo que puedo escribir aquí.`;

function initLoveText() {
  const overlay = document.getElementById("love-text-overlay");
  if (!overlay) return;

  const subtitleEl = overlay.querySelector(".love-subtitle");
  const bodyEl = overlay.querySelector(".love-body");

  subtitleEl.textContent = subtitleText;
  bodyEl.textContent = bodyText;

  // Cuando termine la animación de scroll, programamos el BOOM
  const inner = overlay.querySelector(".love-text-inner");
  inner.addEventListener("animationend", (e) => {
    if (e.animationName === "loveScroll") {
      // 2 segundos después de terminar el texto
      setTimeout(() => {
        // desvanecemos el texto
        overlay.style.transition = "opacity 1.2s ease-out";
        overlay.style.opacity = "0";

        setTimeout(() => {
          overlay.style.display = "none";
          showLoveBoom();
        }, 1200); // cuando ya terminó el fade-out
      }, 2000);
    }
  });
}

/* =====================================
          BOOM: TE AMO KRISCIAL
===================================== */

function showLoveBoom() {
  const boom = document.getElementById("love-boom");
  if (!boom) return;

  boom.classList.add("show");

  // después de 3s la animación termina, limpiamos la clase
  setTimeout(() => {
    boom.classList.remove("show");
  }, 3000);
}

/* =====================================
               MÚSICA
===================================== */

function playBackgroundMusic() {
  const audio = document.getElementById("bg-music");
  audio.loop = false;

  audio.addEventListener("ended", () => {
    setTimeout(() => audio.play().catch(() => {}), 2000);
  });

  audio.play().catch(() => {
    const start = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", start);
    };
    window.addEventListener("click", start);
  });
}

playBackgroundMusic();

/* iniciamos el texto un poco después de la entrada de la corona */
setTimeout(initLoveText, 2200);
