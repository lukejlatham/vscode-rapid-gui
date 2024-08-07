import { z } from "zod";
import { generatedElements } from "../../webview-ui/src/types";
import {
  generateButtonSchema,
  generateCheckboxSchema,
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

const childSchemaMap = {
  Button: generateButtonSchema,
  Checkbox: generateCheckboxSchema,
  Input: generateInputSchema,
  Label: generateLabelSchema,
  RadioButton: generateRadioButtonSchema,
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
    sections: z.array(z.union(sectionSchemas)).max(5),
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
      children: z.array(z.union(childSchemas)).max(8),
    });
  });

  return z.object({
    sections: z.array(z.union(sectionSchemas)).max(5),
  });
};
