const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let openModal = null;
let lastTrigger = null; // the card button that opened it, so we can return focus on close
let pendingFrame = null; // rAF id for the queued fade-in, so a same-frame close/switch can cancel it

// Cancels any queued fade-in and snaps a modal straight to hidden, with no fade and no focus
// restore. Used when a modal gets orphaned by another one opening on top of it (no visible
// backdrop to click, no way to close it otherwise) — not part of the normal close path.
function hideImmediately(modal) {
  if (pendingFrame !== null) {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = null;
  }
  modal.classList.remove('modal--open');
  modal.hidden = true;
}

function openDialog(modal, trigger) {
  // A modal was already open (e.g. Shift+Tab left it, then Enter on another card): close it
  // immediately rather than leaving it visible and orphaned with no way to dismiss it.
  if (openModal && openModal !== modal) hideImmediately(openModal);

  modal.hidden = false;
  // Add the open class on the next frame so the opacity/transform transition actually runs.
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = null;
    modal.classList.add('modal--open');
  });
  document.body.classList.add('no-scroll');
  openModal = modal;
  lastTrigger = trigger;
  modal.querySelector('.modal__close').focus();
}

function closeDialog() {
  if (!openModal) return;
  const modal = openModal;
  const trigger = lastTrigger;
  openModal = null;
  lastTrigger = null;

  // If the queued fade-in hadn't run yet, the modal never actually became visible, so
  // removing 'modal--open' below is a no-op that won't fire a transition either — hide
  // it immediately rather than waiting on a transitionend that will never come.
  const fadeInWasPending = pendingFrame !== null;
  if (pendingFrame !== null) {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = null;
  }
  modal.classList.remove('modal--open');
  document.body.classList.remove('no-scroll');
  // Same reasoning applies when reduced motion disables the transition outright.
  if (prefersReducedMotion() || fadeInWasPending) modal.hidden = true;

  if (trigger) trigger.focus();
}

export function initModals() {
  document.querySelectorAll('.modal').forEach((modal) => {
    // Only hide on the modal's own transition (not one bubbling up from the dialog),
    // and only if it's still meant to be closed (guards a fast re-open).
    modal.addEventListener('transitionend', (event) => {
      if (event.target === modal && !modal.classList.contains('modal--open')) {
        modal.hidden = true;
      }
    });

    modal.querySelector('.modal__close').addEventListener('click', closeDialog);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeDialog(); // backdrop click only, not clicks inside the dialog
    });
  });

  document.querySelectorAll('[data-modal-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modalTarget);
      if (modal) openDialog(modal, btn);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDialog();
  });
}
