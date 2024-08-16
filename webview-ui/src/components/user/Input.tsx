import { useNode, UserComponent} from '@craftjs/core';
import { InputProps, inputSchema} from '../../types';
import { InputSettings } from './Settings/InputSettings';
import { useSelected } from "../../hooks/useSelected";

export const Input: UserComponent<InputProps> = (props) => {
    const validatedProps = inputSchema.parse(props);
    const { fontSize, fontFamily, fontColor, backgroundColor, placeholder, borderRadius, borderColor } = validatedProps;
    
    const { connectors: { connect, drag }, selected} = useNode((state) => ({
        selected: state.events.selected,
    }));
    const select = useSelected();

    return (
        <div className={`${selected ? select.select : ""}`}>
        <input
        ref={(ref: HTMLInputElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }}
        
        placeholder={placeholder}
        style={{
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: fontColor,   
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            borderColor: borderColor,
        }}
        />
        </div>
    );
};

export const InputDefaultProps: InputProps = {
    fontSize: 16,
    fontColor: '#000000',
    fontFamily: 'helvetica',
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