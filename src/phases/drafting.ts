import { getRingPositions } from "utils/circle";
import { type Phase } from "../utils/phases-types";
import { waitTime } from "@typed-tabletop-simulator/lib";

const name = "drafting";

async function setup() {
  log("setup drafting phase");

  await Promise.all(
    getRingPositions(Vector(0, 0, 0), 4, 18, 0).map(async (pos, index = 0) => {
      await waitTime(1 + index * 0.5);
      Player.White?.pingTable(Vector(pos));
      return true;
    })
  );
  // spawn faction tokens in arch/circle around center-point
  // move player-hand boxes to drafting positions
  // flipped up = drafted
  // flipped down = not drafted
  // track who flipped it up
  // show list of factions drafted by each player
}

export const phase: Phase = {
  name,
  enterForwards: async () => {
    await setup();
  },
  exitForwards: async () => {
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
  enterBackwards: async () => {
    // delete all objects
    await setup();
  },
  exitBackwards: async () => {
    return false;
  },
};
