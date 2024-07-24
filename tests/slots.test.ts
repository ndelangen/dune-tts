/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";
import { assignFactions, Connection } from "../src/utils/slots";

describe("assignFactions", () => {
  test("no atreides", () => {
    const data: Connection[] = [
      { angle: -80, left: "harkonnen", right: "fremen" },
      { angle: -100, left: "harkonnen", right: "fremen" },
      { angle: -20, left: "fremen", right: "atreides" },
      { angle: -40, left: "fremen", right: "atreides" },
      { angle: -260, left: "bene-tleilaxu", right: "bene-gesserit" },
      { angle: -280, left: "bene-tleilaxu", right: "bene-gesserit" },
      { angle: -200, left: "bene-gesserit", right: "emperor" },
      { angle: -220, left: "bene-gesserit", right: "emperor" },
      { angle: -140, left: "emperor", right: "harkonnen" },
      { angle: -160, left: "emperor", right: "harkonnen" },
    ];
    const out = assignFactions(data);
    expect(out).toEqual({});
  });
  // test("8 players", () => {
  //   const data: Connection[] = [
  //     { left: "iduali", right: "spacing-guild", size: 40, slots: 1, start: -80 },
  //     { left: "spacing-guild", right: "atreides", size: 40, slots: 1, start: -40 },
  //     { left: "atreides", right: "harkonnen", size: 60, slots: 2, start: 0 },
  //     { left: "harkonnen", right: "bene-gesserit", size: 40, slots: -17, start: 60 },
  //     { left: "bene-gesserit", right: "bene-tleilaxu", size: 40, slots: 1, start: -260 },
  //     { left: "bene-tleilaxu", right: "emperor", size: 40, slots: 1, start: -220 },
  //     { left: "emperor", right: "fremen", size: 60, slots: 2, start: -180 },
  //     { left: "fremen", right: "iduali", size: 40, slots: 1, start: -120 },
  //   ];
  //   const out = assignFactions(data);
  //   expect(out).toEqual({
  //     // bank: {
  //     //   dataIndex: 0,
  //     //   left: "bene-tleilaxu",
  //     //   right: "bene-gesserit",
  //     //   slotIndex: 0,
  //     // },
  //     // events: {
  //     //   dataIndex: 7,
  //     //   left: "emperor",
  //     //   right: "bene-tleilaxu",
  //     //   slotIndex: 0,
  //     // },
  //     // tleilaxuTanks: {
  //     //   dataIndex: 1,
  //     //   left: "bene-gesserit",
  //     //   right: "fremen",
  //     //   slotIndex: 0,
  //     // },
  //     // treachery: {
  //     //   dataIndex: 6,
  //     //   left: "atreides",
  //     //   right: "emperor",
  //     //   slotIndex: 1,
  //     // },
  //   });
  // });
});

const x = [
  { angle: -200, index: 1, left: "bene-tleilaxu", position: { x: 3.4202, y: 3.19, z: -9.3969 }, right: "atreides" },
  { angle: -220, index: 2, left: "bene-tleilaxu", position: { x: 6.4279, y: 3.19, z: -7.6604 }, right: "atreides" },
  { angle: -240, index: 3, left: "fremen", position: { x: 8.6603, y: 3.19, z: -5 }, right: "bene-tleilaxu" },
  { angle: 20, index: 8, left: "spacing-guild", position: { x: 3.4202, y: 3.19, z: 9.3969 }, right: "bene-gesserit" },
  { angle: -40, index: 11, left: "harkonnen", position: { x: -6.4279, y: 3.19, z: 7.6604 }, right: "spacing-guild" },
  { angle: -60, index: 12, left: "harkonnen", position: { x: -8.6603, y: 3.19, z: 5 }, right: "spacing-guild" },
  { angle: -80, index: 13, left: "emperor", position: { x: -9.8481, y: 3.19, z: 1.7365 }, right: "harkonnen" },
  { angle: -140, index: 16, left: "atreides", position: { x: -6.4279, y: 3.19, z: -7.6604 }, right: "emperor" },
  { angle: -160, index: 17, left: "atreides", position: { x: -3.4202, y: 3.19, z: -9.3969 }, right: "emperor" },
];
