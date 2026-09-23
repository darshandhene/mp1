import { initNav } from './nav.js';
import { initCarousel } from './carousel.js';
import { initModals } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCarousel(document.getElementById('carousel'));
  initModals();
});
