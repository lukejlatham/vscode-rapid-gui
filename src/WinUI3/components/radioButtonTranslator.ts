import { Node } from "../JsonParser";

export function generateRadioButtonXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<StackPanel`;

  xaml += ` Orientation="${props.direction === "row" ? "Horizontal" : "Vertical"}"`;
  xaml += ` Spacing="${props.gap || 5}"`;
  xaml += ">\n";

  // Add header if present
  if (props.header) {
    xaml += `${indent}  <TextBlock Text="${props.header}" FontSize="${props.fontSize}" Foreground="${props.fontColor}" />\n`;
  }

  props.optionLabels.forEach((label: string, index: number) => {
    xaml += `${indent}  <RadioButton`;
    xaml += ` Content="${label}"`;
    xaml += ` GroupName="${props.groupName || "RadioGroup"}"`;
    xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
    xaml += ` FontSize="${props.fontSize}"`;
    xaml += ` Foreground="${props.fontColor}"`;
    if (index === 0 && props.defaultSelected) {
      xaml += ` IsChecked="True"`;
    }
    xaml += " />\n";
  });

  xaml += `${indent}</StackPanel>`;

  return xaml + "\n";
}
