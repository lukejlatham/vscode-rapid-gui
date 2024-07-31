//types
import { Layout } from "react-grid-layout";
import * as VscIcons from "react-icons/vsc";

export interface BackgroundProps {
    backgroundColor: string;
    layout: Layout[];
    rows: number;
    columns: number;
    lockedGrid: boolean;
    [key: string]: string | number | Layout[] | boolean;
  }

export interface TooltipConfigBackground {
    label: string;
    content: string;
    propKey: keyof BackgroundProps;
    type: 'color' | 'spinButton' | 'text' | 'button';
};

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
  icon?: keyof typeof VscIcons;
  iconPosition?: "left" | "right";
  iconColor?: string;
  bordercolor?: string;
  shadow?: boolean;
  hyperlink?: string;
}

export type generateButtonProps = {
  width: number;
  height: number;
  text: string;
  icon?: keyof typeof VscIcons;
};

export type TooltipConfigButton = {
  label: string;
  content: string;
  propKey: keyof ButtonProps;
  type: "color" | "spinButton" | "text" | "alignment";
};

export interface CheckboxProps {
  header: string;
  optionLabels: string[];
  numberOfBoxes: number;
  fontSize: number;
  fontColor: string;
  direction: "row" | "column";
}

export interface editableCheckboxProps {
  header: string;
  optionLabels: string[];
  numberOfBoxes: number;
  direction: "row" | "column";
}

export type TooltipConfigCheckbox = {
  label: string;
  content: string;
  propKey: keyof CheckboxProps;
  type: "color" | "spinButton" | "text" | "options" | "direction";
};

export interface GridCellProps {
    id?: string;
    children?: React.ReactNode;
    flexDirection?: "row" | "column";
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    alignItems?: "flex-start" | "center" | "flex-end";
    gap?: number;
  }

export type TooltipConfigGridCell = {
    label: string;
    content: string;
    propKey: keyof GridCellProps;
    type: 'color' | 'spinButton' | 'text' | 'alignItems' | 'justifyContent' | 'direction';
};

export interface InputProps {
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  placeholder: string;
  borderRadius: number;
}

export interface generateInputProps {
  placeholder: string;
}

export type TooltipConfigInput = {
  label: string;
  content: string;
  propKey: keyof InputProps;
  type: "color" | "spinButton" | "text" | "alignment";
};

export interface LabelProps {
  text: string;
  fontSize: number;
  fontcolor: string;
  userEditable?: boolean;
  width: number;
  height: number;
  textAlign: "left" | "center" | "right" | "justify";
  icon?: keyof typeof VscIcons;
  iconPosition?: "left" | "right";
  iconColor?: string;
  hyperlink?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface generateLabelProps {
  text: string;
  fontcolor: string;
  icon?: keyof typeof VscIcons;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
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

export interface generateRadioButtonProps {
  header: string;
  numberOfButtons: number;
  optionLabels: string[];
  direction: "row" | "column";
}

export type TooltipConfigRadio = {
  label: string;
  content: string;
  propKey: keyof RadioButtonProps;
  type: "color" | "spinButton" | "text" | "options" | "direction";
};

export interface TextBoxProps {
  text: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  placeholder: string;
  borderRadius: number;
  height: number; //change to % after
  width: number; //change to % after
  alignment: "left" | "center" | "right";
}

export interface generateTextBoxProps {
  placeholder: string;
  height: number;
  width: number;
}

export type TooltipConfigText = {
  label: string;
  content: string;
  propKey: keyof TextBoxProps;
  type: "color" | "spinButton" | "text" | "alignment";
};

export interface IconProps {
  selectedIcon: keyof typeof VscIcons;
  iconSize?: number;
  iconColor?: string;
  hyperlink?: string;
}

export type TooltipConfigIcon = {
  label: string;
  content: string;
  propKey: keyof IconProps;
  type: "color" | "spinButton" | "text";
};

export interface ImageProps {
  src: string;
  alt: string;
  width: number; //change to % after
  height: number; //change to % after
  alignment?: "left" | "center" | "right";
}

export interface generateImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
}

export interface ContainerProps {
  height: number;
  width: number;
  flexDirection?: "row" | "column";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end";
  gap?: number;
  backgroundColor: string;
  borderRadius: number;
  borderColor: string;
  padding: number;
  shadow?: boolean;
  children?: React.ReactNode;
}

export interface TooltipConfigContainer {
  label: string;
  content: string;
  propKey: keyof ContainerProps;
  type: "color" | "spinButton" | "text" | "justifyContent" | "alignItems" | "direction";
}

export interface TextProps {
  text: string;
  fontSize: number;
  fontColor: string;
  textAlign: "left" | "center" | "right" | "justify";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  hyperlink?: string;
  placeholder?: string;
}

export interface generateTextProps {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}
