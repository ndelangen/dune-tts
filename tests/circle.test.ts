/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";

import { getRingPositions, getArchPositions } from "../src/utils/circle";

const v = ({ x, y, z }): Vector => ({ x, y, z } as Vector);

// @ts-expect-error
globalThis.Vector = (x, y, z): Vector => ({ x, y, z } as Vector);

describe("getRingPositions", () => {
  describe("multiple positions", () => {
    test("1 positions", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 1);
      expect(positions).toEqual([v({ x: 1, y: 0, z: 0 })]);
    });

    test("2 positions", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 2);
      expect(positions).toEqual([v({ x: 1, y: 0, z: 0 }), v({ x: -1, y: 0, z: 0 })]);
    });

    test("4 positions", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 4);
      expect(positions).toEqual([
        v({ x: 1, y: 0, z: 0 }),
        v({ x: 0, y: 0, z: 1 }),
        v({ x: -1, y: 0, z: 0 }),
        v({ x: 0, y: 0, z: -1 }),
      ]);
    });

    test("5 positions", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 5);
      expect(positions).toEqual([
        v({ x: 1, y: 0, z: 0 }),
        v({ x: 0.309, y: 0, z: 0.9511 }),
        v({ x: -0.809, y: 0, z: 0.5878 }),
        v({ x: -0.809, y: 0, z: -0.5878 }),
        v({ x: 0.309, y: 0, z: -0.9511 }),
      ]);
    });
  });

  describe("centered positions", () => {
    test("offset y", () => {
      const positions = getRingPositions(v({ x: 0, y: 1, z: 0 }), 1, 3);
      expect(positions).toEqual([
        v({ x: 1, y: 1, z: 0 }),
        v({ x: -0.5, y: 1, z: 0.866 }),
        v({ x: -0.5, y: 1, z: -0.866 }),
      ]);
    });

    test("offset x & z", () => {
      const positions = getRingPositions(v({ x: 10, y: 0, z: 10 }), 1, 3);
      expect(positions).toEqual([
        v({ x: 11, y: 0, z: 10 }),
        v({ x: 9.5, y: 0, z: 10.866 }),
        v({ x: 9.5, y: 0, z: 9.134 }),
      ]);
    });

    test("negative offset", () => {
      const positions = getRingPositions(v({ x: -10, y: -10, z: -10 }), 1, 3);
      expect(positions).toEqual([
        v({ x: -9, y: -10, z: -10 }),
        v({ x: -10.5, y: -10, z: -9.134 }),
        v({ x: -10.5, y: -10, z: -10.866 }),
      ]);
    });
  });

  describe("startDegree", () => {
    test("startDegree 0", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 1, 0);
      expect(positions).toEqual([v({ x: 1, y: 0, z: 0 })]);
    });
    test("startDegree 90", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 1, 90);
      expect(positions).toEqual([v({ x: 0, y: 0, z: 1 })]);
    });
    test("startDegree 180", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 1, 180);
      expect(positions).toEqual([v({ x: -1, y: 0, z: 0 })]);
    });
    test("startDegree -90", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 1, 1, -90);
      expect(positions).toEqual([v({ x: 0, y: 0, z: -1 })]);
    });
  });

  describe("radius", () => {
    test("radius 2", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 2, 1);
      expect(positions).toEqual([v({ x: 2, y: 0, z: 0 })]);
    });

    test("radius 0.5", () => {
      const positions = getRingPositions(v({ x: 0, y: 0, z: 0 }), 0.5, 1);
      expect(positions).toEqual([v({ x: 0.5, y: 0, z: 0 })]);
    });
  });
});

describe("getArchPositions", () => {
  test("centered", () => {
    const positions = getArchPositions(v({ x: 0, y: 0, z: 0 }), 1, 90, 3, -90, true);
    expect(positions).toEqual([v({ x: -1, y: 0, z: 0 }), v({ x: 0, y: 0, z: -1 }), v({ x: 1, y: 0, z: 0 })]);
  });
  test("non-centered", () => {
    const positions = getArchPositions(v({ x: 0, y: 0, z: 0 }), 1, 5, 3, -90, false);
    expect(positions).toEqual([
      v({ x: 0, y: 0, z: -1 }),
      v({ x: 0.0872, y: 0, z: -0.9962 }),
      v({ x: 0.1736, y: 0, z: -0.9848 }),
    ]);
  });
});
