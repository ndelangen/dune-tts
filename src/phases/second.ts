import { type Phase } from "../utils/phases-types";

const name = "second";

export const phase: Phase = {
  name,
  enterForwards: async () => {},
  exitForwards: async () => {
    return true;
  },
  enterBackwards: async () => {},
  exitBackwards: async () => {
    return true;
  },
};
