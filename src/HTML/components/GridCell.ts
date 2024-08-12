import { Node } from "../JSONParser";
import { generateComponentHtml } from "../componentGenerator";

// Function to generate the HTML for each grid cell
export function generateGridCellHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  // Use flexbox within each grid cell for internal alignment
  let html = `<div class="grid-cell" style="
    justify-content: ${node.props.justifyContent};
    flex-direction: ${node.props.flexDirection};
    align-items: ${node.props.alignItems};
    gap: ${node.props.gap}px;
  ">`;

  // Render the components within each grid cell
  node.nodes.forEach((childId) => {
    const childNode = content[childId];
    if (childNode) {
      html += generateComponentHtml(
        { pages: { temp: { components: content, root: childNode, layout: [] } } },
        "temp",
        projectPath
      );
    }
  });

  html += `</div>`;
  return html;
}
