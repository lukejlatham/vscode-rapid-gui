import { makeStyles, tokens } from "@fluentui/react-components";

export const useSelected = makeStyles({
    select: {
        border: `3px dashed ${tokens.colorNeutralStroke1} !important`,
        cursor: "move",
        padding: "2px",
    },
});