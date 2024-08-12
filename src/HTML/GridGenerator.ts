import { LayoutItem, Node, ParsedJSON } from "./JSONParser";
import { generateComponentHtml, generateComponentCss } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

export function generateGridHtml(page: Page, projectPath?: string): string {
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

  let html = `<div id="RootGrid" class="root-grid">\n`;

  html += generateGridContent(
    page.content as { [key: string]: Node },
    rootNode.props.layout || [],
    page.content.ROOT.linkedNodes,
    projectPath,
    page.name // Passing the page name to functions
  );

  html += `</div>\n`;
  console.log("Generated HTML:", html);
  return html;
}

export function generateGridCss(page: Page): string {
  const rootNode = page.content.ROOT as Node;
  let css = `.root-grid {
    display: grid;
    grid-template-rows: repeat(${rootNode.props.rows}, 1fr);
    grid-template-columns: repeat(${rootNode.props.columns}, 1fr);
    gap: ${rootNode.props.gap || "10px"};
    background-color: ${rootNode.props.backgroundColor || "transparent"};
    width: 100%;
    height: 100%;
    position: relative;
  }\n`;

  // Add CSS for grid items based on their layout
  rootNode.props.layout.forEach((item: LayoutItem, index: number) => {
    css += generateGridItemCss(item, index);
  });

  // Generate CSS for all components
  css += generateAllComponentsCss(page.content as { [key: string]: Node }, page.name); // Passing page name

  return css;
}

function generateGridItemCss(item: LayoutItem, index: number): string {
  return `.grid-item-${index} {
    grid-row: ${item.y + 1} / span ${item.h};
    grid-column: ${item.x + 1} / span ${item.w};
    display: flex;
    justify-content: center;
    align-items: center;
  }\n`;
}

function generateGridContent(
  content: { [key: string]: Node },
  layout: LayoutItem[],
  linkedNodes: { [key: string]: string },
  projectPath?: string,
  pageName?: string
): string {
  let html = "";

  layout.forEach((item, index) => {
    const nodeId = linkedNodes[item.i];
    const node = nodeId ? content[nodeId] : null;
    if (node) {
      html += generateGridCell(content, node, index, projectPath, pageName);
    } else {
      console.warn(`Node not found for layout item: ${item.i}`);
      html += `<div class="grid-item-${index}"></div>\n`;
    }
  });

  return html;
}

function generateGridCell(
  content: { [key: string]: Node },
  node: Node,
  index: number,
  projectPath?: string,
  pageName?: string
): string {
  let html = `<div class="grid-item-${index}">\n`;

  // Recursively generate HTML for the node and its children
  html += generateNodeHtml(content, node, projectPath, pageName);

  html += `</div>\n`;
  return html;
}

function generateNodeHtml(
  content: { [key: string]: Node },
  node: Node,
  projectPath?: string,
  pageName?: string
): string {
  let html = "";

  // Generate HTML for the current node
  html += generateComponentHtml(
    { pages: { [pageName || ""]: { root: content.ROOT, components: content } } },
    pageName || "",
    projectPath
  );

  // If the node is a container with children, process them recursively
  if (node.nodes && node.nodes.length > 0) {
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode) {
        html += generateNodeHtml(content, childNode, projectPath, pageName);
      } else {
        console.warn(`Child node not found: ${childId}`);
      }
    }
  }

  return html;
}

function generateAllComponentsCss(content: { [key: string]: Node }, pageName: string): string {
  let css = "";
  for (const node of Object.values(content)) {
    css += generateComponentCss(
      { pages: { [pageName]: { root: content.ROOT, components: content } } },
      pageName
    );
  }
  return css;
}
