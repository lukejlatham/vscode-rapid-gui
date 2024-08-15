import { z } from "zod";

// Step 1 - Generate Layout

export const generatedSections = z.array(
  z.object({
    sectionName: z.string(),
    xPosition: z.number(),
    yPosition: z.number(),
    width: z.number(),
    height: z.number(),
    backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
    flexDirection: z.enum(["row", "column"]),
    childComponentsDescription: z.string(),
  })
);

export const generatedLayout = z.object({
  layout: generatedSections,
});

// Step 2 - Generate Section Children Schema from output of step 1

export function generateLayoutSchema(layout: z.infer<typeof generatedLayout>) {
  const schemaObject: { [key: string]: z.ZodType } = {};

  layout.layout.forEach((section) => {
    // Explicitly define the array schema for each section
    schemaObject[section.sectionName] = z.array(
      z.enum([
        "Button",
        "Label",
        "Image",
        "RadioButtons",
        "Checkboxes",
        "Input",
        "Text",
        "Icon",
        "Slider",
        "Dropdown",
      ])
    );
  });

  return z
    .object({
      sections: z.object(schemaObject).strict(),
    })
    .strict();
}

export const generateButtonSchema = z.object({
  type: z.literal("Button"),
  selectedIcon: z.string(),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateCheckboxesSchema = z.object({
  type: z.literal("Checkboxes"),
  optionLabels: z.array(z.string()),
  numberOfBoxes: z.number(),
});

export const generateInputSchema = z.object({
  type: z.literal("Input"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateLabelSchema = z.object({
  type: z.literal("Label"),
  text: z.string(),
  bold: z.boolean(),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  fontSize: z.number(),
});

export const generateRadioButtonSchema = z.object({
  type: z.literal("RadioButtons"),
  header: z.string(),
  numberOfButtons: z.number(),
  optionLabels: z.array(z.string()),
});

export const generateImageSchema = z.object({
  type: z.literal("Image"),
  alt: z.string(),
  width: z.number(),
});

export const generateTextBoxSchema = z.object({
  type: z.literal("TextBox"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateTextSchema = z.object({
  type: z.literal("Text"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateSliderSchema = z.object({
  type: z.literal("Slider"),
  header: z.string(),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateDropdownSchema = z.object({
  type: z.literal("Dropdown"),
  header: z.string(),
  optionLabels: z.array(z.string()),
  numberOfOptions: z.number(),
});

export const generateIconSchema = z.object({
  type: z.literal("Icon"),
  selectedIcon: z.string(),
});

// Used in getSectionChildrenOpenai.ts

const sectionSchema = z.object({
  section: z.string(),
  props: z.object({
    xPosition: z.number(),
    yPosition: z.number(),
    width: z.number(),
    height: z.number(),
    backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
    flexDirection: z.enum(["row", "column"]),
  }),
  contents: z.string(),
});

export const layoutSchema = z.object({
  sections: z.array(sectionSchema),
});

// Used in convertLayoutToNodes.ts

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

const generatedElements = z.enum([
  "Button",
  "Label",
  "Image",
  "RadioButtons",
  "Checkboxes",
  "Input",
  "Text",
  "Icon",
  "Slider",
  "Dropdown",
]);

export const fullSectionSchema = z.object({
  section: z.string().describe("This should match one of the sections the user provided."),
  props: z.object({
    xPosition: z.number().int().max(10),
    yPosition: z.number().int().max(10),
    width: z.number().int().max(10),
    height: z.number().int().max(10),
    flexDirection: z.enum(["row", "column"]),
    backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  }),
  children: z
    .array(generatedFullElements)
    .max(8)
    .describe("This must contain all the elements the user specified in that section."),
});

export const fullLayoutSchema = z
  .array(fullSectionSchema)
  .max(6)
  .describe("This should contain all the sections the user provided.");

export type FullLayoutSchema = z.infer<typeof fullLayoutSchema>;
