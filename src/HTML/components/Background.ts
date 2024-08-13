import { generateComponentHtml } from "../componentGenerator";
import { Node } from "../JSONParser";
//working!!!!
//lots to do

export function generateBackgroundHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  let html = `<div class="grid-container">`;

  node.props.layout.forEach((item: any, index: number) => {
    const cellNodeId = node.linkedNodes[item.i];
    const cellNode = content[cellNodeId];
    if (cellNode) {
      html += `<div class="grid-cell item-${index}">
        <div class="content">
          ${generateGridCellContent(cellNode, content, projectPath)}
        </div>
      </div>`;
    }
  });

  html += `</div>`;
  return html;
}

function generateGridCellContent(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  let cellContent = "";

  node.nodes.forEach((childId) => {
    const childNode = content[childId];
    if (childNode) {
      cellContent += generateComponentHtml(
        { pages: { temp: { components: content, root: childNode, layout: [] } } },
        "temp",
        projectPath
      );
    }
  });

  return cellContent;
}
export function generateBackgroundCss(node: Node, content: { [key: string]: Node }): string {
  let css = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: ${node.props.backgroundColor};
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(${node.props.columns}, 1fr);
    grid-template-rows: repeat(${node.props.rows}, 1fr);
    gap: ${node.props.gap || "10px"};
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    grid-auto-flow: dense;
  }

  .grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .content {
    display: flex;
    flex-wrap: wrap; 
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
  }
  `;

  // Add specific grid area settings
  node.props.layout.forEach((item: any, index: number) => {
    css += `
    .item-${index} {
      grid-area: ${item.y + 1} / ${item.x + 1} / span ${item.h} / span ${item.w};
    }
    `;
  });

  return css;
}
