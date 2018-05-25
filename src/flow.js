function clean(name) {
  return name ? name.replace(/^mark\./, '') : null;
}

export default class flow {
  constructor(name) {
    name = clean(name);
    this.flow = [name];
  }

  next(name) {
    name = clean(name);
    this.flow.push(name);

    return this;
  }

  getNext(name) {
    name = clean(name);

    const idx = this.flow.indexOf(name);

    if (idx === -1) throw new Error(`Could not find '${name}' in this flow`);

    if (idx === this.flow.length) return null;
    return this.flow[idx + 1];
  }

}
