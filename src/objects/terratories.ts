interface TerritoryInput {
  mesh: string;
  image: string;
  collider: string;
  name: string;
  description?: string;
}

function defineTerritory({ mesh, image, collider, name, description }: TerritoryInput) {
  return {
    GUID: "786e64",
    Name: "Custom_Model",
    Transform: {
      posX: 0.0,
      posY: 1.8,
      posZ: 0.0,
      rotX: 0.0,
      rotY: 180.0,
      rotZ: 0.0,
      scaleX: 2,
      scaleY: 1.0,
      scaleZ: 2,
    },
    Nickname: name || "",
    Description: description || "",
    GMNotes: "",
    AltLookAngle: {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    },
    ColorDiffuse: {
      r: 1.0,
      g: 1.0,
      b: 1.0,
    },
    Tags: ["location_hitbox"],
    LayoutGroupSortIndex: 0,
    Value: 0,
    Locked: true,
    Grid: false,
    Snap: false,
    IgnoreFoW: true,
    MeasureMovement: false,
    DragSelectable: false,
    Autoraise: true,
    Sticky: true,
    Tooltip: true,
    GridProjection: false,
    HideWhenFaceDown: false,
    Hands: false,
    CustomMesh: {
      MeshURL: mesh,
      DiffuseURL: image,
      NormalURL: "",
      ColliderURL: collider,
      Convex: false,
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
    XmlUI: "",
  };
}

export function defineTerritories() {
  return [
    defineTerritory({
      name: "Arrakeen",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515012198/7D08F9C23AF42F5FB65EF5B686F1979DA0AB2676/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515012198/7D08F9C23AF42F5FB65EF5B686F1979DA0AB2676/",
    }),
    defineTerritory({
      name: "Broken Land",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515038018/FBF95B610EDAE2961EAB3378D4C65C88B4A42691/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515038018/FBF95B610EDAE2961EAB3378D4C65C88B4A42691/",
    }),
    defineTerritory({
      name: "Old Gap",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515171153/C6E076BA02EBEB0E0DBC00D77408F787541D490D/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515171153/C6E076BA02EBEB0E0DBC00D77408F787541D490D/",
    }),
    defineTerritory({
      name: "Arsunt",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515194165/210BCABCB8861DEAA38032F78F1412EA78D83C70/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515194165/210BCABCB8861DEAA38032F78F1412EA78D83C70/",
    }),
    defineTerritory({
      name: "Imperial Basin",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515198323/9E1D6AA3BA232F1027ABABC356A7A8FE3BB0D08B/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515198323/9E1D6AA3BA232F1027ABABC356A7A8FE3BB0D08B/",
    }),
    defineTerritory({
      name: "Tsimpo",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515203076/AF296D02132B1AEB0427F850161B60954A1ECFE4/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515203076/AF296D02132B1AEB0427F850161B60954A1ECFE4/",
    }),
    defineTerritory({
      name: "Plastic Basin",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515210310/79CD2410789C1B00DD0F424492623BDBC9E0D340/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515210310/79CD2410789C1B00DD0F424492623BDBC9E0D340/",
    }),
    defineTerritory({
      name: "Hagga Basin",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515218172/6AC124B236E8455CA6757F7B00D50DEC17A57AB8/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515218172/6AC124B236E8455CA6757F7B00D50DEC17A57AB8/",
    }),
    defineTerritory({
      name: "Pasty Mesa",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515248317/C91A921EE2A8416596BCB68186A291A125C26D5D/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515248317/C91A921EE2A8416596BCB68186A291A125C26D5D/",
    }),
    defineTerritory({
      name: "Shieldwall",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515254878/512DAF70703B0165A12AB56D985CB80AD6180E3B/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515254878/512DAF70703B0165A12AB56D985CB80AD6180E3B/",
    }),
    defineTerritory({
      name: "Bight of the Cliff",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515262058/692552DF89727032A41AC349FB3B61FBE588E4AF/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515262058/692552DF89727032A41AC349FB3B61FBE588E4AF/",
    }),
    defineTerritory({
      name: "Hole in the Rock",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515268453/F4A1044D940B6736943CB6D8F749C67E670E2BB9/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515268453/F4A1044D940B6736943CB6D8F749C67E670E2BB9/",
    }),
    defineTerritory({
      name: "Gara Kulon",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515278442/5754D398127ABEB66E651DA4BC2F54EAEAB9B5C8/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515278442/5754D398127ABEB66E651DA4BC2F54EAEAB9B5C8/",
    }),
    defineTerritory({
      name: "Sihaya Ridge",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515285266/FF0A5140A0DD61319E47D54C51BACFDCF49C523C/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515285266/FF0A5140A0DD61319E47D54C51BACFDCF49C523C/",
    }),
    defineTerritory({
      name: "Basin",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515293590/4E4BD454AD89447C9F5810D7525AE17A03AECA3D/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515293590/4E4BD454AD89447C9F5810D7525AE17A03AECA3D/",
    }),
    defineTerritory({
      name: "Rim Wall West",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515295779/3DCE2981879B4F568AEAF352CEBF823450567679/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515295779/3DCE2981879B4F568AEAF352CEBF823450567679/",
    }),
    defineTerritory({
      name: "Rock Outcroppings",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515300357/F9C08E8B5EDCAC5A162E3C93D5A2A467BC2346D0/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515300357/F9C08E8B5EDCAC5A162E3C93D5A2A467BC2346D0/",
    }),
    defineTerritory({
      name: "Fureral Plain",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515303757/5BF5A783C0C2D75B48E3F5DE0C11612B0B3A1207/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515303757/5BF5A783C0C2D75B48E3F5DE0C11612B0B3A1207/",
    }),
    defineTerritory({
      name: "Polar Sink",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515332906/68712A615B54CF1BCCA74EBF8C9887AF76A766BC/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515332906/68712A615B54CF1BCCA74EBF8C9887AF76A766BC/",
    }),
    defineTerritory({
      name: "South Mesa",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515335169/41D148897EC0ACD8CA6979FCDC720958A73C9DDF/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515335169/41D148897EC0ACD8CA6979FCDC720958A73C9DDF/",
    }),
    defineTerritory({
      name: "Habanya Erg",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515338629/6E113B47FC4048333CC14EDD168AA1AC802A97D9/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515338629/6E113B47FC4048333CC14EDD168AA1AC802A97D9/",
    }),
    defineTerritory({
      name: "The Great Flat",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515341524/907C2811A738102AC2DED5975CDEB52F5C60011F/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515341524/907C2811A738102AC2DED5975CDEB52F5C60011F/",
    }),
    defineTerritory({
      name: "The Greater Flat",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515343277/A24B24819FA860C4C38005F7C271F96E4CAA4234/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515343277/A24B24819FA860C4C38005F7C271F96E4CAA4234/",
    }),
    defineTerritory({
      name: "The Minor Erg",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515347613/D85D670EE0A6A2CC1CB99C3AF3947E6F1C03DCA0/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515347613/D85D670EE0A6A2CC1CB99C3AF3947E6F1C03DCA0/",
    }),
    defineTerritory({
      name: "Wind Pass North",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515349990/21095BDF9F400E6FD10ADDB0B27580816D5ADD52/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515349990/21095BDF9F400E6FD10ADDB0B27580816D5ADD52/",
    }),
    defineTerritory({
      name: "Red Chasm",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515351755/A60AB416E454F1DABC76B20BD0F6BE8927D13134/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515351755/A60AB416E454F1DABC76B20BD0F6BE8927D13134/",
    }),
    defineTerritory({
      name: "Wind Pass",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515370881/3DA5C3401C7D1415BA333AD64AECABF3A3F6CEAB/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515370881/3DA5C3401C7D1415BA333AD64AECABF3A3F6CEAB/",
    }),
    defineTerritory({
      name: "Cielago North",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515372471/0414C49EA902B5067322166166FCE57DEB8F93CC/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515372471/0414C49EA902B5067322166166FCE57DEB8F93CC/",
    }),
    defineTerritory({
      name: "Hark Pass",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515374062/E2092318A3B436FEFE700D4CC01CD0D55A90B82D/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515374062/E2092318A3B436FEFE700D4CC01CD0D55A90B82D/",
    }),
    defineTerritory({
      name: "Cielago Depression",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515376110/5D45D13B45B80DBC5F4FD22AF527E6B822236C95/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515376110/5D45D13B45B80DBC5F4FD22AF527E6B822236C95/",
    }),
    defineTerritory({
      name: "Cielago South",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515377898/D2B917102277503CAFBD238339B772083ACD32BD/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515377898/D2B917102277503CAFBD238339B772083ACD32BD/",
    }),
    defineTerritory({
      name: "Cielago East",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515382979/12C340D244ED1285F03A8F9E7C0AFCF3169F61B4/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515382979/12C340D244ED1285F03A8F9E7C0AFCF3169F61B4/",
    }),
    defineTerritory({
      name: "Cielago West",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515384413/4D7E6136BA2ED103DB55B62A8630E90726BD3003/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515384413/4D7E6136BA2ED103DB55B62A8630E90726BD3003/",
    }),
    defineTerritory({
      name: "False Wall East",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515387782/81E549A363D988212C855B8EC8991065519F567C/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515387782/81E549A363D988212C855B8EC8991065519F567C/",
    }),
    defineTerritory({
      name: "False Wall West",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515391520/C4135957244FC5CA7E2FEE79EF94114496394869/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515391520/C4135957244FC5CA7E2FEE79EF94114496394869/",
    }),
    defineTerritory({
      name: "Habanya Ridge Flat",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515393798/38AB1A831ACDE278132E7887C0A3311EF0CFEBD0/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515393798/38AB1A831ACDE278132E7887C0A3311EF0CFEBD0/",
    }),
    defineTerritory({
      name: "False Wall South",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515398214/F8D2E7A43C88B83BF5A25B61159117B75FB08577/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515398214/F8D2E7A43C88B83BF5A25B61159117B75FB08577/",
    }),
    defineTerritory({
      name: "Meridian",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515407658/71ACB18E7569667C4783F3EE604B75C3D854C02D/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515407658/71ACB18E7569667C4783F3EE604B75C3D854C02D/",
    }),
    defineTerritory({
      name: "Carthag",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515195919/DCE2BC90AD78D0DB293331275B55B59C28B74817/",
      image: "http://cloud-3.steamusercontent.com/ugc/2032849146511499408/E9BF34CFE247F450918652AC4CE2CD4F1F3AEF72/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515195919/DCE2BC90AD78D0DB293331275B55B59C28B74817/",
    }),
    defineTerritory({
      name: "Tuek's Sietch",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515345624/5127E255C1C48B6F48F8157F406129AF5DBDDA89/",
      image: "http://cloud-3.steamusercontent.com/ugc/2036243145022217862/1B1DB2DC0673762CF55A9C482B4C618838E80355/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515345624/5127E255C1C48B6F48F8157F406129AF5DBDDA89/",
    }),
    defineTerritory({
      name: "Habanya Seitch",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515400881/DBC5F59BDAF83C37AEE799B07E524288EF472F0E/",
      image: "http://cloud-3.steamusercontent.com/ugc/2036243145022217862/1B1DB2DC0673762CF55A9C482B4C618838E80355/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515400881/DBC5F59BDAF83C37AEE799B07E524288EF472F0E/",
    }),
    defineTerritory({
      name: "Sietch Tabr",
      mesh: "http://cloud-3.steamusercontent.com/ugc/2032849146515213763/7E30C8AC7334001ECB628955DAD2D301C66ED0DE/",
      image: "http://cloud-3.steamusercontent.com/ugc/2036243145022217862/1B1DB2DC0673762CF55A9C482B4C618838E80355/",
      collider: "http://cloud-3.steamusercontent.com/ugc/2032849146515213763/7E30C8AC7334001ECB628955DAD2D301C66ED0DE/",
    }),
  ];
}
