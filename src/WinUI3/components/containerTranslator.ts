import { Node } from "../JsonParser";
import { generateComponentXaml } from "../componentGenerator";

export function generateContainerXaml(
  content: { [key: string]: Node },
  indent: string = ""
): string {
  const node = Object.values(content)[0];
  const props = node.props;
  let xaml = `${indent}<Border`;

  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` BorderBrush="${props.borderColor}"`;
  xaml += ` BorderThickness="2"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;
  xaml += ` Padding="${props.padding}"`;
  xaml += ` Width="${props.width}*"`;
  xaml += ` Height="${props.height}*"`;

  // Shadow effect
  if (props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml += ">\n";
    xaml += `${indent}  <Border.Effect>\n`;
    xaml += `${indent}    <DropShadowEffect Color="${props.shadowColor}" BlurRadius="${props.shadowBlur}" ShadowDepth="0" OffsetX="${props.shadowOffsetX}" OffsetY="${props.shadowOffsetY}" />\n`;
    xaml += `${indent}  </Border.Effect>\n`;
  } else {
    xaml += ">\n";
  }

  // Content
  xaml += `${indent}  <StackPanel`;
  xaml += ` Orientation="${props.flexDirection === "column" ? "Vertical" : "Horizontal"}"`;
  xaml += ` HorizontalAlignment="${mapJustifyContentToAlignment(props.justifyContent)}"`;
  xaml += ` VerticalAlignment="${mapAlignItemsToAlignment(props.alignItems)}"`;
  xaml += ` Spacing="${props.gap}"`;
  xaml += ">\n";

  // Generate child components
  if (node.nodes && node.nodes.length > 0) {
    for (const childId of node.nodes) {
      let childNode: Node | undefined;
      if (node.linkedNodes && typeof node.linkedNodes[childId] === "object") {
        childNode = node.linkedNodes[childId] as Node;
      } else if (content[childId]) {
        childNode = content[childId];
      }

      if (childNode) {
        xaml += generateComponentXaml({ [childId]: childNode }, indent + "    ");
      } else {
        console.warn(`Child node not found: ${childId}`);
      }
    }
  }

  xaml += `${indent}  </StackPanel>\n`;
  xaml += `${indent}</Border>`;

  return xaml + "\n";
}

function mapJustifyContentToAlignment(justifyContent: string): string {
  switch (justifyContent) {
    case "flex-start":
      return "Left";
    case "flex-end":
      return "Right";
    case "center":
      return "Center";
    case "space-between":
    case "space-around":
      return "Stretch";
    default:
      return "Left";
  }
}

function mapAlignItemsToAlignment(alignItems: string): string {
  switch (alignItems) {
    case "flex-start":
      return "Top";
    case "flex-end":
      return "Bottom";
    case "center":
      return "Center";
    case "stretch":
      return "Stretch";
    default:
      return "Stretch";
  }
}
