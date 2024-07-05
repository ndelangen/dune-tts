import { round } from "./math";

const degToRad = (deg: number) => deg * (Math.PI / 180);
const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;

export const relative = (base: [Vector, Vector], offset: [Vector, Vector]): [Vector, Vector] => {
  const [position, rotation] = base;
  const [positionOffset, rotationOffset] = offset;

  const rotX = degToRad(rotation.x);
  const rotY = degToRad(rotation.y);
  const rotZ = degToRad(rotation.z);

  const cosY = Math.cos(rotY);
  const sinX = Math.sin(rotX);
  const cosX = Math.cos(rotX);
  const sinY = Math.sin(rotY);
  const sinZ = Math.sin(rotZ);
  const cosZ = Math.cos(rotZ);

  const rotatedOffset = Vector(
    positionOffset.x * (cosY * cosZ) +
      positionOffset.y * (sinX * sinY * cosZ - cosX * sinZ) +
      positionOffset.z * (cosX * sinY * cosZ + sinX * sinZ),

    positionOffset.x * (cosY * sinZ) +
      positionOffset.y * (sinX * sinY * sinZ + cosX * cosZ) +
      positionOffset.z * (cosX * sinY * sinZ - sinX * cosZ),
    positionOffset.x * -sinY + positionOffset.y * (sinX * cosY) + positionOffset.z * (cosX * cosY)
  );

  const newPosition = Vector(
    round(position.x + rotatedOffset.x),
    round(position.y + rotatedOffset.y),
    round(position.z + rotatedOffset.z)
  );

  const newRotation = Vector(
    round(normalizeAngle(rotation.x + rotationOffset.x)),
    round(normalizeAngle(rotation.y + rotationOffset.y)),
    round(normalizeAngle(rotation.z + rotationOffset.z))
  );

  return [newPosition, newRotation];
};
