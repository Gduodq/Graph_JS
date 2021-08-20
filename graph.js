export class Graph {
  #edges;
  #vertices;
  constructor(props) {
    this.#edges = new Map();
    this.#vertices = new Set();
  }

  #linkA2B = (verticeA, verticeB, dist) => {
    const edgesA = this.#edges.get(verticeA);
    const foundBInA = edgesA.find((edge) => edge.vertice === verticeB);
    if (foundBInA) foundBInA.dist = dist;
    else edgesA.push({ vertice: verticeB, dist });
    return true;
  };

  addVertice = (newVertice, linkedVertices = []) => {
    if (this.#vertices.has(newVertice)) {
      console.warn(
        `The vertice ${newVertice.name} is already present in graph`
      );
      return false;
    }
    const notIncludedVertices = [];
    linkedVertices.forEach(({ vertice }) => {
      if (!this.#vertices.has(vertice)) notIncludedVertices.push(vertice.name);
    });

    if (notIncludedVertices.length) {
      console.log(
        `The vertice(s) ${JSON.stringify(notIncludedVertices)} aren't in graph`
      );
      return false;
    }

    this.#vertices.add(newVertice);
    this.#edges.set(newVertice, linkedVertices);
    return true;
  };

  linkVertice = (verticeA, verticeB, { bidirectional = false, dist = 1 }) => {
    if (!this.#vertices.has(verticeA)) {
      console.warn(`The vertice ${verticeA.name} doesn't exists in graph`);
      return false;
    } else if (!this.#vertices.has(verticeB)) {
      console.warn(`The vertice ${verticeB.name} doesn't exists in graph`);
      return false;
    } else if (verticeA === verticeB) {
      console.warn(`The vertices can't be equal`);
      return false;
    } else if (dist <= 0) {
      console.warn(`The length must be greater than 0`);
      return false;
    }

    this.#linkA2B(verticeA, verticeB, dist);
    if (bidirectional) this.#linkA2B(verticeB, verticeA, dist);
    return true;
  };

  getVertices = () => Array.from(this.#vertices);

  verticeExists = (vertice) => this.#vertices.has(vertice);

  linkedVertices = (vertice) => this.#edges.get(vertice);

  printVertices = () => {
    for (let vertice of this.#vertices) vertice.print();
  };

  printEdges = () => {
    for (const [vertice, edges] of this.#edges) {
      const stringfyedEdges = edges
        .map(({ vertice, dist }) => `${vertice.name} - ${dist} / `)
        .join("")
        .slice(0, -2);

      console.log(`${vertice.name}: ${stringfyedEdges}`);
    }
  };
}
