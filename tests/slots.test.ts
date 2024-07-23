/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";
import { assignFactions, Connection } from "../src/utils/slots";

describe("assignFactions", () => {
  test("no atreides", () => {
    const data: Connection[] = [
      { left: "spacing-guild", right: "bene-gesserit", size: 40, slots: 1 },
      { left: "bene-gesserit", right: "harkonnen", size: 40, slots: 1 },
      { left: "harkonnen", right: "bene-tleilaxu", size: 60, slots: 2 },
      { left: "bene-tleilaxu", right: "emperor", size: 40, slots: 1 },
      { left: "emperor", right: "fremen", size: 40, slots: 1 },
      { left: "fremen", right: "iduali", size: 40, slots: 1 },
      { left: "iduali", right: "ixian", size: 60, slots: 2 },
      { left: "ixian", right: "spacing-guild", size: 40, slots: 1 },
    ];
    const out = assignFactions(data);
    expect(out).toEqual({
      treachery: {
        dataIndex: 3,
        slotIndex: 0,
        left: "bene-tleilaxu",
        right: "emperor",
      },
      tleilaxuTanks: {
        dataIndex: 4,
        slotIndex: 0,
        left: "emperor",
        right: "fremen",
      },
      events: {
        dataIndex: 3,
        slotIndex: 0,
        left: "bene-tleilaxu",
        right: "emperor",
      },
      bank: {
        dataIndex: 6,
        slotIndex: 0,
        left: "iduali",
        right: "ixian",
      },
    });
  });
});
