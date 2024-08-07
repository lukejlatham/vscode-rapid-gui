import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import { TextBoxProps, textBoxSchema } from '../../types';
import { TextBoxSettings } from './Settings/TextboxSettings';

const useStyles = makeStyles({
    textBox: {
        resize: "both",
        fontFamily: "inherit",
    },
});

export const TextBox: UserComponent<TextBoxProps> = (props) => {
    const validatedProps = textBoxSchema.parse(props);

    const { text, fontSize, fontColor, backgroundColor, borderColor, placeholder, borderRadius } = validatedProps;
    
    const {
        connectors: { connect, drag },
    } = useNode((node) => ({
        selected: node.events.selected,
        dragged: node.events.dragged
    }));

    const styles = useStyles();

    return (
            <textarea
                ref={(ref: HTMLTextAreaElement | null) => ref && connect(drag(ref))}
                placeholder={placeholder}
                className={styles.textBox}
                style={{
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                    backgroundColor: backgroundColor,
                    borderRadius: `${borderRadius}px`,
                    borderColor: `${borderColor}`,
                }}
            >
                {text}
            </textarea>
    );
};

export const TextBoxDefaultProps: TextBoxProps = {
    text: '',
    fontSize: 16,
    fontColor: 'black',
    backgroundColor: '#FFFFFF',
    placeholder: 'Placeholder...',
    height: 100,
    width: 200,
    borderRadius: 5,
    borderColor: 'black',
}

TextBox.craft = {
    displayName: 'Multi-line Input',
    props: TextBoxDefaultProps,
    related: {
        settings: TextBoxSettings
    }
}