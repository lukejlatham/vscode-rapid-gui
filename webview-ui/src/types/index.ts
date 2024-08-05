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
  fontColor: z.string().default("white"),
  borderRadius: z.number().default(4),
  width: z.number().default(80),
  height: z.number().default(60),
  text: z.string().default("Button"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  displayName: z.string().optional(),
  icon: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .optional(),
  bordercolor: z.string().optional(),
  shadowColor: z.string().optional().default("black"),
  shadowOffsetX: z.number().optional().default(1),
  shadowOffsetY: z.number().optional().default(1),
  shadowBlur: z.number().optional().default(3),
  hyperlink: z.string().optional(),
});

export type ButtonProps = z.infer<typeof buttonSchema>;

export const checkboxSchema = z.object({
  header: z.string().default("Checkbox Header"),
  optionLabels: z.array(z.string()).default([]),
  numberOfBoxes: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

export type CheckboxProps = z.infer<typeof checkboxSchema>;

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
  backgroundColor: z.string().default("#92a0ad"),
  borderRadius: z.number().default(5),
  borderColor: z.string().optional().default("#666666"),
  padding: z.number().default(0),
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

export type GridCellProps = z.infer<typeof gridCellSchema>;

export const inputSchema = z.object({
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("white"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
});

export type InputProps = z.infer<typeof inputSchema>;

export const labelSchema = z.object({
  text: z.string().default("Label"),
  fontSize: z.number().default(22),
  fontcolor: z.string().default("black"),
  userEditable: z.boolean().default(true).optional(),
  textAlign: z.enum(["left", "center", "right", "justify"]).default("left"),
  icon: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .optional(),
  hyperlink: z.string().optional(),
  bold: z.boolean().optional().default(true),
  italic: z.boolean().default(false).optional(),
  underline: z.boolean().default(false).optional(),
});

export type LabelProps = z.infer<typeof labelSchema>;

export const radioButtonSchema = z.object({
  header: z.string().default("Radio Button Header"),
  numberOfButtons: z.number().default(2),
  optionLabels: z.array(z.string()).default([]),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

export type RadioButtonProps = z.infer<typeof radioButtonSchema>;

export const textBoxSchema = z.object({
  text: z.string().default("Text Box"),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("white"),
  placeholder: z.string().default("Enter text"),
  borderRadius: z.number().default(4),
  height: z.number().default(100),
  width: z.number().default(100),
  alignment: z.enum(["left", "center", "right"]).default("left"),
});

export type TextBoxProps = z.infer<typeof textBoxSchema>;

export const iconSchema = z.object({
  selectedIcon: z
    .string()
    .refine((val) => val in VscIcons)
    .optional() as z.ZodType<VscIconKeys>,
  iconSize: z.number().default(24).optional(),
  iconColor: z.string().default("lightslategray").optional(),
  hyperlink: z.string().optional(),
});

export type IconProps = z.infer<typeof iconSchema>;

export const imageSchema = z.object({
  src: z
    .string()
    .default(
      "https://media.licdn.com/dms/image/D4E22AQGL4EZgEpG2ag/feedshare-shrink_800/0/1719580422738?e=2147483647&v=beta&t=Nj786KjutiTxei_wgDDM40hcWFi5_-qqBIKM4jOa3Hc"
    ),
  alt: z.string().default("Image"),
  width: z.number().default(100),
  height: z.number().default(100),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

export type ImageProps = z.infer<typeof imageSchema>;

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

// export const generateElementSchema = z.object({
//   type: z.enum([
//     "Button",
//     "Label",
//     "Image",
//     "TextBox",
//     "RadioButton",
//     "Checkbox",
//     "Input",
//     "Text",
//     "Icon",
//   ]),
//   name: z.string(),
//   text: z.string().optional(),
//   backgroundColor: z.enum(["#778899", "#bbc4cc", "#92a0ad"]).default("#778899"),
// });

export const sectionSchema = z.object({
  section: z.string(),
  props: z.object({
    xPosition: z.number().int().max(10),
    yPosition: z.number().int().max(10),
    width: z.number().int().max(10),
    height: z.number().int().max(10),
    flexDirection: z.enum(["row", "column"]).default("row"),
  }),
  contents: z.string().describe("Give a detailed description of the section over 3 lines."),
});

export const layoutSchema = z.object({
  sections: z.array(sectionSchema).max(5),
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

// export const generateContainerSchema = z.object({
//   type: z.literal("Container"),
//   props: containerSchema.pick({
//     height: true,
//     width: true,
//     flexDirection: true,
//     justifyContent: true,
//     alignItems: true,
//     gap: true,
//   }),
// });

// export type GenerateContainerProps = z.infer<typeof generateContainerSchema>;

// CHILD PROPS GENERATION FOR getSectionChildren.ts

export const generateButtonSchema = z.object({
  type: z.literal("Button"),
  props: z.object({
    width: z.number().max(95),
    height: z.number().max(95),
    text: z.string(),
    icon: z
      .union([
        z.enum(["left", "right"]).default("left"),
        z.enum([
          "VscAdd",
          "VscEdit",
          "VscTrash",
          "VscSearch",
          "VscSave",
          "VscHome",
          "VscSettingsGear",
          "VscInfo",
        ]),
      ])
      .default("VscAdd"),
  }),
});
export type GenerateButtonProps = z.infer<typeof generateButtonSchema>;

export const generateCheckboxSchema = z.object({
  type: z.literal("Checkbox"),
  props: z.object({
    optionLabels: z.array(z.string()).default([]),
    numberOfBoxes: z.number().default(2),
    direction: z.enum(["row", "column"]).default("row"),
  }),
});

export type GenerateCheckboxProps = z.infer<typeof generateCheckboxSchema>;

export const generateInputSchema = z.object({
  type: z.literal("Input"),
  props: z.object({
    backgroundColor: z.enum(["Main", "Accent1", "Accent2"]).default("Main"),
    placeholder: z.string().default("Enter text"),
  }),
});

export type GenerateInputProps = z.infer<typeof generateInputSchema>;

export const generateLabelSchema = z.object({
  type: z.literal("Label"),
  props: z.object({
    text: z.string().default("Header"),
    bold: z.boolean().default(true),
    italic: z.boolean().default(false),
    underline: z.boolean().default(false),
    hyperlink: z.string().optional(),
  }),
});

export type GenerateLabelProps = z.infer<typeof generateLabelSchema>;

export const generateRadioButtonSchema = z.object({
  type: z.literal("RadioButton"),
  props: z.object({
    header: z.string().default("Radio Button Header"),
    numberOfButtons: z.number().default(2),
    optionLabels: z
      .array(z.string())
      .default([])
      .describe("Array of strings for each radio button"),
    direction: z.enum(["row", "column"]).default("row"),
  }),
});

export type GenerateRadioButtonProps = z.infer<typeof generateRadioButtonSchema>;

export const generateImageSchema = z.object({
  type: z.literal("Image"),
  props: z.object({
    src: z.string().describe("LINK TO THE IMAGE NEEDED"),
    alt: z.string().default("Image"),
    width: z.number().max(95),
    height: z.number().max(95),
  }),
});

export type GenerateImageProps = z.infer<typeof generateImageSchema>;

export const generateTextBoxSchema = z.object({
  type: z.literal("TextBox"),
  props: z.object({
    text: z.string().default("Text Box"),
    backgroundColor: z.enum(["Main", "Accent1", "Accent2"]).default("Main"),
    height: z.number().max(95),
    width: z.number().max(95),
  }),
});

export type GenerateTextBoxProps = z.infer<typeof generateTextBoxSchema>;

export const generateTextSchema = z.object({
  type: z.literal("Text"),
  props: z.object({
    text: z.string().default("Text"),
  }),
});

export type GenerateTextProps = z.infer<typeof generateTextSchema>;

export const generateIconSchema = z.object({
  type: z.literal("Icon"),
  props: z.object({
    selectedIcon: z
      .enum([
        "VscAdd",
        "VscEdit",
        "VscTrash",
        "VscSearch",
        "VscSave",
        "VscHome",
        "VscSettingsGear",
        "VscInfo",
      ])
      .default("VscAdd"),
    iconSize: z.number().default(24),
    iconColor: z.enum(["Main", "Accent1", "Accent2"]).default("Main"),
  }),
});

// export const generatedElements = z.union([
//   generateButtonSchema,
//   generateCheckboxSchema,
//   generateIconSchema,
//   generateInputSchema,
//   generateLabelSchema,
//   generateRadioButtonSchema,
//   generateTextBoxSchema,
//   generateTextSchema,
//   generateImageSchema,
//   generateInputSchema,
// ]);

export const generatedElements = z.object({
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
  description: z.string(),
});

export const generatedSectionChildren = z.object({
  section: z.string(),
  children: z.array(generatedElements).max(8),
});

export const generatedAllSectionsChildren = z.object({
  sections: z.array(generatedSectionChildren).max(5),
});
