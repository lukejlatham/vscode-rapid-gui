export type ColorScheme = {
  backgroundColor: string;
  sectionColors: {
    main: string;
    lightaccent: string;
    darkaccent: string;
  };
  sectionBorderColors: {
    main: string;
    lightaccent: string;
    darkaccent: string;
  };
  elementColors: {
    main: string;
    lightaccent: string;
    darkaccent: string;
  };
  elementBorderColors: {
    main: string;
    lightaccent: string;
    darkaccent: string;
  };
  fontColors: {
    main: string;
    lightaccent: string;
    darkaccent: string;
  };
};
export const slateGreyScheme: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#F9F9FF",
    lightaccent: "#778899",
    darkaccent: "#3E3138",
  },
  sectionBorderColors: {
    main: "#F0F8FF", // aliceblue
    lightaccent: "#F0F8FF", // aliceblue
    darkaccent: "#F8F8FF",
  },
  elementColors: {
    main: "#778899", // lightslategray
    lightaccent: "#F0F8FF", // aliceblue
    darkaccent: "#778899", // lightslategray
  },
  elementBorderColors: {
    main: "#F8F8FF", // ghostwhite
    lightaccent: "#668877",
    darkaccent: "#F8F8FF", // ghostwhite
  },
  fontColors: {
    main: "#31383E",
    lightaccent: "#F8F8FF",
    darkaccent: "#3E3138",
  },
};

export const orangeScheme: ColorScheme = {
  backgroundColor: "#FFEDD5",
  sectionColors: {
    main: "#F8F8FF", // ghostwhite
    lightaccent: "#FFD4A3",
    darkaccent: "#FFB870",
  },
  sectionBorderColors: {
    main: "#FFB870",
    lightaccent: "#002B5D",
    darkaccent: "#00438F",
  },
  elementColors: {
    main: "#FFEDD5",
    lightaccent: "#FFEDD5",
    darkaccent: "#31383E",
  },
  elementBorderColors: {
    main: "#00438F",
    lightaccent: "#00222A",
    darkaccent: "#005CB2",
  },
  fontColors: {
    main: "#2F4F4F", // darkslategrey
    lightaccent: "#6F4E37",
    darkaccent: "#8B4513",
  },
};

export const nautical: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#ebebeb",
    lightaccent: "#ebebeb",
    darkaccent: "#003049",
  },
  sectionBorderColors: {
    main: "#c1121f",
    lightaccent: "#C1121F",
    darkaccent: "#780000",
  },
  elementColors: {
    main: "#c1121f",
    lightaccent: "#669BBC",
    darkaccent: "#003049",
  },
  elementBorderColors: {
    main: "#780000",
    lightaccent: "#669BBC",
    darkaccent: "#003049",
  },
  fontColors: {
    main: "#003049",
    lightaccent: "#669BBC",
    darkaccent: "#003049",
  },
};

export const natural: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#a3b18a",
    lightaccent: "#a3b18a",
    darkaccent: "#344e41",
  },
  sectionBorderColors: {
    main: "#333d29",
    lightaccent: "#656d4a",
    darkaccent: "#414833",
  },
  elementColors: {
    main: "#936639",
    lightaccent: "#a68a64",
    darkaccent: "#7f4f24",
  },
  elementBorderColors: {
    main: "#283618",
    lightaccent: "#b6ad90",
    darkaccent: "#414833",
  },
  fontColors: {
    main: "#081c15",
    lightaccent: "#7f4f24",
    darkaccent: "#582f0e",
  },
};

export const pastels: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#f8f9fa",
    lightaccent: "#BDE0FE",
    darkaccent: "#CDB4DB",
  },
  sectionBorderColors: {
    main: "#ffc8dd",
    lightaccent: "#FFC8DD",
    darkaccent: "#ffafcc",
  },
  elementColors: {
    main: "#a2d2ff",
    lightaccent: "#ffc8dd",
    darkaccent: "#A2D2FF",
  },
  elementBorderColors: {
    main: "#283618",
    lightaccent: "#ffc8dd",
    darkaccent: "#cdb4db",
  },
  fontColors: {
    main: "#212529",
    lightaccent: "#A2D2FF",
    darkaccent: "#582f0e",
  },
};

export const beige: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#EDEDE9",
    lightaccent: "#EDEDE9",
    darkaccent: "#E3D5CA",
  },
  sectionBorderColors: {
    main: "#F5EBE0",
    lightaccent: "#E3D5CA",
    darkaccent: "#E3D5CA",
  },
  elementColors: {
    main: "#E3D5CA",
    lightaccent: "#F5EBE0",
    darkaccent: "#D5BDAF",
  },
  elementBorderColors: {
    main: "#F5EBE0",
    lightaccent: "#E3D5CA",
    darkaccent: "#D5BDAF",
  },
  fontColors: {
    main: "#463f3a",
    lightaccent: "#d6ccc2",
    darkaccent: "#582f0e",
  },
};

export const redairbnb: ColorScheme = {
  backgroundColor: "#FF5A5F",
  sectionColors: {
    main: "#ffffff",
    lightaccent: "#00A699",
    darkaccent: "#FF5A5F",
  },
  sectionBorderColors: {
    main: "#767676",
    lightaccent: "#00A699",
    darkaccent: "#484848",
  },
  elementColors: {
    main: "#FF5A5F",
    lightaccent: "#ffffff",
    darkaccent: "#7f4f24",
  },
  elementBorderColors: {
    main: "#767676",
    lightaccent: "#00A699",
    darkaccent: "#484848",
  },
  fontColors: {
    main: "#484848",
    lightaccent: "#767676",
    darkaccent: "#484848",
  },
};

