import { useNode, UserComponent, Element } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { buttonSchema, ButtonProps } from '../../types';
import { ButtonSettings } from "./Settings/ButtonSettings";
import { useSelected } from "../../hooks/useSelected";
import * as VscIcons from "react-icons/vsc";

const useStyles = makeStyles({
  buttonWrapper: {
    padding: "4px", // This creates space around the button for the selection effect
  },
  button: {
    border: "none",
    textAlign: "center",
    display: "flex",
    gap: "5px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

      },
    icon: {
        display: "inline-flex", 
        alignItems: "center", 
        verticalAlign: "middle", 
    },
    text: {
        display: "inline-flex", 
        alignItems: "center", 
    },
});

export const Button: UserComponent<ButtonProps> = (props) => {
    const validatedProps = buttonSchema.parse(props);

    const { backgroundColor, fontFamily, fontColor, fontSize, borderRadius, text, width, height, bordercolor, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, iconPosition, vscIcon } = validatedProps;
    const { connectors: { connect, drag }, selected } = useNode((node) => ({
        selected: node.events.selected,
    }));

    const styles = useStyles();
    const select = useSelected();

    const IconComponent = vscIcon ? VscIcons[vscIcon] as React.ComponentType<any> : undefined;

    return (
    <div className={`${styles.buttonWrapper} ${selected ? select.select : ""}`}>
        <button
            ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
            className={`${styles.button}`}
            style={{
                zIndex: -1,
                color: fontColor,
                backgroundColor: backgroundColor,
                fontSize: `${fontSize}px`,
                borderRadius: `${borderRadius}%`,
                padding: `${height}px ${width}px`,
                border: `2px solid ${bordercolor}`,
                boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
            }}
        >
            {iconPosition === "left" && IconComponent && (
                <span className={styles.icon}>
                    <IconComponent size={fontSize} color={fontColor} />
                </span>
            )}
            {text && (
                <span className={styles.text}
                    style={{fontFamily: fontFamily}}
                >{text}</span>
            )}
            {iconPosition === "right" && IconComponent && (
                <span className={styles.icon}>
                    <IconComponent size={fontSize} color={fontColor} />
                </span>
            )}
        </button>
    </div>
    );
};


export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#778899",
    fontFamily: "helvetica",
    fontColor: "#FFFFFF",
    displayName: "Button",
    fontSize: 20,
    borderRadius: 4,
    text: "",
    width: 10,
    height: 10,
    alignment: "left",
    iconPosition: "none",
    vscIcon: "VscPrimitiveSquare",
    bordercolor: "#666666",
    shadowColor: "transparent",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,

};

(Button as any).craft = {
    displayName: "Button",
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};
