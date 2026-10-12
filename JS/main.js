// ===== STICKY NAVBAR =====
const navbar = document.getElementById("navbar");
if (navbar) {
  const navInner = navbar.querySelector("nav");
  const scrolledClasses = ["bg-white", "backdrop-blur-md", "shadow-lg"];

  const onScroll = () => {
    const scrolled = window.scrollY > 20; // 20px scroll korlei background ashbe
    scrolledClasses.forEach((c) => navInner.classList.toggle(c, scrolled));
    navbar.classList.toggle("navbar-scrolled", scrolled);
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // page reload korar por scroll kora obosthay thakle o thik thakbe
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");

function openMobileMenu() {
  hamburger.classList.add("active");
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
  document.body.classList.remove("menu-open");
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (mobileClose) {
  mobileClose.addEventListener("click", closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu
    .querySelector(".mobile-menu-overlay")
    .addEventListener("click", closeMobileMenu);
}

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});






// ===== NAVBAR ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function setActiveNav(activeLink) {
    navLinks.forEach(l => l.classList.remove('active'));
    mobileNavLinks.forEach(l => l.classList.remove('active'));
    activeLink.classList.add('active');

    const href = activeLink.getAttribute('href');
    const matchingDesktop = document.querySelector(`.nav-link[href="${href}"]`);
    const matchingMobile = document.querySelector(`.mobile-nav-link[href="${href}"]`);
    if (matchingDesktop) matchingDesktop.classList.add('active');
    if (matchingMobile) matchingMobile.classList.add('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', () => setActiveNav(link));
});
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => setActiveNav(link));
});

// ===== WHATSAPP TOOLTIP =====
const whatsapp = document.querySelector('.whatsapp-float');
if (whatsapp) {
    const tooltip = whatsapp.querySelector('.whatsapp-tooltip');
    whatsapp.addEventListener('mouseenter', () => {
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(0)';
        }
    });
    whatsapp.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(10px)';
        }
    });
}





// ============ Map directions ============
const START_POINT = "Metro City Dhaka, Keyain, Sreenagar"; // chaile "lat,lng" dite paro
const mapFrame = document.getElementById("map-frame");
const placeBtns = document.querySelectorAll(".place-btn");
const activeClasses = ["ring-2", "ring-[#7C83E6]", "bg-[#EEF0FF]"];

function buildDirectionsUrl(from, to) {
  return `https://maps.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${encodeURIComponent(to)}&output=embed`;
}

placeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // ager active ta soriye notun ta active koro
    placeBtns.forEach((b) => b.classList.remove(...activeClasses));
    btn.classList.add(...activeClasses);

    // Metro City theke oi jayga porjonto route dekhao
    mapFrame.src = buildDirectionsUrl(START_POINT, btn.dataset.place);

    // mobile/tablet e map upore, tai click korle map e scroll hobe
    if (window.innerWidth < 1024) {
      mapFrame.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});







// ============ Gallery curved slider (laptop only) ============
const galleryTrack = document.getElementById("gallery-track");
const galleryMq = window.matchMedia("(min-width: 1024px)");

// offset onujayi position: x = shift, ry = rotateY (curve), s = scale
const GALLERY_POS = {
  0: { x: 0, ry: 0, s: 1 },
  1: { x: 332, ry: 30, s: 0.93 },
  2: { x: 525, ry: 62, s: 0.78 },
};

let gCards = [];
let gActive = 0;
let gTimer = null;

let gModalOpen = false;

function gOffset(i) {
  const n = gCards.length;
  const half = Math.floor(n / 2);
  return ((i - gActive + n + half) % n) - half;
}

function gPlace(card, o) {
  const sign = Math.sign(o);
  const p = GALLERY_POS[Math.abs(o)];
  if (!p) {
    // 2 er baire thakle lukiye rakho
    card.style.opacity = 0;
    card.style.zIndex = 0;
    card.style.transform = `translateX(${sign * 700}px) rotateY(${sign * 70}deg) scale(0.7)`;
    return;
  }
  card.style.opacity = 1;
  card.style.zIndex = 10 - Math.abs(o);
  card.style.transform = `translateX(${sign * p.x}px) rotateY(${sign * p.ry}deg) scale(${p.s})`;
}

