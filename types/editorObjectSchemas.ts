import * as VscIcons from "react-icons/vsc";
import { z } from "zod";

type VscIconKeys = keyof typeof VscIcons;

const BackgroundSchema = z.object({
  backgroundColor: z.string(),
  layout: z.array(z.any()),
  rows: z.number(),
  columns: z.number(),
});

type BackgroundProps = z.infer<typeof BackgroundSchema>;

const EditBackgroundButtonSchema = z.object({
  nodeId: z.string(),
});

type EditBackgroundButtonProps = z.infer<typeof EditBackgroundButtonSchema>;

const ButtonSchema = z.object({
  backgroundColor: z.string(),
  fontSize: z.number(),
  fontColor: z.string(),
  borderRadius: z.number(),
  width: z.number(),
  height: z.number(),
  text: z.string(),
  alignment: z.enum(["left", "center", "right"]),
  displayName: z.string().optional(),
  icon: z.string() as z.ZodType<VscIconKeys | undefined>,
  iconPosition: z.enum(["left", "right"]).optional(),
  iconColor: z.string().optional(),
  bordercolor: z.string().optional(),
  shadow: z.boolean().optional(),
  hyperlink: z.string().optional(),
});

type ButtonProps = z.infer<typeof ButtonSchema>;

const generateButtonSchema = ButtonSchema.pick({
  width: true,
  height: true,
  text: true,
  icon: true,
});

type generateButtonProps = z.infer<typeof generateButtonSchema>;

const TooltipConfigSchema = z.object({
  label: z.string(),
  content: z.string(),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text", "alignment"]),
});

type TooltipConfig = z.infer<typeof TooltipConfigSchema>;

const CheckboxSchema = z.object({
  header: z.string(),
  optionLabels: z.array(z.string()),
  numberOfBoxes: z.number(),
  fontSize: z.number(),
  fontColor: z.string(),
  direction: z.enum(["row", "column"]),
});

type CheckboxProps = z.infer<typeof CheckboxSchema>;

const editableCheckboxSchema = CheckboxSchema.pick({
  header: true,
  optionLabels: true,
  numberOfBoxes: true,
  direction: true,
});

type editableCheckboxProps = z.infer<typeof editableCheckboxSchema>;

const TooltipConfigCheckboxSchema = z.object({
  label: z.string(),
  content: z.string(),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text", "options", "direction"]),
});

type TooltipConfigCheckbox = z.infer<typeof TooltipConfigCheckboxSchema>;

const ContainerSchema = z.object({
  children: z.any().optional(),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional(),
  gap: z.number().optional(),
});

type ContainerProps = z.infer<typeof ContainerSchema>;

const generateContainerSchema = ContainerSchema.pick({
  flexDirection: true,
  justifyContent: true,
  alignItems: true,
});

type generateContainerProps = z.infer<typeof generateContainerSchema>;

const InputSchema = z.object({
  fontSize: z.number(),
  fontColor: z.string(),
  backgroundColor: z.string(),
  placeholder: z.string(),
  borderRadius: z.number(),
});

type InputProps = z.infer<typeof InputSchema>;

const generateInputSchema = InputSchema.pick({
  placeholder: true,
});

type generateInputProps = z.infer<typeof generateInputSchema>;

const TooltipConfigInputSchema = z.object({
  label: z.string(),
  content: z.string(),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text", "alignment"]),
});

type TooltipConfigInput = z.infer<typeof TooltipConfigInputSchema>;

const LabelSchema = z.object({
  text: z.string(),
  fontSize: z.number(),
  fontcolor: z.string(),
  userEditable: z.boolean().optional(),
  width: z.number(),
  height: z.number(),
  textAlign: z.enum(["left", "center", "right", "justify"]),
  icon: z.string() as z.ZodType<VscIconKeys | undefined>,
  iconPosition: z.enum(["left", "right"]).optional(),
  iconColor: z.string().optional(),
  hyperlink: z.string().optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
});

