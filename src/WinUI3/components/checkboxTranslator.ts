import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";
import { escapeXml } from "./specialchar";

export function generateCheckboxXaml(node: Node, indent: string = ""): string {
  const props = node.props;

  let xaml = `${indent}<StackPanel Orientation="${
    props.direction === "row" ? "Horizontal" : "Vertical"
  }">\n`;

  for (let i = 0; i < (props.numberOfBoxes || 1); i++) {
    const checkboxName = `Option${i + 1}CheckBox`;

    xaml += `${indent}  <CheckBox x:Name="${checkboxName}" Content="${escapeXml(
      props.optionLabels && props.optionLabels[i] ? props.optionLabels[i] : `Option ${i + 1}`
    )}"`;

    xaml += ` Margin="0,0,0,8"`;
    xaml += ` FontSize="${props.fontSize || 14}"`;
    xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
    xaml += ` Foreground="${convertColor(
      props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
    )}"`;
    xaml += ` Background="${props.backgroundColor || "Transparent"}"`;

    xaml += " />\n";
  }

  xaml += `${indent}</StackPanel>\n`;

  return xaml;
}
