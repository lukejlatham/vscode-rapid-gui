import { Node } from "../JsonParser";

export function generateLabelXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBlock`;

  xaml += ` Text="${props.text || ""}"`;
  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
  xaml += ` Foreground="${
    props.fontColor || "{ThemeResource SystemControlForegroundBaseHighBrush}"
  }"`;
  xaml += ` TextAlignment="${
    (props.textAlign || "left").charAt(0).toUpperCase() + (props.textAlign || "left").slice(1)
  }"`;

  if (props.bold) {
    xaml += ` FontWeight="Bold"`;
  }
  if (props.italic) {
    xaml += ` FontStyle="Italic"`;
  }
  if (props.underline) {
    xaml += ` TextDecorations="Underline"`;
  }

  xaml += "></TextBlock>";

  if (props.icon && props.icon !== "none") {
    xaml = `${indent}<StackPanel Orientation="Horizontal" Spacing="5">\n${
      props.icon === "left" ? `${indent}  <FontIcon Glyph="&#xE001;" />\n` : ""
    }${indent}  ${xaml}\n${
      props.icon === "right" ? `${indent}  <FontIcon Glyph="&#xE001;" />\n` : ""
    }${indent}</StackPanel>`;
  }

  return xaml + "\n";
}
