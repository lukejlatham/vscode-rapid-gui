import { useNode, UserComponent, Element } from "@craftjs/core";
import { makeStyles} from "@fluentui/react-components";
import { ButtonProps } from '../../../../types';
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

export const Button: UserComponent<ButtonProps> = ({ backgroundColor, fontSize, borderRadius, text, fontColor, width, height, bordercolor, icon }) => {
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
                    border: `1px solid ${bordercolor}`,
                }}
            >   
            {icon ==="left" && <Element id="button_icon" is={Icon} {...IconDefaultProps} />}
                {text}
            {icon ==="right" && <Element id="button_icon" is={Icon} {...IconDefaultProps} />}
            </button>
    );
}

export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#292929",
    fontColor: "#FFFFFF",
    fontSize: 20,
    borderRadius: 4,
    text: "New Button",
    width: 60,
    height: 12,
    alignment: "left",
    icon: "none",
    bordercolor: "#666666",
};

(Button as any).craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};
