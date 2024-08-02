import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import { TextBoxProps, textBoxSchema } from '../../types';
import { TextBoxSettings } from './Settings/TextboxSettings';

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
    textBox: {
        width: "100%",
        resize: "none",
    },
});

export const TextBox: UserComponent<TextBoxProps> = (props) => {
    const validatedProps = textBoxSchema.parse(props);

    const { text, fontSize, fontColor, backgroundColor, placeholder, height, width, borderRadius, alignment } = validatedProps;
    
    const {
        connectors: { connect, drag },
    } = useNode((node) => ({
        selected: node.events.selected,
        dragged: node.events.dragged
    }));

    const styles = useStyles();

    return (
        <div
            ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
            className={`${styles.container} ${alignment === "left" ? styles.justifyLeft : alignment === "center" ? styles.justifyCenter : styles.justifyRight}`}
        >
            <textarea
                placeholder={placeholder}
                className={styles.textBox}
                style={{
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                    backgroundColor: backgroundColor,
                    borderRadius: `${borderRadius}px`
                }}
            >
                {text}
            </textarea>
        </div>
    );
};

export const TextBoxDefaultProps: TextBoxProps = {
    text: '',
    fontSize: 16,
    fontColor: 'black',
    backgroundColor: 'white',
    placeholder: 'Placeholder...',
    height: 100,
    width: 200,
    borderRadius: 5,
    alignment: "left"
}

TextBox.craft = {
    displayName: 'TextBox',
    props: TextBoxDefaultProps,
    related: {
        settings: TextBoxSettings
    }
}