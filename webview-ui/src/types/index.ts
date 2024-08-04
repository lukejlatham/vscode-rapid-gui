//types
import * as VscIcons from "react-icons/vsc";
import { z } from "zod";
import { SerializedNodes } from "@craftjs/core";

type VscIconKeys = keyof typeof VscIcons;

type IconType = VscIconKeys | "none" | "left" | "right";

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
  lockedGrid: z.boolean().default(false),
  additionalProps: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]))
    .optional(),
  key: z.any().optional(),
});

export type BackgroundProps = z.infer<typeof backgroundSchema>;

export const buttonSchema = z.object({
  backgroundColor: z.string().default("white"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  borderRadius: z.number().default(4),
  width: z.number().default(100),
  height: z.number().default(40),
  text: z.string().default("Button"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  displayName: z.string().optional(),
  icon: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .optional(),
  bordercolor: z.string().optional(),
  shadowColor: z.string().optional(),
  shadowOffsetX: z.number().optional(),
  shadowOffsetY: z.number().optional(),
  shadowBlur: z.number().optional(),
  hyperlink: z.string().optional(),
});

export type ButtonProps = z.infer<typeof buttonSchema>;

export const generateButtonSchema = z.object({
  width: z.number().default(100),
  height: z.number().default(40),
  text: z.string().default("Button"),
  icon: z
    .string()
    .refine((val) => val in VscIcons)
    .optional() as z.ZodType<VscIconKeys | undefined>,
});

export type GenerateButtonProps = z.infer<typeof generateButtonSchema>;

export const checkboxSchema = z.object({
  header: z.string().default("Checkbox Header"),
  optionLabels: z.array(z.string()).default([]),
  numberOfBoxes: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

export type CheckboxProps = z.infer<typeof checkboxSchema>;

export const generateCheckboxSchema = checkboxSchema.pick({
  header: true,
  optionLabels: true,
  numberOfBoxes: true,
  direction: true,
});

export type GenerateCheckboxProps = z.infer<typeof generateCheckboxSchema>;

export const containerSchema = z.object({
  height: z.number().default(100),
  width: z.number().default(100),
  flexDirection: z.enum(["row", "column"]).default("row").optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .default("flex-start")
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).default("flex-start").optional(),
  gap: z.number().default(0).optional(),
  backgroundColor: z.string().default("white"),
  borderRadius: z.number().default(4),
  borderColor: z.string().default("black"),
  padding: z.number().default(10),
  shadowColor: z.string().optional(),
  shadowOffsetX: z.number().optional(),
  shadowOffsetY: z.number().optional(),
  shadowBlur: z.number().optional(),
  children: z.any().optional(),
});

export type ContainerProps = z.infer<typeof containerSchema>;

export const gridCellSchema = z.object({
  id: z.string().optional(),
  children: z.any().optional(),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional(),
  gap: z.number().optional(),
});

export type GridCellProps = z.infer<typeof gridCellSchema>;

export const generateContainerSchema = containerSchema.pick({
  height: true,
  width: true,
  flexDirection: true,
  justifyContent: true,
  alignItems: true,
  gap: true,
});

export type GenerateContainerProps = z.infer<typeof generateContainerSchema>;

export const inputSchema = z.object({
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("white"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
});

export type InputProps = z.infer<typeof inputSchema>;

export const generateInputSchema = inputSchema.pick({
  placeholder: true,
});

export type GenerateInputProps = z.infer<typeof generateInputSchema>;

export const labelSchema = z.object({
  text: z.string().default("Label"),
  fontSize: z.number().default(14),
  fontcolor: z.string().default("black"),
  userEditable: z.boolean().default(true).optional(),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  icon: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .optional(),
  hyperlink: z.string().optional(),
  bold: z.boolean().default(false).optional(),
  italic: z.boolean().default(false).optional(),
  underline: z.boolean().default(false).optional(),
});

export type LabelProps = z.infer<typeof labelSchema>;

export const generateLabelSchema = labelSchema.pick({
  text: true,
  hyperlink: true,
  textAlign: true,
  bold: true,
  italic: true,
  underline: true,
});

export type GenerateLabelProps = z.infer<typeof generateLabelSchema>;

export const radioButtonSchema = z.object({
  header: z.string().default("Radio Button Header"),
  numberOfButtons: z.number().default(2),
  optionLabels: z.array(z.string()).default([]),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

export type RadioButtonProps = z.infer<typeof radioButtonSchema>;

export const generateRadioButtonSchema = radioButtonSchema.pick({
  header: true,
  optionLabels: true,
  numberOfButtons: true,
  direction: true,
});

export type GenerateRadioButtonProps = z.infer<typeof generateRadioButtonSchema>;

export const textBoxSchema = z.object({
  text: z.string().default("Text Box"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("white"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
  height: z.number().default(100),
  width: z.number().default(200),
  alignment: z.enum(["left", "center", "right"]).default("left"),
});

export type TextBoxProps = z.infer<typeof textBoxSchema>;

export const generateTextBoxSchema = textBoxSchema.pick({
  text: true,
  placeholder: true,
  alignment: true,
});

export type GenerateTextBoxProps = z.infer<typeof generateTextBoxSchema>;

export const iconSchema = z.object({
  selectedIcon: z
    .string()
    .refine((val) => val in VscIcons)
    .optional() as z.ZodType<VscIconKeys>,
  iconSize: z.number().default(24).optional(),
  iconColor: z.string().default("black").optional(),
  hyperlink: z.string().optional(),
});

export type IconProps = z.infer<typeof iconSchema>;

export const imageSchema = z.object({
  src: z.string().default("https://via.placeholder.com/150"),
  alt: z.string().default("Image"),
  width: z.number().default(150),
  height: z.number().default(150),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

export type ImageProps = z.infer<typeof imageSchema>;

export const generateImageSchema = imageSchema.pick({
  src: true,
  alt: true,
  width: true,
  height: true,
  alignment: true,
});

export type GenerateImageProps = z.infer<typeof generateImageSchema>;

export const cardContainerSchema = z.object({
  color: z.string().default("white"),
  height: z.number().default(100),
  width: z.number().default(100),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional(),
  gap: z.number().default(0).optional(),
  backgroundColor: z.string().default("white"),
  borderRadius: z.number().default(4),
  bordercolor: z.string().default("black"),
  padding: z.number().default(10),
  shadow: z.boolean().default(false),
});

export type CardContainerProps = z.infer<typeof cardContainerSchema>;

export const textSchema = z.object({
  text: z.string().default("Text"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  bold: z.boolean().optional().default(false),
  italic: z.boolean().optional().default(false),
  underline: z.boolean().optional().default(false),
  hyperlink: z.string().optional(),
  userEditable: z.boolean().optional().default(true),
});

export type TextProps = z.infer<typeof textSchema>;

export const generateTextSchema = textSchema.pick({
  text: true,
  hyperlink: true,
  textAlign: true,
  bold: true,
  italic: true,
  underline: true,
});

export type GenerateTextProps = z.infer<typeof generateTextSchema>;

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
  type: "color" | "spinButton" | "text" | "icon";
};

export type TooltipConfigCheckbox = {
  label: string;
  content: string;
  propKey: keyof CheckboxProps;
  type: "color" | "spinButton" | "text" | "options" | "direction";
};

export type TooltipConfigGridCell = {
  label: string;
  content: string;
  propKey: keyof GridCellProps;
  type: "color" | "spinButton" | "text" | "alignItems" | "justifyContent" | "direction";
};

export type TooltipConfigInput = {
  label: string;
  content: string;
  propKey: keyof InputProps;
  type: "color" | "spinButton" | "text" | "alignment";
};

export type TooltipConfigRadio = {
  label: string;
  content: string;
  propKey: keyof RadioButtonProps;
  type: "color" | "spinButton" | "text" | "options" | "direction";
};

export type TooltipConfigText = {
  label: string;
  content: string;
  propKey: keyof TextBoxProps;
  type: "color" | "spinButton" | "text" | "alignment";
};

export type TooltipConfigIcon = {
  label: string;
  content: string;
  propKey: keyof IconProps;
  type: "color" | "spinButton" | "text";
};

export interface TooltipConfigImage {
  label: string;
  content: string;
  propKey: keyof ImageProps;
  type: "spinButton" | "text";
}

export interface TooltipConfigContainer {
  label: string;
  content: string;
  propKey: keyof ContainerProps;
  type: "color" | "spinButton" | "text" | "justifyContent" | "alignItems" | "direction";
}

export const generateElementSchema = z.object({
  type: z.enum([
    "Button",
    "Label",
    "Image",
    "TextBox",
    "RadioButton",
    "Checkbox",
    "Input",
    "Text",
    "Icon",
  ]),
  name: z.string(),
  size: z.enum(["small", "medium", "large"]).optional().default("medium"),
  text: z.string().optional(),
  imageSrc: z.string().optional(),
  color: z.enum(["Main", "Accent"]).default("Main"),
});

export const sectionSchema = z.object({
  name: z.string(),
  xPosition: z.number().int().max(10),
  yPosition: z.number().int().max(10),
  width: z.number().int().max(10),
  height: z.number().int().max(10),
  color: z.enum(["Main", "Accent"]).default("Main"),
  flexDirection: z.enum(["row", "column"]).default("row"),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .default("space-around"),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).default("center"),
  children: z.array(generateElementSchema),
});

export const layoutSchema = z.object({
  sections: z.array(sectionSchema),
});

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
export interface Page {
  id: string;
  name: string;
  content: SerializedNodes;
}

export interface CanvasProps {
  classes: any;
}
