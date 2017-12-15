import cache from './cache';
import { clear, draw, redrawAll } from './draw';

// Run on module load
init();

module.exports = {
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
    addListeners();
  });
}

function addListeners() {
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      redrawAll();
    });
  });

  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      redrawAll();
    });
  });
}
