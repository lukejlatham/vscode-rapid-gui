//types
import { Layout } from 'react-grid-layout';
 
export interface BackgroundProps {
    backgroundColor: string;
    layout: Layout[];
    rows: number;
    columns: number;
  }

export interface EditBackgroundButtonProps {
    nodeId: string;
}

export interface ButtonProps {
    backgroundColor: string;
    fontSize: number;
    fontColor: string;
    borderRadius: number;
    width: number;
    height: number;
    text: string;
    alignment: "left" | "center" | "right";
}

export type TooltipConfig = {
    label: string;
    content: string;
    propKey: keyof ButtonProps;
    type: 'color' | 'spinButton' | 'text' | 'alignment';
};

export interface CheckboxProps {
    label: string;
    optionLabels: string[];
    numberOfBoxes: number;
    fontSize: number;
    fontColor: string;
    direction: "row" | "column";
}

export type TooltipConfigCheckbox = {
    label: string;
    content: string;
    propKey: keyof CheckboxProps;
    type: 'color' | 'spinButton' | 'text' | 'options' | 'direction';
};