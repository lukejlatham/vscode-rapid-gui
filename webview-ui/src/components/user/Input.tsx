import {useNode, UserComponent} from '@craftjs/core';
import {InputProps, inputSchema} from '../../types';
import { InputSettings } from './Settings/InputSettings';

export const Input: UserComponent<InputProps> = (props) => {
    const validatedProps = inputSchema.parse(props);
    const { fontSize, fontColor, backgroundColor, placeholder, borderRadius, borderColor } = validatedProps;
    
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
            borderColor: borderColor,
        }}
        />
    );
};

export const InputDefaultProps: InputProps = {
    fontSize: 16,
    fontColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    placeholder: 'Enter text here...',
    borderRadius: 4,
};

Input.craft = {
    displayName: 'Single Line Input',
    props: InputDefaultProps,
    related: {
        settings: InputSettings,
    },
};