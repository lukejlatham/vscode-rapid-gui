import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { ImageProps, TooltipConfigImage as TooltipConfig } from '../../../types';
import { ComponentSettings } from './ComponentSettings';

// TODO: add tooltips to image settings
export const ImageSettings: React.FC = () => {
    const { props, actions: { setProp } } = useNode((node) => ({
      props: node.data.props as ImageProps
    }));

    const setIsLoading = (loading: boolean) => {
      setProp((props: ImageProps) => {
        props.isLoading = loading;
      }, 500);
    };
  
    const tooltips: TooltipConfig[] = [
        { label: "Source", content: "Provide the URL of the image.", propKey: "src", type: "text" },
        { label: "Alt", content: "Provide a description of the image to be displayed if the image can't be seen.", propKey: "alt", type: "text" },
        { label: "Width", content: "Change the width of the image.", propKey: "width", type: "slider" }
    ];

    return (
      <ComponentSettings componentProps={props} tooltips={tooltips} isLoading={props.isLoading}
      setIsLoading={setIsLoading} />
    );
  };
  