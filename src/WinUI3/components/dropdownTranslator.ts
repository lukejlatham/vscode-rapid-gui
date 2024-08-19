//Dropdown -> <ComboBox>
import { Node } from "../JsonParser";

export function generateDropdownXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<ComboBox`;

  xaml += ` Width="${props.width || 200}"`;
  xaml += ` Height="${props.height || 32}"`;
  xaml += ` FontSize="${props.fontSize || 14}"`;
  xaml += ` FontFamily="${props.fontFamily || "Segoe UI, Sans-Serif"}"`;
  xaml += ` Foreground="${props.fontColor || "{ThemeResource ComboBoxForegroundThemeBrush}"}"`;
  xaml += ` Background="${
    props.backgroundColor || "{ThemeResource ComboBoxBackgroundThemeBrush}"
  }"`;
  xaml += ` PlaceholderText="${props.placeholder || ""}"`;
  xaml += ` CornerRadius="${props.borderRadius || 0}"`;

  xaml += ">\n";

  if (Array.isArray(props.options)) {
    props.options.forEach((option: string) => {
      xaml += `${indent}  <ComboBoxItem Content="${option}" />\n`;
    });
  }

  xaml += `${indent}</ComboBox>`;

  return xaml + "\n";
}
