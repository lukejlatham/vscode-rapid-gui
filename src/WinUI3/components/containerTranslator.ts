import { Node } from "../JsonParser";
import { generateComponentXaml, generateSingleComponentXaml } from "../componentGenerator";
import { convertColor } from "./colortranslator";

export async function generateContainerXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = "",
  processedNodes: Set<string>
): Promise<string> {
  const props = node.props;

  let xaml = `${indent}<Border`;

  if (props.backgroundColor) {
    xaml += ` Background="${convertColor(props.backgroundColor)}"`;
  }

  if (props.borderColor) {
    xaml += ` BorderBrush="${props.borderColor}"`;
    xaml += ` BorderThickness="1"`;
  }
  if (props.borderThickness) {
    xaml += ` BorderThickness="${props.borderThickness}"`;
  }
  if (props.borderRadius) {
    xaml += ` CornerRadius="${props.borderRadius}"`;
  }
  if (props.padding) {
    xaml += ` Padding="${props.padding}"`;
  }

  xaml += `>\n`;

  // if (props.padding) {
  //   xaml += `${indent}  <Border Padding="${props.padding}">\n`;
  //   xaml += `${indent}    <StackPanel`;
  // } else {
  //   xaml += `${indent}  <StackPanel`;
  // }

  xaml += `${indent} <StackPanel`;
  xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  xaml += ` Spacing="${props.gap || 0}"`;
  xaml += ` HorizontalAlignment="${mapJustifyContent(props.justifyContent)}"`;
  xaml += ` VerticalAlignment="${mapAlignItems(props.alignItems)}"`;
  xaml += ` Padding="${props.padding || 10}"`;
  xaml += ` Margin="${props.margin || 5}"`;
  xaml += `>\n`;

  // Generate child components
  if (node.nodes) {
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode && !processedNodes.has(childNode.custom.id || childId || "")) {
        xaml += await generateComponentXaml(childNode, content, indent + "    ", processedNodes);
      }
    }
  }

  xaml += `${indent}    </StackPanel>\n`;
  xaml += `${indent}  </Border>\n`;
  return xaml;
}

function mapJustifyContent(justifyContent: string): string {
  switch (justifyContent) {
    case "flex-start":
      return "Left";
    case "center":
      return "Center";
    case "flex-end":
      return "Right";
    case "space-between":
      return "Center";
    case "space-around":
      return "Center";
    default:
      return "Center";
  }
}

function mapAlignItems(alignItems: string): string {
  switch (alignItems) {
    case "flex-start":
      return "Top";
    case "center":
      return "Center";
    case "flex-end":
      return "Bottom";
    default:
      return "Center";
  }
}
