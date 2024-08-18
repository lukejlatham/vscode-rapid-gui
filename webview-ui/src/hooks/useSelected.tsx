import { makeStyles, tokens } from "@fluentui/react-components";

export const useSelected = makeStyles({
  select: {
    outline: `3px dashed ${tokens.colorPaletteDarkGreenBorderActive}`,
    cursor: "move",
  },
  selectedGrid: {
    border: `3px dashed ${tokens.colorPaletteDarkGreenBorderActive}`,
  },
});