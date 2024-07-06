interface DiscInput {
  front: string;
  back: string;
  name: string;
  count?: number;
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
      posX: -24,
      posY: 2.149906,
      posZ: 22,
      rotX: -0.000490772654,
      rotY: 180.000031,
      rotZ: -0.00133501156,
      scaleX: 1,
      scaleY: 2,
      scaleZ: 1,
    },
    Nickname: "one double-sided-troop",
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
      DiffuseURL:
        "http://cloud-3.steamusercontent.com/ugc/2495638210047392487/14CD02AFE700211EE5F042C6C3D30CB9EB88153B/",
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
    LuaScript: "function onLoad()\n  log(self.getJSON())\nend",
    LuaScriptState: "",
    XmlUI: "",
    ChildObjects: [
      {
        GUID: "84d263",
        Name: "Custom_Model",
        Transform: {
          posX: -0.00000134330276,
          posY: -0.04995942,
          posZ: -3.02889674e-7,
          rotX: 0.0004715415,
          rotY: 0.0000050982876,
          rotZ: 0.00133553648,
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
          DiffuseURL:
            "http://cloud-3.steamusercontent.com/ugc/2495638210047391534/39A372D51A59B9CB414C4702E5D3F32965AD49D7/",
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
      posX: -18.9999752,
      posY: 2.1499052,
      posZ: 22.9999542,
      rotX: -0.000500617956,
      rotY: 180.000031,
      rotZ: -0.00133555452,
      scaleX: 1,
      scaleY: 2,
      scaleZ: 1,
    },
    Nickname: "double-sided-troop",
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
      DiffuseURL:
        "http://cloud-3.steamusercontent.com/ugc/2495638210047392487/14CD02AFE700211EE5F042C6C3D30CB9EB88153B/",
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
    LuaScript: "function onLoad()\n  log(self.getJSON())\nend",
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
          DiffuseURL:
            "http://cloud-3.steamusercontent.com/ugc/2495638210047391534/39A372D51A59B9CB414C4702E5D3F32965AD49D7/",
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
