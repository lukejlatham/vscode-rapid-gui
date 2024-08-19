import { makeStyles, tokens } from "@fluentui/react-components";

export const useSelected = makeStyles({
  select: {
    outline: `3px dashed ${tokens.colorPaletteDarkGreenBorderActive}`,
    cursor: "move",
    backgroundColor: tokens.colorNeutralShadowKey,
    color: tokens.colorNeutralForeground1,
  },
  selectedGrid: {
    border: `3px dashed ${tokens.colorPaletteDarkGreenBorderActive}`,
  },
});