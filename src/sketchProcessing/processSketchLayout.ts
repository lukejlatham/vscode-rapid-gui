import { convertToFullVersion } from "./layoutCraftTreeConverter";
import * as vscode from "vscode";
import { getTextualDescription } from "./textualDescription";
import { getSimpleNodeTree } from "./simpleNodeTree";

export async function processSketch(sketchAsUrl: string, context: vscode.ExtensionContext) {
  try {
    const textualDescription = await getTextualDescription(sketchAsUrl, context);
    console.log("Textual Description:", textualDescription);

    const simpleNodeTree = await getSimpleNodeTree(sketchAsUrl, textualDescription, context);
    console.log("Layout Response:", simpleNodeTree);

    const layoutData = JSON.parse(simpleNodeTree);
    const nodes = layoutData.nodes;

    nodes.forEach((node: any) => {
      if (!Array.isArray(node.nodes)) {
        node.nodes = [];
      }
    });

    const fullNodeTree = await convertToFullVersion(nodes);

    const fullDescription = JSON.stringify(fullNodeTree, null, 2);

    return fullDescription;
  } catch (error) {
    console.error("Error processing sketch:", error);
    throw error;
  }
}
