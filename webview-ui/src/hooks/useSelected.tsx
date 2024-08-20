import { makeStyles, tokens } from "@fluentui/react-components";

export const useSelected = makeStyles({
  select: {
    userSelect: "none",
        zIndex: 9999, // Ensure this element appears at the front


    backgroundImage: `
      linear-gradient(to right, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to right, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to bottom, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to bottom, ${tokens.colorBrandForeground1} 50%, transparent 50%)
    `,
    backgroundSize: "20px 4px, 20px 4px, 4px 20px, 4px 20px",
    backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
    backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
    animationName: {
      "0%": {
        backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
      },
      "100%": {
        backgroundPosition: "40px 0, -40px 100%, 0 -40px, 100% 40px",
      },
    },
    animationDuration: "1.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: "running",

    // ":hover": {
    //   animationPlayState: "running",
    // },
  },
  selectedGrid: {
    userSelect: "none",
        zIndex: 9999, // Ensure this element appears at the front


    backgroundImage: `
      linear-gradient(to right, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to right, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to bottom, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to bottom, ${tokens.colorBrandForeground1} 50%, transparent 50%)
    `,
    backgroundSize: "20px 4px, 20px 4px, 4px 20px, 4px 20px",
    backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
    backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
    animationName: {
      "0%": {
        backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
      },
      "100%": {
        backgroundPosition: "40px 0, -40px 100%, 0 -40px, 100% 40px",
      },
    },
    animationDuration: "1.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: "running",
    // ":hover": {
    //   animationPlayState: "running",
    // },
  },
});