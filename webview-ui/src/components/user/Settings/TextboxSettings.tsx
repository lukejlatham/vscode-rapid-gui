import React from 'react';
import { useNode } from '@craftjs/core';
import { TooltipConfigTextbox as TooltipConfig, TextBoxProps } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

export const TextBoxSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as TextBoxProps
    }));

 

    const tooltips: TooltipConfig[] = [
        { label: "Placeholder", content: "Edit the text that appears before a user inputs text.", propKey: "placeholder", type: "text" },
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Change the text color.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Change the color of the box.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the color of the border.", propKey: "borderColor", type: "color" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the textbox are.", propKey: "borderRadius", type: "spinButton" },
    ];

    return (
        <ComponentSettings componentProps={props} tooltips={tooltips} />
    );
}
