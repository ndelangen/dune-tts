import { applyUi, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge, waitCondition, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { getRingPositions, getSlottedRingPositions } from "../../utils/circle";
import { Api, State, type Phase } from "../../utils/phases-types";
import * as disc from "../../objects/disc";
import { App } from "../../App";
import { matchColorsToFactions } from "../../utils/color";
import { formatFactionName } from "../../utils/format";

const name = "drafting";

async function setup(s: State, api: Api) {
  if (s.data === null) {
    return;
  }

  const center = Vector(0, 2, 0);
  const factions = Object.values(s.data.factions);
  const names = Object.keys(s.data.factions);
  const count = factions.length;
  const positions = getRingPositions(center, 6, count);

  const info = await Forge.spawnObject(disc.simple({ name: "center" }), {
    position: center,
    rotation: Vector(0, 180, 0),
    scale: Vector(1, 1, 1),
  });

  info.setColorTint({ r: 0.5, g: 0.5, b: 0.5, a: 0.0 });
  info.interactable = false;

  const tokens: TTSObject[] = [];

  // spawn faction tokens
  for (let i = 0; i <= count - 1; i++) {
    await waitFrames(5);
    const data = {
      ...disc.define({
        front: factions[i].logo,
        back: factions[i].logo,
        name: formatFactionName(names[i]),
        tags: ["faction_token"],
      }),
      GMNotes: names[i],
      ColorDiffuse: { r: 0.7, g: 0.7, b: 0.7 },
      LuaScript: `
        function onRotate(spin, flip, player, old_spin, old_flip)
          if flip ~= old_flip then
            if flip > 175 and flip < 185 then
              self.setDescription("drafted by " .. Player[player].steam_name)
              self.highlightOn(Color.White)
            else
              self.setDescription("")
              self.highlightOff()
            end
          end
        end
      `,
    } satisfies ReturnType<typeof disc.define>;

    tokens.push(
      await Forge.spawnObject(data, {
        position: positions[i],
        rotation: Vector(0, 180, 0),
        scale: Vector(1, 1, 1),
      })
    );
  }

  applyUi(info, <App list={["Flip faction to draft"]} />);

  broadcastToAll("Drafting phase has started");
  await waitTime(1);
  broadcastToAll("Flip a faction token to draft it");
  await waitTime(1);

  // in sync view of who drafted
  let messages: string = "";
  const timer = Wait.time(
    () => {
      const players = Player.getPlayers().filter((p) => p.seated && p.color !== "Black");
      const playersThatDrafted = players.filter((p) => {
        return tokens.some((t) => {
          return t.getDescription().includes(p.steam_name);
        });
      });
      const remaining = players.filter((p) => !playersThatDrafted.includes(p));

      let newMessages = [
        ...playersThatDrafted.map(
          (p) =>
            p.steam_name +
            ": " +
            tokens
              .filter((t) => t.getDescription().includes(p.steam_name))
              .map((t) => formatFactionName(t.getName()))
              .join(", ")
        ),
        ...remaining.map((p) => p.steam_name + ": nothing yet"),
      ];

      if (
        playersThatDrafted.length === players.length &&
        tokens.filter((t) => t.getDescription() !== "").length === playersThatDrafted.length
      ) {
        newMessages = ["All players have drafted"];
      }

      if (newMessages.length === 0) {
        newMessages = ["Flip faction to draft", "No players have drafted"];
      }

      if (newMessages.join("\n") !== messages) {
        messages = newMessages.join("\n");

        applyUi(
          info,
          <App
            list={newMessages}
            onClick={async () => {
              Wait.stop(timer);
              api.forward();

              info.destruct();
            }}
            showButton={tokens.filter((t) => t.getDescription() !== "").length > 2}
          />
        );
      }
    },
    0.2,
    999999
  );

  await waitTime(0.1);

  return true;
}

export const phase: Phase = {
  name,
  enterForwards: async (s, api) => {
    await setup(s, api);
  },
  exitForwards: async (s) => {
    const data = s.data;
    if (data === null) {
      return false;
    }

    const previouslySeatedPlayers = Player.getPlayers().filter(
      (p) => p.color !== "Black" && p.color !== "Grey" && p.seated
    );

    const previouslyBlack = Player.getPlayers().filter((p) => p.color === "Black");

    previouslyBlack.forEach((p) => {
      p.changeColor("Grey");
    });

    // unseat all players
    for (let i = 0; i <= previouslySeatedPlayers.length - 1; i++) {
      const p = previouslySeatedPlayers[i];
      p.changeColor("Black"); // required because TTS bug
      await waitTime(0.1);
      p.changeColor("Grey");
      p.changeColor("Grey");
    }

    previouslyBlack.forEach((p) => {
      p.changeColor("Black");
    });

    await waitTime(0.2);

    // delete all objects
    const allTokens = getObjectsWithAllTags(["faction_token"]);
    const flippedTokens = allTokens.filter((o) => o.getDescription() !== "");
    const unusedTokens = allTokens.filter((o) => o.getDescription() === "");

    // delete unused tokens
    for (let i = 0; i <= unusedTokens.length - 1; i++) {
      await waitFrames(4);
      unusedTokens[i].destruct();
    }

    const tokenPositions = getSlottedRingPositions(Vector(0, 2, 0), 9, flippedTokens.length, 0);
    const handZonePositions = getSlottedRingPositions(Vector(0, 3.71, 0), 18, flippedTokens.length, 0);

    // respawn tokens with LuaScript removed
    for (let i = 0; i <= flippedTokens.length - 1; i++) {
      const data = flippedTokens[i].getData();
      const rotation = flippedTokens[i].getRotation();
      const position = flippedTokens[i].getPosition();
      const scale = flippedTokens[i].getScale();
      data.LuaScript = "";
      data.Locked = true;

      flippedTokens[i].destruct();
      flippedTokens[i] = await Forge.spawnObject(data, {
        position,
        rotation,
        scale,
      });
      flippedTokens[i].setPositionSmooth(Vector(0, 2 + i * 0.5, 0));
    }

    // wait for the smooth movements to finish
    await waitCondition(() => flippedTokens.every((t) => t.isSmoothMoving() === false));

    // randomize the positions of the flipped tokens
    const count = flippedTokens.length;
    for (let i = 0; i <= count * 2; i++) {
      await waitCondition(() => flippedTokens.every((t) => t.isSmoothMoving() === false));

      const a = i % 2;
      let b = Math.floor(Math.random() * count);
      while (b === a) {
        b = Math.floor(Math.random() * count);
      }
      const temp = flippedTokens[a].getPosition();
      flippedTokens[a].setPositionSmooth(flippedTokens[b].getPosition(), false, true);
      flippedTokens[b].setPositionSmooth(temp, false, true);
    }

    // wait for the smooth movements to finish
    await waitCondition(() => flippedTokens.every((t) => t.isSmoothMoving() === false));

    // have order of tokens match order of positions
    flippedTokens.sort((a, b) => b.getPosition().y - a.getPosition().y);

    function getAngleBetweenVectors(v1: Vector, v2: Vector): number {
      const deltaX = v2.x - v1.x;
      const deltaZ = v2.z - v1.z;
      const angleRadians = Math.atan2(deltaZ, deltaX);
      const angleDegrees = angleRadians * (180 / Math.PI);
      return -90 - angleDegrees;
    }

    for (let i = 0; i <= count - 1; i++) {
      await waitFrames(8);

      const angle = getAngleBetweenVectors(tokenPositions[i], Vector(0, 0, 0));

      flippedTokens[i].setPositionSmooth(tokenPositions[i], false, false);
      flippedTokens[i].setRotationSmooth(Vector(0, angle, 180));
    }

    flippedTokens.forEach((t) => {
      t.interactable = false;
      t.setLock(false);
    });

    await waitCondition(() => flippedTokens.every((t) => t.isSmoothMoving() === false && t.resting === true));

    flippedTokens.forEach((t) => {
      t.interactable = true;
      t.setLock(true);
    });

    const combo = flippedTokens.map((t) => ({
      token: t,
      faction: data.factions[t.getGMNotes()],
      name: t.getGMNotes(),
      drafter: Player.getPlayers().find((p) => t.getDescription().includes(p.steam_name))?.steam_name,
    }));

    const uniqueDrafters = combo.map((c) => c.drafter).filter((p, index, self) => self.indexOf(p) === index);
    const out = matchColorsToFactions(combo.map<[string, any]>((c) => [c.name, c.faction.colors]));

    let playerNames = uniqueDrafters;

    if (count !== uniqueDrafters.length) {
      broadcastToAll("There is a mismatch between the number of players and the number of factions drafted");

      playerNames = [...uniqueDrafters, ...previouslySeatedPlayers.map((p) => p.steam_name)].filter(
        (p, index, self) => self.indexOf(p) === index
      );
    }

    // randomize player order
    for (let i = playerNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playerNames[i], playerNames[j]] = [playerNames[j], playerNames[i]];
    }

    const players = playerNames.map((p) => {
      return Player.getPlayers().find((pl) => pl.steam_name === p);
    });

    if (count !== players.length) {
      // broadcastToAll("There is a mismatch between the number of players and the number of factions drafted");
    }

    const handZones = getObjects().filter((o) => {
      return o.name === "HandTrigger";
    });

    // move all handZones away
    for (let i = 0; i <= handZones.length - 1; i++) {
      handZones[i].setPosition(Vector(0, 0, 50));
      handZones[i].setRotation(Vector(0, 0, 0));
      handZones[i].setScale(Vector(1, 1, 1));
    }

    // move used handZones to player positions
    for (let i = 0; i <= count - 1; i++) {
      const c = combo[i];
      const color = out[c.name];
      const player = players[i];
      const handZone = handZones.find((h) => (h.getData() as any).FogColor === color);
      if (handZone === undefined) {
        broadcastToAll("HandZone not found for color " + color + " for faction " + c.name + " drafted by " + c.drafter);
        return false;
      }

      const angle = getAngleBetweenVectors(Vector(0, 0, 0), tokenPositions[i]);
      handZone.setPosition(handZonePositions[i]);
      handZone.setRotation(Vector(0, angle, 0));
      handZone.setScale(Vector(11, 5, 1));

      if (player) {
        player.changeColor(color);
        await waitTime(0.1);
        player.changeColor(color);
        broadcastToAll(player.steam_name + " should sit in " + color + ", playing " + formatFactionName(c.name));
      }
    }

    await Promise.all(
      flippedTokens.map(async (t) => {
        const data = t.getData();

        data.Locked = true;
        data.Tags = ["coded"];
        data.AttachedSnapPoints = [
          {
            Position: Vector(0, 0, 0),
            Rotation: Vector(0, 0, 0),
            Tags: ["faction_token"],
          },
        ];
        data.Description = "";

        const obj = await Forge.spawnObject(data, {
          position: t.getPosition().add(Vector(0, -0.1, 0)),
          rotation: t.getRotation(),
          scale: t.getScale(),
        });

        obj.setLock(true);
        obj.interactable = false;

        return;
      })
    );

    return true;
  },
  enterBackwards: async (s, api) => {
    // delete all objects
    await setup(s, api);
  },
  exitBackwards: async () => {
    return false;
  },
};
