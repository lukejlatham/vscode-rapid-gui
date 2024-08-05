import * as vscode from "vscode";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getLayout } from "./getLayoutOpenai";
import { buildLayoutNodes } from "./convertLayoutToNodes";
import { getSectionChildren } from "./getSectionChildrenOpenai";
import {
  generateSectionChildrenSchema,
  generateSectionChildrenFullSchema,
} from "./createZodSchema";
import { getChildrenWithProps } from "./getSectionChildrenWithProps";

async function processInput(
  input: string,
  inputType: "sketch" | "text",
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
      inputType,
      inputType === "text" ? input : undefined,
      inputType === "sketch" ? input : undefined
    );

    const parsedLayout = JSON.stringify(layout.sections);

    console.log("Generated layout sections:", parsedLayout);

    webview.postMessage({ command: "processingStage", stage: "Refining properties" });

    const zodChildrenSchema = generateSectionChildrenSchema(layout.sections);

    const children = await getSectionChildren(
      apiEndpoint,
      apiKey,
      deploymentName,
      parsedLayout,
      zodChildrenSchema
    );

    const zodChildrenWithPropsSchema = generateSectionChildrenFullSchema(children.sections);

    const parsedChildren = JSON.stringify(children.sections);

    console.log("Generated children sections:", parsedChildren);

    const fullChildren = await getChildrenWithProps(
      apiEndpoint,
      apiKey,
      deploymentName,
      parsedLayout,
      parsedChildren,
      zodChildrenWithPropsSchema
    );

    const parsedFullChildren = JSON.stringify(fullChildren.sections);

    console.log("Generated full children sections with properties:", parsedFullChildren);

    const layoutNodes = buildLayoutNodes(parsedLayout, parsedFullChildren);

    return layoutNodes;
  } catch (error) {
    console.error("Error processing input:", error);
    webview.postMessage({ command: "processingStage", stage: "Error occurred during processing" });
    throw error;
  }
}

async function processSketch(
  sketch: string,
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  return processInput(sketch, "sketch", context, webview);
}

async function processTextDescription(
  textDescription: string,
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  return processInput(textDescription, "text", context, webview);
}

export { processSketch, processTextDescription };
