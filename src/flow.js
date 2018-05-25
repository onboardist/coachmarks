export default class flow {
  constructor(name) {
    this.flow = [name];
  }

  next(name) {
    this.flow.push(name);
  }
}
