/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";
import { assignFactions, Connection } from "../src/utils/slots";

describe("assignFactions", () => {
  test("no atreides", () => {
    const data: Connection[] = [
      { angle: 20, index: 0, left: "harkonnen", position: { x: 3.4202, y: 3.19, z: 9.3969 }, right: "atreides" },
      { angle: 40, index: 1, left: "harkonnen", position: { x: 6.4279, y: 3.19, z: 7.6604 }, right: "atreides" },
      { angle: 140, index: 2, left: "spacing-guild", position: { x: 6.4279, y: 3.19, z: -7.6604 }, right: "fremen" },
      { angle: 160, index: 3, left: "spacing-guild", position: { x: 3.4202, y: 3.19, z: -9.3969 }, right: "fremen" },
      { angle: 200, index: 4, left: "fremen", position: { x: -3.4202, y: 3.19, z: -9.3969 }, right: "bene-gesserit" },
      { angle: 220, index: 5, left: "fremen", position: { x: -6.4279, y: 3.19, z: -7.6604 }, right: "bene-gesserit" },
      { angle: 260, index: 6, left: "bene-gesserit", position: { x: -9.8481, y: 3.19, z: -1.7365 }, right: "emperor" },
      { angle: 280, index: 7, left: "bene-gesserit", position: { x: -9.8481, y: 3.19, z: 1.7365 }, right: "emperor" },
      { angle: 320, index: 8, left: "emperor", position: { x: -6.4279, y: 3.19, z: 7.6604 }, right: "harkonnen" },
      { angle: 340, index: 9, left: "emperor", position: { x: -3.4202, y: 3.19, z: 9.3969 }, right: "harkonnen" },
    ];
    const out = assignFactions(data);
    expect(out).toEqual({
      bank: {
        angle: 140,
        index: 2,
        left: "spacing-guild",
        position: { x: 6.4279, y: 3.19, z: -7.6604 },
        right: "fremen",
      },
      events: {
        angle: 40,
        index: 1,
        left: "harkonnen",
        position: { x: 6.4279, y: 3.19, z: 7.6604 },
        right: "atreides",
      },
      tleilaxuTanks: {
        angle: 20,
        index: 0,
        left: "harkonnen",
        position: { x: 3.4202, y: 3.19, z: 9.3969 },
        right: "atreides",
      },
      treachery: {
        angle: 340,
        index: 9,
        left: "emperor",
        position: { x: -3.4202, y: 3.19, z: 9.3969 },
        right: "harkonnen",
      },
    });
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

const y = [
  { angle: 160, index: 0, left: "fremen", position: { x: 3.4202, y: 3.19, z: -9.3969 }, right: "atreides" },
  { angle: 120, index: 1, left: "iduali", position: { x: 8.6603, y: 3.19, z: -5 }, right: "fremen" },
  { angle: 40, index: 2, left: "emperor", position: { x: 6.4279, y: 3.19, z: 7.6604 }, right: "harkonnen" },
  { angle: 20, index: 3, left: "emperor", position: { x: 3.4202, y: 3.19, z: 9.3969 }, right: "harkonnen" },
  { angle: 340, index: 4, left: "bene-tleilaxu", position: { x: -3.4202, y: 3.19, z: 9.3969 }, right: "emperor" },
  { angle: 300, index: 5, left: "bene-gesserit", position: { x: -8.6603, y: 3.19, z: 5 }, right: "bene-tleilaxu" },
  {
    angle: 260,
    index: 6,
    left: "spacing-guild",
    position: { x: -9.8481, y: 3.19, z: -1.7365 },
    right: "bene-gesserit",
  },
  { angle: 220, index: 7, left: "atreides", position: { x: -6.4279, y: 3.19, z: -7.6604 }, right: "spacing-guild" },
  { angle: 200, index: 8, left: "atreides", position: { x: -3.4202, y: 3.19, z: -9.3969 }, right: "spacing-guild" },
];

const z = [
  { angle: 160, index: 0, left: "atreides", position: { x: 3.4202, y: 3.19, z: -9.3969 }, right: "fremen" },
  { angle: 140, index: 1, left: "atreides", position: { x: 6.4279, y: 3.19, z: -7.6604 }, right: "fremen" },
  { angle: 40, index: 2, left: "bene-tleilaxu", position: { x: 6.4279, y: 3.19, z: 7.6604 }, right: "bene-gesserit" },
  { angle: 20, index: 3, left: "bene-tleilaxu", position: { x: 3.4202, y: 3.19, z: 9.3969 }, right: "bene-gesserit" },
  { angle: 340, index: 4, left: "emperor", position: { x: -3.4202, y: 3.19, z: 9.3969 }, right: "bene-tleilaxu" },
  { angle: 320, index: 5, left: "emperor", position: { x: -6.4279, y: 3.19, z: 7.6604 }, right: "bene-tleilaxu" },
  { angle: 280, index: 6, left: "harkonnen", position: { x: -9.8481, y: 3.19, z: 1.7365 }, right: "emperor" },
  { angle: 260, index: 7, left: "harkonnen", position: { x: -9.8481, y: 3.19, z: -1.7365 }, right: "emperor" },
  { angle: 220, index: 8, left: "fremen", position: { x: -6.4279, y: 3.19, z: -7.6604 }, right: "harkonnen" },
  { angle: 200, index: 9, left: "fremen", position: { x: -3.4202, y: 3.19, z: -9.3969 }, right: "harkonnen" },
];

const b = [
  { angle: 20, index: 0, left: "fremen", position: { x: 3.4202, y: 3.19, z: 9.3969 }, right: "emperor" },
  { angle: 40, index: 1, left: "fremen", position: { x: 6.4279, y: 3.19, z: 7.6604 }, right: "emperor" },
  { angle: 120, index: 2, left: "iduali", position: { x: 8.6603, y: 3.19, z: -5 }, right: "bene-gesserit" },
  { angle: 160, index: 3, left: "bene-gesserit", position: { x: 3.4202, y: 3.19, z: -9.3969 }, right: "bene-tleilaxu" },
  {
    angle: 200,
    index: 4,
    left: "bene-tleilaxu",
    position: { x: -3.4202, y: 3.19, z: -9.3969 },
    right: "spacing-guild",
  },
  {
    angle: 220,
    index: 5,
    left: "bene-tleilaxu",
    position: { x: -6.4279, y: 3.19, z: -7.6604 },
    right: "spacing-guild",
  },
  { angle: 260, index: 6, left: "spacing-guild", position: { x: -9.8481, y: 3.19, z: -1.7365 }, right: "harkonnen" },
  { angle: 300, index: 7, left: "harkonnen", position: { x: -8.6603, y: 3.19, z: 5 }, right: "atreides" },
  { angle: 340, index: 8, left: "atreides", position: { x: -3.4202, y: 3.19, z: 9.3969 }, right: "fremen" },
];

const o = {
  bank: {
    angle: 140,
    index: 2,
    left: "spacing-guild",
    position: { x: 6.4279, y: 3.19, z: -7.6604 },
    right: "fremen",
  },
  events: {
    angle: 40,
    index: 1,
    left: "harkonnen",
    position: { x: 6.4279, y: 3.19, z: 7.6604 },
    right: "atreides",
  },
  tleilaxuTanks: {
    angle: 20,
    index: 0,
    left: "harkonnen",
    position: { x: 3.4202, y: 3.19, z: 9.3969 },
    right: "atreides",
  },
  treachery: {
    angle: 340,
    index: 9,
    left: "emperor",
    position: { x: -3.4202, y: 3.19, z: 9.3969 },
    right: "harkonnen",
  },
};
