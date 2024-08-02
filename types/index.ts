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

export const gridCellSchema = z.object({
  id: z.string().optional(),
  children: z.any().optional(),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z.enum(["flex-start", "center", "flex-end", "space-between", "space-around"]).optional(),
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

export type GenerateImageProps = z.infer<typeof generateImageSchema>;

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


// export interface BackgroundProps {
//     backgroundColor: string;
//     layout: Layout[];
//     rows: number;
//     columns: number;
//     lockedGrid: boolean;
//     [key: string]: string | number | Layout[] | boolean;
//   }

// export interface TooltipConfigBackground {
//     label: string;
//     content: string;
//     propKey: keyof BackgroundProps;
//     type: 'color' | 'spinButton' | 'text' | 'button';
// };

// export interface ButtonProps {
//   backgroundColor: string;
//   fontSize: number;
//   fontColor: string;
//   borderRadius: number;
//   width: number;
//   height: number;
//   text: string;
//   alignment: "left" | "center" | "right";
//   displayName?: string;
//   icon?: "none" | "left" | "right";
//   bordercolor?: string;
//   shadow?: boolean;
//   hyperlink?: string;
// }

// export type generateButtonProps = {
//   width: number;
//   height: number;
//   text: string;
//   icon?: keyof typeof VscIcons;
// };

// export type TooltipConfigButton = {
//   label: string;
//   content: string;
//   propKey: keyof ButtonProps;
//   type: "color" | "spinButton" | "text" | "icon";
// };

// export interface CheckboxProps {
//   header: string;
//   optionLabels: string[];
//   numberOfBoxes: number;
//   fontSize: number;
//   fontColor: string;
//   direction: "row" | "column";
// }

// export interface editableCheckboxProps {
//   header: string;
//   optionLabels: string[];
//   numberOfBoxes: number;
//   direction: "row" | "column";
// }

// export type TooltipConfigCheckbox = {
//   label: string;
//   content: string;
//   propKey: keyof CheckboxProps;
//   type: "color" | "spinButton" | "text" | "options" | "direction";
// };

// export interface GridCellProps {
//     id?: string;
//     children?: React.ReactNode;
//     flexDirection?: "row" | "column";
//     justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
//     alignItems?: "flex-start" | "center" | "flex-end";
//     gap?: number;
//   }

// export type TooltipConfigGridCell = {
//     label: string;
//     content: string;
//     propKey: keyof GridCellProps;
//     type: 'color' | 'spinButton' | 'text' | 'alignItems' | 'justifyContent' | 'direction';
// };

// export interface InputProps {
//   fontSize: number;
//   fontColor: string;
//   backgroundColor: string;
//   placeholder: string;
//   borderRadius: number;
// }

// export interface generateInputProps {
//   placeholder: string;
// }

// export type TooltipConfigInput = {
//   label: string;
//   content: string;
//   propKey: keyof InputProps;
//   type: "color" | "spinButton" | "text" | "alignment";
// };

// export interface LabelProps {
//   text: string;
//   fontSize: number;
//   fontcolor: string;
//   userEditable?: boolean;
//   width: number;
//   height: number;
//   textAlign: "left" | "center" | "right" | "justify";
//   hyperlink?: string;
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
//   icon?: "none" | "left" | "right";
// }

// export interface generateLabelProps {
//   text: string;
//   fontcolor: string;
//   icon?: keyof typeof VscIcons;
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
// }

// export interface ContentEditableEvent {
//   target: { value: string };
// }

// export interface RadioButtonProps {
//   header: string;
//   numberOfButtons: number;
//   optionLabels: string[];
//   fontSize: number;
//   fontColor: string;
//   direction: "row" | "column";
// }

// export interface generateRadioButtonProps {
//   header: string;
//   numberOfButtons: number;
//   optionLabels: string[];
//   direction: "row" | "column";
// }

// export type TooltipConfigRadio = {
//   label: string;
//   content: string;
//   propKey: keyof RadioButtonProps;
//   type: "color" | "spinButton" | "text" | "options" | "direction";
// };

// export interface TextBoxProps {
//   text: string;
//   fontSize: number;
//   fontColor: string;
//   backgroundColor: string;
//   placeholder: string;
//   borderRadius: number;
//   height: number; //change to % after
//   width: number; //change to % after
//   alignment: "left" | "center" | "right";
// }

// export interface generateTextBoxProps {
//   placeholder: string;
//   height: number;
//   width: number;
// }

// export type TooltipConfigText = {
//   label: string;
//   content: string;
//   propKey: keyof TextBoxProps;
//   type: "color" | "spinButton" | "text" | "alignment";
// };

// export interface IconProps {
//   selectedIcon: keyof typeof VscIcons;
//   iconSize?: number;
//   iconColor?: string;
//   hyperlink?: string;
// }

// export type TooltipConfigIcon = {
//   label: string;
//   content: string;
//   propKey: keyof IconProps;
//   type: "color" | "spinButton" | "text";
// };

// export interface ImageProps {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
// }

// export interface TooltipConfigImage {
//   label: string;
//   content: string;
//   propKey: keyof ImageProps;
//   type: "spinButton" | "text";
// }

// export interface generateImageProps {
//   src: string;
//   alt: string;
//   height: number;
//   width: number;
// }

// export interface ContainerProps {
//   height: number;
//   width: number;
//   flexDirection?: "row" | "column";
//   justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
//   alignItems?: "flex-start" | "center" | "flex-end";
//   gap?: number;
//   backgroundColor: string;
//   borderRadius: number;
//   borderColor: string;
//   padding: number;
//   shadow?: boolean;
//   children?: React.ReactNode;
// }

// export interface TooltipConfigContainer {
//   label: string;
//   content: string;
//   propKey: keyof ContainerProps;
//   type: "color" | "spinButton" | "text" | "justifyContent" | "alignItems" | "direction";
// }

// export interface TextProps {
//   text: string;
//   fontSize: number;
//   fontColor: string;
//   textAlign: "left" | "center" | "right" | "justify";
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
//   hyperlink?: string;
//   placeholder?: string;
//   userEditable?: boolean;
// }

// export interface generateTextProps {
//   text: string;
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
// }
