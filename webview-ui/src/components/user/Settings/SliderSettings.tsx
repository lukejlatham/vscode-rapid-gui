import React from 'react';
import { useNode } from '@craftjs/core';
import { SliderProps, TooltipConfigSlider } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

export const SliderSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as SliderProps
    }));

    const tooltips: TooltipConfigSlider[] = [
        { label: "Header", content: "Edit the header for the slider.", propKey: "header", type: "text" },
        { label: "Minimum Value", content: "Set the minimum value for the slider.", propKey: "min", type: "slider" },
        { label: "Maximum Value", content: "Set the maximum value for the slider.", propKey: "max", type: "slider" },
        { label: "Step", content: "Set the step value for the slider.", propKey: "step", type: "slider" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "slider" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
        { label: "Slider Color", content: "Adjust the color of the slider.", propKey: "backgroundColor", type: "color" },
    ];


    return (
        <ComponentSettings componentProps={props} tooltips={tooltips}/>
    );
};