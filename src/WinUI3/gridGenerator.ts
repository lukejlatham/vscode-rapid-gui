// GridGenerator.ts
import { LayoutItem, Node } from "./JsonParser";
import { generateComponentXaml } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

export function generateGridXaml(page: Page): string {
  console.log("Generating XAML for page:", JSON.stringify(page, null, 2));

  if (typeof page.content === "string") {
    console.error("Page content is a string, not an object");
    page.content = JSON.parse(page.content);
  }

  if (!page.content || !page.content.ROOT) {
    console.error("ROOT node is missing in page content");
    console.log("Page content keys:", Object.keys(page.content || {}));
    throw new Error("Root node not found");
  }

  const rootNode = page.content.ROOT as Node;

  let xaml = `<Grid x:Name="RootGrid" Background="${
    rootNode.props.backgroundColor || "Transparent"
  }">\n`;

  xaml += generateGridDefinitions(rootNode.props.rows, rootNode.props.columns);

  if (!rootNode.props.layout) {
    console.error("Layout not found in root node props");
  }
  if (!rootNode.linkedNodes) {
    console.error("LinkedNodes not found in root node");
  }

  xaml += generateGridContent(
    page.content as { [key: string]: Node },
    rootNode.props.layout || [],
    "    "
  );

  xaml += "  </Grid>\n";
  console.log("Generated XAML:", xaml);
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

  const idMapping: { [key: string]: string } = {};
  Object.entries(content.ROOT.linkedNodes).forEach(([layoutIndex, nodeId]) => {
    idMapping[layoutIndex] = nodeId;
  });

  for (const item of layout) {
    const nodeId = idMapping[item.i];
    const node = nodeId ? content[nodeId] : null;
    if (node) {
      xaml += generateGridCell(content, item, node, indent);
    } else {
      console.warn(`Node not found for layout item: ${item.i}`);
      xaml += `${indent}<Grid Grid.Row="${item.y}" Grid.Column="${item.x}" Grid.RowSpan="${item.h}" Grid.ColumnSpan="${item.w}"/>\n`;
    }
  }

  return xaml;
}

function generateGridCell(
  content: { [key: string]: Node },
  layoutItem: LayoutItem,
  node: Node,
  indent: string
): string {
  let xaml = `${indent}<Grid Grid.Row="${layoutItem.y}" Grid.Column="${layoutItem.x}" Grid.RowSpan="${layoutItem.h}" Grid.ColumnSpan="${layoutItem.w}">\n`;

  if (node.type.resolvedName === "GridCell") {
    xaml += `${indent}  <StackPanel Orientation="${node.props.flexDirection || "Vertical"}"
                 HorizontalAlignment="${mapFlexToAlignment(node.props.justifyContent)}"
                 VerticalAlignment="${mapFlexToAlignment(node.props.alignItems)}"
                 Margin="${node.props.gap || "0"}">\n`;

    // Process child nodes
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode) {
        xaml += generateComponentXaml({ [childId]: childNode }, indent + "    ");
      } else {
        console.warn(`Child node not found: ${childId}`);
      }
    }

    xaml += `${indent}  </StackPanel>\n`;
  } else {
    // If the node is not a GridCell, generate it as a regular component
    xaml += generateComponentXaml({ [layoutItem.i]: node }, indent + "  ");
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
