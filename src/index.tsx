import { render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge } from "@typed-tabletop-simulator/lib";

import { App } from "App";

onLoad = () => {
  log("Loading done!");
  const ui = render(Global, <App />);

  const card = Forge.createDeck({
    name: "Test Deck",
    front:
      "http://cloud-3.steamusercontent.com/ugc/2495638295534741822/069CB00E06AF42090B520D9170572DB3EEE84160/",
    back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
    width: 1,
    height: 1,
    cards: [{ index: 1, name: "Test Card" }],
  });

  // log(card);
  const s = async () => {
    const out = await Forge.spawnObject(card, {
      position: { x: 0, y: 5, z: 0 },
    });

    log(out);

    return;
  };

  s();
};
