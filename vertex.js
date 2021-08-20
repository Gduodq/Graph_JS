export class Vertex {
  constructor(name, data = null) {
    this.name = name ? name : Math.round(Math.random() * 1000);
    this.data = data;
  }

  print = () => console.log(`Name: ${this.name} | Data: ${this.data}`);
}
