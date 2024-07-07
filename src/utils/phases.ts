import { Api, Phase, State } from "./phases-types";

export function initApi(initialState: State, phaseList: Record<string, Phase>) {
  const state: State = initialState;
  let busy = false;
  const subscribers: Function[] = [];

  const api: Api = {
    forward: async () => {
      if (busy) {
        return;
      }

      busy = true;
      const phaseName = state.phases[state.phase];
      const phase = phaseList[phaseName];
      const ok = await phase.exitForwards(state, api);
      if (!ok) {
        busy = false;
        return;
      }

      if (state.phase === state.phases.length - 1) {
        state.turn++;
        state.phase = 0;
      } else {
        state.phase++;
      }

      const nextPhaseName = state.phases[state.phase];
      const nextPhase = phaseList[nextPhaseName];
      await nextPhase.enterForwards(state, api);
      busy = false;
    },

    backward: async () => {
      if (busy) {
        return;
      }

      busy = true;
      const phaseName = state.phases[state.phase];
      const phase = phaseList[phaseName];
      const ok = await phase.exitBackwards(state, api);
      if (!ok) {
        return;
      }

      if (state.phase === 0) {
        if (state.turn === 0) {
          busy = false;
          return;
        }
        state.turn--;
        state.phase = state.phases.length - 1;
      } else {
        state.phase--;
      }
      const nextPhaseName = state.phases[state.phase];
      const nextPhase = phaseList[nextPhaseName];
      await nextPhase.enterBackwards(state, api);
      busy = false;
    },

    setPhases: async (phases, index = 0) => {
      state.phases = phases;
      state.phase = index;
      const phaseName = state.phases[state.phase];
      const phase = phaseList[phaseName];
      if (!phase) {
        throw new Error(`Phase not found: ${phaseName}`);
      }
      await phase.enterForwards(state, api);
    },

    getState: () => state,

    setState: (newState) => {
      Object.assign(state, newState);
      subscribers.forEach((fn) => fn(state));
    },

    subscribe: (fn) => {
      subscribers.push(fn);
    },
  };

  return api;
}
