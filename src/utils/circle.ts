import { round } from "./math";

export function getRingPositions(center: Vector, radius: number, count: number, startDegree = 0) {
  const positions: Vector[] = [];
  const angle = (2 * Math.PI) / count;
  const startAngle = ((startDegree - 90) * -1 * Math.PI) / 180 + angle;
  for (let i = count - 1; i >= 0; i--) {
    const x = center.x + radius * Math.cos(startAngle + i * angle);
    const z = center.z + radius * Math.sin(startAngle + i * angle);
    positions.push(Vector(round(x), round(center.y), round(z)));
  }
  return positions;
}

export function getSlottedRingPositions(center: Vector, radius: number, count: number, startDegree = 0) {
  const positions: Vector[] = [];
  const totalSlots = 18;

  if (count > totalSlots) {
    throw new Error("Count exceeds the maximum allowed slots of 18.");
  }

  const angleIncrement = (2 * Math.PI) / totalSlots;
  const startAngle = ((startDegree - 90) * -1 * Math.PI) / 180;

  for (let i = 0; i <= count - 1; i++) {
    const slotIndex = Math.floor(i * (totalSlots / count));
    const angle = startAngle + slotIndex * angleIncrement;
    const x = center.x - radius * Math.cos(angle);
    const z = center.z - radius * Math.sin(angle);
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
  const angle = (spacingDegree * Math.PI) / 180;

  let startAngle = ((targetDegree - 180) * -1 * Math.PI) / 180;

  if (centered) {
    startAngle = startAngle - (angle * (count - 1)) / 2;
  }

  for (let i = count - 1; i >= 0; i--) {
    const x = center.x + radius * Math.cos(startAngle - i * angle);
    const z = center.z + radius * Math.sin(startAngle - i * angle);
    positions.push(Vector(round(x), round(center.y), round(z)));
  }
  return positions.reverse();
}
