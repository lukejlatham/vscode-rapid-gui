import { Node } from "../JsonParser";
//?

export function generateButtonXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Button`;

  // Content
  xaml += ` Content="${props.text || ""}"`;

  // Style properties
  xaml += ` Foreground="${props.textColor || "{ThemeResource ButtonForegroundThemeBrush}"}"`;
  xaml += ` Background="${props.backgroundColor || "{ThemeResource ButtonBackgroundThemeBrush}"}"`;
  xaml += ` FontSize="${props.fontSize || 12}"`;
  xaml += ` HorizontalAlignment="Stretch" VerticalAlignment="Stretch"`;

  // Border properties
  xaml += ` BorderBrush="${props.borderColor || "{ThemeResource ButtonBorderThemeBrush}"}"`;
  xaml += ` BorderThickness="${props.borderWidth || 1}"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;

  // Width and Height
  if (props.width) {
    xaml += ` Width="${props.width}"`;
  }
  if (props.height) {
    xaml += ` Height="${props.height}"`;
  }

  xaml += ">\n";

  if (props.icon && props.icon !== "none") {
    xaml += generateButtonContent(props, indent + "  ");
  }

  xaml += `${indent}</Button>`;

  // Wrap button in a Border for shadow effect if needed
  if (props.shadowColor && props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml = `${indent}<Border>\n${indent}  <Border.Effect>\n${indent}    <DropShadowEffect Color="${
      props.shadowColor
    }" BlurRadius="${props.shadowBlur}" ShadowDepth="0" OffsetX="${
      props.shadowOffsetX || 0
    }" OffsetY="${
      props.shadowOffsetY || 0
    }" />\n${indent}  </Border.Effect>\n${xaml}\n${indent}</Border>`;
  }

  return xaml + "\n";
}

function generateButtonContent(props: any, indent: string): string {
  let content = `${indent}<Button.Content>\n`;
  content += `${indent}  <StackPanel Orientation="Horizontal">\n`;

  if (props.icon === "left") {
    content += `${indent}    <FontIcon Glyph="&#xE001;" Margin="0,0,5,0" />\n`;
  }

  content += `${indent}    <TextBlock Text="${props.text}" />\n`;

  if (props.icon === "right") {
    content += `${indent}    <FontIcon Glyph="&#xE001;" Margin="5,0,0,0" />\n`;
  }

  content += `${indent}  </StackPanel>\n`;
  content += `${indent}</Button.Content>\n`;

  return content;
}
