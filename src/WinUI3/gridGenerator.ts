// GridGenerator.ts
import { PageStructure, LayoutItem, Node } from "./JsonParser";
import { generateComponentXaml } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

export function generateGridXaml(page: Page): string {
  const root = page.content.ROOT;
  let xaml = `<Grid x:Name="RootGrid" Background="${root.props.backgroundColor}">\n`;

  xaml += generateGridDefinitions(root.props.rows, root.props.columns);
  xaml += generateGridContent(page.content, root.props.layout || [], "");

  xaml += "</Grid>\n";
  return xaml;
}

function generateGridDefinitions(rows?: number, columns?: number): string {
  let xaml = "";

  if (rows) {
    xaml += "  <Grid.RowDefinitions>\n";
    for (let i = 0; i < rows; i++) {
      xaml += '    <RowDefinition Height="*"/>\n';
    }
    xaml += "  </Grid.RowDefinitions>\n";
  }

  if (columns) {
    xaml += "  <Grid.ColumnDefinitions>\n";
    for (let i = 0; i < columns; i++) {
      xaml += '    <ColumnDefinition Width="*"/>\n';
    }
    xaml += "  </Grid.ColumnDefinitions>\n";
  }

  return xaml;
}

function generateGridContent(content: any, layout: any[], indent: string): string {
  let xaml = "";

  for (const item of layout) {
    const node = content[item.i];
    xaml += generateGridCell(content, item, node, indent);
  }

  return xaml;
}

function generateGridCell(content: any, layoutItem: any, node: any, indent: string): string {
  let xaml = `${indent}<Grid Grid.Row="${layoutItem.y}" Grid.Column="${layoutItem.x}" Grid.RowSpan="${layoutItem.h}" Grid.ColumnSpan="${layoutItem.w}">\n`;

  // Handle nested grid
  if (node.type.resolvedName === "GridCell" && node.props.rows && node.props.columns) {
    xaml += generateGridDefinitions(node.props.rows, node.props.columns);
    xaml += generateGridContent(content, node.props.layout || [], indent + "  ");
  } else {
    // Add a StackPanel for cell content
    xaml += `${indent}  <StackPanel Orientation="${node.props.flexDirection || "Vertical"}" 
                   HorizontalAlignment="${mapFlexToAlignment(node.props.justifyContent)}" 
                   VerticalAlignment="${mapFlexToAlignment(node.props.alignItems)}" 
                   Margin="${node.props.gap || 10}">\n`;

    // Generate components within the cell
    for (const childId of node.nodes) {
      const childNode = content[childId];
      xaml += generateComponentXaml(childNode, indent + "    ");
    }

    xaml += `${indent}  </StackPanel>\n`;
  }

  xaml += `${indent}</Grid>\n`;
  return xaml;
}

function mapFlexToAlignment(flexValue: string): string {
  switch (flexValue) {
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
      return "Stretch";
  }
}

// function generateComponent(node: Node, indent: string): string {
//   switch (node.type.resolvedName) {
//     case "Input":
//       return `${indent}<TextBox PlaceholderText="${node.props.placeholder}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" Background="${node.props.backgroundColor}"/>\n`;
//     case "Text":
//     case "Label":
//       return `${indent}<TextBlock Text="${node.props.text}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" TextAlignment="${node.props.textAlign}"/>\n`;
//     case "Button":
//       return `${indent}<Button Content="${node.props.text}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" Background="${node.props.backgroundColor}"/>\n`;
//     case "Icon":
//       return `${indent}<FontIcon Glyph="${node.props.selectedIcon}" FontSize="${node.props.iconSize}" Foreground="${node.props.iconColor}"/>\n`;
//     case "RadioButton":
//       let radioXaml = `${indent}<StackPanel Orientation="${node.props.direction}">\n`;
//       node.props.optionLabels.forEach((label: string) => {
//         radioXaml += `${indent}  <RadioButton Content="${label}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}"/>\n`;
//       });
//       radioXaml += `${indent}</StackPanel>\n`;
//       return radioXaml;
//     case "Container":
//       return `${indent}<Border Background="${node.props.backgroundColor}" CornerRadius="${node.props.borderRadius}" BorderBrush="${node.props.borderColor}" Padding="${node.props.padding}" Width="${node.props.width}" Height="${node.props.height}"/>\n`;
//     default:
//       return `${indent}<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
//   }
// }
