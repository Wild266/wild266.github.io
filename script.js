// ------- Experience data (cards in the deck) -------

const experiences = [
  {
    title: "UNC–Chapel Hill — CS & Computational Physics",
    subtitle: "B.S. Computer Science & B.S. Computational Physics (Expected 2026)",
    blurb:
      "Double major with a minor in Screenwriting, bridging ML, physics, and storytelling.",
    highlights: [
      "Chancellor’s Science Scholar & Chancellor Carolina Scholar.",
      "Coursework in machine learning, algorithms, digital logic, and computational modeling.",
      "Interested in AI safety, LLM reasoning, and clear communication of complex ideas."
    ]
  },
  {
    title: "Learning from Language (L3) Lab — Undergraduate Researcher",
    subtitle: "UNC Department of Computer Science",
    blurb:
      "Researching how large language models reason and how to harness 'wisdom of artificial crowds'.",
    highlights: [
      "Designed a Fermi estimation benchmark to study self-consistency in LLMs.",
      "Ran large-scale experiments on university GPU clusters using open-source models.",
      "Collaborated with PhD students and faculty on emergent behavior in language models."
    ]
  },
  {
    title: "Data Engineering Intern",
    subtitle: "Summer internship — ETL & ML",
    blurb:
      "Built data infrastructure while sneaking in as much ML as possible.",
    highlights: [
      "Developed and maintained ETL pipelines for analytics and reporting.",
      "Implemented a small ML component to turn raw data into predictions.",
      "Worked across engineering and analytics teams to ship reliable features."
    ]
  },
  {
    title: "COMP 311 — Undergraduate Teaching Assistant",
    subtitle: "Digital Logic & Computer Organization",
    blurb:
      "Helping students turn logic gates and boolean algebra into working CPUs.",
    highlights: [
      "Led labs and office hours focused on ALUs, finite state machines, and low-level reasoning.",
      "Created walkthroughs that made tricky digital logic concepts feel intuitive.",
      "Mentored students on debugging, study strategies, and careers in CS."
    ]
  },
  {
    title: "Volunteer — Animal Shelter",
    subtitle: "Orange County Animal Services",
    blurb: "Balancing GPU time with cat time.",
    highlights: [
      "Assisted with animal care, enrichment, and socialization.",
      "Supported adoption events and shelter operations as needed.",
      "Learned a lot about patience, compassion, and community work."
    ]
  },
  {
    title: "Creative & Side Projects",
    subtitle: "Comedy · Animation · Personal Projects",
    blurb:
      "Mixing technical skills with storytelling and visual design.",
    highlights: [
      "Explored a storytime animation concept inspired by channels like JaidenAnimations.",
      "Performed stand-up and wrote sketches that often feature tech and AI.",
      "Designing whimsical, interactive experiences like this magician’s desk site."
    ]
  }
];

// ------- Build the deck of cards -------

function createCard(experience, index) {
  const card = document.createElement("button");
  card.className = "experience-card";
  card.type = "button";
  card.dataset.index = String(index);

  card.innerHTML = `
    <div class="card-border"></div>
    <div class="card-content">
      <span class="card-label">Card ${index + 1}</span>
      <h3 class="card-title">${experience.title}</h3>
      <p class="card-subtitle">${experience.subtitle}</p>
      <p class="card-blurb">${experience.blurb}</p>
    </div>
  `;

  card.addEventListener("click", () => openModal(experience, card));
  return card;
}

function initDeck() {
  const deck = document.getElementById("card-deck");
  if (!deck) return;

  experiences.forEach((exp, i) => {
    const card = createCard(exp, i);
    deck.appendChild(card);
  });
}

// ------- Modal logic -------

const modal = document.getElementById("card-modal");
const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalBody = document.getElementById("modal-body");
const modalList = document.getElementById("modal-highlights");

let lastFocusedElement = null;

function openModal(experience, triggerEl) {
  if (!modal || !modalTitle || !modalSubtitle || !modalBody || !modalList) {
    return;
  }

  lastFocusedElement = triggerEl || document.activeElement;

  modalTitle.textContent = experience.title;
  modalSubtitle.textContent = experience.subtitle;
  modalBody.textContent = experience.blurb;

  // Clear existing list
  modalList.innerHTML = "";
  if (Array.isArray(experience.highlights)) {
    experience.highlights.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalList.appendChild(li);
    });
  }

  modal.classList.add("is-visible");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeBtn = modal.querySelector(".modal-close");
  closeBtn?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

// ------- Optional sparkles (disabled by default for a cleaner look) -------

function initSparkles() {
  const container = document.querySelector(".sparkles");
  if (!container) return;

  const count = 35;
  for (let i = 0; i < count; i += 1) {
    const s = document.createElement("span");
    s.className = "sparkle";

    const size = 3 + Math.random() * 4;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${(Math.random() * 10).toFixed(2)}s`;
    s.style.animationDuration = `${(6 + Math.random() * 8).toFixed(2)}s`;

    container.appendChild(s);
  }
}

// ------- Smooth scroll buttons -------

function initScrollButtons() {
  const buttons = document.querySelectorAll("[data-scroll-target]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-scroll-target");
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ------- Footer year -------

function setYear() {
  const span = document.getElementById("year");
  if (!span) return;
  span.textContent = String(new Date().getFullYear());
}

// ------- Modal event bindings -------

function initModalEvents() {
  if (!modal) return;
  const backdrop = modal.querySelector(".card-modal-backdrop");
  const closeBtn = modal.querySelector(".modal-close");

  backdrop?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-visible")) {
      closeModal();
    }
  });
}

// ------- Init on load -------

initDeck();
initScrollButtons();
setYear();
initModalEvents();

// To re-enable sparkles: set ENABLE_SPARKLES = true.
const ENABLE_SPARKLES = false;
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

if (ENABLE_SPARKLES && !prefersReducedMotion) {
  initSparkles();
}
