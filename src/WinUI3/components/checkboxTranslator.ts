import { Node } from "../JsonParser";

export function generateCheckboxXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<CheckBox`;

  xaml += ` Content="${props.label}"`;
  xaml += ` IsChecked="${props.checked}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;

  if (props.disabled) {
    xaml += ` IsEnabled="False"`;
  }

  xaml += " />";

  return xaml + "\n";
}
