import * as vscode from "vscode";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getLayout } from "./getLayoutOpenai";
import { buildLayoutNodes } from "./buildLayoutNodes";
import { buildChildNodes } from "./buildChildNodes";

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

    console.log("processSketch in generateLayout.ts - Layout Response:", layout);

    webview.postMessage({ command: "processingStage", stage: "Refining properties" });

    const layoutNodes = buildLayoutNodes(layout);

    const childNodes = buildChildNodes(layout);

    const fullNodes = { ...layoutNodes, ...childNodes };

    const stringifiedNodes = JSON.stringify(fullNodes, null, 2);

    return stringifiedNodes;
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

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "text",
      textDescription,
      undefined
    );

    const layoutNodes = buildLayoutNodes(layout);

    webview.postMessage({ command: "processingStage", stage: "Generating layout" });

    const childNodes = buildChildNodes(layout);

    webview.postMessage({ command: "processingStage", stage: "Refining properties" });

    const fullNodes = { ...layoutNodes, ...childNodes };

    const stringifiedNodes = JSON.stringify(fullNodes, null, 2);

    return stringifiedNodes;
  } catch (error) {
    console.error("Error processing text description:", error);
    webview.postMessage({ command: "processingStage", stage: "Error occurred during processing" });
    throw error;
  }
}

export { processSketch, processTextDescription };
