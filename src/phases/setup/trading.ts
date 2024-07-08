import { waitCondition, waitFrames } from "@typed-tabletop-simulator/lib";
import { type Phase } from "../../utils/phases-types";

const name = "draft trading";

export const phase: Phase = {
  name,
  enterForwards: async () => {},
  exitForwards: async () => {
    const tokens = getObjectsWithAllTags(["coded"]);

    tokens.forEach((token) => {
      token.flip();
    });

    await waitFrames(10);

    function checkReadiness() {
      const tokens = getObjectsWithAllTags(["coded"]);
      return tokens.every((token) => {
        const y = token.getRotation().y;
        return y > 178 && y < 182; // it's flipped!
      });
    }

    // check if all faction tokens have been flipped correctly
    // indicating everyone is ready to proceed
    const ready = checkReadiness();

    broadcastToAll("Trade factions by swapping seat with other players. When ready, flip your faction token.");

    await waitCondition(checkReadiness);

    broadcastToAll("All players are ready to proceed.");

    return ready;
  },
  enterBackwards: async () => {},
  exitBackwards: async () => {
    return true;
  },
};
