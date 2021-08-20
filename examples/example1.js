import { Graph } from "../graph.js";
import { Vertice } from "../vertice.js";
import { minimalCost } from "../dijkstra.js";

export const example1 = () => {
  const bidirectional = true;
  const g = new Graph();

  const vertices = [];

  for (let i = 1; i < 9; i++) {
    vertices.push(new Vertice(`A${i}`, i));
    g.addVertice(vertices[i - 1]);
  }

  const [a1, a2, a3, a4, a5, a6, a7, a8] = vertices;

  g.linkVertice(a1, a2, { bidirectional, dist: 2 });
  g.linkVertice(a1, a3, { bidirectional, dist: 3 });

  g.linkVertice(a2, a4, { bidirectional, dist: 2 });

  g.linkVertice(a3, a7, { bidirectional, dist: 5 });

  g.linkVertice(a4, a5, { bidirectional, dist: 1 });
  g.linkVertice(a4, a6, { bidirectional, dist: 3 });

  g.linkVertice(a7, a6, { bidirectional, dist: 2 });

  g.linkVertice(a5, a6, { bidirectional, dist: 1 });

  g.linkVertice(a6, a8, { bidirectional, dist: 3 });

  console.log("Minimal cost:", minimalCost(g, a1, a8));
};
