import { z } from "zod";
import {
  generateButtonSchema,
  generateCheckboxesSchema,
  generateInputSchema,
  generateLabelSchema,
  generateRadioButtonSchema,
  generateImageSchema,
  generateTextBoxSchema,
  generateTextSchema,
  generateIconSchema,
  generateDropdownSchema,
  generateSliderSchema,
} from "../../webview-ui/src/types";

export const generatedElements = z.object({
  type: z.enum([
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
  ]),
});

export const generatedSectionChildren = z.object({
  section: z.string(),
  children: z.array(generatedElements).max(8),
});

export const generatedAllSectionsChildren = z.object({
  sections: z.array(generatedSectionChildren).min(2).max(6),
});

const childSchemaMap = {
  Button: generateButtonSchema,
  Checkboxes: generateCheckboxesSchema,
  Input: generateInputSchema,
  Label: generateLabelSchema,
  RadioButtons: generateRadioButtonSchema,
  Image: generateImageSchema,
  TextBox: generateTextBoxSchema,
  Text: generateTextSchema,
  Icon: generateIconSchema,
  Slider: generateSliderSchema,
  Dropdown: generateDropdownSchema,
};

export const generateSectionChildrenSchema = (sections) => {
  const sectionSchemas = sections.map((section) => {
    return z.object({
      section: z.literal(section.section),
      children: z.array(generatedElements).max(8),
    });
  });

  return z.object({
    sections: z.array(z.union(sectionSchemas)).max(6),
  });
};

export const generateSectionChildrenFullSchema = (sections) => {
  const sectionSchemas = sections.map((section) => {
    const childSchemas = section.children.map((child) => {
      const schema = childSchemaMap[child.type];
      if (!schema) {
        throw new Error(`No schema found for type: ${child.type}`);
      }
      return schema;
    });

    return z.object({
      section: z.literal(section.section),
      children: z.array(z.object(childSchemas)).max(8),
    });
  });

  return z.object({
    sections: z.array(z.object(sectionSchemas)).max(6),
  });
};
