import { useNode, UserComponent } from '@craftjs/core';
import { SliderProps, sliderSchema } from '../../types';
import { SliderSettings } from './Settings/SliderSettings';
import { useSelected } from "../../hooks/useSelected";

export const Slider: UserComponent<SliderProps> = (props) => {
    const validatedProps = sliderSchema.parse(props);

    const { header, min, max, step, fontSize, fontColor, backgroundColor} = validatedProps;

    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));
    const select = useSelected();



    return (
        <div
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
            className={`${selected ? select.select : ""}`}
        >
            <label htmlFor={header} style={{ fontSize: `${fontSize}px`, color: fontColor }}>{header}</label>
            <input
                type="range"
                id={header}
                min={min}
                max={max}
                step={step}
                style={{ fontSize: `${fontSize}px`, color: fontColor, accentColor: backgroundColor }}
            />
        </div>
    );
}

export const SliderDefaultProps: SliderProps = {
    header: 'Slider',
    min: 0,
    max: 100,
    step: 1,
    fontSize: 14,
    fontColor: '#FFFFFF',
    backgroundColor: 'red',
};

Slider.craft = {
    displayName: 'Slider',
    props: SliderDefaultProps,
    related: {
        settings: SliderSettings,
    }
}