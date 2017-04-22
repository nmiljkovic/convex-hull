import {minBy, without} from "lodash";
import {ccw, polarAngle} from "./math";
import createStepBuilder from "./step-builder";

export default function solveGraham(sourcePoints) {
  const steps = [];
  const builder = createStepBuilder(sourcePoints);
  steps.push(builder.build());

  return solveGrahamHull(steps, builder, sourcePoints);
}

export function solveGrahamHull(steps, builder, sourcePoints) {
  const leftmostPoint = minBy(sourcePoints, "x");
  const points = without(sourcePoints, leftmostPoint);
  const sortedPoints = points.sort((p1, p2) => (
    polarAngle(p2, leftmostPoint) - polarAngle(p1, leftmostPoint)
  ));
  sortedPoints.unshift(leftmostPoint);
  sortedPoints.push(leftmostPoint);

  builder.addEdge(sortedPoints[0], sortedPoints[1]);
  steps.push(builder.build());

  let j = 1;

  for (let i = 2; i < sortedPoints.length; i++) {
    while (ccw(sortedPoints[j - 1], sortedPoints[j], sortedPoints[i])) {
      builder.recolorLastEdge('red', 1);
      builder.addEdge(sortedPoints[j], sortedPoints[i], 2, 'red');
      steps.push(builder.build());

      if (j > 1) {
        j--;
      } else if (i === sortedPoints.length - 1) {
        builder.removeLastEdge();
        builder.removeLastEdge();
        break;
      } else {
        i++;
      }

      builder.removeLastEdge();
      builder.removeLastEdge();
    }

    builder.addEdge(sortedPoints[j], sortedPoints[i]);
    steps.push(builder.build());

    j++;
    let temp = sortedPoints[j];
    sortedPoints[j] = sortedPoints[i];
    sortedPoints[i] = temp;
  }

  return steps;
}
