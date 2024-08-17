import { Node } from "../JsonParser";

export function generateTextBoxXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox`;

  xaml += ` Text="${props.text}"`;
  xaml += ` PlaceholderText="${props.placeholder}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` BorderBrush="${props.borderColor}"`;
  xaml += ` BorderThickness="1"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;
  xaml += ` TextWrapping="Wrap"`;
  xaml += ` AcceptsReturn="True"`;

  // Note: Resize functionality is not directly available in XAML
  // We'll set a fixed width and height based on the default props
  xaml += ` Width="${props.width}"`;
  xaml += ` Height="${props.height}"`;

  xaml += " />";

  return xaml + "\n";
}
