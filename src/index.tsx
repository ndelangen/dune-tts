// import { render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge } from "@typed-tabletop-simulator/lib";
import * as card from "./utils/card";

// import { App } from "App";

onLoad = () => {
  // const ui = render(Global, <App />);

  const d = async () => {
    await Forge.spawnObject(
      card.define({
        front: "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
        back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
      }),
      {
        position: { x: 0, y: 5, z: 0 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    );
    await Forge.spawnObject(
      card.define([
        {
          front:
            "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
          back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
          name: "Card 1",
        },
      ]),
      {
        position: { x: 3, y: 5, z: 0 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    );
    await Forge.spawnObject(
      card.define([
        {
          front:
            "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
          back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
        },
        {
          front:
            "http://cloud-3.steamusercontent.com/ugc/2495638295534741822/069CB00E06AF42090B520D9170572DB3EEE84160/",
          back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
        },
      ]),
      {
        position: { x: 6, y: 5, z: 0 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    );
    return true;
  };

  d();
};
