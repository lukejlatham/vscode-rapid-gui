import { Node } from "../JsonParser";

export function generateButtonXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Button`;

  // Content
  xaml += ` Content="${props.text}"`;

  // Style properties
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Width="${props.width}%"`;
  xaml += ` Height="${props.height}%"`;

  // Border properties
  xaml += ` BorderBrush="${props.bordercolor}"`;
  xaml += ` BorderThickness="1"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;

  // Shadow effect
  if (props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml += ">\n";
    xaml += `${indent}  <Button.Effect>\n`;
    xaml += `${indent}    <DropShadowEffect Color="${props.shadowColor}" BlurRadius="${props.shadowBlur}" ShadowDepth="0" OffsetX="${props.shadowOffsetX}" OffsetY="${props.shadowOffsetY}" />\n`;
    xaml += `${indent}  </Button.Effect>\n`;

    // Add icon if present
    if (props.icon !== "none") {
      xaml += generateButtonContent(props, indent + "  ");
    }

    xaml += `${indent}</Button>`;
  } else {
    // If no shadow, close the button tag
    if (props.icon !== "none") {
      xaml += ">\n";
      xaml += generateButtonContent(props, indent + "  ");
      xaml += `${indent}</Button>`;
    } else {
      xaml += " />";
    }
  }

  return xaml + "\n";
}

function generateButtonContent(props: any, indent: string): string {
  let content = `${indent}<StackPanel Orientation="Horizontal">\n`;

  if (props.icon === "left") {
    content += `${indent}  <FontIcon Glyph="&#xE001;" Margin="0,0,5,0" />\n`;
  }

  content += `${indent}  <TextBlock Text="${props.text}" />\n`;

  if (props.icon === "right") {
    content += `${indent}  <FontIcon Glyph="&#xE001;" Margin="5,0,0,0" />\n`;
  }

  content += `${indent}</StackPanel>\n`;

  return content;
}
