/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";
import { round } from "../src/utils/math";

describe("round", () => {
  test("rounds up", () => {
    expect(round(1.5, 0)).toBe(2);
  });

  test("rounds down", () => {
    expect(round(1.4, 0)).toBe(1);
  });

  test("rounds to precision", () => {
    expect(round(Math.PI, 2)).toBe(3.14);
  });
});
