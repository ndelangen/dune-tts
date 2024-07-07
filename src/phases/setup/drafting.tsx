import { applyUi, render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { getArchPositions, getRingPositions, getSlottedRingPositions } from "../../utils/circle";
import { Api, colors, State, type Phase } from "../../utils/phases-types";
import * as disc from "../../objects/disc";
import { App } from "../../App";
import { matchColorsToFactions } from "../../utils/color";

const name = "drafting";

const formatFactionName = (name: string) => {
  const sections = name.split("-");
  return sections.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
};

async function setup(s: State, api: Api) {
  if (s.data === null) {
    return;
  }

  // DEBUG
  Player.getPlayers()
    .find((p) => p.steam_name === "Central419")
    ?.changeColor("White");

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
  const timer = Wait.time(
    () => {
      const players = Player.getPlayers().filter((p) => p.seated && p.color !== "Black");
      const playersThatDrafted = players.filter((p) => {
        return tokens.some((t) => {
          return t.getDescription().includes(p.steam_name);
        });
      });
      const remaining = players.filter((p) => !playersThatDrafted.includes(p));

      let messages = [
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

      if (playersThatDrafted.length === players.length) {
        messages = ["All players have drafted"];
      }

      if (messages.length === 0) {
        messages = ["No players have drafted"];
      }

      applyUi(
        info,
        <App
          list={messages}
          onClick={() => {
            Wait.stop(timer);
            log("Let's start the game!");
            api.forward();

            info.destruct();
          }}
          showButton={tokens.filter((t) => t.getDescription() !== "").length > 3}
        />
      );
    },
    0.2,
    999999
  );

  await waitTime(0.1);

  // await Promise.all(
  //   getArchPositions(Vector(0, 0, 0), 4, 10, 10, 0, true).map(async (pos, index = 0) => {
  //     await waitTime(1 + index * 0.1);
  //     Player.White?.pingTable(Vector(pos));
  //     return true;
  //   })
  // );
  // await Promise.all(
  //   getRingPositions(Vector(0, 0, 0), 5, 10, 0).map(async (pos, index = 0) => {
  //     await waitTime(1 + index * 0.1);
  //     Player.White?.pingTable(Vector(pos));
  //     return true;
  //   })
  // );

  // await Promise.all(
  //   getSlottedRingPositions(Vector(0, 0, 0), 6, 4, 0).map(async (pos, index = 0) => {
  //     await waitTime(1 + index * 0.1);
  //     // Player.White?.pingTable(Vector(pos));
  //     return true;
  //   })
  // );

  // spawn faction tokens in arch/circle around center-point
  // move player-hand boxes to drafting positions
  // flipped up = drafted
  // flipped down = not drafted
  // track who flipped it up
  // show list of factions drafted by each player
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
    log("exiting drafting phase");

    const previouslySeatedPlayers = Player.getPlayers().filter(
      (p) => p.color !== "Black" && p.color !== "Grey" && p.seated
    );

    const previouslyBlack = Player.getPlayers().filter((p) => p.color === "Black");

    previouslyBlack.forEach((p) => {
      p.changeColor("Grey");
    });

    // unseat all players
    previouslySeatedPlayers.forEach((p) => {
      p.changeColor("Black"); // required because TTS bug
      p.changeColor("Grey");
    });

    previouslyBlack.forEach((p) => {
      p.changeColor("Black");
    });

    await waitTime(0.2);

    // delete all objects
    const allTokens = getObjectsWithAllTags(["coded"]);
    const flippedTokens = allTokens.filter((o) => o.getDescription() !== "");
    const unflippedTokens = allTokens.filter((o) => o.getDescription() === "");

    const tokenPositions = getSlottedRingPositions(Vector(0, 2, 0), 10, flippedTokens.length, 0);
    const handZonePositions = getSlottedRingPositions(Vector(0, 2, 0), 20, flippedTokens.length, 0);

    for (let i = 0; i <= unflippedTokens.length - 1; i++) {
      await waitFrames(4);
      unflippedTokens[i].destruct();
    }

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
    await waitTime(0.6);

    // randomize the positions of the flipped tokens
    const count = flippedTokens.length;
    for (let i = 0; i <= count * 2; i++) {
      await waitFrames(5);

      const a = i % 2;
      let b = Math.floor(Math.random() * count);
      while (b === a) {
        b = Math.floor(Math.random() * count);
      }
      const temp = flippedTokens[a].getPosition();
      flippedTokens[a].setPositionSmooth(flippedTokens[b].getPosition(), false, true);
      flippedTokens[b].setPositionSmooth(temp, false, true);
    }

    // have order of tokens match order of positions
    flippedTokens.sort((a, b) => b.getPosition().y - a.getPosition().y);

    // wait for the smooth movements to finish
    await waitTime(0.8);

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

    await waitTime(0.2);

    // unlock all tokens
    for (let i = 0; i <= count - 1; i++) {
      flippedTokens[i].setLock(false);
    }

    await waitTime(0.2);

    const handZones = getObjects().filter((o) => {
      return o.name === "HandTrigger";
    });

    // log(handZones);

    const combo = flippedTokens.map((t) => ({
      token: t,
      faction: data.factions[t.getGMNotes()],
      name: t.getGMNotes(),
      drafter: Player.getPlayers().find((p) => t.getDescription().includes(p.steam_name))?.steam_name,
    }));

    const uniqueDrafters = combo.map((c) => c.drafter).filter((p, index, self) => self.indexOf(p) === index);
    const out = matchColorsToFactions(combo.map<[string, any]>((c) => [c.name, c.faction.colors]));

    let players = uniqueDrafters;

    if (count !== uniqueDrafters.length) {
      broadcastToAll("There is a mismatch between the number of players and the number of factions drafted");

      players = [...uniqueDrafters, ...previouslySeatedPlayers.map((p) => p.steam_name)].filter(
        (p, index, self) => self.indexOf(p) === index
      );
    }

    // randomize player order
    players.sort(() => Math.random() - 0.5);

    const playerz = players.map((p) => {
      return Player.getPlayers().find((pl) => pl.steam_name === p);
    });

    if (count !== playerz.length) {
      broadcastToAll("There is a mismatch between the number of players and the number of factions drafted");
    }

    // move all handzones to center
    for (let i = 0; i <= handZones.length - 1; i++) {
      handZones[i].setPosition(Vector(0, 0, 50));
      handZones[i].setRotation(Vector(0, 0, 0));
      handZones[i].setScale(Vector(1, 1, 1));
    }

    for (let i = 0; i <= count - 1; i++) {
      const c = combo[i];
      const color = out[c.name];
      const player = playerz[i];
      const handzone = handZones.find((h) => (h.getData() as any).FogColor === color);
      if (handzone === undefined) {
        broadcastToAll("HandZone not found for color " + color + " for faction " + c.name + " drafted by " + c.drafter);
        return false;
      }

      const angle = getAngleBetweenVectors(tokenPositions[i], Vector(0, 0, 0));
      handzone.setPosition(handZonePositions[i]);
      handzone.setRotation(Vector(0, angle, 0));
      handzone.setScale(Vector(11, 6, 6));

      if (player) {
        player.changeColor(color);
      }
    }

    // Player.getPlayers().map((p) => {
    //   log(p);
    //   // p.getHandObjects().forEach((o, index) => {
    //   //   log(p.color);
    //   //   log(index);
    //   //   log(o);
    //   // });
    // });

    // move player-hand boxes back to playing positions
    // spawn board
    // randomize player seating
    // randomize faction order
    // set players (that drafted something) in seat

    // spawn all drafted factions
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
