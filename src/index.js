import cache from './cache';
import { clear, draw, redrawAll } from './draw';
// import injectCSS from './inject-css';
import css from './css/main.scss'; /* eslint no-unused-vars: 0 */
import injectSVG from './inject-svg';

// Run on module load
init();

export default {
  // Add a coachmark
  add(name, config = {}) {
    if (!(typeof name === 'string')) {
      config = name;
      name = Math.random().toString(36).substr(2);
    }

    cache(name, config);
  },
  // Show a coachmark given a name
  show(name) {
    clear();
    draw(name);
  },
  cache: () => cache.cache,
  draw,
  redrawAll,
};

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    // injectCSS();
    injectSVG();
    addListeners();
  });
}

function addListeners() {
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      redrawAll();
    });
  });
}
