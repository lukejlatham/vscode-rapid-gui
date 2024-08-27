import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";
import { escapeXml } from "./specialchar";
import { getGlyphFromVscIcon } from "./iconTranslator";

export function generateLabelXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBlock`;

  xaml += ` Text="${escapeXml(props.text || "")}"`;
  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
  xaml += ` Foreground="${convertColor(
    props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
  )}"`;
  xaml += ` TextAlignment="${
    (props.textAlign || "left").charAt(0).toUpperCase() + (props.textAlign || "left").slice(1)
  }"`;

  if (props.bold) {
    xaml += ` FontWeight="Bold"`;
  }
  if (props.italic) {
    xaml += ` FontStyle="Italic"`;
  }
  if (props.underline) {
    xaml += ` TextDecorations="Underline"`;
  }

  xaml += "></TextBlock>";

  if (props.vscIcon) {
    const glyph = getGlyphFromVscIcon(props.vscIcon);
    const iconColor = convertColor(
      props.iconColor || props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
    );

    xaml = `${indent}<StackPanel Orientation="Horizontal" Spacing="5">\n`;

    if (props.iconPosition !== "right") {
      xaml += `${indent}  <FontIcon Glyph="${glyph}" FontFamily="Segoe MDL2 Assets" Foreground="${iconColor}" />\n`;
    }

    xaml += `${indent}  ${xaml}\n`;

    if (props.iconPosition === "right") {
      xaml += `${indent}  <FontIcon Glyph="${glyph}" FontFamily="Segoe MDL2 Assets" Foreground="${iconColor}" />\n`;
    }

    xaml += `${indent}</StackPanel>`;
  }

  return xaml + "\n";
}
