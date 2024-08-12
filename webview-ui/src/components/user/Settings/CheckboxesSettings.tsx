import React from 'react';
import { useNode } from '@craftjs/core';
import { CheckboxesProps, TooltipConfigCheckboxes } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

export const CheckboxesSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as CheckboxesProps
    }));


    const tooltips: TooltipConfigCheckboxes[] = [
        { label: "Header", content: "Edit the header for the checkboxes.", propKey: "header", type: "text" },
        { label: "Number of Options", content: "Adjust the number of checkboxes to display.", propKey: "numberOfBoxes", type: "spinButton" },
        { label: "Checkboxes Labels", content: "Edit the label for each checkboxes.", propKey: "optionLabels", type: "options" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "slider" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
        { label: "Direction", content: "Set if you want the checkboxes to be displayed in a row or a column.", propKey: "direction", type: "direction" },
    ];


    return (
        <ComponentSettings componentProps={props} tooltips={tooltips} />
    );
};