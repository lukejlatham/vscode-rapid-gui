import React from 'react';
import { useNode } from '@craftjs/core';
import { ImageProps, TooltipConfigImage as TooltipConfig } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

// TODO: add tooltips to image settings
export const ImageSettings: React.FC = () => {
    const { props } = useNode((node) => ({
      props: node.data.props as ImageProps
    }));
  
    const tooltips: TooltipConfig[] = [
        { label: "Source", content: "Provide the URL of the image.", propKey: "src", type: "text" },
        { label: "Alt", content: "Provide a description of the image to be displayed if the image can't be seen.", propKey: "alt", type: "text" },
        { label: "Width", content: "Change the width of the image.", propKey: "width", type: "spinButton" },
        { label: "Height", content: "Change the height of the image.", propKey: "height", type: "spinButton" },
    ];

    return (
      <ComponentSettings componentProps={props} tooltips={tooltips}/>
    );
  };
  