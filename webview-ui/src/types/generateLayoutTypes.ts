import { z } from "zod";
import { themeNames } from "./themes";

export const generateButtonSchema = z.object({
  element: z.literal("Button"),
  vscIcon: z.string(),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateCheckboxesSchema = z.object({
  element: z.literal("Checkboxes"),
});

export const generateInputSchema = z.object({
  element: z.literal("Input"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateLabelSchema = z.object({
  element: z.literal("Label"),
  text: z.string(),
  bold: z.boolean(),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  fontSize: z.number(),
});

export const generateRadioButtonSchema = z.object({
  element: z.literal("RadioButtons"),
  header: z.string(),
});

export const generateImageSchema = z.object({
  element: z.literal("Image"),
  alt: z.string(),
  width: z.number(),
});

export const generateTextBoxSchema = z.object({
  element: z.literal("TextBox"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateTextSchema = z.object({
  element: z.literal("Text"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateSliderSchema = z.object({
  element: z.literal("Slider"),
  header: z.string(),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateDropdownSchema = z.object({
  element: z.literal("Dropdown"),
  header: z.string(),
});

export const generateIconSchema = z.object({
  element: z.literal("Icon"),
  vscIcon: z.string(),
});

export const generatedFullElements = z.union([
  generateButtonSchema,
  generateCheckboxesSchema,
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

const sectionSchema = z.object({
  section: z.string(),
  xPosition: z.number(),
  yPosition: z.number(),
  width: z.number(),
  height: z.number(),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  flexDirection: z.enum(["row", "column"]),
  children: z.array(generatedFullElements),
});

export const sectionsSchema = z.array(sectionSchema);

export const layoutSchema = z.object({
  theme: z.enum(themeNames as [string, ...string[]]),
  sections: sectionsSchema,
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

export const themedLayoutSchema = z.array(themedSectionSchema);

export type ThemedLayoutSchema = z.infer<typeof themedSectionSchema>;
