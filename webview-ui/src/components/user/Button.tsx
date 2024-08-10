import { useNode, UserComponent, Element } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { buttonSchema, ButtonProps } from '../../types';
import { ButtonSettings } from "./Settings/ButtonSettings";
import { Icon, IconDefaultProps } from "./Icon";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
    button: {
        border: "none",
        textAlign: "center",
        display: "flex",
        gap: "5px",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        maxHeight: "100%",
        cursor: "pointer",
    },
});

export const Button: UserComponent<ButtonProps> = (props) => {
    const validatedProps = buttonSchema.parse(props);

    const { backgroundColor, fontColor, fontSize, borderRadius, text, width, height, bordercolor, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, icon } = validatedProps;
    const { connectors: { connect, drag }, selected } = useNode((node) => ({
        selected: node.events.selected,
    }));

    const styles = useStyles();
    const select = useSelected();

    return (
        <div
        className={`${selected ? select.select : ""}`}
        >
            <button
                ref={(ref: HTMLButtonElement | null) => {
                    if (ref) {
                        connect(drag(ref));
                    }
                }}
                className={`${styles.button} ${selected ? select.select : ""}`}
                style={{
                    color: fontColor,
                    backgroundColor,
                    fontSize: `${fontSize}px`,
                    borderRadius: `${borderRadius}px`,
                    padding: `${height}px ${width}px`,
                    border: `2px solid ${bordercolor}`,
                    boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
                }}
            >
                {icon === "left" && <Element id="button_icon" is={Icon} {...IconDefaultProps} />}
                {text}
                {icon === "right" && <Element id="button_icon" is={Icon} {...IconDefaultProps} />}
            </button>
        </div>
    );
}

export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#778899",
    fontColor: "#FFFFFF",
    displayName: "Button",
    fontSize: 20,
    borderRadius: 4,
    text: "New Button",
    width: 10,
    height: 10,
    alignment: "left",
    icon: "none",
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
