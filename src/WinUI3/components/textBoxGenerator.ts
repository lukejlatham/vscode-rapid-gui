import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";
import { escapeXml } from "./specialchar";

export function generateTextBoxXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox`;

  xaml += ` Text="${escapeXml(props.text)}"`;
  xaml += ` PlaceholderText="${props.placeholder}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${convertColor(props.fontColor)}"`;
  xaml += ` Background="${convertColor(props.backgroundColor)}"`;
  xaml += ` BorderBrush="${props.borderColor}"`;
  xaml += ` BorderThickness="1"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;
  xaml += ` TextWrapping="Wrap"`;
  xaml += ` AcceptsReturn="True"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;

  xaml += ` Width="${props.width}"`;
  xaml += ` Height="${props.height}"`;

  xaml += "></TextBox>";

  return xaml + "\n";
}
