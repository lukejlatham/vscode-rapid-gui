// ComponentGenerator.ts

import { Node } from "./JsonParser";
import { generateButtonXaml } from "./components/buttonTranslator";

export function generateComponentXaml(node: Node, indent: string = ""): string {
  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonXaml(node, indent);
    case "Input":
      return `${indent}<TextBox PlaceholderText="${node.props.placeholder}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" Background="${node.props.backgroundColor}"/>\n`;
    case "Text":
    case "Label":
      return `${indent}<TextBlock Text="${node.props.text}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" TextAlignment="${node.props.textAlign}"/>\n`;
    case "Icon":
      return `${indent}<FontIcon Glyph="${node.props.selectedIcon}" FontSize="${node.props.iconSize}" Foreground="${node.props.iconColor}"/>\n`;
    case "RadioButton":
      let radioXaml = `${indent}<StackPanel Orientation="${node.props.direction}">\n`;
      node.props.optionLabels.forEach((label: string) => {
        radioXaml += `${indent}  <RadioButton Content="${label}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}"/>\n`;
      });
      radioXaml += `${indent}</StackPanel>\n`;
      return radioXaml;
    case "Container":
      return `${indent}<Border Background="${node.props.backgroundColor}" CornerRadius="${node.props.borderRadius}" BorderBrush="${node.props.borderColor}" Padding="${node.props.padding}" Width="${node.props.width}" Height="${node.props.height}"/>\n`;
    default:
      return `${indent}<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
  }
}
