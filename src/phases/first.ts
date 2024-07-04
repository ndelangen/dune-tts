import { type Phase } from "./_types";

const name = "drafting";

export const phase: Phase = {
  name,
  enterForwards: async () => {},
  exitForwards: async () => {
    return true;
  },
  enterBackwards: async () => {},
  exitBackwards: async () => {
    return false;
  },
};