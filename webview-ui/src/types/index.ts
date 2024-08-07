//types
import * as VscIcons from "react-icons/vsc";
import { z } from "zod";
import { SerializedNodes } from "@craftjs/core";
import { head, max, min } from "lodash";

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
  lockedGrid: z.boolean().default(true),
  additionalProps: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]))
    .optional(),
  key: z.any().optional(),
});

export type BackgroundProps = z.infer<typeof backgroundSchema>;

export const buttonSchema = z.object({
  backgroundColor: z.string().default("lightslategrey"),
  fontSize: z.number().default(16),
  fontColor: z.string().default("white"),
  borderRadius: z.number().default(4),
  width: z.number().default(80),
  height: z.number().default(60),
  text: z.string().default("Button"),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  displayName: z.string().optional().default("Button"),
  icon: z
    .union([z.enum(["none", "left", "right"]), z.string().refine((val) => val in VscIcons)])
    .optional(),
  bordercolor: z.string().optional().default("white"),
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
  backgroundColor: z.string().default("ghostwhite"),
  borderRadius: z.number().default(5),
  borderColor: z.string().optional().default("black"),
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

export const dropdownSchema = z.object({
  header: z.string().default("Dropdown Header"),
  optionLabels: z.array(z.string()).default([]),
  numberOfOptions: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
});

export type DropdownProps = z.infer<typeof dropdownSchema>;

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
  header: z.string().default("Radio Button Header"),
  numberOfButtons: z.number().default(2),
  optionLabels: z.array(z.string()).default([]),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  direction: z.enum(["row", "column"]).default("row"),
});

export type RadioButtonProps = z.infer<typeof radioButtonSchema>;

export const sliderSchema = z.object({
  header: z.string().default("Slider"),
  min: z.number().default(0),
  max: z.number().default(100),
  step: z.number().default(1),
  fontSize: z.number().default(14),
  fontColor: z.string().default("black"),
  backgroundColor: z.string().default("red"),
});

export type SliderProps = z.infer<typeof sliderSchema>;

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
    .transform((val) => (val in VscIcons ? val : "VscAdd"))
    .default("VscCircle") as z.ZodType<VscIconKeys>,
  iconSize: z.number().optional().default(24),
  iconColor: z.string().optional().default("lightslategrey"),
  hyperlink: z.string().optional().default(""),
});

export type IconProps = z.infer<typeof iconSchema>;

export const imageSchema = z.object({
  src: z
    .string()
    .default(
      "https://media.licdn.com/dms/image/D4E22AQGL4EZgEpG2ag/feedshare-shrink_800/0/1719580422738?e=2147483647&v=beta&t=Nj786KjutiTxei_wgDDM40hcWFi5_-qqBIKM4jOa3Hc"
    ),
  alt: z.string().default("New image"),
  width: z.number().default(90),
  height: z.number().default(90),
  alignment: z.enum(["left", "center", "right"]).optional(),
});

export type ImageProps = z.infer<typeof imageSchema>;

export const textSchema = z.object({
  text: z.string().default("Here is some text"),
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

export type TooltipConfigDropdown = {
  label: string;
  content: string;
  propKey: keyof DropdownProps;
  type: "color" | "spinButton" | "text" | "options";
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

export interface TooltipConfigSlider {
  label: string;
  content: string;
  propKey: keyof SliderProps;
  type: "color" | "spinButton" | "text";
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
    "RadioButton",
    "Checkbox",
    "Input",
    "Text",
    "Icon",
    "Slider",
    "Dropdown",
  ]),
  DescriptiveName: z.string(),
});

export const generatedSectionChildren = z.object({
  section: z.string(),
  children: z.array(generatedElements).max(5),
});

export const generatedAllSectionsChildren = z.object({
  sections: z.array(generatedSectionChildren).min(2).max(6),
});

// Used in getSectionChildrenWithProps.ts

const ColorEnum = z
  .enum(["Main", "LightAccent", "DarkAccent"])
  .transform((val) => (["Main", "LightAccent", "DarkAccent"].includes(val) ? val : "Main"))
  .default("Main");

export const generateButtonSchema = z.object({
  type: z.literal("Button"),
  props: z.object({
    text: z.string().default("Button"),
    backgroundColor: ColorEnum,
    fontColor: ColorEnum,
  }),
});

