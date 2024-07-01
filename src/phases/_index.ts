import * as first from "./first";
import * as second from "./second";
import { Api, Phase, State } from "./_types";

const state: State = {
  phase: 0,
  turn: 0,
  phases: [first.phase, second.phase],
};

export const api: Api = {
  forward: async () => {
    const phase = state.phases[state.phase];
    await phase.exitForwards(state, api);
    state.phase++;
    const nextPhase = state.phases[state.phase];
    await nextPhase.enterForwards(state, api);
  },

  backward: async () => {
    const phase = state.phases[state.phase];
    await phase.exitBackwards(state, api);
    state.phase--;
    const nextPhase = state.phases[state.phase];
    await nextPhase.enterBackwards(state, api);
  },

  setPhases: async (phases: Phase[]) => {
    state.phases = phases;
    state.phase = 0;
    const phase = state.phases[state.phase];
    await phase.enterForwards(state, api);
  },
};
