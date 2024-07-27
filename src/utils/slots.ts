export interface Connection {
  left: string;
  right: string;
  index: number;
  angle?: number;
  position?: any;
}

const ATREIDES = "atreides";
const IXIAN = "ixian";
const EMPEROR = "emperor";
const FREMEN = "fremen";
const IDUALI = "iduali";
const BT = "bene-tleilaxu";
const GUILD = "spacing-guild";
const HARKONNEN = "harkonnen";
const BG = "bene-gesserit";

export const assignFactions = (data: Connection[]) => {
  const hasAtreides = data.find((connection) => connection.left === ATREIDES || connection.right === ATREIDES);
  const hasIx = data.find((connection) => connection.left === IXIAN || connection.right === IXIAN);
  const hasEmperor = data.find((connection) => connection.left === EMPEROR || connection.right === EMPEROR);
  const hasFremen = data.find((connection) => connection.left === FREMEN || connection.right === FREMEN);
  const hasIduali = data.find((connection) => connection.left === IDUALI || connection.right === IDUALI);
  const hasTleilaxu = data.find((connection) => connection.left === BT || connection.right === BT);
  const hasSpacingGuild = data.find((connection) => connection.left === GUILD || connection.right === GUILD);
  const preferred = [
    hasAtreides ? ATREIDES : hasIx ? IXIAN : HARKONNEN,
    BT,
    hasFremen ? FREMEN : hasIduali ? IDUALI : IXIAN,
    hasEmperor ? EMPEROR : hasSpacingGuild ? GUILD : BG,
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

  // primary preference, in order
  if (hasAtreides) {
    const name = ATREIDES;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestTreachery = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasIx && !bestTreachery) {
    const name = IXIAN;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestTreachery = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasTleilaxu) {
    const name = BT;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestTleilaxuTanks = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasFremen) {
    const name = FREMEN;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestEvents = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }
  if (hasIduali && !bestEvents) {
    const name = IDUALI;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestEvents = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  if (hasEmperor) {
    const name = EMPEROR;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestBank = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }
  if (hasSpacingGuild && !bestBank) {
    const name = GUILD;
    const item = best.list.find((item) => item.left === name || item.right === name);
    if (item) {
      bestBank = item;
      best.list = best.list.filter((i) => i !== item);
    }
  }

  // fallback
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
