/* =====================================================
   REPAY – script.js
   Configuration, rendu dynamique, interactions UI
   ===================================================== */

/* ─── ① CONFIGURATION — modifiez uniquement cette section ── */

/** Numéro WhatsApp avec indicatif pays, sans le signe + (ex: 22966000000) */
const WHATSAPP_NUMBER = "237697308033";

/** Adresse email de contact */
const EMAIL_ADDRESS = "loicstephane194@gmail.com";

/**
 * Tarifs des abonnements.
 * Pour modifier un prix : changez uniquement les valeurs numériques.
 * eur  → prix en euros (nombre décimal)
 * fcfa → équivalent en francs CFA (nombre entier)
 */
const PRICES = {
  spotify: {
    individuel: {  fcfa: 4000 },
  },
  crunchyroll: {
  
    megafan:  { fcfa: 3500 },

  },
};

/** Libellés affichés pour chaque formule */
const PLAN_LABELS = {
  spotify: {
    individuel: "Individuel",
  },
  crunchyroll: {
    megafan:  "Mega Fan",

  },
};

/** Logos locaux (dossier "logo images/") */
const LOGOS = {
  spotify:     "logo%20images/spotify%20logo.png",
  crunchyroll: "logo%20images/cruchyroll%20logo.png",
};

/* ─── ② UTILITAIRES ──────────────────────────────────── */

/** Formate un montant en FCFA avec séparateur de milliers */
function fcfa(n) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

/** Formate un montant en euros (virgule décimale, style FR) */
function eur(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

/* ─── ③ RENDU DES CARTES SERVICES ────────────────────── */

/**
 * Construit le HTML d'une carte service (Spotify ou Crunchyroll).
 * @param {string} platform  "spotify" | "crunchyroll"
 * @returns {string} HTML de la carte
 */
function buildServiceCard(platform) {
  const plans      = PRICES[platform];
  const labels     = PLAN_LABELS[platform];
  const logoSrc    = LOGOS[platform];
  const isSpotify  = platform === "spotify";

  const colorCls   = isSpotify ? "spotify"         : "crunchyroll";
  const logoCls    = isSpotify ? "logo-spotify"     : "logo-crunchyroll";
  const nameCls    = isSpotify ? "name-spotify"     : "name-crunchyroll";
  const priceCls   = isSpotify ? "c-spotify"        : "c-crunchyroll";
  const name       = isSpotify ? "Spotify"          : "Crunchyroll";
  const tagline    = isSpotify
    ? "Musique en streaming illimitée"
    : "Anime en streaming illimité";

  /* Génération des lignes de formules */
  const rows = Object.entries(plans).map(([key, p]) => {
    const label = labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    const eurPart = p.eur != null
      ? `<span class="p-eur">${eur(p.eur)}</span><span class="p-sep" aria-hidden="true">/</span>`
      : "";
    return `
      <li class="plan-row">
        <span class="plan-name">${label}</span>
        <div class="plan-prices">
          ${eurPart}
          <span class="p-fcfa ${priceCls}">${fcfa(p.fcfa)}</span>
        </div>
      </li>`;
  }).join("");

  return `
    <article class="service-card ${colorCls} anim-ready">
      <div class="svc-header">
        <img
          src="${logoSrc}"
          alt="Logo ${name}"
          class="svc-logo ${logoCls}"
          loading="lazy"
        />
        <div>
          <p class="svc-name ${nameCls}">${name}</p>
          <p class="svc-sub">${tagline}</p>
        </div>
      </div>
      <ul class="plans-list" aria-label="Formules ${name}">
        ${rows}
      </ul>
    </article>`;
}

/** Injecte les cartes Spotify + Crunchyroll dans la grille */
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = buildServiceCard("spotify") + buildServiceCard("crunchyroll");
}

/* ─── ④ RENDU DES BOUTONS DE CONTACT ─────────────────── */

