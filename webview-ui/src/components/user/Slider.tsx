import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import { SliderProps, sliderSchema } from '../../types';
import { SliderSettings } from './Settings/SliderSettings';


export const Slider: UserComponent<SliderProps> = (props) => {
    const validatedProps = sliderSchema.parse(props);

    const { header, min, max, step, fontSize, fontColor } = validatedProps;

    const { connectors: { connect, drag } } = useNode();

    // const styles = useStyles();


    return (
        <div
            // className={styles.slider}
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
        >
            <label htmlFor={header} style={{ fontSize: `${fontSize}px`, color: fontColor }}>{header}</label>
            <input
                type="range"
                id={header}
                min={min}
                max={max}
                step={step}
                style={{ fontSize: `${fontSize}px`, color: fontColor }}
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
};

Slider.craft = {
    displayName: 'Slider',
    props: SliderDefaultProps,
    related: {
        settings: SliderSettings,
    }
}