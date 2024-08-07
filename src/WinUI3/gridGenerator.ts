// GridGenerator.ts
import { LayoutItem, Node } from "./JsonParser";
import { generateComponentXaml } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

export function generateGridXaml(page: Page): string {
  const rootNode = page.content.ROOT as Node;
  let xaml = `<Grid x:Name="RootGrid" Background="${rootNode.props.backgroundColor}">\n`;

  xaml += generateGridDefinitions(rootNode.props.rows, rootNode.props.columns);
  xaml += generateGridContent(page.content, rootNode.props.layout || [], "");

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

function generateGridContent(
  content: { [key: string]: Node },
  layout: LayoutItem[],
  indent: string
): string {
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
