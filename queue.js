export class Queue {
  #queue;
  constructor(props) {
    this.#queue = [];
  }

  add = (el) => {
    this.#queue.push(el);
    return true;
  };

  pop = () => {
    if (!this.#queue.length) {
      console.warn("The queue is empty");
      return false;
    }
    return this.#queue.shift();
  };

  clearQueue = () => {
    this.#queue = [];
    return true;
  };

  checkIfInQueue = (el) => this.#queue.includes(el);

  isEmpty = () => !this.#queue.length;

  print = () => console.log(this.#queue);
}
