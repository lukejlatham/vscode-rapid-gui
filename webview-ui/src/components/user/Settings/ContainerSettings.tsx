import React from 'react';
import { useNode } from '@craftjs/core';
import { ContainerProps, TooltipConfigContainer as TooltipConfig } from '../../../types';
import { ComponentSettings } from './ComponentSettings';


export const ContainerSettings: React.FC = () => {
    const { props } = useNode(node => ({
        props: node.data.props as ContainerProps
    }));

    const tooltips: TooltipConfig[] = [
        { label: "Background Color", content: "Change the background color of the container.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the border color of the container.", propKey: "borderColor", type: "color" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the container are.", propKey: "borderRadius", type: "slider" },
        { label: "Height", content: "Set the height of the container.", propKey: "height", type: "slider" },
        { label: "Width", content: "Set the width of the container.", propKey: "width", type: "slider" },
        { label: "Padding", content: "Adjust the padding of the container.", propKey: "padding", type: "slider" },
        { label: "Direction", content: "Set the direction of the contents of the container.", propKey: "flexDirection", type: "direction"},
        { label: "Justify Content", content: "Set how the contents of the container should be justified.", propKey: "justifyContent", type: "justifyContent"},
        { label: "Align Items", content: "Set how the contents of the container should be aligned.", propKey: "alignItems", type: "alignItems"},
        { label: "Gap", content: "Adjust the gap between components within the container.", propKey: "gap", type: "slider"},
        { label: "Shadow Color", content: "Change the color of the shadow.", propKey: "shadowColor", type: "color" },
        { label: "Shadow Offset X", content: "Set the horizontal offset of the shadow.", propKey: "shadowOffsetX", type: "slider" },
        { label: "Shadow Offset Y", content: "Set the vertical offset of the shadow.", propKey: "shadowOffsetY", type: "slider" },
        { label: "Shadow Blur", content: "Set the blur radius of the shadow.", propKey: "shadowBlur", type: "slider" },
    ];

    return (
        <ComponentSettings componentProps={props} tooltips={tooltips} />
    )
}