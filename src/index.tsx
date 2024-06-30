// import { render, ttsUi, ttsUiFragment } from "@typed-tabletop-simulator/ui";
import { Forge } from "@typed-tabletop-simulator/lib";
import { defineCard } from "card";

// import { App } from "App";

onLoad = () => {
  // const ui = render(Global, <App />);

  // const deck = Forge.createDeck({
  //   guid: "123123",
  //   name: "Test Deck",
  //   front:
  //     "http://cloud-3.steamusercontent.com/ugc/2495638295534741822/069CB00E06AF42090B520D9170572DB3EEE84160/",
  //   back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
  //   width: 1,
  //   height: 1,
  //   cards: [
  //     { index: 1, name: "Test Card" },
  //     {
  //       index: 2,
  //       name: "Test Card 2",
  //       front:
  //         "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
  //       back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
  //     },
  //   ],
  //   type: 0,
  // });

  // deck.Name = "Deck";

  // const d = async () => {
  //   const out = await Forge.spawnObject(deck, {
  //     position: { x: 0, y: 5, z: 0 },
  //     rotation: { x: 0, y: 180, z: 0 },
  //     scale: { x: 1, y: 1, z: 1 },
  //   });

  //   log(out.getJSON());

  //   out.locked = true;

  //   return true;
  // };

  // const d = async () => {
  //   const item = Forge.createCard({
  //     guid: "123123",
  //     name: "Test Card",

  //     front:
  //       "http://cloud-3.steamusercontent.com/ugc/2495638295534741822/069CB00E06AF42090B520D9170572DB3EEE84160/",
  //     back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
  //   });

  //   log(item);

  //   const card = await Forge.spawnObject(item, {
  //     position: { x: 0, y: 5, z: 0 },
  //     rotation: { x: 0, y: 180, z: 0 },
  //     scale: { x: 1, y: 1, z: 1 },
  //   });
  // };
  const s = async () => {
    const raw = Forge.createTile({
      name: "",
      stretch: true,
      stackable: true,
      thickness: 0.1,
      front:
        "http://cloud-3.steamusercontent.com/ugc/2495638295534741822/069CB00E06AF42090B520D9170572DB3EEE84160/",
    });

    // log(raw);
    const x = await Forge.spawnObject(raw, {
      rotation: { x: 0, y: 180, z: 0 },
    });

    // log(x.getJSON());
    // log("cool");
    return true;
  };

  const d = async () => {
    await Forge.spawnObject(
      defineCard({
        front:
          "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
        back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
      }),
      {
        position: { x: 0, y: 5, z: 0 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    );
    await Forge.spawnObject(
      defineCard({
        front:
          "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
        back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
      }),
      {
        position: { x: 3, y: 5, z: 0 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    );
    await Forge.spawnObject(
      defineCard({
        front:
          "http://cloud-3.steamusercontent.com/ugc/2551934014981172056/B7D2C194B49085F191009A9E2AC10D404D674691/",
        back: "http://cloud-3.steamusercontent.com/ugc/2495638295534742758/A997C7F6F7D52EAFD55ABACDD9C9AEE2F3AD668B/",
      }),
      {
        position: { x: 6, y: 5, z: 0 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
    );
    return true;
  };

  // s();
  d();
};
