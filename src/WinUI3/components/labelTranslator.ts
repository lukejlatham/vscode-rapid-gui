import { Node } from "../JsonParser";

export function generateLabelXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<TextBlock`;

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
    xaml += `${indent}  <Hyperlink NavigateUri="${props.hyperlink}">\n`;
    xaml += `${indent}    <Run Text="${props.text}"/>\n`;
    xaml += `${indent}  </Hyperlink>\n`;
    xaml += `${indent}</TextBlock>`;
  } else {
    xaml += " />";
  }

  // Wrap in a StackPanel if an icon is present
  if (props.icon !== "none") {
    xaml = `${indent}<StackPanel Orientation="Horizontal" Spacing="5">\n${
      props.icon === "left" ? `${indent}  <FontIcon Glyph="&#xE001;" />\n` : ""
    }${indent}  ${xaml}\n${
      props.icon === "right" ? `${indent}  <FontIcon Glyph="&#xE001;" />\n` : ""
    }${indent}</StackPanel>`;
  }

  return xaml + "\n";
}
