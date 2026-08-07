
'use strict';


const CONFIG = Object.freeze({
  REDIRECT_URL: 'dashboard.html',
  REDIRECT_DELAY_MS: 2000,    
  DOT_COUNT: 10,                
  DOT_CYCLE_MS: 1200,           
  TEXT_DOT_INTERVAL_MS: 450,   
});


document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  buildLoaderDots(prefersReducedMotion);
  animateLoadingText(prefersReducedMotion);
  scheduleRedirect();
});

// =============================================================
// LOADER CONSTRUCTION
// =============================================================
/**
 * Generates the ring of dots and places each one around the circle
 * using CSS custom properties (--angle, --delay) consumed by style.css.
 * Keeping this in JS means DOT_COUNT only needs to change in one place.
 *
 * @param {boolean} prefersReducedMotion
 */
function buildLoaderDots(prefersReducedMotion) {
  const container = document.getElementById('loaderCircle');
  if (!container) return;

  const { DOT_COUNT, DOT_CYCLE_MS } = CONFIG;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < DOT_COUNT; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';

    // Evenly distribute dots around the circle
    const angle = (360 / DOT_COUNT) * i;
    dot.style.setProperty('--angle', `${angle}deg`);

    
    if (!prefersReducedMotion) {
      const delay = (DOT_CYCLE_MS / DOT_COUNT) * i;
      dot.style.setProperty('--delay', `${delay}ms`);
    }

    fragment.appendChild(dot);
  }

  container.appendChild(fragment);
}

// =============================================================
// TEXT ANIMATION
// =============================================================
/**
 * Cycles the trailing ellipsis beneath the loader:
 * "Setting up Dashboard." -> ".." -> "..." -> repeat.
 * Left static under prefers-reduced-motion.
 *
 * @param {boolean} prefersReducedMotion
 */
function animateLoadingText(prefersReducedMotion) {
  const dotsEl = document.getElementById('loadingDots');
  if (!dotsEl) return;

  if (prefersReducedMotion) {
    dotsEl.textContent = '...';
    return;
  }

  const states = ['.', '..', '...'];
  let index = states.length - 1; // start at "..." to match initial markup

  setInterval(() => {
    index = (index + 1) % states.length;
    dotsEl.textContent = states[index];
  }, CONFIG.TEXT_DOT_INTERVAL_MS);
}


function scheduleRedirect() {
  window.setTimeout(() => {
    window.location.replace( CONFIG.REDIRECT_URL) ;
  }, CONFIG.REDIRECT_DELAY_MS);
}
