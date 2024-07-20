import { convertToFullVersion } from "./layoutCraftTreeConverter";
import * as vscode from "vscode";
import { getTextualDescription } from "./textualDescription";
import { getSimpleNodeTree } from "./simpleNodeTree";
import { getNodesWithProperties } from "./nodesWithProperties";

export async function processSketch(sketchAsUrl: string, context: vscode.ExtensionContext) {
  try {

    // getting a textual description of the sketch
    const textualDescription = await getTextualDescription(sketchAsUrl, context);
    console.log("Textual Description:", textualDescription);


    // getting a simple node tree from the sketch and the textual description
    const simpleNodeTree = await getSimpleNodeTree(sketchAsUrl, textualDescription, context);
    console.log("Layout Response:", simpleNodeTree);

    // getting the properties of each node in the layout
    const nodesWithProperties = await getNodesWithProperties(sketchAsUrl, textualDescription, context);
    console.log("Nodes with Properties:", nodesWithProperties);

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
