import { Api, State } from "./_types";

/**
 * maybe add some functionality where spamming 'forward' won't be permitted until the previous was resolved
 * maybe add a 'busy' flag to the state?
 * it is expected for forward to call setPhases
 */

export function initApi(initialState: State) {
  const state: State = initialState;
  let busy = false;

  const api: Api = {
    forward: async () => {
      if (busy) {
        return;
      }

      busy = true;
      const phase = state.phases[state.phase];
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

      const nextPhase = state.phases[state.phase];
      await nextPhase.enterForwards(state, api);
      busy = false;
    },

    backward: async () => {
      if (busy) {
        return;
      }

      busy = true;
      const phase = state.phases[state.phase];
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
      const nextPhase = state.phases[state.phase];
      await nextPhase.enterBackwards(state, api);
      busy = false;
    },

    setPhases: async (phases, index = 0) => {
      state.phases = phases;
      state.phase = index;
      const phase = state.phases[state.phase];
      await phase.enterForwards(state, api);
    },

    getState: () => state,
  };

  return api;
}
