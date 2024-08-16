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

// Used in getSectionChildrenOpenai.ts

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

export const layoutSchema = z.object({
  theme: z.enum(themeNames as [string, ...string[]]),
  sections: z.array(sectionSchema),
});

export const fullSectionSchema = z.object({
  section: z.string(),
  xPosition: z.number().int().max(10),
  yPosition: z.number().int().max(10),
  width: z.number().int().max(10),
  height: z.number().int().max(10),
  flexDirection: z.enum(["row", "column"]),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  children: z.array(z.any()),
});

export const fullLayoutSchema = z
  .array(fullSectionSchema)
  .max(6)
  .describe("This should contain all the sections the user provided.");

export type FullLayoutSchema = z.infer<typeof fullLayoutSchema>;
