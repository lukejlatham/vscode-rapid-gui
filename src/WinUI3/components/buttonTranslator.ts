import { Node } from "../JsonParser";
//?

export function generateButtonXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Button`;

  // Content
  xaml += ` Content="${props.text}"`;

  // Style properties
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` FontSize="${props.fontSize}"`;

  //Percent not supported in xaml
  // xaml += ` Width="${props.width}%"`;
  // xaml += ` Height="${props.height}%"`;
  xaml += ` HorizontalAlignment="Stretch" VerticalAlignment="Stretch"`;

  // Border properties
  xaml += ` BorderBrush="${props.bordercolor}"`;
  xaml += ` BorderThickness="2"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;

  xaml += ">\n";
  xaml += `${indent}  <Button.RenderTransform>\n`;
  xaml += `${indent}    <ScaleTransform ScaleX="${props.width / 100}" ScaleY="${
    props.height / 100
  }"/>\n`;
  xaml += `${indent}  </Button.RenderTransform>\n`;

  if (props.icon !== "none") {
    xaml += generateButtonContent(props, indent + "  ");
  }

  xaml += `${indent}</Button>`;

  // Wrap button in a Border for shadow effect if needed
  if (props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml = `${indent}<Border>\n${indent}  <Border.Effect>\n${indent}    <DropShadowEffect Color="${props.shadowColor}" BlurRadius="${props.shadowBlur}" ShadowDepth="0" OffsetX="${props.shadowOffsetX}" OffsetY="${props.shadowOffsetY}" />\n${indent}  </Border.Effect>\n${xaml}\n${indent}</Border>`;
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

//hyperlink not supported in xaml
