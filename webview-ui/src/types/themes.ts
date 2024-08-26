// import { RGBA_REGEX } from "@fluentui/react";

export type ColorScheme = {
  backgroundColor: string;
  shadows: boolean;
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
  backgroundColor: "#E6E6FA", // Light lavender
  shadows: true,
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
  shadows: true,
  backgroundColor: "#FFFFFF",
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
  shadows: true,
  backgroundColor: "#E6F3FF", // Very light sky blue
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
  backgroundColor: "#F0F4E8", // Light sage
  shadows: false,
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
  shadows: false,
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
  shadows: false,
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
  shadows: true,
  backgroundColor: "#FFFFFF",
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
  shadows: true,
  backgroundColor: "#FFFFFF",
  sectionColors: {
    main: "#ffffff",
    lightaccent: "#a3b18a",
    darkaccent: "#FFFC00",
  },
  sectionBorderColors: {
    main: "#020202",
    lightaccent: "#020202",
    darkaccent: "#020202",
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
    main: "#020202",
    lightaccent: "#020202",
    darkaccent: "#020202",
  },
};

export const facebookblue: ColorScheme = {
  shadows: true,
  backgroundColor: "#FFFFFF",
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

export const facebookblueNoShadow: ColorScheme = {
  shadows: false,
  backgroundColor: "#FFFFFF",
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
  shadows: true,
  backgroundColor: "#FFF5EE", // Seashell
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
  shadows: true,
  backgroundColor: "#1e2124",
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
    darkaccent: "#7289da",
  },
};

export const spotifyBlackGreen: ColorScheme = {
  shadows: false,
  backgroundColor: "#000000",
  sectionColors: {
    main: "#2A2929",
    lightaccent: "#151515",
    darkaccent: "#323032",
  },
  sectionBorderColors: {
    main: "#2A2929",
    lightaccent: "#151515",
    darkaccent: "#323032",
  },
  elementColors: {
    main: "#1BD760",
    lightaccent: "#1BD760",
    darkaccent: "#1BD760",
  },
  elementBorderColors: {
    main: "#1BD760",
    lightaccent: "#1BD760",
    darkaccent: "#1BD760",
  },
  fontColors: {
    main: "#FFFFFF",
    lightaccent: "#ffffff",
    darkaccent: "#000000",
  },
};

export const appleFinderGrey: ColorScheme = {
  shadows: false,
  backgroundColor: "#C8C8C8",
  sectionColors: {
    main: "#FFFFFF",
    lightaccent: "#F4F4F4",
    darkaccent: "#E8E8E8",
  },
  sectionBorderColors: {
    main: "#FFFFFF",
    lightaccent: "#F4F4F4",
    darkaccent: "#E8E8E8",
  },
  elementColors: {
    main: "#B4B4B4",
    lightaccent: "#B4B4B4",
    darkaccent: "#B4B4B4",
  },
  elementBorderColors: {
    main: "#B4B4B4",
    lightaccent: "#B4B4B4",
    darkaccent: "#B4B4B4",
  },
  fontColors: {
    main: "#323232",
    lightaccent: "#249DB2",
    darkaccent: "#323232",
  },
};

export const unixTerminalClassic: ColorScheme = {
  shadows: false,
  backgroundColor: "#000000", // Classic black background
  sectionColors: {
    main: "#000000",
    lightaccent: "#000000",
    darkaccent: "#000000",
  },
  sectionBorderColors: {
    main: "#00FF00", // Green border for sections
    lightaccent: "#000000",
    darkaccent: "#00FF00",
  },
  elementColors: {
    main: "#000000",
    lightaccent: "#000000",
    darkaccent: "#000000",
  },
  elementBorderColors: {
    main: "#00FF00",
    lightaccent: "#00FF00",
    darkaccent: "#00FF00",
  },
  fontColors: {
    main: "#00FF00",
    lightaccent: "#00FF00",
    darkaccent: "#00FF00",
  },
};

