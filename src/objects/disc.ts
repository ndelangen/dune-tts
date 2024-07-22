import { BASEURL } from "../utils/BASEURL";

interface DiscInput {
  front: string;
  back: string;
  name?: string;
  count?: number;
  tags?: string[];
}

export function define(input: DiscInput) {
  if (input.count && input.count > 1) {
    return defineStack(input);
  }

  return defineDisc(input);
}

function defineDisc(input: DiscInput) {
  return {
    GUID: "a1dafa",
    Name: "Custom_Model",
    Transform: {
      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,
      rotX: 0.0,
      rotY: 180.0,
      rotZ: 0.0,
      scaleX: 1,
      scaleY: 2,
      scaleZ: 1,
    },
    Nickname: input.name || "",
    Tags: ["coded", ...(input.tags || [])],
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
    CustomMesh: {
      MeshURL: "http://cloud-3.steamusercontent.com/ugc/2501267533360112638/BFB4323CF70501F6D36FFA354DD71110506454CA/",
      DiffuseURL: BASEURL + input.front,
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
        GUID: "84d263",
        Name: "Custom_Model",
        Transform: {
          posX: -0.0,
          posY: -0.05,
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
          MeshURL:
            "http://cloud-3.steamusercontent.com/ugc/2501267533360112638/BFB4323CF70501F6D36FFA354DD71110506454CA/",
          DiffuseURL: BASEURL + input.back,
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
      },
    ],
  };
}

function defineStack(input: DiscInput) {
  return {
    GUID: "af9d1b",
    Name: "Custom_Model_Stack",
    Transform: {
      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,
      rotX: 0.0,
      rotY: 180.0,
      rotZ: 0.0,
      scaleX: 1,
      scaleY: 2,
      scaleZ: 1,
    },
    Nickname: input.name || "",
    Tags: ["coded", ...(input.tags || [])],
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
    MaterialIndex: -1,
    MeshIndex: -1,
    Number: 5,
    CustomMesh: {
      MeshURL: "http://cloud-3.steamusercontent.com/ugc/2501267533360112638/BFB4323CF70501F6D36FFA354DD71110506454CA/",
      DiffuseURL: BASEURL + input.front,
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
        GUID: "84d263",
        Name: "Custom_Model",
        Transform: {
          posX: 0.0,
          posY: -0.05,
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
          MeshURL:
            "http://cloud-3.steamusercontent.com/ugc/2501267533360112638/BFB4323CF70501F6D36FFA354DD71110506454CA/",
          DiffuseURL: BASEURL + input.back,
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
      },
    ],
  };
}

interface SimpleInput {
  name?: string;
  tags?: string[];
}

export function simple(input: SimpleInput) {
  return {
    GUID: "a1dafa",
    Name: "Custom_Model",
    Transform: {
      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,
      rotX: 0.0,
      rotY: 180.0,
      rotZ: 0.0,
      scaleX: 1,
      scaleY: 2,
      scaleZ: 1,
    },
    Nickname: input.name || "",
    Tags: ["coded", ...(input.tags || [])],
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
    CustomMesh: {
      MeshURL: "http://cloud-3.steamusercontent.com/ugc/2501267533360112638/BFB4323CF70501F6D36FFA354DD71110506454CA/",
      DiffuseURL: "",
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
  };
}
