import { render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge } from "@typed-tabletop-simulator/lib";

import { App } from "App";

onLoad = () => {
  log("Loading done!");
  const ui = render(Global, <App />);

  // const card = Forge.createCard({
  //   name: "Test Card",
  //   front: "https://i.imgur.com/1j6Q3QF.png",
  //   back: "https://i.imgur.com/1j6Q3QF.png",
  // });

  // log(card);

  // Forge.spawnObject(card, { position: { x: 0, y: 5, z: 0 } });

  // for (const obj of getObjects()) {
  //   log(obj.getName());
  // }
};
