export interface Phase {
  name: string;
  enterForwards: (state: State, api: Api) => Promise<void>;
  exitForwards: (state: State, api: Api) => Promise<void>;
  enterBackwards: (state: State, api: Api) => Promise<void>;
  exitBackwards: (state: State, api: Api) => Promise<void>;
}

export interface Api {
  forward: () => Promise<void>;
  backward: () => Promise<void>;
  setPhases: (phases: Phase[]) => Promise<void>;
}

export interface State {
  phase: number;
  turn: number;
  phases: Phase[];
}
