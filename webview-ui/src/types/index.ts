//types
import * as VscIcons from "react-icons/vsc";
import { z } from "zod";
import { SerializedNodes } from "@craftjs/core";
import { tokens } from "@fluentui/react-theme";

type VscIconKeys = keyof typeof VscIcons;

export const backgroundSchema = z.object({
  backgroundColor: z.string().default(tokens.colorNeutralBackground3),
  layout: z.array(z.any()).default([]),
  rows: z.number().default(3),
  columns: z.number().default(3),
  lockedGrid: z.boolean().default(false),
  visibleGrid: z.boolean().default(true),
  additionalProps: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]))
    .optional(),
  key: z.any().optional(),
});

export type BackgroundProps = z.infer<typeof backgroundSchema>;

export const buttonSchema = z.object({
  backgroundColor: z.string().default(tokens.colorBrandForeground2Pressed), // matches
  fontSize: z.number().default(24), // updated from 20 to 24
  fontFamily: z.string().default("Open Sans"), // matches
  fontColor: z.string().default(tokens.colorBrandBackground2), // updated from "white" to tokens.colorBrandBackground2
  borderRadius: z.number().default(4), // matches
  width: z.number().default(15), // updated from 20 to 15
  height: z.number().default(10), // matches
  text: z.string().optional(), // matches, no default value specified
  alignment: z.enum(["left", "center", "right"]).default("left"), // updated from "center" to "left"
  displayName: z.string().optional().default("Button"), // matches
  iconPosition: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .default("left"), // matches
  vscIcon: z
    .string()
    .transform((val) => (val in VscIcons ? val : "VscInfo"))
    .default("VscInfo") as z.ZodType<VscIconKeys>, // matches
  bordercolor: z.string().optional().default("transparent"), // updated from "white" to "transparent"
  shadowColor: z.string().default(tokens.colorNeutralShadowKeyDarker), // matches
  shadowOffsetX: z.number().optional().default(1), // matches
  shadowOffsetY: z.number().optional().default(1), // matches
  shadowBlur: z.number().optional().default(1), // updated from 3 to 1
  hyperlink: z.string().optional(), // matches, no default value specified
});

export type ButtonProps = z.infer<typeof buttonSchema>;

export type ComponentProps =
  | ButtonProps
  | CheckboxesProps
  | ContainerProps
  | GridCellProps
  | DropdownProps
  | IconProps
  | ImageProps
  | InputProps
  | LabelProps
  | RadioButtonProps
  | SliderProps
  | TextBoxProps
  | TextProps;
export type TooltipConfigs =
  | TooltipConfigButton
  | TooltipConfigCheckboxes
  | TooltipConfigContainer
  | TooltipConfigDropdown
  | TooltipConfigGridCell
  | TooltipConfigIcon
  | TooltipConfigLabel
  | TooltipConfigImage
  | TooltipConfigInput
  | TooltipConfigRadio
  | TooltipConfigSlider
  | TooltipConfigText
  | TooltipConfigTextbox;

export interface ComponentSettingsProps {
  componentProps: ComponentProps;
  tooltips: TooltipConfigs[];
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
}

export const checkboxesSchema = z.object({
  header: z.string().default(""),
  fontFamily: z.string().default("Open Sans"),
  optionLabels: z.array(z.string()).default(["Option 1", "Option 2"]),
  numberOfBoxes: z.number().default(2),
  fontSize: z.number().default(14),
  fontColor: z.string().default(tokens.colorBrandForeground2Pressed),
  direction: z.enum(["row", "column"]).default("column"),
});

export type CheckboxesProps = z.infer<typeof checkboxesSchema>;

