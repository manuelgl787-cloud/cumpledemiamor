/* =========================
   CONFIGURACIÓN GENERAL
========================= */

const TOTAL = 23;

/* === SLIDES (textos) === */
const slides = [
  { title: "Feliz cumpleaños, mi vida ❤️", message: "Hoy se celebra tu cumple y yo celebro la suerte de tenerte." },
  { title: "Tu sonrisa", message: "Hay días difíciles, y luego estás tú." },
  { title: "Nuestra historia", message: "Me encanta todo de ti." },
  { title: "Contigo", message: "Todo se siente más bonito contigo." },
  { title: "Mi lugar favorito", message: "No es un sitio. Eres tú." },
  { title: "Gracias", message: "Gracias por ser como eres, siempre." },
  { title: "Momentos", message: "Cada recuerdo contigo vale oro." },
  { title: "Risas", message: "Ojalá nunca nos falten las risas tontas." },
  { title: "Paz", message: "Contigo me siento en casa." },
  { title: "Equipo", message: "Me encantas." },
  { title: "Admiración", message: "Te admiro más de lo que imaginas." },
  { title: "Detalles", message: "Eres el amorcito de mi vida." },
  { title: "Cariño", message: "Siempre voy a cuidarte." },
  { title: "Futuro", message: "Me ilusiona todo lo que nos queda." },
  { title: "Suerte", message: "Qué suerte la mía de tenerte." },
  { title: "Verdad", message: "Lo nuestro es real, y eso es lo más bonito." },
  { title: "Siempre", message: "Siempre en tu mente." },
  { title: "Hoy", message: "Hoy es tu día y quiero verte sonreír." },
  { title: "Deseo", message: "Que este año que viene te trate bonito." },
  { title: "Amor", message: "Te quiero con todo." },
  { title: "Gracias", message: "Gracias por existir." },
  { title: "Última", message: "Eres mi princesita." },
  { title: "Especial Eladio 🖤🎧", message: "Esta canción me recuerda a ti.\nTe amo mucho mi amor." }
];

/* =========================
   RUTA DE IMÁGENES
========================= */
function photoPath(i){
  return `img/foto${i + 1}.jpg`;
}

/* =========================
   DOM
========================= */
const card = document.getElementById("card");
const photo = document.getElementById("photo");
const titleEl = document.getElementById("title");
const msgEl = document.getElementById("message");
const counter = document.getElementById("counter");
const barFill = document.getElementById("barFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const miniTitle = document.getElementById("miniTitle");

const eladioMusic = document.getElementById("eladioMusic");

/* === ESPECIAL ELADIO === */
const ELADIO_PAGE = 23;           // página 1–23
const ELADIO_SLIDE = ELADIO_PAGE - 1;

let idx = 0;

/* =========================
   FUNCIONES
========================= */

function setProgress(i){
  counter.textContent = `${i + 1} / ${TOTAL}`;
  barFill.style.width = `${((i + 1) / TOTAL) * 100}%`;
}

function preloadImage(src){
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(src);
    im.onerror = reject;
    im.src = src;
  });
}

async function render(i){
  card.classList.add("fadeOut");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  const slide = slides[i];
  const src = photoPath(i);

  try{
    await preloadImage(src);
    photo.src = src;
  }catch{
    photo.removeAttribute("src");
  }

  titleEl.textContent = slide.title;
  msgEl.textContent = slide.message;
  miniTitle.textContent = slide.title;

  setProgress(i);

  prevBtn.disabled = (i === 0);
  nextBtn.disabled = (i === TOTAL - 1);

  /* === ELADIO AUDIO === */
  if (eladioMusic) {
    if (i === ELADIO_SLIDE) {
      eladioMusic.currentTime = 0;
      eladioMusic.play().catch(()=>{});
    } else {
      eladioMusic.pause();
    }
  }

  requestAnimationFrame(() => {
    card.classList.remove("fadeOut");
  });
}

function go(n){
  idx = Math.max(0, Math.min(TOTAL - 1, n));
  render(idx);
}

/* =========================
   EVENTOS
========================= */
prevBtn.addEventListener("click", () => go(idx - 1));
nextBtn.addEventListener("click", () => go(idx + 1));

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(idx - 1);
  if (e.key === "ArrowRight" || e.key === " ") go(idx + 1);
});

/* =========================
   INIT
========================= */
render(idx);
