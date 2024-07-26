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
  const hasTleilaxu = data.find(
    (connection) => connection.left === "bene-tleilax" || connection.right === "bene-tleilax"
  );
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

  let bestTreachery: Connection | null = null;
  let bestTleilaxuTanks: Connection | null = null;
  let bestEvents: Connection | null = null;
  let bestBank: Connection | null = null;

  if (hasAtreides) {
    const name = "atreides";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestTreachery = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasIx && !bestTreachery) {
    const name = "atreides";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestTreachery = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasTleilaxu) {
    const name = "bene-tleilaxu";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestTleilaxuTanks = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasFremen) {
    const name = "fremen";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestEvents = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }
  if (hasIduali && !bestEvents) {
    const name = "iduali";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestEvents = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasEmperor) {
    const name = "emperor";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestBank = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }
  if (hasSpacingGuild && !bestBank) {
    const name = "spacing-guild";
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestBank = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (!bestTreachery) {
    const item = best.list[0];
    bestTreachery = item;
    best.list = best.list.filter((i) => i !== item);
  }

  if (!bestTleilaxuTanks) {
    const item = best.list[0];
    bestTleilaxuTanks = item;
    best.list = best.list.filter((i) => i !== item);
  }

  if (!bestEvents) {
    const item = best.list[0];
    bestEvents = item;
    best.list = best.list.filter((i) => i !== item);
  }

  if (!bestBank) {
    const item = best.list[0];
    bestBank = item;
    best.list = best.list.filter((i) => i !== item);
  }

  const out = {
    treachery: bestTreachery,
    tleilaxuTanks: bestTleilaxuTanks,
    events: bestEvents,
    bank: bestBank,
  };

  return out;
};
