import { applyUi, render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { getArchPositions, getRingPositions, getSlottedRingPositions } from "../../utils/circle";
import { Api, State, type Phase } from "../../utils/phases-types";
import * as disc from "../../objects/disc";
import { App } from "../../App";

const name = "drafting";

async function setup(s: State) {
  if (s.data === null) {
    return;
  }

  const center = Vector(0, 2, 0);
  const factions = Object.values(s.data.factions);
  const names = Object.keys(s.data.factions);
  const count = factions.length;
  const positions = getRingPositions(center, 5, count);

  const info = await Forge.spawnObject(disc.simple({ name: "center" }), {
    position: center,
    rotation: Vector(0, 180, 0),
    scale: Vector(1, 1, 1),
  });
  info.setColorTint({ r: 0.5, g: 0.5, b: 0.5, a: 0.0 });
  info.interactable = false;

  applyUi(info, <App list={["AAA", "BBB", "CCC"]} />);

  const tokens: TTSObject[] = [];

  // spawn faction tokens
  for (let i = 0; i <= count - 1; i++) {
    await waitFrames(8);
    const data = {
      ...disc.define({
        front: factions[i].logo,
        back: factions[i].logo,
        name: names[i],
      }),
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

  broadcastToAll("Drafting phase has started");
  await waitTime(1);
  broadcastToAll("Flip a faction token to draft it");
  await waitTime(1);

  const players = Player.getPlayers().filter((p) => p.seated && p.color !== "Black");

  const timer = Wait.time(
    () => {
      const playersThatDrafted = players.filter((p) => {
        return tokens.some((t) => {
          return t.getDescription().includes(p.steam_name);
        });
      });
      const remaining = players.filter((p) => !playersThatDrafted.includes(p));

      const messages = [
        //
        ...playersThatDrafted.map(
          (p) =>
            p.steam_name +
            ": " +
            tokens
              .filter((t) => t.getDescription().includes(p.steam_name))
              .map((t) => t.getName())
              .join(",")
        ),
        ...remaining.map((p) => p.steam_name + ": nothing yet"),
      ];

      // const c = tokens.filter((t) => t.getDescription() !== "");
      // const r = c.map((t) => t.getDescription().replace("drafted by ", "") + " drafted: " + t.getName());
      if (messages.length > 0) {
        applyUi(info, <App list={messages} />);
      }
    },
    0.2,
    99999
  );

  await waitTime(150);
  Wait.stop(timer);

  await waitTime(1);

  // tokens.forEach((token) => {
  //   token.

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
  enterForwards: async (s) => {
    await setup(s);
  },
  exitForwards: async () => {
    const players = Player.getPlayers().filter((p) => p.color !== "Black");
    players.forEach((p) => {
      p.changeColor("Gray");
    });

    await waitTime(1);
    // unseat all players
    // delete all objects
    // move player-hand boxes back to playing positions
    // spawn board
    // randomize player seating
    // randomize faction order
    // set players (that drafted something) in seat

    // spawn all drafted factions
    return true;
  },
  enterBackwards: async (s) => {
    // delete all objects
    await setup(s);
  },
  exitBackwards: async () => {
    return false;
  },
};
