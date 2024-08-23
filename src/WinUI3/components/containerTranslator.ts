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
    xaml += ` Width="${props.width}"`;
  }
  if (props.height) {
    xaml += ` Height="${props.height}"`;
  }
  xaml += `>\n`;

  // container doesnt have shadow or border, need to implement this after
  //can try to use <Grid.Resources>
  // <ThemeShadow x:Name="SharedShadow" />
  // </Grid.Resources>

  // Add Rectangle for background and border
  // xaml += `${indent}  <Rectangle`;
  // if (props.backgroundColor) {
  //   xaml += ` Fill="${props.backgroundColor}"`;
  // }
  // if (props.borderColor) {
  //   xaml += ` Stroke="${props.borderColor}" StrokeThickness="1"`;
  // }
  // if (props.borderRadius) {
  //   xaml += ` RadiusX="${props.borderRadius}" RadiusY="${props.borderRadius}"`;
  // }
  // xaml += ` />\n`;

  // Choose between StackPanel and VariableSizedWrapGrid based on needs
  const useVariableSizedWrapGrid = props.flexWrap === "wrap" || props.flexDirection === "row";

  if (useVariableSizedWrapGrid) {
    xaml += `${indent}  <VariableSizedWrapGrid`;
    xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  } else {
    xaml += `${indent}  <StackPanel`;
    xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  }

  if (props.padding) {
    xaml += ` Margin="${props.padding}"`;
  }
  // if (props.gap) {
  //   xaml += ` Spacing="${props.gap}"`;
  // }
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

  xaml += useVariableSizedWrapGrid
    ? `${indent}  </VariableSizedWrapGrid>\n`
    : `${indent}  </StackPanel>\n`;
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