export const appleGrey: ColorScheme = {
  shadows: true,
  backgroundColor: "#F5F5F7", // Light gray background
  sectionColors: {
    main: "#FFFFFF", // White
    lightaccent: "#F0F0F2", // Very light gray
    darkaccent: "#E8E8ED", // Slightly darker gray
  },
  sectionBorderColors: {
    main: "#D2D2D7", // Light gray border
    lightaccent: "#E6E6E6", // Very light gray border
    darkaccent: "#BFBFBF", // Medium gray border
  },
  elementColors: {
    main: "#0071E3", // Apple blue
    lightaccent: "#42A2FF", // Lighter blue
    darkaccent: "#0058B0", // Darker blue
  },
  elementBorderColors: {
    main: "#0071E3", // Apple blue
    lightaccent: "#42A2FF", // Lighter blue
    darkaccent: "#0058B0", // Darker blue
  },
  fontColors: {
    main: "#1D1D1F", // Almost black
    lightaccent: "#86868B", // Medium gray
    darkaccent: "#515154", // Dark gray
  },
};

export const whatsappGreen: ColorScheme = {
  shadows: true,
  backgroundColor: "#ECE5DD", // Light beige background, similar to WhatsApp chat background
  sectionColors: {
    main: "#FFFFFF", // White for main sections
    lightaccent: "#F0F0F0", // Very light gray for secondary sections
    darkaccent: "#DCF8C6", // Light green for user's messages
  },
  sectionBorderColors: {
    main: "#E2E2E2", // Light gray border
    lightaccent: "#F0F0F0", // Very light gray border
    darkaccent: "#C5E9B6", // Light green border for user's messages
  },
  elementColors: {
    main: "#25D366", // WhatsApp green
    lightaccent: "#34B7F1", // WhatsApp blue (used for read receipts)
    darkaccent: "#128C7E", // Darker green for pressed states
  },
  elementBorderColors: {
    main: "#25D366", // WhatsApp green
    lightaccent: "#34B7F1", // WhatsApp blue
    darkaccent: "#128C7E", // Darker green
  },
  fontColors: {
    main: "#303030", // Dark gray, almost black for primary text
    lightaccent: "#667781", // Medium gray for secondary text
    darkaccent: "#075E54", // WhatsApp teal for accents
  },
};

export const amazonOrange: ColorScheme = {
  shadows: true,
  backgroundColor: "#E3E6E6", // White background
  sectionColors: {
    main: "#FFFFFF", // White for main sections
    lightaccent: "#232F3E", // Light gray for secondary sections
    darkaccent: "#131921", // Slightly darker gray for tertiary sections
  },
  sectionBorderColors: {
    main: "#FFFFFF", // Light gray border
    lightaccent: "#232F3E", // Slightly lighter gray border
    darkaccent: "#131921", // Darker gray border
  },
  elementColors: {
    main: "#FF9900", // Amazon orange
    lightaccent: "#FEBD69", // Lighter orange for hover states
    darkaccent: "#146EB4", // Amazon blue for secondary elements
  },
  elementBorderColors: {
    main: "#FF9900", // Amazon orange
    lightaccent: "#FEBD69", // Lighter orange
    darkaccent: "#146EB4", // Amazon blue
  },
  fontColors: {
    main: "#0F1111", // Almost black for primary text
    lightaccent: "#FF9900", // Dark gray for secondary text
    darkaccent: "#007185", // Teal for links and some accents
  },
};

export const microsoftWordBlue: ColorScheme = {
  shadows: true,
  backgroundColor: "#FFFFFF", // White background for document area
  sectionColors: {
    main: "#F3F2F1", // Light gray for ribbon and toolbar
    lightaccent: "#FFFFFF", // White for dropdown menus
    darkaccent: "#E1DFDD", // Slightly darker gray for sidebar
  },
  sectionBorderColors: {
    main: "#E1DFDD", // Light gray border
    lightaccent: "#D2D0CE", // Slightly darker gray border
    darkaccent: "#C8C6C4", // Even darker gray border
  },
  elementColors: {
    main: "#2B579A", // Word blue for primary elements
    lightaccent: "#41A5EE", // Lighter blue for hover states
    darkaccent: "#185ABD", // Darker blue for pressed states
  },
  elementBorderColors: {
    main: "#2B579A", // Word blue
    lightaccent: "#41A5EE", // Lighter blue
    darkaccent: "#185ABD", // Darker blue
  },
  fontColors: {
    main: "#252423", // Almost black for primary text
    lightaccent: "#616161", // Dark gray for secondary text
    darkaccent: "#2B579A", // Word blue for accent text
  },
};

