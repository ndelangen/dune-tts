import { type Phase } from "../../utils/phases-types";

const name = "draft trading";

export const phase: Phase = {
  name,
  enterForwards: async () => {},
  exitForwards: async () => {
    // check if all faction tokens have been flipped correctly
    // indicating everyone is ready to proceed
    const ready = getObjectsWithAllTags(["faction-token"]).every((token) => {
      const y = token.getRotation().y;
      return y > 178 && y < 182; // it's flipped!
    });

    if (!ready) {
      broadcastToAll("Not all factions are ready. Flip your faction token to indicate readiness.");
    }

    return ready;
  },
  enterBackwards: async () => {},
  exitBackwards: async () => {
    return true;
  },
};
