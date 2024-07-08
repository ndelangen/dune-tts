interface TextInput {
  text: string;
}

export function define(input: TextInput) {
  return {
    GUID: "bee9ec",
    Name: "Custom_Model",
    Transform: {
      posX: -14.0,
      posY: 1.97,
      posZ: -128.0,
      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,
      scaleX: 0.37,
      scaleY: 0.1,
      scaleZ: 0.37,
    },
    Nickname: "",
    Description: "",
    GMNotes: "10",
    AltLookAngle: {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    },
    ColorDiffuse: {
      r: 0.121568404,
      g: 0.5333333,
      b: 1.0,
    },
    Tags: ["coded", "location_name"],
    LayoutGroupSortIndex: 0,
    Value: 0,
    Locked: true,
    Grid: false,
    Snap: false,
    IgnoreFoW: false,
    MeasureMovement: false,
    DragSelectable: true,
    Autoraise: true,
    Sticky: true,
    Tooltip: false,
    GridProjection: false,
    HideWhenFaceDown: false,
    Hands: false,
    CustomMesh: {
      MeshURL: "http://cloud-3.steamusercontent.com/ugc/1019448689706933790/DEF0BF91642CF5636724CA3A37083385C810BA06/",
      DiffuseURL: "",
      NormalURL: "",
      ColliderURL:
        "http://cloud-3.steamusercontent.com/ugc/1019448689706933790/DEF0BF91642CF5636724CA3A37083385C810BA06/",
      Convex: true,
      MaterialIndex: 3,
      TypeIndex: 4,
      CustomShader: {
        SpecularColor: {
          r: 0.0,
          g: 0.0,
          b: 0.0,
        },
        SpecularIntensity: 0.0,
        SpecularSharpness: 2.0,
        FresnelStrength: 0.0,
      },
      CastShadows: false,
    },
    LuaScript: "",
    LuaScriptState: "",
    XmlUI: `
      <Panel rotation="0 0 0" position="0 0 -12" id="root">
        <Text color="#F0EDAB" position="-6 0 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="6 0 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="0 -6 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="0 6 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="-6 6 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="6 6 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="6 -6 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="-6 -6 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="-3 0 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="3 0 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="0 -3 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="0 3 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="-3 3 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="3 3 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="3 -3 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#F0EDAB" position="-3 -3 0" fontSize="100" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
        <Text color="#000000" scale="0.2 0.2 0.2" fontSize="1700" font="fonts/COPRGTB" outlineSize="2" outline="#F0EDAB">${input.text}</Text>
      </Panel>
    `,
    CustomUIAssets: [
      {
        Type: 1,
        Name: "fonts",
        URL: "http://cloud-3.steamusercontent.com/ugc/2032849595081400126/1916155C62BAA13FF3BCE2FA192DB82BF65BAA91/",
      },
    ],
  };
}
