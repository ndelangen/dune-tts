let deckIndex = 500;

const getCardId = (deckId: number, card: number) => {
  const index = `${card}`.padStart(2, "0");
  return Number(`${deckId}${index}`);
};

interface CardInput {
  front: string;
  back: string;
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
    Nickname: "",
    Description: "",
    GMNotes: "",
    AltLookAngle: {
      x: 0,
      y: 0,
      z: 0,
    },
    ColorDiffuse: {
      r: 0.713235259,
      g: 0.713235259,
      b: 0.713235259,
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
  };
}
