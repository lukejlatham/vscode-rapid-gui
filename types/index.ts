//types
import { Layout } from 'react-grid-layout';
import * as VsIcons from "react-icons/vsc";
 
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
    displayName?: string;
    icon?: keyof typeof VsIcons;
    iconPosition?: "left" | "right";
    iconColor?: string;
    bordercolor?: string;
    shadow?: boolean;
    hyperlink?: string;
}

export type TooltipConfig = {
    label: string;
    content: string;
    propKey: keyof ButtonProps;
    type: 'color' | 'spinButton' | 'text' | 'alignment';
};

export interface CheckboxProps {
    header: string;
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

export interface ContainerProps {
    children?: React.ReactNode;
    flexDirection?: "row" | "column";
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    alignItems?: "flex-start" | "center" | "flex-end";
    gap?: number;
  }

export interface InputProps {
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    placeholder: string;
    borderRadius: number;
}

export type TooltipConfigInput = {
    label: string;
    content: string;
    propKey: keyof InputProps;
    type: 'color' | 'spinButton' | 'text' | 'alignment';
};

export interface LabelProps {
    text: string;
    fontSize: number;
    color: string;
    userEditable?: boolean;
    width: number;
    height: number;
    textAlign: 'left' | 'center' | 'right' | 'justify';
  }
  
export interface ContentEditableEvent {
    target: { value: string };
  }

export interface RadioButtonProps {
    header: string;
    numberOfButtons: number;
    optionLabels: string[];
    fontSize: number;
    fontColor: string;
    direction: "row" | "column";
}

export type TooltipConfigRadio = {
    label: string;
    content: string;
    propKey: keyof RadioButtonProps;
    type: 'color' | 'spinButton' | 'text' | 'options' | 'direction';
};

export interface TextBoxProps {
    text: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    placeholder: string;
    borderRadius: number;
    rows: number;
    cols: number;
    alignment: "left" | "center" | "right";
}
export type TooltipConfigText = {
    label: string;
    content: string;
    propKey: keyof TextBoxProps;
    type: 'color' | 'spinButton' | 'text' | 'alignment';
};

export interface IconProps {
    selectedIcon: keyof typeof VsIcons;
}

export interface ImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    alignment: "left" | "center" | "right";
  }
  
export interface CardContainerProps {
    color: string;
    height: number;
    width: number;
    flexDirection?: "row" | "column";
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    alignItems?: "flex-start" | "center" | "flex-end";
    gap?: number;
    backgroundColor: string;
    borderRadius: number;
    bordercolor: string;
    padding: number;
    shadow: boolean;
}