type LabelProps = z.infer<typeof LabelSchema>;

const generateLabelSchema = LabelSchema.pick({
  text: true,
  fontcolor: true,
  icon: true,
  bold: true,
  italic: true,
  underline: true,
});

type generateLabelProps = z.infer<typeof generateLabelSchema>;

const ContentEditableEventSchema = z.object({
  target: z.object({ value: z.string() }),
});

type ContentEditableEvent = z.infer<typeof ContentEditableEventSchema>;

const RadioButtonSchema = z.object({
  header: z.string(),
  numberOfButtons: z.number(),
  optionLabels: z.array(z.string()),
  fontSize: z.number(),
  fontColor: z.string(),
  direction: z.enum(["row", "column"]),
});

type RadioButtonProps = z.infer<typeof RadioButtonSchema>;

const generateRadioButtonSchema = RadioButtonSchema.pick({
  header: true,
  numberOfButtons: true,
  optionLabels: true,
  direction: true,
});

type generateRadioButtonProps = z.infer<typeof generateRadioButtonSchema>;

const TooltipConfigRadioSchema = z.object({
  label: z.string(),
  content: z.string(),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text", "options", "direction"]),
});

type TooltipConfigRadio = z.infer<typeof TooltipConfigRadioSchema>;

const TextBoxSchema = z.object({
  text: z.string(),
  fontSize: z.number(),
  fontColor: z.string(),
  backgroundColor: z.string(),
  placeholder: z.string(),
  borderRadius: z.number(),
  height: z.number(),
  width: z.number(),
  alignment: z.enum(["left", "center", "right"]),
});

type TextBoxProps = z.infer<typeof TextBoxSchema>;

const generateTextBoxSchema = TextBoxSchema.pick({
  placeholder: true,
  height: true,
  width: true,
});

type generateTextBoxProps = z.infer<typeof generateTextBoxSchema>;

const TooltipConfigTextSchema = z.object({
  label: z.string(),
  content: z.string(),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text", "alignment"]),
});

type TooltipConfigText = z.infer<typeof TooltipConfigTextSchema>;

const IconSchema = z.object({
  selectedIcon: z.string() as z.ZodType<VscIconKeys>,
  iconSize: z.number().optional(),
  iconColor: z.string().optional(),
  hyperlink: z.string().optional(),
});

type IconProps = z.infer<typeof IconSchema>;

const TooltipConfigIconSchema = z.object({
  label: z.string(),
  content: z.string(),
  propKey: z.string(),
  type: z.enum(["color", "spinButton", "text"]),
});

type TooltipConfigIcon = z.infer<typeof TooltipConfigIconSchema>;

const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

type ImageProps = z.infer<typeof ImageSchema>;

const generateImageSchema = ImageSchema.pick({
  src: true,
  alt: true,
  height: true,
  width: true,
});

type generateImageProps = z.infer<typeof generateImageSchema>;

const CardContainerSchema = z.object({
  color: z.string(),
  height: z.number(),
  width: z.number(),
  flexDirection: z.enum(["row", "column"]).optional(),
  justifyContent: z
    .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
    .optional(),
  alignItems: z.enum(["flex-start", "center", "flex-end"]).optional(),
  gap: z.number().optional(),
  backgroundColor: z.string(),
  borderRadius: z.number(),
  bordercolor: z.string(),
  padding: z.number(),
  shadow: z.boolean(),
});

type CardContainerProps = z.infer<typeof CardContainerSchema>;

const TextSchema = z.object({
  text: z.string(),
  fontSize: z.number(),
  fontColor: z.string(),
  textAlign: z.enum(["left", "center", "right", "justify"]),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  hyperlink: z.string().optional(),
  placeholder: z.string().optional(),
});

type TextProps = z.infer<typeof TextSchema>;

const generateTextSchema = TextSchema.pick({
  text: true,
  bold: true,
  italic: true,
  underline: true,
});

type generateTextProps = z.infer<typeof generateTextSchema>;
