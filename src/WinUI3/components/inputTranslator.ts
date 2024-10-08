import { Node } from "../JsonParser";
import { convertColor } from "../../utilities/colortranslator";
import { escapeXml } from "./specialchar";

export function generateInputXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBox`;

  xaml += ` PlaceholderText="${escapeXml(props.placeholder || "")}"`;
  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
  xaml += ` Foreground="${convertColor(
    props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
  )}"`;
  xaml += ` Background="${convertColor(
    props.backgroundColor || "{ThemeResource SystemControlBackgroundAltHighBrush}"
  )}"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;

  xaml += " />";

  return xaml + "\n";
}
