//Container -> <Border> or <Grid>

import { Node } from "../JsonParser";

export function generateContainerXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = "";

  if (props.flexDirection || props.justifyContent || props.alignItems) {
    // Use Grid for flex-like properties
    xaml += `${indent}<Grid`;
  } else {
    // Use Border for simpler containers
    xaml += `${indent}<Border`;
  }

  // Common properties
  xaml += ` Background="${props.backgroundColor}"`;
  xaml += ` BorderBrush="${props.borderColor}"`;
  xaml += ` BorderThickness="1"`;
  xaml += ` CornerRadius="${props.borderRadius}"`;
  xaml += ` Padding="${props.padding}"`;
  xaml += ` Width="${props.width}%"`;
  xaml += ` Height="${props.height}%"`;

  // Shadow effect
  if (props.shadowColor !== "transparent" && props.shadowBlur > 0) {
    xaml += ">\n";
    xaml += `${indent}  <Border.Effect>\n`;
    xaml += `${indent}    <DropShadowEffect Color="${props.shadowColor}" BlurRadius="${props.shadowBlur}" ShadowDepth="0" OffsetX="${props.shadowOffsetX}" OffsetY="${props.shadowOffsetY}" />\n`;
    xaml += `${indent}  </Border.Effect>\n`;
  } else {
    xaml += ">\n";
  }

  // If it's a Grid, add flex-like properties
  if (props.flexDirection || props.justifyContent || props.alignItems) {
    xaml += `${indent}  <Grid.RowDefinitions>\n`;
    xaml += `${indent}    <RowDefinition Height="*"/>\n`;
    xaml += `${indent}  </Grid.RowDefinitions>\n`;
    xaml += `${indent}  <Grid.ColumnDefinitions>\n`;
    xaml += `${indent}    <ColumnDefinition Width="*"/>\n`;
    xaml += `${indent}  </Grid.ColumnDefinitions>\n`;

    xaml += `${indent}  <StackPanel`;
    xaml += ` Orientation="${props.flexDirection === "column" ? "Vertical" : "Horizontal"}"`;
    xaml += ` HorizontalAlignment="${mapJustifyContentToAlignment(props.justifyContent)}"`;
    xaml += ` VerticalAlignment="${mapAlignItemsToAlignment(props.alignItems)}"`;
    xaml += ` Spacing="${props.gap || 0}"`;
    xaml += ">\n";

    // Here you would add child elements
    xaml += `${indent}    <!-- Child elements go here -->\n`;

    xaml += `${indent}  </StackPanel>\n`;
  } else {
    // For Border, you might want to add a content presenter or other content here
    xaml += `${indent}  <!-- Container content goes here -->\n`;
  }

  xaml +=
    props.flexDirection || props.justifyContent || props.alignItems
      ? `${indent}</Grid>`
      : `${indent}</Border>`;

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
