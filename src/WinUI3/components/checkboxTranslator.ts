import { Node } from "../JsonParser";

export function generateCheckboxXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<CheckBox Checked="TwoState_Checked" Unchecked="TwoState_Unchecked" `;

  xaml += ` Content="${props.label} ?? 'Checkbox'"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;

  if (props.direction === "row") {
    xaml += ` HorizontalAlignment="Left"`;
  } else {
    xaml += ` VerticalAlignment="Top"`;
  }

  xaml += " />";

  return xaml + "\n";
}