export const containerSchema = z.object({
  height: z.number().default(50), // updated from 100 to 50
  width: z.number().default(100), // matches
  flexDirection: z.enum(["row", "column"]).default("row"),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional()
    .default("space-around"), // matches
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional().default("center"), // matches
  gap: z.number().optional().default(10), // matches
  backgroundColor: z.string().default(tokens.colorNeutralBackground3Selected), // updated to tokens.colorNeutralBackground3Selected
  borderRadius: z.number().default(5), // matches
  borderColor: z.string().optional().default("transparent"), // updated from "black" to "transparent"
  padding: z.number().default(5), // matches
  shadowColor: z.string().default(tokens.colorNeutralShadowKeyDarker), // matches
  shadowOffsetX: z.number().optional().default(1), // matches
  shadowOffsetY: z.number().optional().default(1), // matches
  shadowBlur: z.number().optional().default(1), // updated from 3 to 1
  children: z.any().optional(), // matches
});

export type ContainerProps = z.infer<typeof containerSchema>;

export const gridCellSchema = z.object({
  children: z.any().optional(),
  flexDirection: z.enum(["row", "column"]).optional().default("row"),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional()
    .default("center"),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional().default("center"),
  gap: z.number().optional().default(10),
});

export const dropdownSchema = z.object({
  header: z.string().default(""),
  fontFamily: z.string().default("Open Sans"),
  optionLabels: z.array(z.string()).default(["Option 1", "Option 2"]),
  numberOfOptions: z.number().default(2),
  fontSize: z.number().default(14),
  fontColor: z.string().default(tokens.colorBrandForeground2Pressed),
});

export type DropdownProps = z.infer<typeof dropdownSchema>;

export type GridCellProps = z.infer<typeof gridCellSchema>;

export const inputSchema = z.object({
  fontSize: z.number().default(14),
  fontFamily: z.string().default("Open Sans"),
  fontColor: z.string().default(tokens.colorBrandBackground2),
  backgroundColor: z.string().default(tokens.colorBrandForeground2Pressed),
  borderColor: z.string().default(tokens.colorBrandBackground2),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
});

export type InputProps = z.infer<typeof inputSchema>;

export const labelSchema = z.object({
  text: z.string().default("Title"),
  fontSize: z.number().default(24),
  fontFamily: z.string().default("Open Sans"),
  fontColor: z.string().default(tokens.colorBrandForeground2Pressed),
  userEditable: z.boolean().optional().default(true),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  icon: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .optional()
    .default("none"),
  hyperlink: z.string().optional().default(""),
  bold: z.boolean().optional().default(true),
  italic: z.boolean().optional().default(false),
  underline: z.boolean().optional().default(false),
});

export type LabelProps = z.infer<typeof labelSchema>;

export const radioButtonSchema = z.object({
  header: z.string().default(""),
  fontFamily: z.string().default("Open Sans"),
  numberOfButtons: z.number().default(2),
  optionLabels: z.array(z.string()).default(["Option 1", "Option 2"]),
  fontSize: z.number().default(14),
  fontColor: z.string().default(tokens.colorBrandForeground2Pressed),
  direction: z.enum(["row", "column"]).default("column"),
});

export type RadioButtonProps = z.infer<typeof radioButtonSchema>;

export const sliderSchema = z.object({
  header: z.string().default(""),
  fontFamily: z.string().default("Open Sans"),
  min: z.number().default(0),
  max: z.number().default(100),
  step: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default(tokens.colorBrandForeground2Pressed),
  backgroundColor: z.string().default(tokens.colorBrandForeground2Pressed),
});

export type SliderProps = z.infer<typeof sliderSchema>;

export const textBoxSchema = z.object({
  text: z.string().default(""),
  fontSize: z.number().default(14),
  fontFamily: z.string().default("Open Sans"),
  fontColor: z.string().default(tokens.colorBrandBackground2),
  backgroundColor: z.string().default(tokens.colorBrandForeground2Pressed),
  borderColor: z.string().default(tokens.colorBrandForeground2Pressed),
  placeholder: z.string().default("Enter text..."),
  borderRadius: z.number().default(4),
  height: z.number().default(100),
  width: z.number().default(100),
});

export type TextBoxProps = z.infer<typeof textBoxSchema>;

export const iconSchema = z.object({
  vscIcon: z
    .string()
    .transform((val) => (val in VscIcons ? val : "VscInfo"))
    .default("VscInfo") as z.ZodType<VscIconKeys>,
  iconSize: z.number().default(44),
  iconColor: z.string().default(tokens.colorBrandForeground2Pressed),
  hyperlink: z.string().default(""),
});

