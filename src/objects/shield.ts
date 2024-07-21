import { BASEURL } from "../utils/BASEURL";

interface ShieldInput {
  image: string;
}

export const defineShield = (input: ShieldInput) => ({
  GUID: "e6bcac",
  Name: "Custom_Model",
  Transform: {
    posX: 0.0,
    posY: 0.0,
    posZ: 0.0,
    rotX: 0.0,
    rotY: 0.0,
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
    r: 1,
    g: 1,
    b: 1,
  },
  Tags: ["coded", "faction_shield"],
  LayoutGroupSortIndex: 0,
  Value: 0,
  Locked: true,
  Grid: false,
  Snap: false,
  IgnoreFoW: false,
  MeasureMovement: false,
  DragSelectable: true,
  Autoraise: false,
  Sticky: false,
  Tooltip: true,
  GridProjection: false,
  HideWhenFaceDown: false,
  Hands: false,
  CustomMesh: {
    MeshURL:
      "https://steamusercontent-a.akamaihd.net/ugc/1722046023960873234/61694DAD6355FAB995C4FF2BB9F88043120ED1A4/",
    DiffuseURL: BASEURL + input.image,
    NormalURL: "",
    ColliderURL:
      "https://steamusercontent-a.akamaihd.net/ugc/1722046023960920340/D3ED8C9DEB35C40337B0427FDC508423E19C6AB2/",
    Convex: false,
    MaterialIndex: 3,
    TypeIndex: 4,
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
    CastShadows: false,
  },
  LuaScript: "",
  LuaScriptState: "",
  XmlUI: "",
});
