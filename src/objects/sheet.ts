import { BASEURL } from "../utils/BASEURL";

interface SheetInput {
  url: string;
}

export const defineSheet = (input: SheetInput) => ({
  GUID: "efe1f1",
  Name: "Custom_PDF",
  Transform: {
    posX: -1.60048366,
    posY: 3.21750879,
    posZ: 2.071384,
    rotX: -5.565763e-7,
    rotY: 180.0001,
    rotZ: 5.27404154e-7,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  },
  Nickname: "sheet",
  Description: "",
  GMNotes: "",
  AltLookAngle: {
    x: 0,
    y: 0,
    z: 0,
  },
  ColorDiffuse: {
    r: 1,
    g: 1,
    b: 1,
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
  HideWhenFaceDown: false,
  Hands: false,
  CustomPDF: {
    PDFUrl: BASEURL + input.url,
    PDFPassword: "",
    PDFPage: 0,
    PDFPageOffset: 0,
  },
  LuaScript: "",
  LuaScriptState: "",
  XmlUI: "",
});
