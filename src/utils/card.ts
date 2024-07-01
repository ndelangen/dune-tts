let deckIndex = 500;

const getCardId = (deckId: number, card: number) => {
  const index = `${card}`.padStart(2, "0");
  return Number(`${deckId}${index}`);
};

interface CardInput {
  front: string;
  back: string;
  name?: string;
}

export function define<T extends CardInput>(
  input: T | T[]
): CardCustomData | DeckCustomData {
  switch (true) {
    case Array.isArray(input) && input.length > 1:
      return defineDeck(input);
    case Array.isArray(input):
      return defineCard(input[0]);
    default:
      return defineCard(input);
  }
}

export function defineCard(input: CardInput) {
  deckIndex++;
  return {
    GUID: "22d9bb",
    Name: "CardCustom",
    Transform: {
      posX: 0.0,
      posY: 0.0,
      posZ: 0,
      rotX: 0.0,
      rotY: 180.0,
      rotZ: 0.0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    },
    Nickname: input.name || "",
    Description: "",
    GMNotes: "",
    AltLookAngle: {
      x: 0,
      y: 0,
      z: 0,
    },
    ColorDiffuse: {
      r: 1.0,
      g: 1.0,
      b: 1.0,
    },
    LayoutGroupSortIndex: 0,
    Value: 0,
    Locked: false,
    Grid: true,
    Snap: true,
    IgnoreFoW: false,
    MeasureMovement: false,
    DragSelectable: true,
    Autoraise: true,
    Sticky: true,
    Tooltip: !!input.name,
    GridProjection: false,
    HideWhenFaceDown: true,
    Hands: true,
    CardID: getCardId(deckIndex, 1),
    SidewaysCard: false,
    CustomDeck: {
      [deckIndex]: {
        FaceURL: input.front,
        BackURL: input.back,
        NumWidth: 1,
        NumHeight: 1,
        BackIsHidden: true,
        UniqueBack: false,
        Type: 0,
      },
    },
    LuaScript: "",
    LuaScriptState: "",
    XmlUI: "",
  } satisfies CardCustomData & { SidewaysCard: boolean };
}

export function defineDeck(input: CardInput[]) {
  const results = input.map((card, index) => {
    deckIndex++;
    return {
      deck: deckIndex,
      id: getCardId(deckIndex, 1),
      card,
    };
  });
  return {
    GUID: "d88a7c",
    Name: "Deck",
    Transform: {
      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,
      rotX: 0.0,
      rotY: 180.0,
      rotZ: 0.0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    },
    Nickname: "",
    Description: "",
    GMNotes: "",
    AltLookAngle: {
      x: 0,
      y: 0,
      z: 0,
    },
    ColorDiffuse: {
      r: 1.0,
      g: 1.0,
      b: 1.0,
    },
    LayoutGroupSortIndex: 0,
    Value: 0,
    Locked: false,
    Grid: true,
    Snap: true,
    IgnoreFoW: false,
    MeasureMovement: false,
    DragSelectable: true,
    Autoraise: true,
    Sticky: true,
    Tooltip: true,
    GridProjection: false,
    HideWhenFaceDown: true,
    Hands: false,
    SidewaysCard: false,

    // actually the cardIds that are references
    DeckIDs: results.map((result) => result.id),

    CustomDeck: results.reduce<CardCustomData["CustomDeck"]>((acc, result) => {
      acc[result.deck] = {
        FaceURL: result.card.front,
        BackURL: result.card.back,
        NumWidth: 1,
        NumHeight: 1,
        BackIsHidden: true,
        UniqueBack: false,
        Type: 0,
      };
      return acc;
    }, {}),
    LuaScript: "",
    LuaScriptState: "",
    XmlUI: "",

    ContainedObjects: results.map((result) => ({
      GUID: "24f911",
      Name: "CardCustom",
      Transform: {
        posX: 0.0,
        posY: 1.0,
        posZ: 0.0,
        rotX: 0.0,
        rotY: 180.0,
        rotZ: 0.0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      },
      Nickname: result.card.name || "",
      Description: "",
      GMNotes: "",
      AltLookAngle: {
        x: 0,
        y: 0,
        z: 0,
      },
      ColorDiffuse: {
        r: 1.0,
        g: 1.0,
        b: 1.0,
      },
      LayoutGroupSortIndex: 0,
      Value: 0,
      Locked: false,
      Grid: true,
      Snap: true,
      IgnoreFoW: false,
      MeasureMovement: false,
      DragSelectable: true,
      Autoraise: true,
      Sticky: true,
      Tooltip: !!result.card.name,
      GridProjection: false,
      HideWhenFaceDown: true,
      Hands: true,
      CardID: result.id,
      SidewaysCard: false,
      CustomDeck: {
        [result.deck]: {
          FaceURL: result.card.front,
          BackURL: result.card.back,
          NumWidth: 1,
          NumHeight: 1,
          BackIsHidden: true,
          UniqueBack: false,
          Type: 0,
        },
      },
      LuaScript: "",
      LuaScriptState: "",
      XmlUI: "",
    })),
  } satisfies DeckCustomData & {
    ContainedObjects: (CardCustomData & { SidewaysCard: boolean })[];
  } & {
    SidewaysCard: boolean;
  };
}
