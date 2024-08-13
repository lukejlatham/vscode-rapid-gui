import { Node } from "../JSONParser";
import { generateComponentHtml } from "../componentGenerator";

export function generateGridCellHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  let html = "";

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

  return html;
}
