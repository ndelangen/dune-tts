/// <reference types="bun" />
import { expect, test, describe, mock as fn } from "bun:test";

import { initApi } from "../src/phases/_index";
import { Phase } from "../src/phases/_types";

describe("Phases", () => {
  const first: Phase = {
    name: "first test phase",
    enterForwards: fn(async () => {}),
    exitForwards: fn(async () => true),
    enterBackwards: fn(async () => {}),
    exitBackwards: fn(async () => false),
  };
  const last: Phase = {
    name: "last test phase",
    enterForwards: fn(async () => {}),
    exitForwards: fn(async () => false),
    enterBackwards: fn(async () => {}),
    exitBackwards: fn(async () => true),
  };

  const initialState = {
    phase: 0,
    turn: 0,
    phases: [],
  };

  test("set phases", async () => {
    const api = initApi({ ...initialState });
    await api.setPhases([first, last]);
    expect(api.getState().phases).toHaveLength(2);

    // calls the first phase's enterForwards
    expect(first.enterForwards).toHaveBeenCalledTimes(1);
  });

  test("set phases, with index", async () => {
    const api = initApi({ ...initialState, phase: 0 });
    await api.setPhases([first, last], 1);
    expect(api.getState().phase).toEqual(1);

    // calls the first phase's enterForwards
    expect(first.enterForwards).toHaveBeenCalledTimes(1);
  });

  test("forward phases", async () => {
    const api = initApi({ ...initialState });
    await api.setPhases([first, last]);

    expect(api.getState().phase).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(1);
  });

  test("phase block forward", async () => {
    const api = initApi({ ...initialState });
    await api.setPhases([first, last]);

    expect(api.getState().phase).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(1);

    await api.forward();
    expect(api.getState().phase).toBe(1);
  });

  test("phase block backward", async () => {
    const api = initApi({ ...initialState });
    await api.setPhases([first, last]);

    expect(api.getState().phase).toBe(0);

    await api.backward();
    expect(api.getState().phase).toBe(0);
  });

  test("order of operations forwards", async () => {
    const log: string[] = [];
    const api = initApi({ ...initialState });
    await api.setPhases([
      {
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
      {
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
    ]);

    expect(api.getState().phase).toBe(0);

    // clear log
    log.length = 0;

    await api.forward();

    expect(log).toEqual(["a exit forwards", "b enter forwards"]);
  });

  test("order of operations backwards", async () => {
    const log: string[] = [];
    const api = initApi({ ...initialState });
    await api.setPhases([
      {
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
      {
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
    ]);

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

  test("turns forward", async () => {
    const api = initApi({ ...initialState });
    await api.setPhases([
      {
        name: "a",
        enterForwards: fn(async () => {}),
        exitForwards: fn(async () => true),
        enterBackwards: fn(async () => {}),
        exitBackwards: fn(async () => true),
      },
      {
        name: "c",
        enterForwards: fn(async () => {}),
        exitForwards: fn(async () => true),
        enterBackwards: fn(async () => {}),
        exitBackwards: fn(async () => true),
      },
    ]);

    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(1);
    expect(api.getState().turn).toBe(0);

    await api.forward();
    expect(api.getState().phase).toBe(0);
    expect(api.getState().turn).toBe(1);
  });

  test("turns forward", async () => {
    const api = initApi({ ...initialState, turn: 1 });
    await api.setPhases([
      {
        name: "a",
        enterForwards: fn(async () => {}),
        exitForwards: fn(async () => true),
        enterBackwards: fn(async () => {}),
        exitBackwards: fn(async () => true),
      },
      {
        name: "c",
        enterForwards: fn(async () => {}),
        exitForwards: fn(async () => true),
        enterBackwards: fn(async () => {}),
        exitBackwards: fn(async () => true),
      },
    ]);

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

  test("rate limiting", async () => {
    const api = initApi({ ...initialState });
    await api.setPhases([first, last]);

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
});
