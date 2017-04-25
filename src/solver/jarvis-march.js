import createStepBuilder from "./step-builder";
import {ccw} from "./math";

export default function solveJarvisMarch(points) {
  const steps = [];
  const builder = createStepBuilder(points);
  steps.push(builder.build());
  return solveJarvisMarchHull(steps, builder, points)
}

export function solveJarvisMarchHull(steps, builder, points) {
  let leftmost = points[0];
  let leftmostIndex = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].x < leftmost.x) {
      leftmost = points[i];
      leftmostIndex = i;
    }
  }

  let p = leftmostIndex;
  do {
    let q = (p + 1) % points.length;
    // Add initial guess.
    builder.addEdge(points[p], points[q]);
    steps.push(builder.build());

    for (let i = 0; i < points.length; i++) {
      if (!ccw(points[p], points[i], points[q])) {
        builder.recolorLastEdge('red');
        builder.addEdge(points[p], points[i], 1, 'silver');
        steps.push(builder.build());

        q = i;
        builder.removeLastEdge();
        builder.removeLastEdge();
        builder.addEdge(points[p], points[q]);
        steps.push(builder.build());
      } else {
        builder.addEdge(points[p], points[i], 1, 'silver');
        steps.push(builder.build());
        builder.removeLastEdge();
      }
    }

    builder.addEdge(points[p], points[q]);
    steps.push(builder.build());

    p = q;
  } while (p !== leftmostIndex);

  return steps;
}
