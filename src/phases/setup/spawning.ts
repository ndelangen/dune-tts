import { waitCondition, waitFrames, waitTime } from "@typed-tabletop-simulator/lib";
import { type Phase } from "../../utils/phases-types";

const name = "spawn";

function checkReadiness() {
  const tokens = getObjectsWithAllTags(["coded"]);
  return tokens.every((token) => {
    return token.is_face_down;
  });
}

export const phase: Phase = {
  name,
  enterForwards: async (s, api) => {
    broadcastToAll("Spawwning board...");

    await waitTime(0.2);

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
