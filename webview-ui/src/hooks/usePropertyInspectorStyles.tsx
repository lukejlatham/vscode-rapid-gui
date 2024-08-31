import { makeStyles, tokens } from "@fluentui/react-components";

export const usePropertyInspectorStyles = makeStyles({
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '5px',
    },
    colorInput: {
        width: "100%",
        borderRadius: "4px",
        height: "35px",
    },
    spinButton: {
        width: "95%",
    },
    textInput: {
        width: "100%",
    },
    visible: {
        color: tokens.colorBrandForegroundLinkSelected,
    },
    label: {
        display: "flex",
        flexDirection: "row",
        columnGap: tokens.spacingVerticalS,
        color: tokens.colorNeutralForeground1,
    },
    numberInput: {
        width: "100%",
    },
    optionLabels: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    addAndLockButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "10px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10px",
        padding: "8px",
    },
    sliderSection: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    slider: {
        flexGrow: 2,
    },
    sliderSpinButton: {
        width: "20%",
    },
    srcDropdown: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
    },
    imageUploaded: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
    },
    textarea: {
        width: "100%",
        height: "100px",
    },
});