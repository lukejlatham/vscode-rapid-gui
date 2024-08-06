import { Node } from "../JsonParser";

export function generateLabelXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<StackPanel Orientation="Horizontal" Spacing="5">\n`;

  if (props.icon === "left") {
    xaml += `${indent}  <FontIcon Glyph="&#xE001;" />\n`; // Placeholder glyph, replace with actual icon
  }

  xaml += `${indent}  <TextBlock`;
  xaml += ` Text="${props.text}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` TextAlignment="${props.textAlign.charAt(0).toUpperCase() + props.textAlign.slice(1)}"`;

  if (props.bold) {
    xaml += ` FontWeight="Bold"`;
  }
  if (props.italic) {
    xaml += ` FontStyle="Italic"`;
  }
  if (props.underline) {
    xaml += ` TextDecorations="Underline"`;
  }

  if (props.hyperlink) {
    xaml += ">\n";
    xaml += `${indent}    <Hyperlink NavigateUri="${props.hyperlink}">\n`;
    xaml += `${indent}      ${props.text}\n`;
    xaml += `${indent}    </Hyperlink>\n`;
    xaml += `${indent}  </TextBlock>\n`;
  } else {
    xaml += " />\n";
  }

  if (props.icon === "right") {
    xaml += `${indent}  <FontIcon Glyph="&#xE001;" />\n`; // Placeholder glyph, replace with actual icon
  }

  xaml += `${indent}</StackPanel>`;

  return xaml + "\n";
}
