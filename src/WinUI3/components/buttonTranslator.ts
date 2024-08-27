import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";
import { escapeXml } from "./specialchar";

export function generateButtonXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Button`;

  // Content
  xaml += ` Content="${escapeXml(props.text || "button")}"`;

  // Style properties
  xaml += ` Foreground="${convertColor(
    props.textColor || "{ThemeResource ButtonForegroundThemeBrush}"
  )}"`;
  xaml += ` Background="${convertColor(
    props.backgroundColor || "{ThemeResource ButtonBackgroundThemeBrush}"
  )}"`;
  xaml += ` HorizontalAlignment="Stretch" VerticalAlignment="Stretch"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;

  // Border properties
  xaml += ` BorderBrush="${convertColor(
    props.borderColor || "{ThemeResource ButtonBorderThemeBrush}"
  )}"`;
  xaml += ` BorderThickness="${props.borderWidth || 1}"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;

  xaml += ` Padding="${props.padding || "10,5"}"`;

  xaml += ` MinWidth="${scaleSize(props.width, "button")}"`;
  xaml += ` MinHeight="${scaleSize(props.height, "button")}"`;
  xaml += ` FontSize="${scaleSize(props.fontSize, "text")}"`;

  xaml += ">\n";

  if (props.icon && props.icon !== "none") {
    xaml += generateButtonContent(props, indent + "  ");
  }

  xaml += `${indent}</Button>`;

  return xaml + "\n";
}

function generateButtonContent(props: any, indent: string): string {
  let content = `${indent}<Button.Content>\n`;
  content += `${indent}  <StackPanel Orientation="Horizontal">\n`;

  if (props.icon === "left") {
    content += `${indent}    <FontIcon Glyph="&#xE001;" Margin="0,0,5,0" />\n`;
  }

  content += `${indent}    <TextBlock Text="${props.text}" />\n`;

  if (props.icon === "right") {
    content += `${indent}    <FontIcon Glyph="&#xE001;" Margin="5,0,0,0" />\n`;
  }

  content += `${indent}  </StackPanel>\n`;
  content += `${indent}</Button.Content>\n`;

  return content;
}

function scaleSize(size: number, elementType: string = "default"): number {
  const scales = {
    button: { min: 32, max: 300, factor: 5 },
    icon: { min: 16, max: 64, factor: 2 },
    text: { min: 12, max: 72, factor: 1 },
    default: { min: 32, max: 300, factor: 5 },
  };

  const { min, max, factor } = scales[elementType] || scales.default;

  if (size <= 5) {
    return min + (size - 1) * factor;
  }

  return Math.min(Math.max(size * factor, min), max);
}
