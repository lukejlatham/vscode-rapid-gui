import {useNode, UserComponent} from '@craftjs/core';
import {InputProps, inputSchema} from '../../types';
import { InputSettings } from './Settings/InputSettings';

export const UserInput: UserComponent<InputProps> = (props) => {
    const validatedProps = inputSchema.parse(props);
    const { fontSize, fontColor, backgroundColor, placeholder, borderRadius } = validatedProps;
    
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    return (
        <input
        ref={(ref: HTMLInputElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }}
        placeholder={placeholder}
        style={{
            fontSize: fontSize,
            color: fontColor,
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            border: 'none',
        }}
        />
    );
};

export const InputDefaultProps: InputProps = {
    fontSize: 16,
    fontColor: '#000000',
    backgroundColor: '#FFFFFF',
    placeholder: 'Enter text here...',
    borderRadius: 2,
};

UserInput.craft = {
    displayName: 'Input',
    props: InputDefaultProps,
    related: {
        settings: InputSettings,
    },
};