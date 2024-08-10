import { Node } from "../JsonParser";

export function generateContainerXaml(node: Node, indent: string = ""): string {
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
  xaml += `${indent}  <ItemsControl`;
  xaml += ` ItemsPanel="{StaticResource ${
    props.flexDirection === "column" ? "VerticalStackPanel" : "HorizontalStackPanel"
  }}"`;
  xaml += ">\n";
  xaml += `${indent}    <ItemsControl.ItemsPanel>\n`;
  xaml += `${indent}      <ItemsPanelTemplate>\n`;
  xaml += `${indent}        <StackPanel Orientation="${
    props.flexDirection === "column" ? "Vertical" : "Horizontal"
  }"\n`;
  xaml += `${indent}                    HorizontalAlignment="${mapJustifyContentToAlignment(
    props.justifyContent
  )}"\n`;
  xaml += `${indent}                    VerticalAlignment="${mapAlignItemsToAlignment(
    props.alignItems
  )}"\n`;
  xaml += `${indent}                    Spacing="${props.gap}"/>\n`;
  xaml += `${indent}      </ItemsPanelTemplate>\n`;
  xaml += `${indent}    </ItemsControl.ItemsPanel>\n`;
  xaml += `${indent}    <!-- Child elements go here -->\n`;
  xaml += `${indent}  </ItemsControl>\n`;
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
