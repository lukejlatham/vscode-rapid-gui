import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles} from "@fluentui/react-components";
import { ButtonProps } from '../../../../types';
import { ButtonSettings } from "./Settings/ButtonSettings";


const useStyles = makeStyles({
    container: {
        display: "flex",
    },
    justifyLeft: {
        justifyContent: "flex-start",
    },
    justifyCenter: {
        justifyContent: "center",
    },
    justifyRight: {
        justifyContent: "flex-end",
    },
    button: {
        border: "none",
        textAlign: "center",
        display: "inline-block",
    },
});

export const Button: UserComponent<ButtonProps> = ({ backgroundColor, fontSize, borderRadius, text, fontColor, width, height, alignment }) => {
    const { connectors: { connect, drag } } = useNode();
    const styles = useStyles();

    return (
        <div className={`${styles.container} ${alignment === "left" ? styles.justifyLeft : alignment === "center" ? styles.justifyCenter : styles.justifyRight}`}>
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
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                {text}
            </button>
        </div>
    );
}

export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#0047AB",
    fontColor: "white",
    fontSize: 20,
    borderRadius: 4,
    text: "New Button",
    width: 150,
    height: 50,
    alignment: "left"
};

(Button as any).craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};
