import * as vscode from "vscode";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getLayout } from "./getLayoutOpenai";
import { buildLayoutNodes } from "./buildLayoutNodes";

async function processSketch(sketch: string, context: vscode.ExtensionContext) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "sketch",
      undefined,
      sketch
    );

    console.log("processSketch in generateLayout.ts - Layout Response:", layout);

    const layoutNodes = buildLayoutNodes(layout);

    console.log(" processSketch in generateLayout.ts - Built Layout Nodes:", layoutNodes);

    return layout;
  } catch (error) {
    console.error("Error processing sketch:", error);
    throw error;
  }
}

async function processTextDescription(textDescription: string, context: vscode.ExtensionContext) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "text",
      textDescription,
      undefined
    );

    console.log("processText in generateLayout.ts - Layout Response:", layout);

    const layoutNodes = buildLayoutNodes(layout);

    console.log("processText in generateLayout.ts - Built Layout Nodes:", layoutNodes);

    return layout;
  } catch (error) {
    console.error("Error processing text description:", error);
    throw error;
  }
}

export { processSketch, processTextDescription };
