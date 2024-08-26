import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";

export function generateTextXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<RichTextBlock TextWrapping="Wrap"`;

  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
  xaml += ` Foreground="${convertColor(
    props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
  )}"`;
  xaml += ` TextAlignment="${
    (props.textAlign || "left").charAt(0).toUpperCase() + (props.textAlign || "left").slice(1)
  }"`;

  xaml += ">\n";
  xaml += `${indent}  <Paragraph>`;

  if (props.hyperlink) {
    xaml += `<Hyperlink NavigateUri="${props.hyperlink}">`;
  }

  if (props.bold) {
    xaml += "<Bold>";
  }
  if (props.italic) {
    xaml += "<Italic>";
  }
  if (props.underline) {
    xaml += "<Underline>";
  }

  xaml += `<Run Text="${props.text || ""}" />`;

  if (props.underline) {
    xaml += "</Underline>";
  }
  if (props.italic) {
    xaml += "</Italic>";
  }
  if (props.bold) {
    xaml += "</Bold>";
  }

  if (props.hyperlink) {
    xaml += "</Hyperlink>";
  }

  xaml += "</Paragraph>\n";
  xaml += `${indent}</RichTextBlock>`;

  return xaml + "\n";
}
