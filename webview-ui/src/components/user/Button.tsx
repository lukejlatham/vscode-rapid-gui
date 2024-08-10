import { useNode, UserComponent, Element } from "@craftjs/core";
import { makeStyles} from "@fluentui/react-components";
import { buttonSchema, ButtonProps } from '../../types';
import { ButtonSettings } from "./Settings/ButtonSettings";
import { Icon, IconDefaultProps } from "./Icon";

const useStyles = makeStyles({
    container: {
        display: "flex",
    },
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
    const { connectors: { connect, drag } } = useNode();
    const styles = useStyles();

    return (
            <button
                ref={(ref: HTMLButtonElement | null) => {
                    if (ref) {
                        connect(drag(ref));
                    }
                }}
                className={styles.button}
                style={{
                    color: fontColor,
                    backgroundColor,
                    fontSize: `${fontSize}px`,
                    borderRadius: `${borderRadius}px`,
                    width: `${width}%`,
                    height: `${height}%`,
                    border: `2px solid ${bordercolor}`,
                    boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
                }}
            >   
            {icon ==="left" && <Element id="button_icon" is={Icon} {...IconDefaultProps} />}
                {text}
            {icon ==="right" && <Element id="button_icon" is={Icon} {...IconDefaultProps} />}
            </button>
    );
}

export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#778899",
    fontColor: "#FFFFFF",
    displayName: "Button",
    fontSize: 20,
    borderRadius: 4,
    text: "New Button",
    width: 60,
    height: 12,
    alignment: "left",
    icon: "none",
    bordercolor: "#666666",
    shadowColor: "transparent",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,

};

(Button as any).craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};