export const snapchatyellow: ColorScheme = {
  backgroundColor: "#FFFC00",
  sectionColors: {
    main: "#ffffff",
    lightaccent: "#a3b18a",
    darkaccent: "#FFFC00",
  },
  sectionBorderColors: {
    main: "#FFFC00",
    lightaccent: "#7f4f24",
    darkaccent: "#000000",
  },
  elementColors: {
    main: "#D3D3D3",
    lightaccent: "#D3D3D3",
    darkaccent: "#7f4f24",
  },
  elementBorderColors: {
    main: "#FFFC00",
    lightaccent: "#FFFC00",
    darkaccent: "#D3D3D3",
  },
  fontColors: {
    main: "#081c15",
    lightaccent: "#FFFC00",
    darkaccent: "#582f0e",
  },
};

export const facebookblue: ColorScheme = {
  backgroundColor: "#dfe3ee",
  sectionColors: {
    main: "#dfe3ee",
    lightaccent: "#dfe3ee",
    darkaccent: "#3b5998",
  },
  sectionBorderColors: {
    main: "#3b5998",
    lightaccent: "#dfe3ee",
    darkaccent: "#8b9dc3",
  },
  elementColors: {
    main: "#8b9dc3",
    lightaccent: "#dfe3ee",
    darkaccent: "#3b5998",
  },
  elementBorderColors: {
    main: "#283618",
    lightaccent: "#dfe3ee",
    darkaccent: "#414833",
  },
  fontColors: {
    main: "#000000",
    lightaccent: "#8b9dc3",
    darkaccent: "#3b5998",
  },
};

export const facebookbluealt: ColorScheme = {
  backgroundColor: "#f8f9fa",
  sectionColors: {
    main: "#f8f9fa",
    lightaccent: "#dfe3ee",
    darkaccent: "#dfe3ee",
  },
  sectionBorderColors: {
    main: "#3b5998",
    lightaccent: "#dfe3ee",
    darkaccent: "#8b9dc3",
  },
  elementColors: {
    main: "#3b5998",
    lightaccent: "#dfe3ee",
    darkaccent: "#3b5998",
  },
  elementBorderColors: {
    main: "#283618",
    lightaccent: "#dfe3ee",
    darkaccent: "#414833",
  },
  fontColors: {
    main: "#000000",
    lightaccent: "#f8f9fa",
    darkaccent: "#f8f9fa",
  },
};

export const instagramSunset: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#EDEDE9",
    lightaccent: "#fbad50",
    darkaccent: "#4c68d7",
  },
  sectionBorderColors: {
    main: "#333d29",
    lightaccent: "#fccc63",
    darkaccent: "#414833",
  },
  elementColors: {
    main: "#C32AA3",
    lightaccent: "#fbad50",
    darkaccent: "#4c68d7",
  },
  elementBorderColors: {
    main: "#fccc63",
    lightaccent: "#b6ad90",
    darkaccent: "#414833",
  },
  fontColors: {
    main: "#081c15",
    lightaccent: "#7f4f24",
    darkaccent: "#582f0e",
  },
};

export const discordpurple: ColorScheme = {
  backgroundColor: "#F9F9FF",
  sectionColors: {
    main: "#282b30",
    lightaccent: "#424549",
    darkaccent: "#1e2124",
  },
  sectionBorderColors: {
    main: "#7289da",
    lightaccent: "#424549",
    darkaccent: "#414833",
  },
  elementColors: {
    main: "#7289da",
    lightaccent: "#424549",
    darkaccent: "#7f4f24",
  },
  elementBorderColors: {
    main: "#283618",
    lightaccent: "#424549",
    darkaccent: "#282b30",
  },
  fontColors: {
    main: "#ffffff",
    lightaccent: "#ffffff",
    darkaccent: "#99aab5",
  },
};

export const themeList = [
  { name: "Red 1", scheme: redairbnb },
  { name: "Orange 1", scheme: orangeScheme },
  { name: "Yellow 1", scheme: snapchatyellow },
  { name: "Nature", scheme: natural },
  { name: "Blue 1", scheme: facebookblue },
  { name: "Blue 2", scheme: facebookbluealt },
  { name: "Instagram", scheme: instagramSunset },
  { name: "Purple 1", scheme: discordpurple },
  { name: "Nautical", scheme: nautical },
  { name: "Pastels", scheme: pastels },
  { name: "Beige", scheme: beige },
  { name: "Grey 1", scheme: slateGreyScheme },
];

export const themePreviews = themeList.map((theme) => ({
  value: theme.name,
  color: theme.scheme.sectionColors.darkaccent,
}));

export const themeNames = themeList.map((theme) => theme.name);

export type NodeThemeType = "Background" | "Container" | "Other";

export const fontList = [
  { name: "GoogleTwitter", displayName: "Roboto" },
  { name: "Airbnb", displayName: "Montserrat" },
  { name: "Facebook", displayName: "Helvetica" },
  { name: "AirbnbSnapchat", displayName: "Helvetica Neue" },
  { name: "Garamond", displayName: "EB Garamond" },
  { name: "Spotify", displayName: "Plus Jakarta Sans" },
  { name: "Apple", displayName: "Inter" },
  { name: "IBM", displayName: "IBM Plex Sans" },
  { name: "Slack", displayName: "Lato" },
];

export const fontNames = fontList.map((font) => font.displayName);

export const fontGenerationNames = fontList.map((font) => font.name);
