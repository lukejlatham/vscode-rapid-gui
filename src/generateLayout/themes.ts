import { ColorScheme } from "../../webview-ui/src/types";

export const slateGreyScheme: ColorScheme = {
  sectionColors: {
    main: "#F8F8FF",
    lightaccent: "#778899",
    darkaccent: "aliceblue",
  },
  sectionBorderColors: {
    main: "aliceblue",
    lightaccent: "#aliceblue",
    darkaccent: "#F8F8FF",
  },
  elementColors: {
    main: "darkslategray",
    lightaccent: "lightslategray",
    darkaccent: "darkslategray",
  },
  elementBorderColors: {
    main: "ghostwhite",
    lightaccent: "#668877",
    darkaccent: "lightslategray",
  },
  fontColors: {
    main: "#31383E",
    lightaccent: "#F8F8FF",
    darkaccent: "#3E3138",
  },
};

export const orangeScheme: ColorScheme = {
  sectionColors: {
    main: "ghostwhite", // Light muted orange
    lightaccent: "#FFD4A3", // Lighter muted orange
    darkaccent: "#FFB870", // Darker muted orange
  },
  sectionBorderColors: {
    main: "#FFB870", // Inverted color of #FFEDD5
    lightaccent: "#002B5D", // Inverted color of #FFD4A3
    darkaccent: "#00438F", // Inverted color of #FFB870
  },
  elementColors: {
    main: "#FFEDD5", // Darker muted orange for elements
    lightaccent: "#FFEDD5", // Light muted orange for light accents
    darkaccent: "#31383E", // Darkest muted orange for dark accents
  },
  elementBorderColors: {
    main: "#00438F", // Inverted color of #FFB870
    lightaccent: "#00222A", // Inverted color of #FFEDD5
    darkaccent: "#005CB2", // Inverted color of #FF934F
  },
  fontColors: {
    main: "darkslategrey", // Dark brown for main text
    lightaccent: "#6F4E37", // Muted brown for light accent text
    darkaccent: "#8B4513", // Darker brown for dark accent text
  },
};
