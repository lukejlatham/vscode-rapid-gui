import { Node } from "../JsonParser";

export function generateInputXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox`;

  xaml += ` PlaceholderText="${props.placeholder || ""}"`;
  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` Foreground="${
    props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
  }"`;
  xaml += ` Background="${
    props.backgroundColor || "{ThemeResource SystemControlBackgroundAltHighBrush}"
  }"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;

  xaml += " />";

  return xaml + "\n";
}
