import { Node } from "../JsonParser";
import { generateSingleComponentXaml } from "../componentGenerator";

export function generateContainerXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = ""
): string {
  const props = node.props;

  let xaml = `${indent}<Grid>\n`;

  // Add shadow if needed
  if (props.shadowColor && props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml += `${indent}  <Grid.Resources>\n`;
    xaml += `${indent}    <ThemeShadow x:Key="CustomShadow" />\n`;
    xaml += `${indent}  </Grid.Resources>\n`;
  }

  xaml += `${indent}  <Border`;

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

  if (props.shadowColor && props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml += ` Shadow="{StaticResource CustomShadow}"`;
    xaml += ` Translation="0,0,32"`; // This lifts the element to cast a shadow
  }

  xaml += `>\n`;

  xaml += `${indent}    <StackPanel`;
  xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  if (props.padding) {
    xaml += ` Padding="${props.padding}"`;
  }
  if (props.gap) {
    xaml += ` Spacing="${props.gap}"`;
  }
  xaml += ` HorizontalAlignment="${mapJustifyContent(props.justifyContent)}"`;
  xaml += ` VerticalAlignment="${mapAlignItems(props.alignItems)}"`;
  xaml += `>\n`;

  generateChildComponents(node, content, indent + "      ", xaml);

  xaml += `${indent}    </StackPanel>\n`;
  xaml += `${indent}  </Border>\n`;
  xaml += `${indent}</Grid>\n`;
  return xaml;
}

function generateChildComponents(
  parentNode: Node,
  content: { [key: string]: Node },
  indent: string,
  xaml: string
) {
  for (const childId of parentNode.nodes) {
    const childNode = content[childId];
    if (childNode) {
      xaml += generateSingleComponentXaml(childNode, content, indent);
      // If the child is a container, recursively generate its children
      if (childNode.type.resolvedName === "Container") {
        generateChildComponents(childNode, content, indent + "  ", xaml);
      }
    }
  }
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
