import { Node } from "../JsonParser";

export function generateTextBoxXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox`;

  xaml += ` Text="${props.text}"`;
  xaml += ` PlaceholderText="${props.placeholder}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` Height="${props.height}"`;
  xaml += ` Width="${props.width}"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;

  xaml += ` HorizontalAlignment="${
    props.alignment.charAt(0).toUpperCase() + props.alignment.slice(1)
  }"`;
  xaml += ` TextWrapping="Wrap"`;
  xaml += ` AcceptsReturn="True"`;

  xaml += " />";

  return xaml + "\n";
}
