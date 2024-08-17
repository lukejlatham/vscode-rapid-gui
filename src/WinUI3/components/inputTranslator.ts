import { Node } from "../JsonParser";

export function generateInputXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox AutomationProperties.Name="customized TextBox"`;

  xaml += ` PlaceholderText="${props.placeholder ?? ""}"`;
  xaml += ` FontSize="${props.fontSize} ?? 12"`;
  xaml += ` Foreground="${props.fontColor} ?? 'Black'"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` CornerRadius="${props.borderRadius} ?? 0"`;

  xaml += " />";

  return xaml + "\n";
}
 