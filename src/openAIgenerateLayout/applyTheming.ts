import { z } from "zod";
import { fullLayoutSchema, ColorScheme, themedLayoutSchema } from "../../webview-ui/src/types";
import {
  slateGreyScheme,
  orangeScheme,
  tetrisScheme,
} from "../../webview-ui/src/Features/theming/themes";

const possibleColorSchemes = [slateGreyScheme, orangeScheme, tetrisScheme];

const hasBackgroundColor = (
  obj: any
): obj is { backgroundColor: "Main" | "LightAccent" | "DarkAccent" } =>
  "backgroundColor" in obj && typeof obj.backgroundColor === "string";

const hasFontColor = (obj: any): obj is { fontColor: "Main" | "LightAccent" | "DarkAccent" } =>
  "fontColor" in obj && typeof obj.fontColor === "string";

const getRandomValue = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[Math.floor(Math.random() * value.length)];
  }
  return value;
};

const mapColor = (
  color: "Main" | "LightAccent" | "DarkAccent",
  colorType: keyof ColorScheme,
  colorScheme: ColorScheme
) => {
  const colorValue =
    colorScheme[colorType][color.toLowerCase() as keyof typeof colorScheme.sectionColors];
  return getRandomValue(colorValue);
};

const applyThemeToSchema = (
  data: z.infer<typeof fullLayoutSchema>
): z.infer<typeof themedLayoutSchema> => {
  const randomIndex = Math.floor(Math.random() * possibleColorSchemes.length);
  const selectedColorScheme = possibleColorSchemes[randomIndex];

  return data.map((section) => {
    const newSection = {
      ...section,
      backgroundColor: mapColor(section.backgroundColor, "sectionColors", selectedColorScheme),
      ...(section.backgroundColor && {
        borderColor: mapColor(section.backgroundColor, "sectionBorderColors", selectedColorScheme),
      }),
    };

    const newChildren = section.children.map((child) => {
      let updatedChild: any = { ...child };

      if (hasBackgroundColor(child)) {
        updatedChild.backgroundColor = mapColor(
          child.backgroundColor,
          "elementColors",
          selectedColorScheme
        );
        updatedChild.borderColor = mapColor(
          child.backgroundColor,
          "elementBorderColors",
          selectedColorScheme
        );
      }

      if (hasFontColor(child)) {
        updatedChild.fontColor = mapColor(child.fontColor, "fontColors", selectedColorScheme);
      }

      return updatedChild;
    });

    return {
      ...newSection,
      children: newChildren,
    };
  });
};

export { applyThemeToSchema };
