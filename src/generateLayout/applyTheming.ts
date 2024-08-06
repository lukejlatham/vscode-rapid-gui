import { z } from "zod";
import { fullLayoutSchema, ColorScheme, themedLayoutSchema } from "../../webview-ui/src/types";
import { slateGreyScheme, orangeScheme } from "./themes";

// Generated colors are always Main, LightAccent, or DarkAccent.

// This function takes generated options and converts them to the actual colors of a random color scheme (from themes.ts).

const possibleColorSchemes = [slateGreyScheme, orangeScheme];

// Border colors are derived from the background color of the element - these can be different from the background color.

const hasBackgroundColor = (
  obj: any
): obj is { props: { backgroundColor: "Main" | "LightAccent" | "DarkAccent" } } =>
  obj.props && "backgroundColor" in obj.props && typeof obj.props.backgroundColor === "string";

const hasFontColor = (
  obj: any
): obj is { props: { fontColor: "Main" | "LightAccent" | "DarkAccent" } } =>
  obj.props && "fontColor" in obj.props && typeof obj.props.fontColor === "string";

const mapColor = (
  color: "Main" | "LightAccent" | "DarkAccent",
  colorType: keyof ColorScheme,
  colorScheme: ColorScheme
) => {
  return colorScheme[colorType][color.toLowerCase() as keyof typeof colorScheme.sectionColors];
};

const applyThemeToSchema = (
  data: z.infer<typeof fullLayoutSchema>
): z.infer<typeof themedLayoutSchema> => {
  const randomIndex = Math.floor(Math.random() * possibleColorSchemes.length);
  const selectedColorScheme = possibleColorSchemes[randomIndex];

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
