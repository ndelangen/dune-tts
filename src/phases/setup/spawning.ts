import { Forge, waitCondition, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { type Phase } from "../../utils/phases-types";
import { define } from "../../objects/terratories";

const name = "spawn";

export const phase: Phase = {
  name,
  enterForwards: async (s, api) => {
    broadcastToAll("Spawning board...");

    const all = define();

    const pieces = await Promise.all(
      all.map(async (def) => {
        const degree = Math.floor(Math.random() * 360);
        const obj = await Forge.spawnObject(def, {
          rotation: Vector(degree, degree, degree),
          // position: Vector(0, 0, 0),
          scale: Vector(3, 3, 3),
        });

        obj.setColorTint(Color(0, 0, 0));
        obj.drag_selectable = false;
        obj.locked = true;
        obj.interactable = false;

        return obj;
      })
    );

    // loop animated each piece slowly over the course of 5 seconds to have a rotation of Vector(0, 0, 0)
    const end = Vector(0, 180, 0);
    const duration = 14;
    let startTime = Time.time;

    const targetRotations = pieces.map((piece) => piece.getRotation());
    const targetScales = pieces.map((piece) => piece.getScale());
    const targetPositions = pieces.map((piece) => piece.getPosition());

    while (Time.time - startTime < duration) {
      for (const piece of pieces) {
        const index = pieces.indexOf(piece);
        const start = targetRotations[index];
        const t = 1 - Math.pow(1 - (Time.time - startTime) / duration, 2);
        const fadeStart = 0.5; // Adjust the fade start time as desired
        const fadeT = Math.max(0, (t - fadeStart) / (1 - fadeStart));

        piece.setColorTint(Color(fadeT / 5, fadeT / 5, fadeT / 5));

        piece.setRotation(Vector.lerp(start, end, t));
        piece.setScale(Vector.lerp(Vector(5, 5, 5), targetScales[index], t));
        piece.setPosition(Vector.lerp(Vector(0, 0, 0), targetPositions[index], t));
      }
      await waitFrames(1);
    }

    startTime = Time.time;
    while (Time.time - startTime < 2) {
      for (const piece of pieces) {
        const t = Math.min(1 - Math.pow(1 - (Time.time - startTime) / 4, 2) + 0.2, 1);

        piece.setColorTint(Color(t, t, t));
      }
      await waitFrames(1);
    }

    for (const piece of pieces) {
      const index = pieces.indexOf(piece);
      piece.setRotation(end);
      piece.setScale(targetScales[index]);
      piece.setPosition(targetPositions[index]);
      piece.setColorTint(Color(1, 1, 1));
    }

    await waitTime(0.2);

    broadcastToAll("Board spawned!");

    return;
  },
  exitForwards: async () => {
    return false;
  },
  enterBackwards: async () => {},
  exitBackwards: async () => {
    return true;
  },
};
