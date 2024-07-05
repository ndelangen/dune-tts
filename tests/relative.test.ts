/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";
import { relative } from "../src/utils/relative";

// @ts-expect-error
globalThis.Vector = (x, y, z) => ({ x, y, z });

const v = ({ x, y, z }) => ({ x, y, z } as Vector);

describe("relative", () => {
  test("not positioned - not rotated", () => {
    const base = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ] as [Vector, Vector];
    const offset = [
      { x: 1, y: 2, z: 3 },
      { x: 0, y: 0, z: 0 },
    ] as [Vector, Vector];
    const result = relative(base, offset);

    expect(result).toEqual([
      //
      v({ x: 1, y: 2, z: 3 }),
      v({ x: 0, y: 0, z: 0 }),
    ]);
  });

  test("positioned - not rotated", () => {
    const base = [
      { x: 10, y: 0, z: 10 },
      { x: 0, y: 0, z: 0 },
    ] as [Vector, Vector];
    const offset = [
      { x: 10, y: 0, z: 10 },
      { x: 0, y: 0, z: 0 },
    ] as [Vector, Vector];
    const result = relative(base, offset);

    expect(result).toEqual([
      //
      v({ x: 20, y: 0, z: 20 }),
      v({ x: 0, y: 0, z: 0 }),
    ]);
  });

  test("positioned - rotated", () => {
    const base = [
      { x: 10, y: 0, z: 10 },
      { x: 0, y: 180, z: 0 },
    ] as [Vector, Vector];
    const offset = [
      { x: 10, y: 0, z: 10 },
      { x: 0, y: 0, z: 0 },
    ] as [Vector, Vector];
    const result = relative(base, offset);

    expect(result).toEqual([
      //
      v({ x: 0, y: 0, z: 0 }),
      v({ x: 0, y: 180, z: 0 }),
    ]);
  });
});