export const netflixRedBlack: ColorScheme = {
  shadows: true,
  backgroundColor: "#141414", // Very dark gray, almost black
  sectionColors: {
    main: "#181818", // Dark gray for content cards
    lightaccent: "#2F2F2F", // Slightly lighter gray for hover states
    darkaccent: "#000000", // Pure black for some UI elements
  },
  sectionBorderColors: {
    main: "#404040", // Medium gray for subtle borders
    lightaccent: "#545454", // Lighter gray for hover state borders
    darkaccent: "#333333", // Darker gray for some UI element borders
  },
  elementColors: {
    main: "#E50914", // Netflix red
    lightaccent: "#F40612", // Slightly brighter red for hover states
    darkaccent: "#B20710", // Darker red for pressed states
  },
  elementBorderColors: {
    main: "#E50914", // Netflix red
    lightaccent: "#F40612", // Slightly brighter red
    darkaccent: "#B20710", // Darker red
  },
  fontColors: {
    main: "#FFFFFF", // White for primary text
    lightaccent: "#B3B3B3", // Light gray for secondary text
    darkaccent: "#E50914", // Netflix red for accents and some text
  },
};

export const themeList = [
  { name: "Red 1", themeGenerationName: "redairbnb", scheme: redairbnb },
  { name: "Orange 1", themeGenerationName: "orangeScheme", scheme: orangeScheme },
  { name: "Yellow 1", themeGenerationName: "snapchatyellow", scheme: snapchatyellow },
  { name: "Nature", themeGenerationName: "natural", scheme: natural },
  { name: "Blue 1", themeGenerationName: "facebookblue", scheme: facebookblue },
  { name: "Blue 2", themeGenerationName: "facebookblueNoShadow", scheme: facebookblueNoShadow },
  { name: "Sunset", themeGenerationName: "instagramSunset", scheme: instagramSunset },
  { name: "Purple 1", themeGenerationName: "discordpurple", scheme: discordpurple },
  { name: "Nautical", themeGenerationName: "nautical", scheme: nautical },
  { name: "Pastels", themeGenerationName: "pastels", scheme: pastels },
  { name: "Beige", themeGenerationName: "beige", scheme: beige },
  { name: "Grey 1", themeGenerationName: "slateGreyScheme", scheme: slateGreyScheme },
  { name: "Black/Green", themeGenerationName: "spotifyBlackGreen", scheme: spotifyBlackGreen },
  { name: "Grey 2", themeGenerationName: "appleFinderGrey", scheme: appleFinderGrey },
  { name: "Classic", themeGenerationName: "unixTerminalClassic", scheme: unixTerminalClassic },
  { name: "Grey 3", themeGenerationName: "appleGrey", scheme: appleGrey },
  { name: "Green 1", themeGenerationName: "whatsappGreen", scheme: whatsappGreen },
  { name: "Orange 2", themeGenerationName: "amazonOrange", scheme: amazonOrange },
  { name: "Blue 3", themeGenerationName: "microsoftWordBlue", scheme: microsoftWordBlue },
  { name: "Red/Black", themeGenerationName: "netflixRedBlack", scheme: netflixRedBlack },
];

export const themePreviews = themeList.map((theme) => ({
  value: theme.name,
  color: theme.scheme.sectionColors.darkaccent,
}));

export const themeNames = themeList.map((theme) => theme.name);

export const themeGenerationNames = themeList.map((theme) => theme.themeGenerationName);

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
