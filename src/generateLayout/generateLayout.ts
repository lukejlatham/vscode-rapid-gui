import * as vscode from "vscode";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getLayout } from "./getLayoutOpenai";
import { buildLayoutNodes } from "./convertLayoutToNodes";
import { getSectionChildren } from "./getChildPropsOpenai";

async function processSketch(
  sketch: string,
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    webview.postMessage({ command: "processingStage", stage: "Generating layout" });

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "sketch",
      undefined,
      sketch
    );

    console.log("processTextDescription in generateLayout.ts - Layout Response:", layout);

    webview.postMessage({ command: "processingStage", stage: "Refining properties" });

    const children = await getSectionChildren(apiEndpoint, apiKey, deploymentName, layout);

    console.log("processTextDescription in generateLayout.ts - Children Response:", children);

    const layoutNodes = buildLayoutNodes(layout);

    return layoutNodes;
  } catch (error) {
    console.error("Error processing sketch:", error);
    throw error;
  }
}

async function processTextDescription(
  textDescription: string,
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    webview.postMessage({ command: "processingStage", stage: "Generating layout" });

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "text",
      textDescription,
      undefined
    );

    console.log("processTextDescription in generateLayout.ts - Layout Response:", layout);

    const children = await getSectionChildren(apiEndpoint, apiKey, deploymentName, layout);

    console.log("processTextDescription in generateLayout.ts - Children Response:", children);

    const layoutNodes = buildLayoutNodes(layout);

    return layoutNodes;
  } catch (error) {
    console.error("Error processing text description:", error);
    webview.postMessage({ command: "processingStage", stage: "Error occurred during processing" });
    throw error;
  }
}

export { processSketch, processTextDescription };
