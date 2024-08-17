import { Node } from "../JsonParser";

export function generateCheckboxXaml(node: Node, indent: string = ""): string {
  const props = node.props;

  let xaml = `${indent}<StackPanel Orientation="${
    props.direction === "row" ? "Horizontal" : "Vertical"
  }">\n`;

  for (let i = 0; i < (props.numberOfBoxes || 1); i++) {
    const checkboxName = `Option${i + 1}CheckBox`;

    xaml += `${indent}  <CheckBox x:Name="${checkboxName}" Content="${
      props.optionLabels && props.optionLabels[i] ? props.optionLabels[i] : `Option ${i + 1}`
    }"`;

    xaml += ` Margin="0,0,0,8"`;
    xaml += ` FontSize="${props.fontSize || 14}"`;
    xaml += ` Foreground="${
      props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
    }"`;
    xaml += ` Background="${props.backgroundColor || "Transparent"}"`;

    xaml += " />\n";
  }

  xaml += `${indent}</StackPanel>\n`;

  return xaml;
}
