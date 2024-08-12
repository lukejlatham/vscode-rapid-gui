import { Node } from "../JSONParser";
import { generateGridCellHtml } from "./GridCell"; // Assuming GridCell handles child components
import { generateComponentCss } from "../componentGenerator";

export function generateBackgroundHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  let html = `<div class="background" style="background-color: ${node.props.backgroundColor};">`;

  node.props.layout.forEach((item: any, index: number) => {
    const cellNodeId = node.linkedNodes[item.i];
    const cellNode = content[cellNodeId];
    if (cellNode) {
      html += `<div class="grid-cell" style="grid-area: ${item.y + 1} / ${item.x + 1} / span ${
        item.h
      } / span ${item.w};">`;

      // Handle non-background children only
      if (cellNode.type.resolvedName !== "Background") {
        html += generateGridCellHtml(cellNode, content, projectPath);
      }

      html += `</div>`;
    }
  });

  html += `</div>`;
  return html;
}

export function generateBackgroundCss(node: Node, content: { [key: string]: Node }): string {
  let css = `.background {
    display: grid;
    grid-template-rows: repeat(${node.props.rows}, 1fr);
    grid-template-columns: repeat(${node.props.columns}, 1fr);
    gap: ${node.props.gap || "10px"};
    background-color: ${node.props.backgroundColor};
    width: 100%;
    height: 100%;
    position: relative;
  }`;

  // Add CSS for grid cells
  css += `.grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }`;

  return css;
}
