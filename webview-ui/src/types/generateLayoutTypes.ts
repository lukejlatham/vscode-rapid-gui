import { z } from "zod";

const ColorEnum = z.enum(["Main", "LightAccent", "DarkAccent"]);

// Step 1 - Generate Layout

export const generatedSections = z.array(
  z.object({
    sectionName: z.string(),
    xPosition: z.number(),
    yPosition: z.number(),
    width: z.number(),
    height: z.number(),
    backgroundColor: ColorEnum,
    flexDirection: z.enum(["row", "column"]),
    childComponentsDescription: z.string(),
  })
);

export const generatedLayout = z.object({
  layout: generatedSections,
});

// Step 2 - Generate Elements

const generatedElements = z.enum([
  "Button",
  "Label",
  "Image",
  // "TextBox",
  "RadioButtons",
  "Checkboxes",
  "Input",
  "Text",
  "Icon",
  "Slider",
  "Dropdown",
]);

const generatedSectionChildren = z.object({
  section: z.string(),
  children: z.array(generatedElements).max(8),
});

const generatedAllSectionsChildren = z.object({
  sections: z.array(generatedSectionChildren).min(2).max(6),
});
