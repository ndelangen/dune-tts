import { BASEURL } from "../utils/BASEURL";

interface LineInput {
  color: Color;
  length: number;
  url?: string;
  width: number;
}

export const defineLine = (input: LineInput) => ({
  GUID: "03dcf4",
  Name: "Custom_Model",
  Transform: {
    posX: 0.0,
    posY: 0.0,
    posZ: 0.0,
    rotX: 0.0,
    rotY: 0.0,
    rotZ: 0.0,
    scaleX: input.width || 1,
    scaleY: 1,
    scaleZ: input.length || 1,
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
    r: input.color.r,
    g: input.color.g,
    b: input.color.b,
    a: input.color.a || 1,
  },
  LayoutGroupSortIndex: 0,
  Value: 0,
  Locked: true,
  Grid: true,
  Snap: true,
  IgnoreFoW: true,
  MeasureMovement: false,
  DragSelectable: true,
  Autoraise: true,
  Sticky: true,
  Tooltip: true,
  GridProjection: false,
  HideWhenFaceDown: false,
  Hands: false,
  CustomMesh: {
    MeshURL:
      "https://steamusercontent-a.akamaihd.net/ugc/2521536445239935304/25393B20736BADF5E8618AB27E6F897703AC0FF5/",
    DiffuseURL: input.url ? BASEURL + input.url : "",
    NormalURL: "",
    ColliderURL:
      "https://steamusercontent-a.akamaihd.net/ugc/2521536445239935304/25393B20736BADF5E8618AB27E6F897703AC0FF5/",
    Convex: true,
    MaterialIndex: 3,
    TypeIndex: 0,
    CustomShader: {
      SpecularColor: {
        r: 0,
        g: 0,
        b: 0,
      },
      SpecularIntensity: 0,
      SpecularSharpness: 2,
      FresnelStrength: 0,
    },
    CastShadows: true,
  },
  LuaScript: "",
  LuaScriptState: "",
  XmlUI: "",
});
