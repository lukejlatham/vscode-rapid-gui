import { useNode } from '@craftjs/core';
import { InputProps, TooltipConfigInput } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

export const InputSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as InputProps
    }));

    const tooltips: TooltipConfigInput[] = [
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Change the text color.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Change the background color.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the border color.", propKey: "borderColor", type: "color" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the textbox are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Placeholder", content: "Edit the text that appears before a user inputs text", propKey: "placeholder", type: "text" },
    ];

    return (
       <ComponentSettings componentProps={props} tooltips={tooltips} />
    );
};