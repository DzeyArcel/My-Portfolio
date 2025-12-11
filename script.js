/* ============================================================
   REVEAL ANIMATIONS
   ============================================================ */

const reveals = document.querySelectorAll(".reveal");
const workCards = document.querySelectorAll(".reveal-card");
const tools = document.querySelectorAll(".tool");

function revealElements(list, className) {
  list.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add(className);
  });
}

function handleScrollReveal() {
  revealElements(reveals, "active");
  revealElements(workCards, "visible");
  revealElements(tools, "reveal-active");
}

window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);


/* ============================================================
   TOOL LOGIC (YEARS + SKILL BAR)
   ============================================================ */

document.querySelectorAll(".tool").forEach(tool => {
  const years = tool.getAttribute("data-years");
  const level = tool.getAttribute("data-level");

  // Ensure no duplicates
  if (!tool.querySelector(".years")) {
    const yearsEl = document.createElement("div");
    yearsEl.className = "years";
    tool.appendChild(yearsEl);
  }

  if (!tool.querySelector(".skill-bar")) {
    const bar = document.createElement("div");
    bar.className = "skill-bar";
    bar.innerHTML = `<div class="skill-fill"></div>`;
    tool.appendChild(bar);
  }

  tool.style.setProperty("--level", level);
  tool.querySelector(".years").textContent = years;
});


/* ============================================================
   AUTO SCROLL (Improved — runs only when visible)
   ============================================================ */

const container = document.querySelector(".auto-scroll");
let scrollAmount = 0;
let direction = 1;

function autoScroll() {
  if (!container) return;

  const rect = container.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) {
    requestAnimationFrame(autoScroll);
    return;
  }

  scrollAmount += direction;
  container.scrollLeft = scrollAmount;

  if (scrollAmount >= container.scrollWidth - container.clientWidth) direction = -1;
  if (scrollAmount <= 0) direction = 1;

  requestAnimationFrame(autoScroll);
}

autoScroll();

document.body.style.overflowX = "hidden";


/* ============================================================
   TEXT HOVER GLOW
   ============================================================ */

const helloText = document.querySelector('.hero-content h1');

helloText?.addEventListener('mousemove', e => {
  const rect = helloText.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
  helloText.style.textShadow = `${x}px 0px 28px rgba(0,0,0,0.18)`;
});

helloText?.addEventListener('mouseleave', () => {
  helloText.style.textShadow = "none";
});


/* ============================================================
   FLOATING NAV ALWAYS CENTERED
   ============================================================ */

window.addEventListener("resize", () => {
  const nav = document.querySelector(".museum-nav");
  if (nav) {
    nav.style.left = "50%";
    nav.style.transform = "translateX(-50%)";
  }
});


/* ============================================================
   SMOOTH SCROLL + CLICK FEEDBACK
   ============================================================ */

document.querySelectorAll('.museum-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 100,
      behavior: "smooth"
    });

    this.classList.add("nav-pressed");
    setTimeout(() => this.classList.remove("nav-pressed"), 260);
  });
});


/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */

const observedSections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".museum-nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  observedSections.forEach(section => {
    if (scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active-nav",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
});

// Reveal
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Auto year
document.getElementById("year").textContent = new Date().getFullYear();
