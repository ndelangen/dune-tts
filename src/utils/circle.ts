import { round } from "./math";

export function getRingPositions(center: Vector, radius: number, count: number, startDegree = 0) {
  const positions: Vector[] = [];
  const angle = (2 * Math.PI) / count;
  const startAngle = (startDegree * Math.PI) / 180; // Convert degree to radians
  for (let i = 0; i < count; i++) {
    const x = center.x + radius * Math.cos(startAngle + i * angle);
    const z = center.z + radius * Math.sin(startAngle + i * angle);
    positions.push(Vector(round(x), round(center.y), round(z)));
  }
  return positions;
}

export function getArchPositions(
  center: Vector,
  radius: number,
  spacingDegree: number,
  count: number,
  targetDegree = 0,
  centered = false
) {
  const positions: Vector[] = [];
  const angle = (spacingDegree * Math.PI) / 180; // Convert degree to radians
  const startAngle = centered
    ? ((targetDegree - (spacingDegree * (count - 1)) / 2) * Math.PI) / 180
    : (targetDegree * Math.PI) / 180;

  for (let i = 0; i < count; i++) {
    const x = center.x + radius * Math.cos(startAngle + i * angle);
    const z = center.z + radius * Math.sin(startAngle + i * angle);
    positions.push(Vector(round(x), round(center.y), round(z)));
  }
  return positions;
}
