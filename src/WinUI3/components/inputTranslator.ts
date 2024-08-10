import { Node } from "../JsonParser";

export function generateInputXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox`;

  xaml += ` PlaceholderText="${props.placeholder}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;
  xaml += ` BorderBrush="${props.borderColor}"`;
  xaml += ` BorderThickness="1"`;

  xaml += " />";

  return xaml + "\n";
}
