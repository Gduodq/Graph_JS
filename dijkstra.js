import { Queue } from "./queue.js";

const INFINITY = Number.POSITIVE_INFINITY;

export const minimalCost = (graph, verticeA, verticeB) => {
  const verticesExists =
    graph.verticeExists(verticeA) && graph.verticeExists(verticeB);

  if (!verticesExists) {
    console.warn("One of the vertices doesn't exists in graph");
    return false;
  }

  const vertices = graph.getVertices();
  const mapVertices = new Map();

  vertices.forEach((vertice) => {
    mapVertices.set(vertice, { visited: false, minDist: INFINITY });
  });
  mapVertices.get(verticeA).minDist = 0;

  const queue = new Queue();
  queue.add(verticeA);

  do {
    const actualVertice = queue.pop();
    const actualVerticeInMap = mapVertices.get(actualVertice);

    const linkedVertices = graph.linkedVertices(actualVertice);

    linkedVertices.forEach(({ vertice, dist }) => {
      const verticeInMap = mapVertices.get(vertice);
      if (!verticeInMap.visited) {
        if (actualVerticeInMap.minDist + dist < verticeInMap.minDist)
          verticeInMap.minDist = actualVerticeInMap.minDist + dist;
        queue.add(vertice);
      }
    });

    actualVerticeInMap.visited = true;
  } while (!queue.isEmpty());

  const verticeBInMap = mapVertices.get(verticeB);

  if (!verticeBInMap.visited) {
    console.warn("The end vertice can't be reached by the start vertice");
    return false;
  }

  return verticeBInMap.minDist;
};
