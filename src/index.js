import isString from 'lodash';
import cache from './cache';
import { redrawAll } from './draw';

// Run on module load
init();

module.exports = {
  // Add a coachmark
  add(name, config = {}) {
    if (!isString(name)) {
      config = name;
      name = Math.random().toString(36).substr(2);
    }

    cache(name, config);
  },
  // Show a coachmark given a name
  // show(name) {
  //
  // },
  cache: () => cache.all(),
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
