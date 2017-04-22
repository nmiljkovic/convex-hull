import createStepBuilder from "./step-builder";
import {ccw} from "./math";

export default function solveMonotoneChain(sourcePoints) {
  const steps = [];
  const builder = createStepBuilder(sourcePoints);
  steps.push(builder.build());

  return solveMonotoneChainHull(steps, builder, sourcePoints);
}

export function solveMonotoneChainHull(steps, builder, sourcePoints) {
  const sortedPoints = sourcePoints.sort((p1, p2) => p1.x - p2.x);
  let points;

  function p(index) {
    return points[points.length + index];
  }

  function consider(i) {
    points.push(sortedPoints[i]);

    while (points.length > 2) {
      if (!ccw(p(-3), p(-2), p(-1))) {
        // clockwise - edge is correct
        builder.addEdge(p(-2), p(-1));
        steps.push(builder.build());
        break;
      }

      // the last 2 edges are counter clockwise
      builder.recolorLastEdge('red');
      builder.addEdge(p(-2), p(-1), 2, 'red');
      steps.push(builder.build());

      points.pop();
      points.pop();
      points.push(sortedPoints[i]);

      builder.removeLastEdge();
      builder.removeLastEdge();
    }

    if (points.length <= 2) {
      builder.addEdge(p(-2), p(-1));
      steps.push(builder.build());
    }
  }

  points = [sortedPoints[0]];
  for (let i = 1; i < sortedPoints.length; i++) {
    consider(i);
  }

  points = [sortedPoints[sortedPoints.length - 1]];
  for (let i = sortedPoints.length - 2; i >= 0; i--) {
    consider(i);
  }

  return steps;
}
