export interface Connection {
  left: string;
  right: string;
  size: number;
  slots: number;
}

interface AssignmentDetail {
  connection: Connection;
  slotIndex: number;
}

interface Assignment {
  treachery: AssignmentDetail;
  tleilaxuTanks: AssignmentDetail;
  events: AssignmentDetail;
  bank: AssignmentDetail;
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

  type PossibilityItem = {
    dataIndex: number;
    slotIndex: number;
    left?: string;
    right?: string;
  };

  const possibilities = data.flatMap((connection, dataIndex) => {
    const result = [];

    for (let i = 0; i < connection.slots; i++) {
      const item: PossibilityItem = {
        dataIndex,
        slotIndex: i,
      };
      // if (i == 0) {
      item.left = connection.left;
      // }
      // if (i == connection.slots - 1) {
      item.right = connection.right;
      // }
      result.push(item);
    }

    return result;
  });

  const scoring = preferred.reverse();
  const long = [...possibilities, ...possibilities];
  let best: { score: number; list: Array<PossibilityItem> | null } = { score: 0, list: null };
  for (let i = 0; i < possibilities.length; i++) {
    const current = long.slice(i, i + 4);
    const matches = [
      ...new Set(current.flatMap((n) => [n.left, n.right]).filter((item) => item && preferred.includes(item))),
    ];
    const score = matches.reduce((acc, item) => acc + (scoring.indexOf(item || "") * 2 + 1), 0);
    if (score > best.score) {
      best = { score: score, list: current };
    }
  }

  if (!best.list) {
    return null;
  }

  let bestTreachery = best.list.find((item) => item.left === preferred[0] || item.right === preferred[0]);
  let bestTleilaxuTanks = best.list.find((item) => item.left === preferred[1] || item.right === preferred[1]);
  let bestEvents = best.list.find((item) => item.left === preferred[2] || item.right === preferred[2]);
  let bestBank = best.list.find((item) => item.left === preferred[3] || item.right === preferred[3]);

  if (!bestTreachery) {
    bestTreachery = best.list.find((item) => item !== bestTleilaxuTanks && item !== bestEvents && item !== bestBank);
  }
  if (!bestTleilaxuTanks) {
    bestTleilaxuTanks = best.list.find((item) => item !== bestTreachery && item !== bestEvents && item !== bestBank);
  }
  if (!bestEvents) {
    bestEvents = best.list.find((item) => item !== bestTreachery && item !== bestTleilaxuTanks && item !== bestBank);
  }
  if (!bestBank) {
    bestBank = best.list.find((item) => item !== bestTreachery && item !== bestTleilaxuTanks && item !== bestEvents);
  }

  const out = {
    treachery: bestTreachery,
    tleilaxuTanks: bestTleilaxuTanks,
    events: bestEvents,
    bank: bestBank,
  };

  return out;
};
