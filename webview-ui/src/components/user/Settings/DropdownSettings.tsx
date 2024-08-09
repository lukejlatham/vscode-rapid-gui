import { useNode } from '@craftjs/core';
import { DropdownProps, TooltipConfigDropdown } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

export const DropdownSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as DropdownProps
    }));


    const tooltips: TooltipConfigDropdown[] = [
        { label: "Header", content: "Edit the header of the dropdown.", propKey: "header", type: "text" },
        { label: "Number of Options", content: "Adjust the number of options to display in the dropdown.", propKey: "numberOfOptions", type: "spinButton" },
        { label: "Option Labels", content: "Edit the label for each option.", propKey: "optionLabels", type: "options" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
    ];


    return (
       <ComponentSettings componentProps={props} tooltips={tooltips} />
    );
}
