
function cache(name, obj) {
  if (typeof obj === 'undefined') {
    // Get
    return cache[name];
  }

  // Set
  cache[name] = obj;
  return obj;
}

cache.remove = name => {
  if (name) cache[name] = undefined;
};

cache.clear = () => {
  for (const c of cache) {
    cache[c] = undefined;
  }
};

cache.default = (name, defaultFn) => {
  const obj = cache(name);

  if (obj === undefined) return cache(name, defaultFn.call());
  return obj;
};

cache.all = () => {
  const elms = [];
  for (const key in cache) {
    if (Object.prototype.hasOwnProperty.call(cache, key)) {
      elms.push({ key: cache[key] });
    }
  }
  return elms;
};

module.exports = cache;
