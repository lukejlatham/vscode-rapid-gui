import { Node } from "../JsonParser";
import { convertColor } from "../../utilities/colortranslator";
import { escapeXml } from "./specialchar";
import { getGlyphFromVscIcon } from "./iconTranslator";

export function generateButtonXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Button`;

  // Style properties
  xaml += ` Foreground="${convertColor(
    props.fontColor || "{ThemeResource ButtonForegroundThemeBrush}"
  )}"`;
  xaml += ` Background="${convertColor(
    props.backgroundColor || "{ThemeResource ButtonBackgroundThemeBrush}"
  )}"`;
  xaml += ` HorizontalAlignment="Stretch" VerticalAlignment="Stretch"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;

  // Border properties
  xaml += ` BorderBrush="${convertColor(
    props.bordercolor || "{ThemeResource ButtonBorderThemeBrush}"
  )}"`;
  xaml += ` BorderThickness="${props.borderWidth || 1}"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;

  xaml += ` Padding="${props.padding || "10,5"}"`;

  xaml += ` Width="${scaleSize(props.width, "button")}"`;
  xaml += ` Height="${scaleSize(props.height, "button")}"`;
  xaml += ` FontSize="${scaleSize(props.fontSize, "text")}"`;

  xaml += ">\n";

  xaml += generateButtonContent(props, indent + "  ");

  xaml += `${indent}</Button>`;

  return xaml + "\n";
}

function generateButtonContent(props: any, indent: string): string {
  let content = `${indent}<Button.Content>\n`;

  if (props.vscIcon) {
    content += `${indent}  <Grid>\n`;
    content += `${indent}    <StackPanel Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">\n`;

    const glyph = getGlyphFromVscIcon(props.vscIcon);
    const iconColor = convertColor(
      props.iconColor || props.fontColor || "{ThemeResource ButtonForegroundThemeBrush}"
    );

    if (props.iconPosition !== "right") {
      content += `${indent}      <FontIcon Glyph="${glyph}" FontFamily="Segoe MDL2 Assets" Foreground="${iconColor}" ${
        props.text ? 'Margin="0,0,5,0"' : ""
      }/>\n`;
    }

    if (props.text) {
      content += `${indent}      <TextBlock Text="${escapeXml(
        props.text
      )}" VerticalAlignment="Center" />\n`;
    }

    if (props.iconPosition === "right") {
      content += `${indent}      <FontIcon Glyph="${glyph}" FontFamily="Segoe MDL2 Assets" Foreground="${iconColor}" ${
        props.text ? 'Margin="5,0,0,0"' : ""
      }/>\n`;
    }

    content += `${indent}    </StackPanel>\n`;
    content += `${indent}  </Grid>\n`;
  } else if (props.text) {
    content += `${indent}  <TextBlock Text="${escapeXml(
      props.text
    )}" HorizontalAlignment="Center" VerticalAlignment="Center" />\n`;
  }

  content += `${indent}</Button.Content>\n`;

  return content;
}

function scaleSize(size: number | string, elementType: string = "default"): string {
  if (typeof size === "string") {
    return size;
  }

  const scales = {
    button: { min: 32, max: 300, factor: 5 },
    icon: { min: 16, max: 64, factor: 2 },
    text: { min: 12, max: 72, factor: 1 },
    default: { min: 32, max: 300, factor: 5 },
  };

  const { min, max, factor } = scales[elementType] || scales.default;

  if (size <= 5) {
    return `${Math.min(Math.max(min + (size - 1) * factor, min), max)}`;
  }

  return `${Math.min(Math.max(size * factor, min), max)}`;
}
