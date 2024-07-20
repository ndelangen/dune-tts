import { applyUi, render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
// import { Forge } from "@typed-tabletop-simulator/lib";
import * as card from "./objects/card";
import { fetch } from "./utils/fetch";
import { initApi } from "./utils/phases";
import * as drafting from "./phases/setup/drafting";
import * as draftingTrading from "./phases/setup/trading";
import * as spawning from "./phases/setup/spawning";
import { Phase, State } from "./utils/phases-types";
import { BASEURL } from "utils/BASEURL";

import { App } from "./App";
import { Forge } from "@typed-tabletop-simulator/lib";

let state: State = { turn: 0, phase: 0, phases: [], data: null };

onSave = () => {
  return JSON.encode(state);
};

const PHASES = [drafting.phase, draftingTrading.phase, spawning.phase].reduce<Record<string, Phase>>((acc, phase) => {
  acc[phase.name] = phase;
  return acc;
}, {});

onPlayerConnect = (player) => {
  if (state.phase === 0 && state.turn === 0) {
    const all = Player.getColors();
    const taken = Player.getPlayers().map((p) => p.color);
    const available = all.find((c) => !taken.includes(c) && c !== "Black" && c !== "Grey");

    if (!available) {
      broadcastToAll("No more players can join");
      return;
    }

    player.changeColor(available);
  }
};

onLoad = (script_state) => {
  // const ui = render(Global, <App />);

  // THIS WORKS!
  // applyUi(Global, <App />);

  if (script_state !== "" && script_state !== undefined && script_state !== null) {
    // state = JSON.decode(script_state) as State;
  }

  const d = async () => {
    const api = initApi(state, PHASES);
    api.subscribe((s) => {
      state = s;
    });

    // debug
    state.data = null;

    if (state.data === null) {
      const data: any = await fetch(BASEURL + "generated/index.json").catch((e) => {});
      if (data) {
        api.setState({ ...state, data });
      }
    }

    if (state.data === null) {
      broadcastToAll("Sorry, the mod is broken, fetch failed");
      return;
    }

    if (state.phases.length === 0) {
      api.setState({
        phases: [drafting.phase.name, draftingTrading.phase.name, spawning.phase.name],
        // phases: [spawning.phase.name],
      });
    }

    // if (state.data !== null) {
    //   const d = state.data;
    //   const cards = Object.values(state.data.treachery).map((front) => ({
    //     front: BASEURL + front,
    //     back: BASEURL + d.backs.treachery,
    //   }));

    //   await Forge.spawnObject(card.define(cards), {
    //     position: { x: 0, y: 5, z: 0 },
    //     rotation: { x: 0, y: 180, z: 0 },
    //     scale: { x: 1, y: 1, z: 1 },
    //   });
    // }

    if (state.turn === 0 && state.phase === 0) {
      await api.setPhases(state.phases);
    }
    // await Forge.spawnObject(
    //   card.define({
    //     front: "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
    //     back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
    //   }),
    //   {
    //     position: { x: 0, y: 5, z: 0 },
    //     rotation: { x: 0, y: 180, z: 0 },
    //     scale: { x: 1, y: 1, z: 1 },
    //   }
    // );
    // await Forge.spawnObject(
    //   card.define([
    //     {
    //       front:
    //         "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
    //       back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
    //       name: "Card 1",
    //     },
    //   ]),
    //   {
    //     position: { x: 3, y: 5, z: 0 },
    //     rotation: { x: 0, y: 180, z: 0 },
    //     scale: { x: 1, y: 1, z: 1 },
    //   }
    // );
    // await Forge.spawnObject(
    //   card.define([
    //     {
    //       front:
    //         "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
    //       back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
    //     },
    //     {
    //       front:
    //         "http://cloud-3.steamusercontent.com/ugc/2495638295534741822/069CB00E06AF42090B520D9170572DB3EEE84160/",
    //       back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
    //     },
    //   ]),
    //   {
    //     position: { x: 6, y: 5, z: 0 },
    //     rotation: { x: 0, y: 180, z: 0 },
    //     scale: { x: 1, y: 1, z: 1 },
    //   }
    // );
    return true;
  };

  d();
};
