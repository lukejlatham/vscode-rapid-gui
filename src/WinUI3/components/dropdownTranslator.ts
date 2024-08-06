//Dropdown -> <ComboBox>

import { Node } from "../JsonParser";

export function generateDropdownXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<ComboBox`;

  xaml += ` Width="${props.width}"`;
  xaml += ` Height="${props.height}"`;
  xaml += ` FontSize="${props.fontSize}"`;
  xaml += ` Foreground="${props.fontColor}"`;
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` PlaceholderText="${props.placeholder}"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;

  xaml += ">\n";

  // Add items
  props.options.forEach((option: string) => {
    xaml += `${indent}  <ComboBoxItem Content="${option}" />\n`;
  });

  xaml += `${indent}</ComboBox>`;

  return xaml + "\n";
}
