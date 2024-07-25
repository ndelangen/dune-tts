export interface Connection {
  left: string;
  right: string;
  index: number;
  angle?: number;
  position?: any;
}

export const assignFactions = (data: Connection[]) => {
  const hasAtreides = data.find((connection) => connection.left === "atreides" || connection.right === "atreides");
  const hasIx = data.find((connection) => connection.left === "ixian" || connection.right === "ixian");
  const hasEmperor = data.find((connection) => connection.left === "emperor" || connection.right === "emperor");
  const hasFremen = data.find((connection) => connection.left === "fremen" || connection.right === "fremen");
  const hasIduali = data.find((connection) => connection.left === "iduali" || connection.right === "iduali");
  const hasSpacingGuild = data.find(
    (connection) => connection.left === "spacing-guild" || connection.right === "spacing-guild"
  );
  const preferred = [
    //
    hasAtreides ? "atreides" : hasIx ? "ixian" : "harkonnen",
    "bene-tleilaxu",
    hasFremen ? "fremen" : hasIduali ? "iduali" : "ixian",
    hasEmperor ? "emperor" : hasSpacingGuild ? "spacing-guild" : "bene-gesserit",
  ];

  const scoring = preferred.reverse();
  const long = [...data, ...data];

  let best: { score: number; list: Array<Connection> | null } = { score: 0, list: null };
  for (let i = 0; i < data.length; i++) {
    const current = long.slice(i, i + 4);
    const matches = [
      ...new Set(current.flatMap((n) => [n.left, n.right]).filter((item) => item && preferred.includes(item))),
    ];
    const score = matches.reduce((acc, item) => acc + (scoring.indexOf(item || "") + 1) * 4, 0);
    if (score > best.score) {
      best = { score: score, list: current };
    }
  }

  if (!best.list) {
    return null;
  }

  // if (console) {
  //   console.log(best.list);
  // }

  // let bestTreacheryIndex = best.list.findIndex((item) => item.left === preferred[0] || item.right === preferred[0]);
  // let bestTreachery = best.list[bestTreacheryIndex];
  // delete best.list[bestTreacheryIndex];

  // let bestTanksIndex = best.list.findIndex((item) => item?.left === preferred[1] || item?.right === preferred[1]);
  // let bestTleilaxuTanks = best.list[bestTanksIndex];
  // delete best.list[bestTanksIndex];

  // let bestEventsIndex = best.list.findIndex((item) => item?.left === preferred[2] || item?.right === preferred[2]);
  // let bestEvents = best.list[bestEventsIndex];
  // delete best.list[bestEventsIndex];

  // let bestBankIndex = best.list.findIndex((item) => item?.left === preferred[3] || item?.right === preferred[3]);
  // let bestBank = best.list[bestBankIndex];
  // delete best.list[bestBankIndex];

  // if (isFalsy(bestTreachery)) {
  //   const index = best.list.findIndex((item) => !!item);
  //   bestTreachery = best.list[index];
  //   delete best.list[index];
  // }
  // if (isFalsy(bestTleilaxuTanks)) {
  //   const index = best.list.findIndex((item) => !!item);
  //   bestTleilaxuTanks = best.list[index];
  //   delete best.list[index];
  // }
  // if (isFalsy(bestEvents)) {
  //   const index = best.list.findIndex((item) => !!item);
  //   bestEvents = best.list[index];
  //   delete best.list[index];
  // }
  // if (isFalsy(bestBank)) {
  //   const index = best.list.findIndex((item) => !!item);
  //   bestBank = best.list[index];
  //   delete best.list[index];
  // }

  const out = {
    treachery: best.list[0],
    tleilaxuTanks: best.list[1],
    events: best.list[2],
    bank: best.list[3],
  };

  // log({ out });

  return out;
};

const isFalsy = (value: any) => value === null || value === undefined || value === false || value === "";
