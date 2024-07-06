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
  setPhases: (phases: string[], index?: number) => Promise<void>;
  getState: () => State;
  setState: (state: Partial<State>) => void;
  subscribe: (fn: (s: State) => void) => void;
}

interface Data {
  treachery: Record<string, string>;
  backs: Record<string, string>;
}

export interface State {
  phase: number;
  turn: number;
  phases: string[];
  data: Data | undefined;
}
