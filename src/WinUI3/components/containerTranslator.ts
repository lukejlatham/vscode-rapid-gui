import { Node } from "../JsonParser";
import { generateSingleComponentXaml } from "../componentGenerator";

export function generateContainerXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = ""
): string {
  const props = node.props;

  let xaml = `${indent}<StackPanel`;
  xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  xaml += ` Spacing="${props.gap || 0}"`;
  xaml += ` HorizontalAlignment="${mapJustifyContent(props.justifyContent)}"`;
  xaml += ` VerticalAlignment="${mapAlignItems(props.alignItems)}"`;

  if (props.width) {
    xaml += ` Width="${props.width}*"`;
  }
  if (props.height) {
    xaml += ` Height="${props.height}*"`;
  }
  if (props.backgroundColor) {
    xaml += ` Background="${props.backgroundColor}"`;
  }
  if (props.padding) {
    xaml += ` Padding="${props.padding}"`;
  }
  if (props.borderRadius) {
    xaml += ` CornerRadius="${props.borderRadius}"`;
  }
  if (props.borderColor) {
    xaml += ` BorderBrush="${props.borderColor}" BorderThickness="2"`;
  }

  xaml += `>\n`;

  // Add shadow effect if needed
  if (props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml += `${indent}  <StackPanel.Effect>\n`;
    xaml += `${indent}    <DropShadowEffect Color="${props.shadowColor}" BlurRadius="${props.shadowBlur}" ShadowDepth="0" OffsetX="${props.shadowOffsetX}" OffsetY="${props.shadowOffsetY}" />\n`;
    xaml += `${indent}  </StackPanel.Effect>\n`;
  }

  if (node.nodes && node.nodes.length > 0) {
    for (const childId of node.nodes) {
      let childNode: Node | undefined;
      if (node.linkedNodes && node.linkedNodes[childId]) {
        childNode = content[node.linkedNodes[childId]];
      } else if (content[childId]) {
        childNode = content[childId];
      }

      if (childNode) {
        xaml += generateSingleComponentXaml(childNode, content, indent + "  ");
      } else {
        console.warn(`Child node not found: ${childId}`);
      }
    }
  }

  xaml += `${indent}</StackPanel>\n`;
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
      return "Stretch";
  }
}
