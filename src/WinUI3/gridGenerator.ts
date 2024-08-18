import { LayoutItem, Node } from "./JsonParser";
import { generateComponentXaml } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

export async function generateGridXaml(page: Page): Promise<string> {
  console.log("Generating XAML for page:", JSON.stringify(page, null, 2));

  if (!page || !page.content || !page.content.ROOT) {
    console.error("Invalid page structure:", page);
    return "<Grid></Grid>";
  }

  const rootNode = page.content.ROOT as Node;
  const content = page.content as { [key: string]: Node };

  if (!rootNode.props) {
    console.error("Root node has no props:", rootNode);
    return "<Grid></Grid>";
  }

  let xaml = `<Grid x:Name="RootGrid" Background="${
    rootNode.props.backgroundColor || "Transparent"
  }">`;
  xaml += generateGridDefinitions(rootNode.props.rows, rootNode.props.columns);
  xaml += await generateGridContent(content, rootNode.props.layout || [], "  ");
  xaml += "</Grid>";

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

async function generateGridContent(
  content: { [key: string]: Node },
  layout: LayoutItem[],
  indent: string
): Promise<string> {
  let xaml = "";
  const processedNodes = new Set<string>();

  for (const item of layout) {
    const nodeId = content.ROOT.linkedNodes[item.i];
    const node = content[nodeId];
    if (node && !processedNodes.has(node.custom.id)) {
      xaml += await generateGridCell(content, item, node, indent, processedNodes);
      processedNodes.add(node.custom.id);
    }
  }

  return xaml;
}

async function generateGridCell(
  content: { [key: string]: Node },
  layoutItem: LayoutItem,
  node: Node,
  indent: string,
  processedNodes: Set<string>
): Promise<string> {
  const gridAttrs = generateGridAttributes(layoutItem);
  let xaml = `${indent}<Grid ${gridAttrs}>\n`;

  xaml += await generateComponentXaml(node, content, indent + "  ", processedNodes);

  xaml += `${indent}</Grid>\n`;
  return xaml;
}

function generateGridAttributes(layoutItem: LayoutItem): string {
  let attrs = "";
  if (layoutItem.y !== undefined) {
    attrs += `Grid.Row="${layoutItem.y}" `;
  }
  if (layoutItem.x !== undefined) {
    attrs += `Grid.Column="${layoutItem.x}" `;
  }
  if (layoutItem.h && layoutItem.h > 1) {
    attrs += `Grid.RowSpan="${layoutItem.h}" `;
  }
  if (layoutItem.w && layoutItem.w > 1) {
    attrs += `Grid.ColumnSpan="${layoutItem.w}" `;
  }
  return attrs.trim();
}

function mapFlexToAlignment(flexValue?: string, isHorizontal: boolean = true): string {
  switch (flexValue) {
    case "flex-start":
      return isHorizontal ? "Left" : "Top";
    case "flex-end":
      return isHorizontal ? "Right" : "Bottom";
    case "center":
      return "Center";
    case "space-between":
    case "space-around":
    case "stretch":
      return "Stretch";
    default:
      return isHorizontal ? "Left" : "Top";
  }
}
