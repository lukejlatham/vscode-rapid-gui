"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const BackgroundSchema = zod_1.z.object({
    backgroundColor: zod_1.z.string(),
    layout: zod_1.z.array(zod_1.z.any()),
    rows: zod_1.z.number(),
    columns: zod_1.z.number(),
});
const EditBackgroundButtonSchema = zod_1.z.object({
    nodeId: zod_1.z.string(),
});
const ButtonSchema = zod_1.z.object({
    backgroundColor: zod_1.z.string(),
    fontSize: zod_1.z.number(),
    fontColor: zod_1.z.string(),
    borderRadius: zod_1.z.number(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
    text: zod_1.z.string(),
    alignment: zod_1.z.enum(["left", "center", "right"]),
    displayName: zod_1.z.string().optional(),
    icon: zod_1.z.string(),
    iconPosition: zod_1.z.enum(["left", "right"]).optional(),
    iconColor: zod_1.z.string().optional(),
    bordercolor: zod_1.z.string().optional(),
    shadow: zod_1.z.boolean().optional(),
    hyperlink: zod_1.z.string().optional(),
});
const generateButtonSchema = ButtonSchema.pick({
    width: true,
    height: true,
    text: true,
    icon: true,
});
const TooltipConfigSchema = zod_1.z.object({
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    propKey: zod_1.z.string(),
    type: zod_1.z.enum(["color", "spinButton", "text", "alignment"]),
});
const CheckboxSchema = zod_1.z.object({
    header: zod_1.z.string(),
    optionLabels: zod_1.z.array(zod_1.z.string()),
    numberOfBoxes: zod_1.z.number(),
    fontSize: zod_1.z.number(),
    fontColor: zod_1.z.string(),
    direction: zod_1.z.enum(["row", "column"]),
});
const editableCheckboxSchema = CheckboxSchema.pick({
    header: true,
    optionLabels: true,
    numberOfBoxes: true,
    direction: true,
});
const TooltipConfigCheckboxSchema = zod_1.z.object({
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    propKey: zod_1.z.string(),
    type: zod_1.z.enum(["color", "spinButton", "text", "options", "direction"]),
});
const ContainerSchema = zod_1.z.object({
    children: zod_1.z.any().optional(),
    flexDirection: zod_1.z.enum(["row", "column"]).optional(),
    justifyContent: zod_1.z
        .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
        .optional(),
    alignItems: zod_1.z.enum(["flex-start", "center", "flex-end"]).optional(),
    gap: zod_1.z.number().optional(),
});
const generateContainerSchema = ContainerSchema.pick({
    flexDirection: true,
    justifyContent: true,
    alignItems: true,
});
const InputSchema = zod_1.z.object({
    fontSize: zod_1.z.number(),
    fontColor: zod_1.z.string(),
    backgroundColor: zod_1.z.string(),
    placeholder: zod_1.z.string(),
    borderRadius: zod_1.z.number(),
});
const generateInputSchema = InputSchema.pick({
    placeholder: true,
});
const TooltipConfigInputSchema = zod_1.z.object({
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    propKey: zod_1.z.string(),
    type: zod_1.z.enum(["color", "spinButton", "text", "alignment"]),
});
const LabelSchema = zod_1.z.object({
    text: zod_1.z.string(),
    fontSize: zod_1.z.number(),
    fontcolor: zod_1.z.string(),
    userEditable: zod_1.z.boolean().optional(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
    textAlign: zod_1.z.enum(["left", "center", "right", "justify"]),
    icon: zod_1.z.string(),
    iconPosition: zod_1.z.enum(["left", "right"]).optional(),
    iconColor: zod_1.z.string().optional(),
    hyperlink: zod_1.z.string().optional(),
    bold: zod_1.z.boolean().optional(),
    italic: zod_1.z.boolean().optional(),
    underline: zod_1.z.boolean().optional(),
});
const generateLabelSchema = LabelSchema.pick({
    text: true,
    fontcolor: true,
    icon: true,
    bold: true,
    italic: true,
    underline: true,
});
const ContentEditableEventSchema = zod_1.z.object({
    target: zod_1.z.object({ value: zod_1.z.string() }),
});
const RadioButtonSchema = zod_1.z.object({
    header: zod_1.z.string(),
    numberOfButtons: zod_1.z.number(),
    optionLabels: zod_1.z.array(zod_1.z.string()),
    fontSize: zod_1.z.number(),
    fontColor: zod_1.z.string(),
    direction: zod_1.z.enum(["row", "column"]),
});
const generateRadioButtonSchema = RadioButtonSchema.pick({
    header: true,
    numberOfButtons: true,
    optionLabels: true,
    direction: true,
});
const TooltipConfigRadioSchema = zod_1.z.object({
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    propKey: zod_1.z.string(),
    type: zod_1.z.enum(["color", "spinButton", "text", "options", "direction"]),
});
const TextBoxSchema = zod_1.z.object({
    text: zod_1.z.string(),
    fontSize: zod_1.z.number(),
    fontColor: zod_1.z.string(),
    backgroundColor: zod_1.z.string(),
    placeholder: zod_1.z.string(),
    borderRadius: zod_1.z.number(),
    height: zod_1.z.number(),
    width: zod_1.z.number(),
    alignment: zod_1.z.enum(["left", "center", "right"]),
});
const generateTextBoxSchema = TextBoxSchema.pick({
    placeholder: true,
    height: true,
    width: true,
});
const TooltipConfigTextSchema = zod_1.z.object({
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    propKey: zod_1.z.string(),
    type: zod_1.z.enum(["color", "spinButton", "text", "alignment"]),
});
const IconSchema = zod_1.z.object({
    selectedIcon: zod_1.z.string(),
    iconSize: zod_1.z.number().optional(),
    iconColor: zod_1.z.string().optional(),
    hyperlink: zod_1.z.string().optional(),
});
const TooltipConfigIconSchema = zod_1.z.object({
    label: zod_1.z.string(),
    content: zod_1.z.string(),
    propKey: zod_1.z.string(),
    type: zod_1.z.enum(["color", "spinButton", "text"]),
});
const ImageSchema = zod_1.z.object({
    src: zod_1.z.string(),
    alt: zod_1.z.string(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
    alignment: zod_1.z.enum(["left", "center", "right"]).optional(),
});
const generateImageSchema = ImageSchema.pick({
    src: true,
    alt: true,
    height: true,
    width: true,
});
const CardContainerSchema = zod_1.z.object({
    color: zod_1.z.string(),
    height: zod_1.z.number(),
    width: zod_1.z.number(),
    flexDirection: zod_1.z.enum(["row", "column"]).optional(),
    justifyContent: zod_1.z
        .enum(["flex-start", "center", "flex-end", "space-between", "space-around"])
        .optional(),
    alignItems: zod_1.z.enum(["flex-start", "center", "flex-end"]).optional(),
    gap: zod_1.z.number().optional(),
    backgroundColor: zod_1.z.string(),
    borderRadius: zod_1.z.number(),
    bordercolor: zod_1.z.string(),
    padding: zod_1.z.number(),
    shadow: zod_1.z.boolean(),
});
const TextSchema = zod_1.z.object({
    text: zod_1.z.string(),
    fontSize: zod_1.z.number(),
    fontColor: zod_1.z.string(),
    textAlign: zod_1.z.enum(["left", "center", "right", "justify"]),
    bold: zod_1.z.boolean().optional(),
    italic: zod_1.z.boolean().optional(),
    underline: zod_1.z.boolean().optional(),
    hyperlink: zod_1.z.string().optional(),
    placeholder: zod_1.z.string().optional(),
});
const generateTextSchema = TextSchema.pick({
    text: true,
    bold: true,
    italic: true,
    underline: true,
});
//# sourceMappingURL=editorObjectSchemas.js.map