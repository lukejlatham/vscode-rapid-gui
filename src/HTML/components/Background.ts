import { Node } from "../JSONParser";
import { generateGridCellHtml } from "./GridCell";

// Function to generate the HTML for the background, which acts as a CSS grid container
export function generateBackgroundHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  let html = `<div class="background" style="background-color: ${node.props.backgroundColor};">`;

  // Iterate through the layout array from the JSON to determine the position of each grid cell
  node.props.layout.forEach((item: any) => {
    const cellNodeId = node.linkedNodes[item.i];
    const cellNode = content[cellNodeId];
    if (cellNode) {
      // Generate a grid cell based on its layout and position
      html += `<div class="grid-cell" style="grid-area: ${item.y + 1} / ${item.x + 1} / span ${
        item.h
      } / span ${item.w};">`;

      // Generate the content within each grid cell
      if (cellNode.type.resolvedName !== "Background") {
        html += generateGridCellHtml(cellNode, content, projectPath);
      }

      html += `</div>`;
    }
  });

  html += `</div>`;
  return html;
}

// Function to generate the CSS for the background and grid cells
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
    flex-direction: column;
  }`;

  return css;
}
