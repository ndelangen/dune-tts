import { BASEURL } from "../utils/BASEURL";
import { defineCard } from "./card";

interface AllianceInput {
  name: string;

  front: string;
  back: string;

  base: string;
}

export const defineAlliance = (input: AllianceInput) => ({
  GUID: "c3a637",
  Name: "Custom_Model",
  Transform: {
    posX: 0.0,
    posY: 0.0,
    posZ: 0.0,
    rotX: 0.0,
    rotY: 0.0,
    rotZ: 0.0,
    scaleX: 1.0,
    scaleY: 1.0,
    scaleZ: 1.0,
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
    r: 1,
    g: 1,
    b: 1,
  },
  Tags: ["coded", "alliance_stand"],
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
  CustomMesh: {
    MeshURL: "http://cloud-3.steamusercontent.com/ugc/2501267533360112638/BFB4323CF70501F6D36FFA354DD71110506454CA/",
    DiffuseURL: BASEURL + input.base,
    NormalURL: "",
    ColliderURL: "",
    Convex: true,
    MaterialIndex: 3,
    TypeIndex: 5,
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
  ChildObjects: [
    {
      ...defineCard({ front: input.front, back: input.back }),
      Transform: {
        posX: 0.0,
        posY: 1.88,
        posZ: 0.0,
        rotX: 90,
        rotY: 0,
        rotZ: 0,
        scaleX: 1.0,
        scaleY: 0.1,
        scaleZ: 1.0,
      },
    },
  ],
});
