import { Node } from "../JsonParser";
import { generateComponentXaml, generateSingleComponentXaml } from "../componentGenerator";

export async function generateContainerXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = "",
  processedNodes: Set<string>
): Promise<string> {
  const props = node.props;

  let xaml = `${indent}<Border`;

  // Add Grid properties
  if (props.width) {
    xaml += ` MinWidth="${props.width}"`;
  }
  if (props.height) {
    xaml += ` MinHeight="${props.height}"`;
  }

  if (props.backgroundColor) {
    xaml += ` Background="${props.backgroundColor}"`;
  }

  if (props.borderColor) {
    xaml += ` BorderBrush="${props.borderColor}"`;
  }
  if (props.borderThickness) {
    xaml += ` BorderThickness="${props.borderThickness}"`;
  }
  if (props.cornerRadius) {
    xaml += ` CornerRadius="${props.borderRadius}"`;
  }
  if (props.padding) {
    xaml += ` Padding="${props.padding}"`;
  }

  // xaml += ` HorizontalAlignment="${mapJustifyContent(props.justifyContent)}"`;
  // xaml += ` VerticalAlignment="${mapAlignItems(props.alignItems)}"`;
  xaml += `>\n`;

  // if (props.padding) {
  //   xaml += `${indent}  <Border Padding="${props.padding}">\n`;
  //   xaml += `${indent}    <StackPanel`;
  // } else {
  //   xaml += `${indent}  <StackPanel`;
  // }

  xaml += `${indent} <StackPangel`;

  xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  xaml += ` Spacing="${props.gap || 0}"`;
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

  if (props.padding) {
    xaml += `${indent}    </StackPanel>\n`;
    xaml += `${indent}  </Border>\n`;
  } else {
    xaml += `${indent}  </StackPanel>\n`;
  }
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