/** Icône SVG WhatsApp (inline, pas de dépendance externe) */
const ICON_WA = `
  <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.737 5.476 2.027 7.775L.057 31.21a.8.8 0 00.975 1.004l7.61-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.2a13.145 13.145 0 01-6.7-1.833l-.48-.286-4.977 1.304 1.33-4.852-.314-.5A13.17 13.17 0 012.8 16C2.8 8.713 8.713 2.8 16 2.8S29.2 8.713 29.2 16 23.287 29.2 16 29.2z"/>
    <path d="M23.13 19.03c-.39-.196-2.308-1.139-2.665-1.269-.357-.131-.617-.196-.878.196-.26.391-1.008 1.27-1.236 1.53-.228.26-.456.292-.846.098-2.303-1.151-3.814-2.054-5.332-4.658-.403-.694.403-.645.153-1.794-.098-.456-.456-.912-.878-1.368-.26-.29-.618-.78-.878-1.172-.26-.391-.13-.717.065-.977.196-.26.456-.553.684-.814.228-.26.293-.456.456-.748.163-.293.066-.554-.033-.75-.098-.195-.878-2.116-1.203-2.898-.317-.762-.64-.659-.878-.671-.228-.01-.488-.013-.748-.013s-.684.098-1.042.488c-.357.39-1.366 1.335-1.366 3.255 0 1.92 1.399 3.776 1.594 4.036.195.26 2.754 4.204 6.673 5.9.934.403 1.663.643 2.231.822.936.298 1.789.256 2.46.156.75-.112 2.308-.944 2.635-1.856.326-.912.326-1.694.228-1.856-.098-.163-.357-.26-.748-.456z"/>
  </svg>`;

/** Icône SVG email */
const ICON_EMAIL = `
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>`;

/** Injecte les boutons WhatsApp et Email */
function renderContactButtons() {
  const container = document.getElementById("contactButtons");
  if (!container) return;

  /* Message WhatsApp pré-rempli */
  const waText = encodeURIComponent(
    "Bonjour, je souhaite m'abonner à Spotify / Crunchyroll via votre service FCFA. Merci de me contacter."
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  /* Email pré-rempli */
  const emailSubject = encodeURIComponent("Demande d'abonnement – REPAY");
  const emailBody    = encodeURIComponent(
    "Bonjour,\n\nJe souhaite souscrire à l'abonnement suivant :\n" +
    "  - Plateforme : (Spotify / Crunchyroll)\n" +
    "  - Formule    : (ex: Individuel, Fan…)\n\n" +
    "Merci de me communiquer les informations de paiement.\n\nCordialement,"
  );
  const mailUrl = `mailto:${EMAIL_ADDRESS}?subject=${emailSubject}&body=${emailBody}`;

  container.innerHTML = `
    <a href="${waUrl}" class="btn btn-wa"
       target="_blank" rel="noopener noreferrer"
       aria-label="Contacter via WhatsApp">
      ${ICON_WA} WhatsApp
    </a>
    <a href="${mailUrl}" class="btn btn-email"
       aria-label="Envoyer un email">
      ${ICON_EMAIL} Envoyer un email
    </a>`;
}

/* ─── ⑤ MENU MOBILE ──────────────────────────────────── */

function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav    = document.getElementById("mobileNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* Fermer le menu au clic sur un lien */
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ─── ⑥ ANIMATIONS AU DÉFILEMENT ─────────────────────── */

function initScrollAnimations() {
  /* Recours gracieux si IntersectionObserver non disponible */
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".anim-ready").forEach(el => {
      el.classList.remove("anim-ready");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        /* Délai en cascade pour les enfants d'une même grille */
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter(c => c.classList.contains("anim-ready"))
          : [];
        const idx = siblings.indexOf(el);
        if (idx > 0 && idx <= 4) el.classList.add(`delay-${idx}`);

        el.classList.remove("anim-ready");
        el.classList.add("anim-in");
        observer.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".anim-ready").forEach(el => observer.observe(el));
}

/* ─── ⑦ ANNÉE DANS LE FOOTER ─────────────────────────── */

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── ⑧ INITIALISATION ───────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderServices();       /* Cartes Spotify + Crunchyroll */
  renderContactButtons(); /* Boutons WhatsApp + Email */
  setYear();              /* Année dynamique dans le footer */
  initMobileMenu();       /* Menu hamburger */

  /* Animations au défilement */
  requestAnimationFrame(initScrollAnimations);
});