export const generateCheckboxSchema = z.object({
  type: z.literal("Checkbox"),
  props: z.object({
    optionLabels: z.array(z.string()).default([]),
    numberOfBoxes: z.number().default(2),
    direction: z.enum(["row", "column"]).default("row"),
  }),
});

export const generateInputSchema = z.object({
  type: z.literal("Input"),
  props: z.object({
    placeholder: z.string().default("Enter text"),
    fontColor: ColorEnum,
  }),
});

export const generateLabelSchema = z.object({
  type: z.literal("Label"),
  props: z.object({
    text: z.string().default("Header").describe("Short header"),
    bold: z.boolean().default(true),
    italic: z.boolean().default(false),
    fontColor: ColorEnum,
    fontSize: z.number(),
  }),
});

export const generateRadioButtonSchema = z.object({
  type: z.literal("RadioButton"),
  props: z.object({
    header: z.string().default("Radio Button Header"),
    numberOfButtons: z.number().default(2),
    optionLabels: z.array(z.string()).default([]),
    direction: z.enum(["row", "column"]).default("row"),
  }),
});

export const generateImageSchema = z.object({
  type: z.literal("Image"),
  props: z.object({
    alt: z.string().default("Image"),
  }),
});

export const generateTextBoxSchema = z.object({
  type: z.literal("TextBox"),
  props: z.object({
    fontColor: ColorEnum,
  }),
});

export const generateTextSchema = z.object({
  type: z.literal("Text"),
  props: z.object({
    text: z.string().describe("Write short paragraph"),
    fontColor: ColorEnum,
  }),
});

export const generateSliderSchema = z.object({
  type: z.literal("Slider"),
  props: z.object({
    backgroundColor: ColorEnum,
    header: z.string().default(""),
  }),
});

export const generateDropdownSchema = z.object({
  type: z.literal("Dropdown"),
  props: z.object({
    header: z.string().default(""),
    optionLabels: z.array(z.string()).default(["Option 1", "Option 2"]),
    numberOfOptions: z.number().default(2),
    fontColor: ColorEnum,
  }),
});

export const generateIconSchema = z.object({
  type: z.literal("Icon"),
  props: z.object({
    selectedIcon: z
      .string()
      .regex(/Vsc[A-Z][a-z]+/)
      .default("VscCircle")
      .describe("Icon name from react-icons/vsc"),
    iconSize: z.number().default(24),
  }),
});

// Used in getSectionChildrenOpenai.ts

const sectionSchema = z.object({
  section: z.string(),
  props: z.object({
    xPosition: z.number().int().max(10),
    yPosition: z.number().int().max(10),
    width: z.number().int().max(10),
    height: z.number().int().max(10),
    backgroundColor: ColorEnum.describe("Use accent colors for headers and footers."),
    flexDirection: z.enum(["row", "column"]).describe("Column if height > width, row otherwise."),
  }),
  contents: z.string().describe("Detailed description of the sections purpose/contents."),
});

export const layoutSchema = z.object({
  sections: z.array(sectionSchema).max(5),
});

// Used in convertLayoutToNodes.ts

export const generatedFullElements = z.union([
  generateButtonSchema,
  generateCheckboxSchema,
  generateIconSchema,
  generateInputSchema,
  generateLabelSchema,
  generateRadioButtonSchema,
  generateTextSchema,
  generateImageSchema,
  generateInputSchema,
  generateSliderSchema,
  generateDropdownSchema,
]);

export const fullSectionSchema = z.object({
  section: z.string(),
  props: z.object({
    xPosition: z.number().int().max(10),
    yPosition: z.number().int().max(10),
    width: z.number().int().max(10),
    height: z.number().int().max(10),
    flexDirection: z.enum(["row", "column"]),
    backgroundColor: ColorEnum,
  }),
  children: z.array(generatedFullElements).max(5),
});

export const fullLayoutSchema = z.array(fullSectionSchema).max(6);

export type FullLayoutSchema = z.infer<typeof fullLayoutSchema>;

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
  props: z.object({
    xPosition: z.number().int().max(10),
    yPosition: z.number().int().max(10),
    width: z.number().int().max(10),
    height: z.number().int().max(10),
    flexDirection: z.enum(["row", "column"]),
    backgroundColor: z.string(),
    borderColor: z.string(),
  }),
  children: z.array(z.any()),
});

export type ThemedSectionSchema = z.infer<typeof themedSectionSchema>;

export const themedLayoutSchema = z.array(themedSectionSchema).max(5);

export type ThemedLayoutSchema = z.infer<typeof themedSectionSchema>;
