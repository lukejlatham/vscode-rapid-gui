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
    xaml += ` BorderBrush="${convertColor(props.borderColor)}"`;
    xaml += ` BorderThickness="${props.borderThickness || 1}"`;
  }

  if (props.borderRadius) {
    xaml += ` CornerRadius="${props.borderRadius}"`;
  }

  if (props.margin) {
    xaml += ` Margin="${props.margin}"`;
  }

  xaml += `>\n`;

  // StackPanel inside the Border
  xaml += `${indent}  <StackPanel`;
  xaml += ` Orientation="${props.flexDirection === "row" ? "Horizontal" : "Vertical"}"`;
  xaml += ` HorizontalAlignment="${mapJustifyContent(props.justifyContent)}"`;
  xaml += ` VerticalAlignment="${mapAlignItems(props.alignItems)}"`;

  if (props.padding) {
    xaml += ` Padding="${props.padding}"`;
  }

  xaml += `>\n`;

  // Add a single Grid inside the StackPanel
  xaml += `${indent}    <Grid`;

  if (props.gap) {
    xaml += ` Margin="${props.gap}"`;
  }

  xaml += `>\n`;

  xaml += `${indent}      <Grid.RowDefinitions>\n`;
  xaml += `${indent}        <RowDefinition Height="Auto"/>\n`;
  xaml += `${indent}      </Grid.RowDefinitions>\n`;
  xaml += `${indent}      <Grid.ColumnDefinitions>\n`;
  xaml += `${indent}        <ColumnDefinition Width="Auto"/>\n`;
  xaml += `${indent}      </Grid.ColumnDefinitions>\n`;

  if (node.nodes) {
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode && !processedNodes.has(childNode.custom.id || childId || "")) {
        processedNodes.add(childNode.custom.id || childId || "");
        xaml += await generateComponentXaml(
          childNode,
          content,
          indent + "        ",
          processedNodes
        );
      }
    }
  }

  xaml += `${indent}    </Grid>\n`;

  xaml += `${indent}  </StackPanel>\n`;
  xaml += `${indent}</Border>\n`;
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
