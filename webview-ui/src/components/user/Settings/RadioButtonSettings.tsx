import React from 'react';
import { useNode } from '@craftjs/core';
import { RadioButtonProps, TooltipConfigRadio } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

export const RadioButtonSettings: React.FC = () => {

    const { props } = useNode(node => ({
        props: node.data.props as RadioButtonProps
    }));

    const tooltips: TooltipConfigRadio[] = [
        { label: "Header", content: "Edit the header for the radio buttons.", propKey: "header", type: "text" },
        { label: "Number of Buttons", content: "Adjust the number of buttons to display.", propKey: "numberOfButtons", type: "spinButton" },
        { label: "Button Labels", content: "Edit the label for each radio button option.", propKey: "optionLabels", type: "options" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
        { label: "Direction", content: "Set if you want the buttons to be displayed in a row or a column.", propKey: "direction", type: "direction" },
    ];


    return (
        <ComponentSettings componentProps={props} tooltips={tooltips} />
    );
};
