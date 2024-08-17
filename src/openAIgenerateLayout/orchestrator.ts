import * as vscode from "vscode";
import OpenAI from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getOpenaiApiKeys } from "../utilities/openaiUtilities";
import { generateFromSketch, generateFromText } from "./generateSections";
import { buildNodeTree } from "./buildNodeTree";
import { layoutSchema } from "../../webview-ui/src/types";

async function processInput(
  input: string,
  inputType: "sketch" | "text",
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  try {
    // const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const { openaiApiKey } = await getOpenaiApiKeys(context);

    const openaiClient = new OpenAI({
      apiKey: openaiApiKey,
    });

    const generatedLayout =
      inputType === "sketch"
        ? await generateFromSketch(openaiClient, input)
        : inputType === "text"
        ? await generateFromText(openaiClient, input)
        : (() => {
            throw new Error("Invalid input type");
          })();

    console.log("Generated layout:", JSON.stringify(generatedLayout));

    const parsedLayout = layoutSchema.parse(generatedLayout);

    const nodeTree = buildNodeTree(
      parsedLayout.sections,
      parsedLayout.theme,
      parsedLayout.fontFamily
    );

    console.log("Node tree:", nodeTree);

    return nodeTree;
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
