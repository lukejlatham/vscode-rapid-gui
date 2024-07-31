import { convertToFullVersion } from "./layoutCraftTreeConverter";
import * as vscode from "vscode";
import { getTextualDescription } from "./textualDescription";
import { getSimpleNodeTree } from "./simpleNodeTree";
import { getNodesWithProperties } from "./nodesWithProperties";

export async function processSketch(
  sketchAsUrl: string,
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  try {
    webview.postMessage({ command: "processingStage", stage: "Generating layout" });
    const textualDescription = await getTextualDescription(sketchAsUrl, context);

    webview.postMessage({ command: "processingStage", stage: "Refining properties" });
    const simpleNodeTree = await getSimpleNodeTree(textualDescription, context);

    webview.postMessage({ command: "processingStage", stage: "Finalizing" });
    const nodesWithProperties = await getNodesWithProperties(
      simpleNodeTree,
      textualDescription,
      context
    );

    webview.postMessage({ command: "processingStage", stage: "Finalizing" });
    const layoutData = JSON.parse(simpleNodeTree);
    const nodes = layoutData.nodes;

    nodes.forEach((node: any) => {
      if (!Array.isArray(node.nodes)) {
        node.nodes = [];
      }
    });

    const fullNodeTree = await convertToFullVersion(nodes, JSON.parse(nodesWithProperties).nodes);

    const fullDescription = JSON.stringify(fullNodeTree, null, 2);

    return fullDescription;
  } catch (error) {
    console.error("Error processing sketch:", error);
    webview.postMessage({ command: "processingStage", stage: "Error occurred during processing" });
    throw error;
  }
}