export type IconProps = z.infer<typeof iconSchema>;

export const imageSchema = z.object({
  src: z.string().default(`https://placehold.co/400`),
  alt: z.string().default("Placeholder image"),
  width: z.number().default(80),
  alignment: z.enum(["left", "center", "right"]).optional(),
  isLoading: z.boolean().default(false),
});

export type ImageProps = z.infer<typeof imageSchema>;

export const textSchema = z.object({
  text: z
    .string()
    .default(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),
  fontSize: z.number().default(14),
  fontFamily: z.string().default("Open Sans"),
  fontColor: z.string().default(tokens.colorBrandForeground2Pressed),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  bold: z.boolean().default(false),
  italic: z.boolean().default(false),
  underline: z.boolean().default(false),
  hyperlink: z.string().default(""),
  userEditable: z.boolean().default(true),
});

export type TextProps = z.infer<typeof textSchema>;

export interface ContentEditableEvent {
  target: { value: string };
}

export interface TooltipConfigBackground {
  label: string;
  content: string;
  propKey: keyof BackgroundProps;
  type: "color" | "spinButton" | "text" | "button";
}

export type TooltipConfigButton = {
  label: string;
  content: string;
  propKey: keyof ButtonProps;
  type: "color" | "spinButton" | "text" | "icon" | "slider";
};

export type TooltipConfigCheckboxes = {
  label: string;
  content: string;
  propKey: keyof CheckboxesProps;
  type: "color" | "spinButton" | "text" | "options" | "direction" | "slider";
};

export type TooltipConfigGridCell = {
  label: string;
  content: string;
  propKey: keyof GridCellProps;
  type: "color" | "spinButton" | "text" | "alignItems" | "justifyContent" | "direction" | "slider";
};

export type TooltipConfigInput = {
  label: string;
  content: string;
  propKey: keyof InputProps;
  type: "color" | "spinButton" | "text" | "alignment" | "slider";
};

export type TooltipConfigLabel = {
  label: string;
  content: string;
  propKey: keyof LabelProps;
  type: "color" | "spinButton" | "text" | "textAlign" | "icon" | "slider";
};

export type TooltipConfigText = {
  label: string;
  content: string;
  propKey: keyof TextProps;
  type: "color" | "spinButton" | "textarea" | "textAlign" | "slider" | "text";
};

export type TooltipConfigTextbox = {
  label: string;
  content: string;
  propKey: keyof TextBoxProps;
  type: "color" | "spinButton" | "textarea" | "slider" | "text";
};

export type TooltipConfigRadio = {
  label: string;
  content: string;
  propKey: keyof RadioButtonProps;
  type: "color" | "spinButton" | "text" | "options" | "direction" | "slider";
};

export type TooltipConfigDropdown = {
  label: string;
  content: string;
  propKey: keyof DropdownProps;
  type: "color" | "spinButton" | "text" | "options" | "slider";
};

export type TooltipConfigIcon = {
  label: string;
  content: string;
  propKey: keyof IconProps;
  type: "color" | "spinButton" | "text" | "slider";
};

export interface TooltipConfigImage {
  label: string;
  content: string;
  propKey: keyof ImageProps;
  type: "spinButton" | "text" | "slider" | "dropdown";
}

export interface TooltipConfigContainer {
  label: string;
  content: string;
  propKey: keyof ContainerProps;
  type: "color" | "spinButton" | "text" | "justifyContent" | "alignItems" | "direction" | "slider";
}

export interface TooltipConfigSlider {
  label: string;
  content: string;
  propKey: keyof SliderProps;
  type: "color" | "spinButton" | "text" | "slider";
}

export interface Page {
  id: string;
  name: string;
  content: SerializedNodes;
}

export interface CanvasProps {
  classes: any;
}

export type AccessibilityContextType = {
  selectedAccessibility: "yes" | "no";
  setSelectedAccessibility: (selected: "yes" | "no") => void;
};

export * from "./generateLayoutTypes";

export * from "./themes";
