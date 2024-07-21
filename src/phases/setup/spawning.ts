import { Forge, waitCondition, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { type Phase } from "../../utils/phases-types";
import { define } from "../../objects/terratories";
import { defineBorder } from "../../objects/border";
import { defineText } from "../../objects/text";
import { defineCity, defineOrnithopter, defineSietch } from "../../objects/decals";
import { defineShield } from "../../objects/shield";
import { getSlottedRingPositions } from "../../utils/circle";
import { round } from "../../utils/math";

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

    let startTime = Time.time;
    const end = Vector(0, 180, 0);
    // const duration = 14;
    const duration = 1;

    const targetRotations = pieces.map((piece) => piece.getRotation());
    const targetScales = pieces.map((piece) => piece.getScale());
    const targetPositions = pieces.map((piece) => piece.getPosition());

    while (Time.time - startTime <= duration) {
      for (const piece of pieces) {
        const index = pieces.indexOf(piece);
        const start = targetRotations[index];
        const t = 1 - Math.pow(1 - (Time.time - startTime) / duration, 2);
        const fadeStart = 0.4; // Adjust the fade start time as desired
        const fadeT = Math.max(0, (t - fadeStart) / (1 - fadeStart));

        piece.setColorTint(Color(fadeT / 2, fadeT / 2, fadeT / 2));

        piece.setRotation(Vector.lerp(start, end, t));
        piece.setScale(Vector.lerp(Vector(5, 5, 5), targetScales[index], t));
        piece.setPosition(Vector.lerp(Vector(0, 0, 0), targetPositions[index], t));
      }
      await waitFrames(1);
    }

    for (const piece of pieces) {
      const index = pieces.indexOf(piece);
      piece.setRotation(end);
      piece.setScale(targetScales[index]);
      piece.setPosition(targetPositions[index]);
    }

    const border = defineBorder();
    const borderObj = await Forge.spawnObject(border, {
      position: Vector(0, 0, 0),
      rotation: Vector(0, 180, 0),
      scale: Vector(5.1, 9, 5.1),
    });
    borderObj.interactable = false;

    startTime = Time.time;
    const current = borderObj.getColorTint();

    while (Time.time - startTime <= 1) {
      const t = 1 - Math.pow(1 - (Time.time - startTime) / 1, 1);

      borderObj.setPosition(Vector.lerp(Vector(0, 0, 0), Vector(0, 1.62, 0), t));
      borderObj.setScale(Vector.lerp(Vector(5.1, 9, 5.1), Vector(7.3, 9.0, 7.3), t));
      borderObj.setColorTint(Color(current.r, current.g, current.b, t));
      await waitFrames(1);
    }

    borderObj.setScale(Vector(7.3, 9.0, 7.3));
    borderObj.setColorTint(Color(current.r, current.g, current.b, 1));

    startTime = Time.time;
    while (Time.time - startTime <= 1) {
      for (const piece of pieces) {
        const t = Math.min((Time.time - startTime) / 1, 1);
        piece.setColorTint(Color(0.5, 0.5, 0.5).lerp(Color(1, 1, 1), t) as any as Color);
      }
      await waitFrames(1);
    }

    for (const piece of pieces) {
      piece.setColorTint(Color(1, 1, 1));
    }

    interface Location {
      name: string;
      position: Vector;
      rotation?: Vector;
    }

    const y = 1.69;
    const territoryNames: Location[] = [
      //
      { name: "Polar Sink", position: Vector(-0.12, y, -0.13) },
      { name: "Cielago North", position: Vector(0, y, -2.46) },
      { name: "Cielago Depression", position: Vector(-0.33, y, -4.18) },
      { name: "Cielago South", position: Vector(0.59, y, -5.89) },
      { name: "Cielago East", position: Vector(2.76, y, -5.35) },
      { name: "Cielago\nWest", position: Vector(-2.26, y, -3.42) },
      { name: "False Wall East", position: Vector(3.1, y, -2.88) },
      { name: "Pasty Mesa", position: Vector(4.41, y, 0.03) },
      { name: "Shieldwall", position: Vector(2.54, y, 2.25) },
      { name: "Hark\nPass", position: Vector(1.1, y, -1.13) },
      { name: "Minor\nErg", position: Vector(2.34, y, 0.12) },
      { name: "Imperial Basin", position: Vector(1.04, y, 2.98) },
      { name: "Arsunt", position: Vector(-0.26, y, 2.03) },
      { name: "Hagga Basin", position: Vector(-1.65, y, 2.62) },
      { name: "Plastic\nBasin", position: Vector(-3.48, y, 2.71) },
      { name: "Funaral Plain", position: Vector(-5.23, y, 1.22) },
      { name: "Great Flat", position: Vector(-5.5, y, 0.37) },
      { name: "Greater Flat", position: Vector(-5.46, y, -0.49) },
      { name: "Habbana Erg", position: Vector(-5.17, y, -1.47) },
      { name: "Habbana\nRidge Flat", position: Vector(-4.36, y, -4.45) },
      { name: "Maridian", position: Vector(-1.82, y, -5.76) },
      { name: "Wind\nPass\nNorth", position: Vector(-1.3, y, -1.18) },
      { name: "Wind\nPass", position: Vector(-1.69, y, -0.27) },
      { name: "Rock Outcroppings", position: Vector(-4.57, y, 4.55), rotation: Vector(0, 320, 0) },
      { name: "Tsimpo", position: Vector(-0.53, y, 5.33) },
      { name: "Broken Land", position: Vector(-1.48, y, 6.27) },
      { name: "Old Gap", position: Vector(2.25, y, 6.19) },
      { name: "Basin", position: Vector(3.88, y, 5.01) },
      { name: "Hole in the Rock", position: Vector(3.04, y, 3.56), rotation: Vector(0, 321, 0) },
      { name: "Sihaya\nRidge", position: Vector(4.67, y, 4.53) },
      { name: "Gara Kulon", position: Vector(5.27, y, 3.46) },
      { name: "Red\nChasm", position: Vector(6.41, y, 0.81) },
      { name: "South Mesa", position: Vector(5.35, y, -3.79), rotation: Vector(0, 310, 0) },
      { name: "Bight of\nthe Cliff", position: Vector(-6.05, y, 2.21) },
      { name: "False\nWall\nWest", position: Vector(-3.01, y, -2.2) },
      { name: "False Wall East", position: Vector(1.28, y, 0.22), rotation: Vector(0, 270, 0) },
      { name: "Rim Wall West", position: Vector(2.62, y, 4.18), rotation: Vector(0, 300, 0) },
    ];

    for (const territory of territoryNames.sort((a, b) => a.position.z - b.position.z)) {
      const t = defineText({ text: territory.name });
      const obj = await Forge.spawnObject(t, {
        position: territory.position,
        rotation: territory.rotation || Vector(0, 0, 0),
        scale: Vector(0.2, 1, 0.2),
      });
      obj.interactable = false;

      if (obj.UI.getXml() === "") {
        obj.UI.setXml(
          t.XmlUI,
          t.CustomUIAssets.map((asset) => ({
            name: asset.Name,
            url: asset.URL,
          }))
        );
      }

      obj.UI.show("root");
      // await waitFrames(1);
    }

    const strongholdNames: Location[] = [
      { name: "Habbanya\nSietch", position: Vector(-4.67, y, -3.01) },
      { name: "Arrakeen", position: Vector(2.15, y, 4.88) },
      { name: "Carthag", position: Vector(-0.17, y, 4.44) },
      { name: "Tuek's\nSietch", position: Vector(4.95, y, -2.68) },
      { name: "Sietch\nTabr", position: Vector(-4.84, y, 2.87) },
      // { name: "Sietch Jacurutu", position: Vector(3.5, y, -2.5) },
    ];

    for (const stronghold of strongholdNames.sort((a, b) => a.position.z - b.position.z)) {
      const t = defineText({ text: stronghold.name, frontColor: "#000000", backColor: "#FDFDD4" });
      const obj = await Forge.spawnObject(t, {
        position: stronghold.position,
        rotation: Vector(0, 0, 0),
        scale: Vector(0.2, 1, 0.2),
      });
      obj.interactable = false;

      if (obj.UI.getXml() === "") {
        obj.UI.setXml(
          t.XmlUI,
          t.CustomUIAssets.map((asset) => ({
            name: asset.Name,
            url: asset.URL,
          }))
        );
      }

      obj.UI.show("root");
      // await waitFrames(1);
    }

    const tokens = getObjectsWithAllTags(["faction_token"]);
    tokens.forEach((token) => {
      token.setLock(false);
    });

    const orniDecal = defineOrnithopter();
    const cityDecal = defineCity();
    const sietchDecal = defineSietch();

    for (const stronghold of strongholdNames) {
      const type = stronghold.name.includes("Sietch") ? sietchDecal : cityDecal;
      const height = 0.05 + stronghold.name.split("\n").length * 0.15;
      const obj = await Forge.spawnObject(type, {
        position: stronghold.position.add(Vector(0, 0.09, height)),
        rotation: Vector(0, 180, 0),
        scale: Vector(0.3, 1, 0.3),
      });
      obj.interactable = false;

      if (type === cityDecal) {
        const a = await Forge.spawnObject(orniDecal, {
          position: stronghold.position.add(Vector(0, 0.0, height * -2.5)),
          rotation: Vector(0, 180, 0),
          scale: Vector(0.3, 1, 0.3),
        });
        a.interactable = false;
      }
    }

    // const text = defineText({ text: "Board spawned!" });
    // const textObj = await Forge.spawnObject(text, {
    //   position: Vector(0, 5, 0),
    //   rotation: Vector(0, 0, 0),
    //   scale: Vector(1, 1, 1),
    // });
    // textObj.interactable = false;

    // if (textObj.UI.getXml()) {
    //   textObj.UI.setXml(text.XmlUI, [
    //     {
    //       name: text.CustomUIAssets[0].Name,
    //       url: text.CustomUIAssets[0].URL,
    //     },
    //   ]);
    // }
    // textObj.UI.show("root");
    // await waitTime(0.2);

    function getAngleBetweenVectors(v1: Vector, v2: Vector): number {
      const deltaX = v2.x - v1.x;
      const deltaZ = v2.z - v1.z;
      const angleRadians = Math.atan2(deltaZ, deltaX);
      const angleDegrees = angleRadians * (180 / Math.PI);
      return -90 - angleDegrees;
    }

    const handZoneRotations = getSlottedRingPositions(Vector(0, 2, 0), 16, tokens.length, 0)
      .map((position) => ({
        position,
        angle: round(getAngleBetweenVectors(Vector(0, 0, 0), position)),
      }))
      .sort((a, b) => a.angle - b.angle);

    const sortedTokens = tokens.sort((a, b) => {
      const ra = round(getAngleBetweenVectors(Vector(0, 0, 0), a.getPosition()));
      const rb = round(getAngleBetweenVectors(Vector(0, 0, 0), b.getPosition()));

      return ra - rb;
    });

    for (let i = 0; i < sortedTokens.length; i++) {
      const token = sortedTokens[i];
      const { angle, position } = handZoneRotations[i];

      const faction = s.data?.factions[token.getGMNotes()];

      if (!faction) {
        return;
      }

      const shield = await Forge.spawnObject(defineShield({ image: faction.shield }), {
        position: position,
        rotation: Vector(0, angle, 0),
        scale: Vector(0.6, 0.6, 0.6),
      });

      shield.interactable = false;
    }

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
