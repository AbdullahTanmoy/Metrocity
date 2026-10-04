// ===== STICKY NAVBAR =====
const navbar = document.getElementById("navbar");
if (navbar) {
  const navHeight = navbar.offsetHeight;
  window.addEventListener("scroll", () => {
    if (window.scrollY > navHeight) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
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