//types
import { Layout } from "react-grid-layout";
import * as VscIcons from "react-icons/vsc";
import { z } from "zod";

type VscIconKeys = keyof typeof VscIcons;

export const backgroundSchema = z.object({
  backgroundColor: z.string().default("white"),
  layout: z.array(z.any()).default([]),
  rows: z.number().default(1),
  columns: z.number().default(1),
  lockedGrid: z.boolean().default(false),
  additionalProps: z.record(z.union([z.string(), z.number(), z.boolean(), z.array(z.any())])).optional(),
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
  icon: z.string().refine(val => val in VscIcons).optional() as z.ZodType<VscIconKeys | undefined>,
  bordercolor: z.string().optional(),
  shadow: z.boolean().default(false).optional(),
  hyperlink: z.string().optional(),
});

export type ButtonProps = z.infer<typeof buttonSchema>;

export const generateButtonSchema = z.object({
  width: z.number().default(100),
  height: z.number().default(40),
  text: z.string().default("Button"),
  icon: z.string().refine(val => val in VscIcons).optional() as z.ZodType<VscIconKeys | undefined>,
});

export type generateButtonProps = z.infer<typeof generateButtonSchema>;

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

export type generateCheckboxProps = z.infer<typeof generateCheckboxSchema>;

export const containerSchema = z.object({
  height: z.number().default(200),
  width: z.number().default(300),
  flexDirection: z.enum(["row", "column"]).default("row").optional(),
  justifyContent: z.enum(["flex-start", "center", "flex-end", "space-between", "space-around"]).default("flex-start").optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).default("flex-start").optional(),
  gap: z.number().default(0).optional(),
  backgroundColor: z.string().default("white"),
  borderRadius: z.number().default(4),
  borderColor: z.string().default("black"),
  padding: z.number().default(10),
  shadow: z.boolean().default(false),
});

export type ContainerProps = z.infer<typeof containerSchema>;

export const generateContainerSchema = containerSchema.pick({
  height: true,
  width: true,
  flexDirection: true,
  justifyContent: true,
  alignItems: true,
  gap: true,
});

export type generateContainerProps = z.infer<typeof generateContainerSchema>;

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

export type generateInputProps = z.infer<typeof generateInputSchema>;

export const labelSchema = z.object({
  text: z.string().default("Label"),
  fontSize: z.number().default(14),
  fontcolor: z.string().default("black"),
  userEditable: z.boolean().default(true).optional(),
  width: z.number().default(100),
  height: z.number().default(20),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  icon: z.string().refine(val => val in VscIcons).optional() as z.ZodType<VscIconKeys | undefined>,
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

export type generateLabelProps = z.infer<typeof generateLabelSchema>;

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

export type generateRadioButtonProps = z.infer<typeof generateRadioButtonSchema>;

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

export type generateTextBoxProps = z.infer<typeof generateTextBoxSchema>;

export const iconSchema = z.object({
  selectedIcon: z.string().refine(val => val in VscIcons) as z.ZodType<VscIconKeys>,
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

export type generateImageProps = z.infer<typeof generateImageSchema>;

export const cardContainerSchema = z.object({
  color: z.string().default("white"),
  height: z.number().default(200),
  width: z.number().default(300),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z.enum(["flex-start", "center", "flex-end", "space-between", "space-around"]).optional(),
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
  placeholder: z.string().optional(),
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

export type generateTextProps = z.infer<typeof generateTextSchema>;

// ContentEditableEvent remains the same as it's a simple event interface
export interface ContentEditableEvent {
  target: { value: string };
}
