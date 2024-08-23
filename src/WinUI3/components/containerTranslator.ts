import { Node } from "../JsonParser";
import { generateComponentXaml, generateSingleComponentXaml } from "../componentGenerator";

export async function generateContainerXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = "",
  processedNodes: Set<string>
): Promise<string> {
  const props = node.props;

  let xaml = `${indent}<Grid`;

  // Add Grid properties
  if (props.width) {
    xaml += ` MinWidth="${props.width}"`;
  }
  if (props.height) {
    xaml += ` MinHeight="${props.height}"`;
  }
  xaml += `>\n`;

  if (props.backgroundColor) {
    xaml += ` Background="${props.backgroundColor}"`;
  }

  xaml += ` HorizontalAlignment="Stretch" VerticalAlignment="Stretch">\n`;

  xaml += `${indent}  <StackPanel`;
  xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;

  if (props.padding) {
    xaml += ` Margin="${props.padding}"`;
  }

  xaml += ` HorizontalAlignment="${mapJustifyContent(props.justifyContent)}"`;
  xaml += ` VerticalAlignment="${mapAlignItems(props.alignItems)}"`;
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

  xaml += `${indent}  </StackPanel>\n`;
  xaml += `${indent}</Grid>\n`;
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
      return "Stretch";
    case "space-around":
      return "Stretch"; // XAML doesn't have a direct equivalent; Stretch is a close match
    default:
      return "Stretch";
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
