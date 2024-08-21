import { z } from "zod";
import { themeNames, fontNames, fontGenerationNames } from "./themes";
import * as VscIcons from "react-icons/vsc";

function levenshteinDistance(a: string, b: string): number {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function findClosestIcon(vscIcon: string): keyof typeof VscIcons {
  const availableIcons = Object.keys(VscIcons);
  let closestMatch = availableIcons[0];
  let minDistance = Infinity;

  for (const icon of availableIcons) {
    const distance = levenshteinDistance(vscIcon.toLowerCase(), icon.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = icon;
    }
  }

  return closestMatch as keyof typeof VscIcons;
}

// Use .default to force a value

const generateButtonSchema = z
  .object({
    element: z.literal("Button"),
    vscIcon: z.string().transform((val) => {
      const prefix = val.slice(0, 3).toLowerCase() === "vsc" ? "" : "Vsc";
      const iconName = prefix + val;

      return findClosestIcon(iconName);
    }),
    backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
    width: z.number().default(10),
    fontSize: z.number().default(18),
    shadowColor: z.string().default("transparent"), // matches
    shadowOffsetX: z.number().default(1), // matches
    shadowOffsetY: z.number().default(1), // matches
    shadowBlur: z.number().default(1),
  })
  .transform((data) => {
    let fontColor;
    switch (data.backgroundColor) {
      case "Main":
        fontColor = "LightAccent";
        break;
      case "LightAccent":
        fontColor = "DarkAccent";
        break;
      case "DarkAccent":
        fontColor = "Main";
        break;
      default:
        fontColor = "Main";
    }
    return { ...data, fontColor };
  });

export { generateButtonSchema };

export const generateCheckboxesSchema = z
  .object({
    element: z.literal("Checkboxes"),
    fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]).default("Main"),
    optionLabels: z.array(z.string()).default(["Option 1", "Option 2"]),
  })
  .transform((data) => {
    return { ...data, numberOfBoxes: data.optionLabels.length };
  });

export const generateInputSchema = z.object({
  element: z.literal("Input"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]).default("Main"),
  placeholder: z.string(),
});

export const TitleType = z.enum(["Title", "Subtitle", "SmallSubtitle", "Link"]);

const FontSizeMap = {
  Title: 32,
  Subtitle: 24,
  SmallSubtitle: 18,
  Link: 14,
} as const;

export const generateLabelSchema = z
  .object({
    element: z.literal("Label"),
    text: z.string(),
    bold: z.boolean(),
    fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
    fontSize: TitleType,
  })
  .transform((data) => ({
    ...data,
    fontSize: FontSizeMap[data.fontSize],
    ...(data.fontSize === "Link" ? { hyperlink: "https://www.example.com" } : {}),
  }));

export const generateRadioButtonSchema = z
  .object({
    element: z.literal("RadioButtons"),
    fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]).default("Main"),
    optionLabels: z.array(z.string()).default(["Option 1", "Option 2"]),
  })
  .transform((data) => {
    return { ...data, numberOfBoxes: data.optionLabels.length };
  });

export const generateImageSchema = z.object({
  element: z.literal("Image"),
  alt: z.string(),
  width: z.number(),
});

export const generateTextBoxSchema = z.object({
  element: z.literal("TextBox"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]).default("Main"),
});

export const generateTextSchema = z.object({
  element: z.literal("Text"),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generateSliderSchema = z.object({
  element: z.literal("Slider"),
  header: z.string(),
  backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]).default("Main"),
});

export const generateDropdownSchema = z.object({
  element: z.literal("Dropdown"),
  header: z.string(),
  fontColor: z.enum(["Main", "LightAccent", "DarkAccent"]).default("Main"),
});

export const generateIconSchema = z.object({
  element: z.literal("Icon"),
  vscIcon: z.string().transform((val) => {
    const prefix = val.slice(0, 3).toLowerCase() === "vsc" ? "" : "Vsc";
    const iconName = prefix + val;

    return findClosestIcon(iconName);
  }),
  iconSize: z.number(),
  iconColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
});

export const generatedFullElements = z.union([
  generateButtonSchema,
  generateCheckboxesSchema,
  generateIconSchema,
  generateTextBoxSchema,
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
  fontFamily: z.enum(fontGenerationNames as [string, ...string[]]),
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
