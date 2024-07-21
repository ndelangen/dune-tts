import type { Color } from "../utils/phases-types";

interface FogInput {
  color: Color;
}

export const defineFog = (input: FogInput) => ({
  GUID: "01d1ac",
  Name: "FogOfWarTrigger",
  Transform: {
    posX: 0.0,
    posY: 0.0,
    posZ: 0.0,
    rotX: 0.0,
    rotY: 0.0,
    rotZ: 0.0,
    scaleX: 10.0,
    scaleY: 5.0,
    scaleZ: 5.0,
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
    r: 0.0,
    g: 0.0,
    b: 0.0,
    a: 0,
  },
  LayoutGroupSortIndex: 0,
  Value: 0,
  Locked: true,
  Grid: true,
  Snap: true,
  IgnoreFoW: false,
  MeasureMovement: false,
  DragSelectable: true,
  Autoraise: true,
  Sticky: true,
  Tooltip: false,
  GridProjection: false,
  HideWhenFaceDown: false,
  Hands: false,
  FogColor: input.color,
  FogHidePointers: true,
  FogReverseHiding: false,
  FogSeethrough: true,
  LuaScript: "",
  LuaScriptState: "",
  XmlUI: "",
});
