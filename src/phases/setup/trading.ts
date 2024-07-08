import { waitCondition, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { type Phase } from "../../utils/phases-types";

const name = "trading";

function checkReadiness() {
  const tokens = getObjectsWithAllTags(["coded"]);
  return tokens.every((token) => {
    return token.is_face_down;
  });
}

export const phase: Phase = {
  name,
  enterForwards: async (s, api) => {
    broadcastToAll("Trade factions by swapping seat with other players. When ready, flip your faction token.");
    const tokens = getObjectsWithAllTags(["coded"]);

    if (checkReadiness()) {
      tokens.forEach((token) => {
        token.flip();
      });
    }

    await waitTime(4);

    // check if all faction tokens have been flipped correctly
    // indicating everyone is ready to proceed

    await waitCondition(checkReadiness);

    broadcastToAll("All players are ready to proceed.");

    await waitTime(0.2);

    waitTime(0.2).then(() => {
      return api.forward();
    });

    return;
  },
  exitForwards: async () => {
    return true;
  },
  enterBackwards: async () => {},
  exitBackwards: async () => {
    return true;
  },
};