function gRender() {
  gCards.forEach((card, i) => {
    const o = gOffset(i);
    // prothombar ba ek pash theke onno pash e lafale animation off
    const jump = card._o === undefined || Math.abs(o - card._o) > 1;
    if (jump) card.style.transition = "none";
    gPlace(card, o);
    if (jump) {
      card.offsetHeight; // reflow
      card.style.transition = "";
    }
    card._o = o;
  });
}

function gNext() {
  gActive = (gActive + 1) % gCards.length;
  gRender();
}

function gStop() {
  clearInterval(gTimer);
}

function gStart() {
  if (gModalOpen) return;
  gStop();
  gTimer = setInterval(gNext, 3000);
}

function gEnable() {
  const originals = [...galleryTrack.children];
  // card kom hole duplicate kore nai, jate loop smooth hoy
  if (originals.length < 7) {
    originals.forEach((c) => {
      const clone = c.cloneNode(true);
      clone.dataset.clone = "1";
      clone.setAttribute("aria-hidden", "true");
      galleryTrack.appendChild(clone);
    });
  }
  gCards = [...galleryTrack.children];
  gActive = Math.floor(originals.length / 2); // majher ta center e
  gRender();
  gStart();
}

function gDisable() {
  gStop();
  galleryTrack.querySelectorAll("[data-clone]").forEach((c) => c.remove());
  gCards = [];
  [...galleryTrack.children].forEach((c) => {
    c.style.transform = c.style.opacity = c.style.zIndex = c.style.transition = "";
    delete c._o;
  });
}

galleryMq.addEventListener("change", (e) => (e.matches ? gEnable() : gDisable()));
galleryTrack.addEventListener("mouseenter", () => galleryMq.matches && gStop());
galleryTrack.addEventListener("mouseleave", () => galleryMq.matches && gStart());

if (galleryMq.matches) gEnable();



// ============ Gallery image modal ============
const gModal = document.getElementById("gallery-modal");
const gModalBox = document.getElementById("gallery-modal-box");
const gModalImg = document.getElementById("gallery-modal-img");
const gModalCaption = document.getElementById("gallery-modal-caption");
const gModalClose = document.getElementById("gallery-modal-close");

// card er upor mouse nile zoom cursor dekhabe
document.querySelectorAll(".gallery-card").forEach((c) => c.classList.add("cursor-zoom-in"));

function openGalleryModal(card) {
  const img = card.querySelector("img");
  const text = card.querySelector("p");
  gModalImg.src = img.src;
  gModalImg.alt = text ? text.textContent : "";
  gModalCaption.textContent = text ? text.textContent : "";

  gModalOpen = true;
  gStop(); // slider thamao
  document.body.classList.add("overflow-hidden"); // pichoner scroll bondho

  gModal.classList.remove("pointer-events-none", "opacity-0");
  gModal.classList.add("opacity-100");
  gModalBox.classList.remove("scale-95");
  gModalBox.classList.add("scale-100");
}

function closeGalleryModal() {
  gModalOpen = false;
  document.body.classList.remove("overflow-hidden");

  gModal.classList.add("pointer-events-none", "opacity-0");
  gModal.classList.remove("opacity-100");
  gModalBox.classList.add("scale-95");
  gModalBox.classList.remove("scale-100");

  if (galleryMq.matches) gStart(); // laptop e slider abar chalu
}

// click (clone card gulo-o kaj korbe, karon event delegation)
galleryTrack.addEventListener("click", (e) => {
  const card = e.target.closest(".gallery-card");
  if (card) openGalleryModal(card);
});

// close: X button, pichoner kalo jaygay click, ba Esc
gModalClose.addEventListener("click", closeGalleryModal);
gModal.addEventListener("click", (e) => {
  if (e.target === gModal) closeGalleryModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && gModalOpen) closeGalleryModal();
});