export interface Phase {
  name: string;
  enterForwards: (state: State, api: Api) => Promise<void>;
  exitForwards: (state: State, api: Api) => Promise<boolean>;
  enterBackwards: (state: State, api: Api) => Promise<void>;
  exitBackwards: (state: State, api: Api) => Promise<boolean>;
}

export interface Api {
  forward: () => Promise<void>;
  backward: () => Promise<void>;
  setPhases: (phases: Phase[], index?: number) => Promise<void>;
  getState: () => State;
}

export interface State {
  phase: number;
  turn: number;
  phases: Phase[];
}
