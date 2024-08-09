import React from "react";
import { useNode } from "@craftjs/core";
import { ButtonProps, TooltipConfigButton as TooltipConfig } from "../../../types";
import { ComponentSettings } from "./ComponentSettings";

export const ButtonSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as ButtonProps
    }));
    const tooltips: TooltipConfig[] = [
        { label: "Font Color", content: "Changed the color of the text on the button.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Changed the color of the button.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the color of the border.", propKey: "bordercolor", type: "color" },
        { label: "Text", content: "Edit the text that appears in the button.", propKey: "text", type: "text" },
        { label: "Font Size", content: "Adjust the size of the text on the button.", propKey: "fontSize", type: "spinButton" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the button are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Width", content: "Set how wide the button is.", propKey: "width", type: "spinButton" },
        { label: "Height", content: "Set how tall the button is.", propKey: "height", type: "spinButton" },
        { label: "Icon", content: "Add an icon to the button. Choosing 'Left' or 'Right' will add an icon at that position.", propKey: "icon", type: "icon" },
        { label: "Shadow Color", content: "Change the color of the shadow.", propKey: "shadowColor", type: "color" },
        { label: "Shadow Offset X", content: "Set the horizontal offset of the shadow.", propKey: "shadowOffsetX", type: "spinButton" },
        { label: "Shadow Offset Y", content: "Set the vertical offset of the shadow.", propKey: "shadowOffsetY", type: "spinButton" },
        { label: "Shadow Blur", content: "Set the blur radius of the shadow.", propKey: "shadowBlur", type: "spinButton" },
        { label: "Hyperlink", content: "Add a hyperlink to the button.", propKey: "hyperlink", type: "text" },
      ];


    return (
        <ComponentSettings componentProps={props} tooltips={tooltips} />
    );
};