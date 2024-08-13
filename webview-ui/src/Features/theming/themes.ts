import { ColorScheme } from "../../types";

export const slateGreyScheme: ColorScheme = {
  sectionColors: {
    main: "#F9F9FF",
    lightaccent: "#778899",
    darkaccent: "#3E3138",
  },
  sectionBorderColors: {
    main: "aliceblue",
    lightaccent: "#aliceblue",
    darkaccent: "#F8F8FF",
  },
  elementColors: {
    main: "lightslategray",
    lightaccent: "aliceblue",
    darkaccent: "lightslategray",
  },
  elementBorderColors: {
    main: "ghostwhite",
    lightaccent: "#668877",
    darkaccent: "ghostwhite",
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

export const tetrisScheme: ColorScheme = {
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
    main: [
      "#00FFFF", // I Tetromino (Cyan)
      "#FFFF00", // O Tetromino (Yellow)
      "#800080", // T Tetromino (Purple)
      "#00FF00", // S Tetromino (Green)
      "#FF0000", // Z Tetromino (Red)
      "#0000FF", // J Tetromino (Blue)
      "#FFA500", // L Tetromino (Orange)
    ], // Darker muted orange for elements    lightaccent: "#FFEDD5", // Light muted orange for light accents
    darkaccent: "#31383E", // Darkest muted orange for dark accents
    lightaccent: "#FFEDD5", // Light muted orange for light accents
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

export const themeList = [
  { name: "Grey Scheme", scheme: slateGreyScheme },
  { name: "Orange Scheme", scheme: orangeScheme },
  { name: "Awful tetris Scheme", scheme: tetrisScheme },
];
