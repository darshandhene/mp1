export function initCarousel(root) {
  if (!root) return;

  const track = root.querySelector('.carousel__track');
  const slides = [...root.querySelectorAll('.carousel__slide')];
  const dotsWrap = root.querySelector('.carousel__dots');
  let index = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length; // wrap around at both ends
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, j) => {
      const active = j === index;
      d.classList.toggle('carousel__dot--active', active);
      if (active) {
        d.setAttribute('aria-current', 'true');
      } else {
        d.removeAttribute('aria-current');
      }
    });
  }

  root.querySelector('.carousel__arrow--prev').addEventListener('click', () => goTo(index - 1));
  root.querySelector('.carousel__arrow--next').addEventListener('click', () => goTo(index + 1));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') goTo(index - 1);
    if (event.key === 'ArrowRight') goTo(index + 1);
  });

  goTo(0);
}
