// GridGenerator.ts
import { generateComponentHtml, generateComponentCss } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

export function generateGridHtml(page: Page): string {
  console.log("Generating HTML for page:", JSON.stringify(page, null, 2));

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

  let html = `<div id="RootGrid" class="root-grid">`;

  html += generateGridContent(
    page.content as { [key: string]: Node },
    rootNode.props.layout || [],
    "  "
  );

  html += "</div>\n";
  console.log("Generated HTML:", html);
  return html;
}

export function generateGridCss(page: Page): string {
  const rootNode = page.content.ROOT as Node;
  let css = `.root-grid {
  display: grid;
  grid-template-rows: repeat(${rootNode.props.rows}, 1fr);
  grid-template-columns: repeat(${rootNode.props.columns}, 1fr);
  background-color: ${rootNode.props.backgroundColor || "transparent"};
  width: 100%;
  height: 100%;
}\n`;

  // Add CSS for grid items
  rootNode.props.layout.forEach((item: LayoutItem, index: number) => {
    css += `.grid-item-${index} {
  grid-row: ${item.y + 1} / span ${item.h};
  grid-column: ${item.x + 1} / span ${item.w};
}\n`;
  });

  return css;
}

function generateGridContent(
  content: { [key: string]: Node },
  layout: LayoutItem[],
  indent: string
): string {
  let html = "";

  const idMapping: { [key: string]: string } = {};
  Object.entries(content.ROOT.linkedNodes).forEach(([layoutIndex, nodeId]) => {
    idMapping[layoutIndex] = nodeId;
  });

  layout.forEach((item, index) => {
    const nodeId = idMapping[item.i];
    const node = nodeId ? content[nodeId] : null;
    if (node) {
      html += generateGridCell(content, item, node, indent, index);
    } else {
      console.warn(`Node not found for layout item: ${item.i}`);
      html += `${indent}<div class="grid-item-${index}"></div>\n`;
    }
  });

  return html;
}

function generateGridCell(
  content: { [key: string]: Node },
  layoutItem: LayoutItem,
  node: Node,
  indent: string,
  index: number
): string {
  let html = `${indent}<div class="grid-item-${index}`;

  if (node.type.resolvedName === "GridCell") {
    html += ` grid-cell" style="
      display: flex;
      flex-direction: ${node.props.flexDirection || "column"};
      justify-content: ${mapFlexToJustify(node.props.justifyContent)};
      align-items: ${mapFlexToAlign(node.props.alignItems)};
      gap: ${node.props.gap || "0"}px;
    ">\n`;

    // Process child nodes
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode) {
        html += generateComponentHtml({ [childId]: childNode }, indent + "  ");
      } else {
        console.warn(`Child node not found: ${childId}`);
      }
    }
  } else {
    // If the node is not a GridCell, generate it as a regular component
    html += `">\n${generateComponentHtml({ [layoutItem.i]: node }, indent + "  ")}`;
  }

  html += `${indent}</div>\n`;
  return html;
}

function mapFlexToJustify(flexValue: string): string {
  switch (flexValue) {
    case "flex-start":
      return "flex-start";
    case "flex-end":
      return "flex-end";
    case "center":
      return "center";
    case "space-between":
      return "space-between";
    case "space-around":
      return "space-around";
    default:
      return "flex-start";
  }
}

function mapFlexToAlign(flexValue: string): string {
  switch (flexValue) {
    case "flex-start":
      return "flex-start";
    case "flex-end":
      return "flex-end";
    case "center":
      return "center";
    case "stretch":
      return "stretch";
    default:
      return "stretch";
  }
}

export function generateGridComponentCss(content: { [key: string]: Node }): string {
  let css = "";
  Object.values(content).forEach((node) => {
    if (node.type.resolvedName !== "GridCell") {
      css += generateComponentCss({ [node.id]: node });
    }
  });
  return css;
}
