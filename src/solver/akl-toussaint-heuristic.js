import createStepBuilder from "./step-builder";
import {solveGrahamHull} from "./graham-scan";
import {solveMonotoneChainHull} from "./monotone-chain";
import {solveJarvisMarchHull} from "./jarvis-march";

function pointSub(p1, p2) {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };
}

function product(p1, p2) {
  return p1.x * p2.y - p1.y * p2.x;
}

function side(p1, p2) {
  const x = product(p1, p2);
  if (x < 0) {
    return -1;
  } else if (x > 0) {
    return 1;
  } else {
    return 0;
  }
}

function nextPointIndex(polygon, currentIndex) {
  let nextIndex = (currentIndex + 1) % 4;
  let nextPoint = polygon[nextIndex];
  if (nextPoint.x === polygon[currentIndex].x &&
    nextPoint.y === polygon[currentIndex].y) {
    return (currentIndex + 2) % 4;
  }
  return nextIndex;
}

function inHull(polygon, point) {
  let previousSide = 0;
  for (let j = 0; j < polygon.length; j++) {
    let p1 = polygon[j],
      p2 = polygon[nextPointIndex(polygon, j)];
    let affineSegment = pointSub(p2, p1);
    let affinePoint = pointSub(point, p1);
    let s = side(affineSegment, affinePoint);
    if (s === 0) {
      return false;
    }
    if (previousSide === 0) {
      previousSide = s;
    }
    if (previousSide !== s) {
      return false;
    }
  }
  return true;
}

function reduce(steps, builder, points) {
  let lowestX = {point: points[0], index: 0};
  let highestX = {point: points[0], index: 0};
  let lowestY = {point: points[0], index: 0};
  let highestY = {point: points[0], index: 0};

  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    if (point.x < lowestX.point.x) {
      lowestX.point = point;
      lowestX.index = i;
    } else if (point.x > highestX.point.x) {
      highestX.point = point;
      highestX.index = i;
    }
    if (point.y < lowestY.point.y) {
      lowestY.point = point;
      lowestY.index = i;
    } else if (point.y > highestY.point.y) {
      highestY.point = point;
      highestY.index = i;
    }
  }

  const includedPoints = points.slice();
  const polygonPoints = [
    lowestX.point, lowestY.point, highestX.point, highestY.point,
  ];

  // Draw the exclusion boundary
  let containerColor = '#fbbd08';
  builder.addEdge(lowestX.point, lowestY.point, 2, containerColor);
  steps.push(builder.build());
  builder.addEdge(lowestY.point, highestX.point, 2, containerColor);
  steps.push(builder.build());
  builder.addEdge(highestX.point, highestY.point, 2, containerColor);
  steps.push(builder.build());
  builder.addEdge(highestY.point, lowestX.point, 2, containerColor);
  steps.push(builder.build());

  let removed = 0;
  for (let i = 0; i < points.length; i++) {
    if (i === lowestX.index || i === lowestY.index ||
      i === highestX.index || i === highestY.index) {
      continue;
    }
    const point = points[i];
    if (inHull(polygonPoints, point)) {
      builder.removePointAtIndex(i - removed);
      includedPoints.splice(i - removed, 1);
      removed++;
    }
  }

  steps.push(builder.build());
  return includedPoints;
}

export function solveAklToussaintHeuristicGraham(points) {
  const steps = [];
  const builder = createStepBuilder(points);
  steps.push(builder.build());

  points = reduce(steps, builder, points);

  return solveGrahamHull(steps, builder, points);
}

export function solveAklToussaintHeuristicMonotoneChain(points) {
  const steps = [];
  const builder = createStepBuilder(points);
  steps.push(builder.build());

  points = reduce(steps, builder, points);

  return solveMonotoneChainHull(steps, builder, points);
}

export function solveAklToussaintHeuristicJarvisMarch(points) {
  const steps = [];
  const builder = createStepBuilder(points);
  steps.push(builder.build());

  points = reduce(steps, builder, points);

  return solveJarvisMarchHull(steps, builder, points);
}
