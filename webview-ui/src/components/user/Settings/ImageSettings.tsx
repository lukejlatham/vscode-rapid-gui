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
        { label: "Source", content: "Provide the source of the image. It can be either a URL or you can upload your own image.", propKey: "src", type: "dropdown" },
        { label: "Alt", content: "Provide a description of the image to be displayed if the image can't be seen. You can also generate an image from this description.", propKey: "alt", type: "text" },
        { label: "Width", content: "Change the width of the image.", propKey: "width", type: "slider" }
    ];

    return (
      <ComponentSettings componentProps={props} tooltips={tooltips} isLoading={props.isLoading}
      setIsLoading={setIsLoading} />
    );
  };
  