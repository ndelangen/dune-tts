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

interface Troop {
  front: string;
  back: string;
  count: number;
}

type Collection = "bribe" | "income";

interface DeckPlacement {
  name: string;
  cards: any[];
  placeholder: string;
}

interface Faction {
  logo: string;
  sheet: string;
  shield: string;
  spiceCount: number;
  leaders: string[];
  alliance: string;
  traitors: string[];
  collections: Collection[];
  decks: {
    left: DeckPlacement[];
    right: DeckPlacement[];
  };
  extras: any[];
  troops: Troop[];
}

interface Data {
  treachery: Record<string, string>;
  backs: Record<string, string>;
  factions: Record<string, Faction>;
}

export interface State {
  phase: number;
  turn: number;
  phases: string[];
  data: Data | undefined;
}
