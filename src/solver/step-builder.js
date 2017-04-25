class StepBuilder {
  constructor(points) {
    this.points = points.slice();
    this.edges = [];
  }

  addEdge(start, end, width = 2, color = 'blue') {
    this.edges.push({
      start, end,
      width, color,
    });
    return this;
  }

  recolorLastEdge(color = 'blue') {
    this.edges.push({
      ...this.edges.pop(),
      color,
    });

    return this;
  }

  removeLastEdge() {
    if (this.edges.length) {
      this.edges.pop();
    }
    return this;
  }

  removePointAtIndex(index) {
    this.points.splice(index, 1);
    return this;
  }

  build() {
    return {
      points: this.points.slice(),
      edges: this.edges.slice(),
    };
  }
}

export default function createStepBuilder(points) {
  return new StepBuilder(points);
}
