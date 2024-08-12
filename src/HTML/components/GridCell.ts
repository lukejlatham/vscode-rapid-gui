import { Node } from "../JSONParser";
import { generateComponentHtml } from "../componentGenerator";

export function generateGridCellHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  let html = `<div class="grid-cell" style="
    justify-content: ${node.props.justifyContent};
    flex-direction: ${node.props.flexDirection};
    align-items: ${node.props.alignItems};
    gap: ${node.props.gap}px;
  ">`;

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
