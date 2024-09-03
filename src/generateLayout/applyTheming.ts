import { z } from "zod";
import {
  sectionsSchema,
  ColorScheme,
  themedLayoutSchema,
  themeList,
} from "../../webview-ui/src/types";

const validColors = ["Main", "LightAccent", "DarkAccent"] as const;
type ValidColor = (typeof validColors)[number];

const hasBackgroundColor = (obj: any): obj is { backgroundColor: ValidColor } =>
  "backgroundColor" in obj &&
  typeof obj.backgroundColor === "string" &&
  validColors.includes(obj.backgroundColor as ValidColor);

const hasFontColor = (obj: any): obj is { fontColor: ValidColor } =>
  "fontColor" in obj &&
  typeof obj.fontColor === "string" &&
  validColors.includes(obj.fontColor as ValidColor);

const hasIconColor = (obj: any): obj is { iconColor: ValidColor } =>
  "iconColor" in obj &&
  typeof obj.iconColor === "string" &&
  validColors.includes(obj.iconColor as ValidColor);

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
  data: z.infer<typeof sectionsSchema>,
  selectedColorScheme: ColorScheme
): z.infer<typeof themedLayoutSchema> => {
  if (!selectedColorScheme) {
    throw new Error(`Theme not found`);
  }

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

      if (hasIconColor(child)) {
        updatedChild.iconColor = mapColor(child.iconColor, "fontColors", selectedColorScheme);
      }

      return updatedChild;
    });

    return {
      ...newSection,
      children: newChildren,
    };
  });
};

export {
  applyThemeToSchema,
  hasBackgroundColor,
  hasFontColor,
  hasIconColor,
  getRandomValue,
  mapColor,
};
