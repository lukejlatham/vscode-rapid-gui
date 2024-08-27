import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";
import { escapeXml } from "./specialchar";

export function generateDropdownXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<StackPanel Orientation="Vertical" Spacing="5">\n`;

  // Add header
  if (props.header) {
    xaml += `${indent}  <TextBlock Text="${escapeXml(props.header)}" 
             FontSize="${props.fontSize || 14}" 
             FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}" 
             Foreground="${convertColor(
               props.fontColor || "{ThemeResource ComboBoxForegroundThemeBrush}"
             )}" 
             Margin="0,0,0,5"/>\n`;
  }

  // ComboBox
  xaml += `${indent}  <ComboBox`;
  xaml += ` Width="${props.width || 200}"`;
  xaml += ` Height="${props.height || 32}"`;
  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
  xaml += ` Foreground="${convertColor(
    props.fontColor || "{ThemeResource ComboBoxForegroundThemeBrush}"
  )}"`;
  xaml += ` Background="${
    props.backgroundColor || "{ThemeResource ComboBoxBackgroundThemeBrush}"
  }"`;
  xaml += ` PlaceholderText="${escapeXml(props.placeholder || "")}"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;
  xaml += ">\n";

  // Add options
  if (Array.isArray(props.optionLabels)) {
    props.optionLabels.forEach((option: string) => {
      xaml += `${indent}    <ComboBoxItem Content="${option}" />\n`;
    });
  }

  xaml += `${indent}  </ComboBox>\n`;
  xaml += `${indent}</StackPanel>`;

  return xaml + "\n";
}
