import { z } from "zod";
import { fullLayoutSchema, ColorScheme, themedLayoutSchema } from "../../webview-ui/src/types";

type FullLayoutSchema = z.infer<typeof fullLayoutSchema>;

const hasBackgroundColor = (
  obj: any
): obj is { props: { backgroundColor: "Main" | "Accent1" | "Accent2" } } =>
  obj.props && typeof obj.props.backgroundColor === "string";

const hasBorderColor = (
  obj: any
): obj is { props: { borderColor: "Main" | "Accent1" | "Accent2" } } =>
  obj.props && typeof obj.props.borderColor === "string";

const hasFontColor = (obj: any): obj is { props: { fontColor: "Main" | "Accent1" | "Accent2" } } =>
  obj.props && typeof obj.props.fontColor === "string";

const colorScheme: ColorScheme = {
  sectionColors: {
    main: "#f0f0f0",
    accent1: "#e0e0e0",
    accent2: "#d0d0d0",
  },
  elementColors: {
    main: "#ff0000",
    accent1: "#00ff00",
    accent2: "#0000ff",
  },
  borderColors: {
    main: "#000000",
    accent1: "#333333",
    accent2: "#666666",
  },
  fontColors: {
    main: "#111111",
    accent1: "#222222",
    accent2: "#333333",
  },
};

const mapColor = (color: "Main" | "Accent1" | "Accent2", colorType: keyof ColorScheme) => {
  return colorScheme[colorType][color.toLowerCase() as keyof typeof colorScheme.sectionColors];
};

const transformSchema = (
  data: FullLayoutSchema,
  colorScheme: ColorScheme
): z.infer<typeof themedLayoutSchema> => {
  return data.map((section) => ({
    ...section,
    props: {
      ...section.props,
      backgroundColor: mapColor(section.props.backgroundColor, "sectionColors"),
    },
    children: section.children.map((child) => {
      const updatedProps: any = { ...child.props };

      if (hasBackgroundColor(child)) {
        updatedProps.backgroundColor = mapColor(child.props.backgroundColor, "elementColors");
      }

      if (hasBorderColor(child)) {
        updatedProps.borderColor = mapColor(child.props.borderColor, "borderColors");
      }

      if (hasFontColor(child)) {
        updatedProps.fontColor = mapColor(child.props.fontColor, "fontColors");
      }

      return {
        ...child,
        props: updatedProps,
      };
    }),
  }));
};
// Example usage
const data: FullLayoutSchema = [
  // Your input data here
];

const transformedData = transformSchema(data, colorScheme);
console.log(JSON.stringify(transformedData, null, 2));
