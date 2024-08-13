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
): obj is { props: { backgroundColor: "Main" | "LightAccent" | "DarkAccent" } } =>
  obj.props && "backgroundColor" in obj.props && typeof obj.props.backgroundColor === "string";

const hasFontColor = (
  obj: any
): obj is { props: { fontColor: "Main" | "LightAccent" | "DarkAccent" } } =>
  obj.props && "fontColor" in obj.props && typeof obj.props.fontColor === "string";

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

  console.log("Selected color scheme: ", selectedColorScheme);

  return data.map((section) => {
    const newSectionProps = {
      ...section.props,
      backgroundColor: mapColor(
        section.props.backgroundColor,
        "sectionColors",
        selectedColorScheme
      ),
      ...(section.props.backgroundColor && {
        borderColor: mapColor(
          section.props.backgroundColor,
          "sectionBorderColors",
          selectedColorScheme
        ),
      }),
    };

    const newChildren = section.children.map((child) => {
      const updatedProps: any = { ...child.props };

      if (hasBackgroundColor(child)) {
        updatedProps.backgroundColor = mapColor(
          child.props.backgroundColor,
          "elementColors",
          selectedColorScheme
        );
        updatedProps.borderColor = mapColor(
          child.props.backgroundColor,
          "elementBorderColors",
          selectedColorScheme
        );
      }

      if (hasFontColor(child)) {
        updatedProps.fontColor = mapColor(child.props.fontColor, "fontColors", selectedColorScheme);
      }

      return {
        ...child,
        props: updatedProps,
      };
    });

    return {
      ...section,
      props: newSectionProps,
      children: newChildren,
    };
  });
};

export { applyThemeToSchema };
