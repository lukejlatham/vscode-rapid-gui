import * as VscIcons from "react-icons/vsc";
import { z } from "zod";

type VscIconKeys = keyof typeof VscIcons;

export const BackgroundSchema = z.object({
  backgroundColor: z.string().default("white"),
  layout: z.array(z.any()).default([]),
  rows: z.number().default(1),
  columns: z.number().default(1),
});

type BackgroundProps = z.infer<typeof BackgroundSchema>;

export const ButtonSchema = z.object({
  type: z.literal("Button"),
  backgroundColor: z.string().default("white"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  borderRadius: z.number().default(4),
  width: z.number().default(100),
  height: z.number().default(40),
  text: z.string().default("Button"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  displayName: z.string().optional(),
  icon: z.string() as z.ZodType<VscIconKeys | undefined>,
  iconPosition: z.enum(["left", "right"]).optional(),
  iconColor: z.string().optional(),
  bordercolor: z.string().optional(),
  shadow: z.boolean().optional().default(false),
  hyperlink: z.string().optional(),
});

type ButtonProps = z.infer<typeof ButtonSchema>;

export const generateButtonSchema = ButtonSchema.pick({
  type: true,
  icon: true,
  text: true,
  hyperlink: true,
  alignment: true,
});

export type generateButtonProps = z.infer<typeof generateButtonSchema>;

export const CheckboxSchema = z.object({
  type: z.literal("Checkbox"),
  header: z.string().default("Checkbox Header"),
  optionLabels: z.array(z.string()).default([]),
  numberOfBoxes: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

export const generateCheckboxSchema = CheckboxSchema.pick({
  type: true,
  header: true,
  optionLabels: true,
  numberOfBoxes: true,
  direction: true,
});

export type generateCheckboxProps = z.infer<typeof generateCheckboxSchema>;

export type CheckboxProps = z.infer<typeof CheckboxSchema>;

export const editableCheckboxSchema = CheckboxSchema.pick({
  type: true,
  header: true,
  optionLabels: true,
  numberOfBoxes: true,
  direction: true,
});

type editableCheckboxProps = z.infer<typeof editableCheckboxSchema>;

export const ContainerSchema = z.object({
  type: z.literal("Container"),
  children: z.any().optional(),
  flexDirection: z.enum(["row", "column"]).default("row").optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .default("flex-start")
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).default("flex-start").optional(),
  gap: z.number().default(0).optional(),
});

type ContainerProps = z.infer<typeof ContainerSchema>;

export const generateContainerSchema = ContainerSchema.pick({
  type: true,
  flexDirection: true,
  justifyContent: true,
  alignItems: true,
  gap: true,
});

export type generateContainerProps = z.infer<typeof generateContainerSchema>;

export const InputSchema = z.object({
  type: z.literal("Input"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("white"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
});

type InputProps = z.infer<typeof InputSchema>;

export const generateInputSchema = InputSchema.pick({
  type: true,
  placeholder: true,
});

export type generateInputProps = z.infer<typeof generateInputSchema>;

export const LabelSchema = z.object({
  type: z.literal("Label"),
  text: z.string().default("Label"),
  fontSize: z.number().default(14),
  fontcolor: z.string().default("black"),
  userEditable: z.boolean().default(true).optional(),
  width: z.number().default(100),
  height: z.number().default(20),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  icon: z.string() as z.ZodType<VscIconKeys | undefined>,
  iconPosition: z.enum(["left", "right"]).optional(),
  iconColor: z.string().optional(),
  hyperlink: z.string().optional(),
  bold: z.boolean().default(false).optional(),
  italic: z.boolean().default(false).optional(),
  underline: z.boolean().default(false).optional(),
});

export type LabelProps = z.infer<typeof LabelSchema>;

export const generateLabelSchema = LabelSchema.pick({
  type: true,
  text: true,
  hyperlink: true,
  textAlign: true,
  bold: true,
  italic: true,
  underline: true,
});

export type generateLabelProps = z.infer<typeof generateLabelSchema>;

export const RadioButtonSchema = z.object({
  type: z.literal("RadioButton"),
  header: z.string().default("Radio Button Header"),
  numberOfButtons: z.number().default(2),
  optionLabels: z.array(z.string()).default([]),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

type RadioButtonProps = z.infer<typeof RadioButtonSchema>;

export const generateRadioButtonSchema = RadioButtonSchema.pick({
  type: true,
  header: true,
  optionLabels: true,
  numberOfButtons: true,
  direction: true,
});

export type generateRadioButtonProps = z.infer<typeof generateRadioButtonSchema>;

export const TextBoxSchema = z.object({
  type: z.literal("TextBox"),
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

type TextBoxProps = z.infer<typeof TextBoxSchema>;

export const generateTextBoxSchema = TextBoxSchema.pick({
  type: true,
  text: true,
  placeholder: true,
  alignment: true,
});

export type generateTextBoxProps = z.infer<typeof generateTextBoxSchema>;

const TooltipConfigTextSchema = z.object({
  label: z.string().default("Tooltip Label"),
  content: z.string().default("Tooltip Content"),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text", "alignment"]),
});

type TooltipConfigText = z.infer<typeof TooltipConfigTextSchema>;

const IconSchema = z.object({
  type: z.literal("Icon"),
  selectedIcon: z.string() as z.ZodType<VscIconKeys>,
  iconSize: z.number().default(24).optional(),
  iconColor: z.string().default("black").optional(),
  hyperlink: z.string().optional(),
});

type IconProps = z.infer<typeof IconSchema>;

const ImageSchema = z.object({
  type: z.literal("Image"),
  src: z.string().default("https://via.placeholder.com/150"),
  alt: z.string().default("Image"),
  width: z.number().default(150),
  height: z.number().default(150),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

type ImageProps = z.infer<typeof ImageSchema>;

const generateImageSchema = ImageSchema.pick({
  type: true,
  src: true,
  alt: true,
  width: true,
  height: true,
  alignment: true,
});

export type generateImageProps = z.infer<typeof generateImageSchema>;

const CardContainerSchema = z.object({
  type: z.literal("CardContainer"),
  color: z.string().default("white"),
  height: z.number().default(200),
  width: z.number().default(300),
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

type CardContainerProps = z.infer<typeof CardContainerSchema>;

const GridBoxSchema = z.object({
  type: z.literal("GridBox"),
  color: z.string().default("white"),
  height: z.number().default(200),
  width: z.number().default(300),
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

type GridBoxProps = z.infer<typeof CardContainerSchema>;

const TextSchema = z.object({
  type: z.literal("Text"),
  text: z.string().default("Text"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  bold: z.boolean().optional().default(false),
  italic: z.boolean().optional().default(false),
  underline: z.boolean().optional().default(false),
  hyperlink: z.string().optional(),
  placeholder: z.string().optional(),
});

type TextProps = z.infer<typeof TextSchema>;

export const generateTextSchema = TextSchema.pick({
  type: true,
  text: true,
  hyperlink: true,
  textAlign: true,
  bold: true,
  italic: true,
  underline: true,
});

export type generateTextProps = z.infer<typeof generateTextSchema>;

export const generateFullElementSchema = z.object({
  props: z.union([
    generateButtonSchema,
    generateLabelSchema,
    generateTextBoxSchema,
    generateContainerSchema,
    generateInputSchema,
    generateRadioButtonSchema,
    generateCheckboxSchema,
    generateImageSchema,
    generateTextSchema,
  ]),
});

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
  generateFullElementSchema,
});

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  xPosition: z.number().max(10),
  yPosition: z.number().max(10),
  width: z.number().max(10),
  height: z.number().max(10),
  children: z.array(generateElementSchema),
});

export const layoutSchema = z.object({
  sections: z.array(sectionSchema),
});
