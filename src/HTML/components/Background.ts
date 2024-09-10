import { generateComponentHtml, generateSingleComponentCss } from "../componentGenerator";
import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";

export function generateBackgroundHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath: string
): string {
  // console.log("Generating background HTML with projectPath:", projectPath);
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
  projectPath: string
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
    background-color: ${convertColor(node.props.backgroundColor || "#ffffff")};
    height: 100vh;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(${node.props.columns}, 1fr);
    grid-template-rows: repeat(${node.props.rows}, 1fr);
    gap: ${node.props.gap || "5px"};
    height: 100vh;
    padding: ${node.props.padding || "20px"};
    box-sizing: border-box;
    grid-auto-flow: dense;
  }

  .grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
  `;

  node.props.layout.forEach((item: any, index: number) => {
    const cellNodeId = node.linkedNodes[item.i];
    const cellNode = content[cellNodeId];
    const flexDirection = cellNode?.props.flexDirection || "row";
    css += `
    .item-${index} {
      grid-area: ${item.y + 1} / ${item.x + 1} / span ${item.h} / span ${item.w};
      flex-direction: ${flexDirection};
    }
    `;

    // Generate CSS for cell content
    if (cellNode) {
      css += generateSingleComponentCss(cellNode, content);
    }
  });

  return css;
}
