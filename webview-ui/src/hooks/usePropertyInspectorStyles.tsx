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
        color: tokens.colorNeutralForeground2BrandSelected,
    },
    label: {
        display: "flex",
        flexDirection: "row",
        columnGap: tokens.spacingVerticalS,
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
        gap: "5px",
    },
    activeButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "10px",
    },
    sliderSection: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    slider: {
        flexGrow: 1,
    }
});