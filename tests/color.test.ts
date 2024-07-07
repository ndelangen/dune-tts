/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";

import { matchColorsToFactions } from "../src/utils/color";

describe("matchColorsToFactions", () => {
  test("empty", () => {
    const result = matchColorsToFactions([]);
    expect(result).toEqual({});
  });

  test("single", () => {
    const result = matchColorsToFactions([["a", ["Blue"]]]);
    expect(result).toEqual({ a: "Blue" });
  });

  test("no conflicts", () => {
    const result = matchColorsToFactions([
      ["a", ["Blue"]],
      ["b", ["Red"]],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Red",
    });
  });

  test("1 conflicts", () => {
    const result = matchColorsToFactions([
      ["a", ["Blue"]],
      ["b", ["Blue", "Purple"]],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Purple",
    });
  });

  test("2 conflicts", () => {
    const result = matchColorsToFactions([
      ["a", ["Blue"]],
      ["b", ["Blue", "Purple"]],
      ["c", ["Blue", "Red"]],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Purple",
      c: "Red",
    });
  });

  test("3 conflicts", () => {
    const result = matchColorsToFactions([
      ["a", ["Blue"]],
      ["b", ["Blue", "Purple", "Orange"]],
      ["c", ["Blue", "Purple", "Red"]],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Purple",
      c: "Red",
    });
  });

  test("4 conflicts", () => {
    const result = matchColorsToFactions([
      ["a", ["Blue"]],
      ["b", ["Blue", "Purple", "Orange"]],
      ["c", ["Blue", "Purple", "Orange"]],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Purple",
      c: "Orange",
    });
  });

  test("name conflicts", () => {
    const result = matchColorsToFactions([
      // out of order is deliberate
      ["b", ["Blue"]],
      ["a", ["Blue"]],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Red",
    });
  });
  test("no colors defined", () => {
    const result = matchColorsToFactions([
      ["a", []],
      ["b", []],
    ]);
    expect(result).toEqual({
      a: "Blue",
      b: "Red",
    });
  });
});
