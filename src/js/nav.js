const SHRINK_AT = 50; // px scrolled before the navbar shrinks
const NAV_SMALL = 60; // keep in sync with $nav-height-small
const SCROLL_DURATION = 700; // ms

const navbar = () => document.getElementById('navbar');

function updateNavSize() {
  navbar().classList.toggle('navbar--shrunk', window.scrollY > SHRINK_AT);
}

// Highlight the menu item for the section directly below the navbar's bottom edge
function updateActiveLink() {
  const sections = [...document.querySelectorAll('main > section[id]')];
  const navBottom = navbar().getBoundingClientRect().bottom;

  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= navBottom + 1) current = section;
  });

  // The last section may be too short to reach the navbar, so force it at the bottom
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) current = sections[sections.length - 1];

  document.querySelectorAll('.navbar__links .nav-link').forEach((link) => {
    link.classList.toggle('nav-link--active', link.getAttribute('href') === `#${current.id}`);
  });
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

let scrollAnimationId = null;

function smoothScrollTo(targetY) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY);
    return;
  }

  if (scrollAnimationId !== null) cancelAnimationFrame(scrollAnimationId);

  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function step(now) {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / SCROLL_DURATION, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(step);
    } else {
      scrollAnimationId = null;
    }
  }

  scrollAnimationId = requestAnimationFrame(step);
}

function onNavClick(event) {
  const id = event.currentTarget.getAttribute('href');
  const target = document.querySelector(id);
  if (!target) return;

  event.preventDefault();
  // Land with the section top just under the shrunk navbar
  const y = id === '#home' ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_SMALL;
  smoothScrollTo(y);
}

function onScroll() {
  updateNavSize();
  updateActiveLink();
}

export function initNav() {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateActiveLink);
  document
    .querySelectorAll('a.nav-link[href^="#"]')
    .forEach((link) => link.addEventListener('click', onNavClick));
}
