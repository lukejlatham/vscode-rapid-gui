//types
import * as VscIcons from "react-icons/vsc";
import { z } from "zod";
import { SerializedNodes } from "@craftjs/core";

type VscIconKeys = keyof typeof VscIcons;

export const backgroundSchema = z.object({
  backgroundColor: z.string().default("#292929"),
  layout: z.array(z.any()).default([
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 1, y: 0, w: 1, h: 1 },
    { i: "2", x: 2, y: 0, w: 1, h: 1 },
    { i: "3", x: 0, y: 1, w: 1, h: 1 },
    { i: "4", x: 1, y: 1, w: 1, h: 1 },
    { i: "5", x: 2, y: 1, w: 1, h: 1 },
  ]),
  rows: z.number().default(3),
  columns: z.number().default(3),
  lockedGrid: z.boolean().default(true),
  additionalProps: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]))
    .optional(),
  key: z.any().optional(),
});

export type BackgroundProps = z.infer<typeof backgroundSchema>;

export const buttonSchema = z.object({
  backgroundColor: z.string().default("lightslategrey"),
  fontSize: z.number().default(20),
  fontColor: z.string().default("white"),
  borderRadius: z.number().default(4),
  width: z.number().default(20),
  height: z.number().default(10),
  text: z.string().optional(),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  displayName: z.string().optional().default("Button"),
  iconPosition: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .default("left"),
  selectedIcon: z
    .string()
    .transform((val) => (val in VscIcons ? val : "VscCircle"))
    .default("VscCircle") as z.ZodType<VscIconKeys>,
  bordercolor: z.string().optional().default("white"),
  shadowColor: z.string().optional().default("black"),
  shadowOffsetX: z.number().optional().default(1),
  shadowOffsetY: z.number().optional().default(1),
  shadowBlur: z.number().optional().default(3),
  hyperlink: z.string().optional(),
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
}

export const checkboxesSchema = z.object({
  header: z.string().default(""),
  optionLabels: z.array(z.string()).default([]),
  numberOfBoxes: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("column"),
});

export type CheckboxesProps = z.infer<typeof checkboxesSchema>;

export const containerSchema = z.object({
  height: z.number().default(100),
  width: z.number().default(100),
  flexDirection: z.enum(["row", "column"]).default("row").optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional()
    .default("space-around"),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional().default("center"),
  gap: z.number().optional().default(10),
  backgroundColor: z.string().default("ghostwhite"),
  borderRadius: z.number().default(5),
  borderColor: z.string().optional().default("black"),
  padding: z.number().default(5),
  shadowColor: z.string().optional().default("black"),
  shadowOffsetX: z.number().optional().default(1),
  shadowOffsetY: z.number().optional().default(1),
  shadowBlur: z.number().optional().default(3),
  children: z.any().optional(),
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
  optionLabels: z.array(z.string()).default([]),
  numberOfOptions: z.number().default(1),
  fontSize: z.number().default(18),
  fontColor: z.string().default("black"),
});

export type DropdownProps = z.infer<typeof dropdownSchema>;

export type GridCellProps = z.infer<typeof gridCellSchema>;

export const inputSchema = z.object({
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("white"),
  borderColor: z.string().default("black"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
});

export type InputProps = z.infer<typeof inputSchema>;

export const labelSchema = z.object({
  text: z.string().default("Label"),
  fontSize: z.number().default(22),
  fontColor: z.string().default("black"),
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
  numberOfButtons: z.number().default(2),
  optionLabels: z.array(z.string()).default([]),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("column"),
});

export type RadioButtonProps = z.infer<typeof radioButtonSchema>;

export const sliderSchema = z.object({
  header: z.string().default(""),
  min: z.number().default(0),
  max: z.number().default(100),
  step: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("lightslategray"),
});

export type SliderProps = z.infer<typeof sliderSchema>;

export const textBoxSchema = z.object({
  text: z.string().default(""),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("#FFFFFF"),
  borderColor: z.string().default("black"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
  height: z.number().default(100),
  width: z.number().default(100),
});

export type TextBoxProps = z.infer<typeof textBoxSchema>;

export const iconSchema = z.object({
  selectedIcon: z
    .string()
    .transform((val) => (val in VscIcons ? val : "VscCircle"))
    .default("VscCircle") as z.ZodType<VscIconKeys>,
  iconSize: z.number().optional().default(24),
  iconColor: z.string().optional().default("lightslategrey"),
  hyperlink: z.string().optional().default(""),
});

export type IconProps = z.infer<typeof iconSchema>;

export const imageSchema = z.object({
  src: z.string().default(`https://placehold.co/400`),
  alt: z.string().default("Placeholder image"),
  width: z.number().default(80),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

export type ImageProps = z.infer<typeof imageSchema>;

export const textSchema = z.object({
  text: z
    .string()
    .default(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  bold: z.boolean().optional().default(false),
  italic: z.boolean().optional().default(false),
  underline: z.boolean().optional().default(false),
  hyperlink: z.string().optional().default(""),
  userEditable: z.boolean().optional().default(true),
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
  type: "color" | "spinButton" | "text" | "textAlign" | "slider";
};

export type TooltipConfigTextbox = {
  label: string;
  content: string;
  propKey: keyof TextBoxProps;
  type: "color" | "spinButton" | "text" | "slider";
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
  type: "spinButton" | "text" | "slider";
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

// Used in getSectionChildrenOpenai.ts

export const generatedElements = z.object({
  type: z.enum([
    "Button",
    "Label",
    "Image",
    // "TextBox",
    "RadioButtons",
    "Checkboxes",
    "Input",
    "Text",
    "Icon",
    "Slider",
    "Dropdown",
  ]),
});

export const generatedSectionChildren = z.object({
  section: z.string(),
  children: z.array(generatedElements).max(8),
});

export const generatedAllSectionsChildren = z.object({
  sections: z.array(generatedSectionChildren).min(2).max(6),
});

// Used in getSectionChildrenWithProps.ts

export const backgroundNodeLayout = z.object({
  w: z.number().int(),
  h: z.number().int(),
  x: z.number().int(),
  y: z.number().int(),
  i: z.string(),
  moved: z.boolean().default(false),
  static: z.boolean().default(false),
  maxW: z.number().int().optional(),
  maxH: z.number().int().optional(),
});

export const nodeTreeRootSchema = z.object({
  type: z.object({
    resolvedName: z.string(),
  }),
  isCanvas: z.boolean(),
  props: z.object({
    rows: z.number().int(),
    columns: z.number().int(),
    lockedGrid: z.boolean(),
    backgroundColor: z.string(),
    layout: z.array(backgroundNodeLayout),
  }),
  displayName: z.string(),
  custom: z.record(z.any()),
  parent: z.undefined(),
  hidden: z.boolean(),
  nodes: z.array(z.string()),
  linkedNodes: z.record(z.string()),
});

export const craftjsNodeSchema = z.object({
  type: z.object({
    resolvedName: z.string(),
  }),
  isCanvas: z.boolean(),
  props: z.record(z.string(), z.any()),
  displayName: z.string(),
  custom: z.record(z.any()),
  hidden: z.boolean(),
  nodes: z.array(z.string()),
  linkedNodes: z.record(z.string()),
  parent: z.string(),
});

// Used in applyTheming.ts

export type ColorScheme = {
  sectionColors: {
    main: string | string[];
    lightaccent: string | string[];
    darkaccent: string | string[];
  };
  sectionBorderColors: {
    main: string | string[];
    lightaccent: string | string[];
    darkaccent: string | string[];
  };
  elementColors: {
    main: string | string[];
    lightaccent: string | string[];
    darkaccent: string | string[];
  };
  elementBorderColors: {
    main: string | string[];
    lightaccent: string | string[];
    darkaccent: string | string[];
  };
  fontColors: {
    main: string | string[];
    lightaccent: string | string[];
    darkaccent: string | string[];
  };
};

export const themedSectionSchema = z.object({
  section: z.string(),
  xPosition: z.number().int().max(10),
  yPosition: z.number().int().max(10),
  width: z.number().int().max(10),
  height: z.number().int().max(10),
  flexDirection: z.enum(["row", "column"]),
  backgroundColor: z.string(),
  borderColor: z.string(),
  children: z.array(z.any()),
});

export type ThemedSectionSchema = z.infer<typeof themedSectionSchema>;

export const themedLayoutSchema = z.array(themedSectionSchema).max(6);

export type ThemedLayoutSchema = z.infer<typeof themedSectionSchema>;

export * from "./generateLayoutTypes";
