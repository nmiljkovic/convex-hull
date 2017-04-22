export function convexAngle(p1, p2, p3) {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

export function ccw(p1, p2, p3) {
  return convexAngle(p1, p2, p3) <= 0;
}

export function polarAngle(p1, p2) {
  let xDiff = p1.x - p2.x;
  let yDiff = p1.y - p2.y;
  return Math.atan2(-yDiff, xDiff);
}
