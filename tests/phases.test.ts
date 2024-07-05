/// <reference types="bun" />
/// <reference types="@typed-tabletop-simulator/declaration" />

import { expect, test, describe, mock as fn } from "bun:test";

import { initApi } from "../src/utils/phases";
import { Phase } from "../src/utils/phases-types";

const first: Phase = {
  name: "first",
  enterForwards: fn(async () => {}),
  exitForwards: fn(async () => true),
  enterBackwards: fn(async () => {}),
  exitBackwards: fn(async () => false),
};
const last: Phase = {
  name: "last",
  enterForwards: fn(async () => {}),
  exitForwards: fn(async () => false),
  enterBackwards: fn(async () => {}),
  exitBackwards: fn(async () => true),
};

const initialState = Object.freeze({
  phase: 0,
  turn: 0,
  phases: [],
});

describe("setPhases", () => {
  test("no index", async () => {
    const api = initApi({ ...initialState }, { first, last });
    await api.setPhases([first.name, last.name]);
    expect(api.getState().phases).toHaveLength(2);

    // calls the first phase's enterForwards
    expect(first.enterForwards).toHaveBeenCalledTimes(1);
  });

  test("with index", async () => {
    const api = initApi({ ...initialState, phase: 0 }, { first, last });
    await api.setPhases([first.name, last.name], 1);
    expect(api.getState().phase).toEqual(1);

    // calls the first phase's enterForwards
    expect(first.enterForwards).toHaveBeenCalledTimes(1);
  });
});

describe("progression", () => {
  test("forward", async () => {
    const api = initApi({ ...initialState }, { first, last });
    await api.setPhases([first.name, last.name]);

    expect(api.getState().phase).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(1);
  });

  test("blocked forward", async () => {
    const api = initApi({ ...initialState }, { first, last });
    await api.setPhases([first.name, last.name]);

    expect(api.getState().phase).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(1);

    await api.forward();
    expect(api.getState().phase).toBe(1);
  });

  test("blocked backward", async () => {
    const api = initApi({ ...initialState }, { first, last });
    await api.setPhases([first.name, last.name]);

    expect(api.getState().phase).toBe(0);

    await api.backward();
    expect(api.getState().phase).toBe(0);
  });
});

describe("order of operations", () => {
  test("forwards", async () => {
    const log: string[] = [];
    const api = initApi(
      { ...initialState },
      {
        first,
        last,
        a: {
          name: "a",
          enterForwards: fn(async () => {
            log.push("a enter forwards");
          }),
          exitForwards: fn(async () => {
            log.push("a exit forwards");
            return true;
          }),
          enterBackwards: fn(async () => {
            log.push("a enter backwards");
          }),
          exitBackwards: fn(async () => {
            log.push("a exit backwards");
            return true;
          }),
        },
        b: {
          name: "b",
          enterForwards: fn(async () => {
            log.push("b enter forwards");
          }),
          exitForwards: fn(async () => {
            log.push("b exit forwards");
            return true;
          }),
          enterBackwards: fn(async () => {
            log.push("b enter backwards");
          }),
          exitBackwards: fn(async () => {
            log.push("b exit backwards");
            return true;
          }),
        },
      }
    );
    await api.setPhases(["a", "b"]);

    expect(api.getState().phase).toBe(0);

    // clear log
    log.length = 0;

    await api.forward();

    expect(log).toEqual(["a exit forwards", "b enter forwards"]);
  });

  test("backwards", async () => {
    const log: string[] = [];
    const api = initApi(
      { ...initialState },
      {
        a: {
          name: "a",
          enterForwards: fn(async () => {
            log.push("a enter forwards");
          }),
          exitForwards: fn(async () => {
            log.push("a exit forwards");
            return true;
          }),
          enterBackwards: fn(async () => {
            log.push("a enter backwards");
          }),
          exitBackwards: fn(async () => {
            log.push("a exit backwards");
            return true;
          }),
        },
        b: {
          name: "b",
          enterForwards: fn(async () => {
            log.push("b enter forwards");
          }),
          exitForwards: fn(async () => {
            log.push("b exit forwards");
            return true;
          }),
          enterBackwards: fn(async () => {
            log.push("b enter backwards");
          }),
          exitBackwards: fn(async () => {
            log.push("b exit backwards");
            return true;
          }),
        },
      }
    );
    await api.setPhases(["a", "b"]);

    expect(api.getState().phase).toBe(0);
    await api.forward();

    // clear log
    log.length = 0;

    await api.backward();

    expect(log).toEqual([
      //
      "b exit backwards",
      "a enter backwards",
    ]);
  });
});

describe("cycle turns", () => {
  test("forward", async () => {
    const api = initApi(
      { ...initialState },
      {
        a: {
          name: "a",
          enterForwards: fn(async () => {}),
          exitForwards: fn(async () => true),
          enterBackwards: fn(async () => {}),
          exitBackwards: fn(async () => true),
        },
        c: {
          name: "c",
          enterForwards: fn(async () => {}),
          exitForwards: fn(async () => true),
          enterBackwards: fn(async () => {}),
          exitBackwards: fn(async () => true),
        },
      }
    );
    await api.setPhases(["a", "c"]);

    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(1);
    expect(api.getState().turn).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(1);
  });

  test("backward", async () => {
    const api = initApi(
      { ...initialState, turn: 1 },
      {
        a: {
          name: "a",
          enterForwards: fn(async () => {}),
          exitForwards: fn(async () => true),
          enterBackwards: fn(async () => {}),
          exitBackwards: fn(async () => true),
        },
        c: {
          name: "c",
          enterForwards: fn(async () => {}),
          exitForwards: fn(async () => true),
          enterBackwards: fn(async () => {}),
          exitBackwards: fn(async () => true),
        },
      }
    );
    await api.setPhases(["a", "c"]);

    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(1);

    await api.backward();
    expect(api.getState().phase).toBe(1);
    expect(api.getState().turn).toBe(0);

    await api.backward();
    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(0);

    await api.backward();
    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(0);
  });
});

describe("rate limiting", () => {
  test("forward", async () => {
    const api = initApi({ ...initialState }, { first, last });
    await api.setPhases([first.name, last.name]);

    expect(api.getState().phase).toBe(0);

    // this inherent race-condition is the test
    // we want the first to be in progress,
    const f1 = api.forward();

    // the second should hit the `busy` check
    await api.forward();

    // now we await it to be sure the state was updated
    await f1;
    expect(api.getState().phase).toBe(1);
  });

  test("backward", async () => {
    const api = initApi({ ...initialState }, { first, last });
    await api.setPhases([first.name, last.name], 1);

    expect(api.getState().phase).toBe(1);

    // this inherent race-condition is the test
    // we want the first to be in progress,
    const f1 = api.backward();

    // the second should hit the `busy` check
    await api.backward();

    // now we await it to be sure the state was updated
    await f1;
    expect(api.getState().phase).toBe(0);
  });
});
