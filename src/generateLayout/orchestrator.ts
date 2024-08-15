import * as vscode from "vscode";
import OpenAI from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getOpenaiApiKeys } from "../utilities/OAApiKeyStorage";
import { generateSections } from "./generateSections";
import { generateSectionsChildren } from "./generateSectionsChildren";
import { generateLayoutSchema } from "../../webview-ui/src/types";

async function processInput(
  input: string,
  inputType: "sketch" | "text",
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const { openaiApiKey } = await getOpenaiApiKeys(context);

    const openaiClient = new OpenAI({
      apiKey: openaiApiKey,
    });

    const generatedLayout = await generateSections(
      openaiClient,
      inputType,
      inputType === "text" ? input : undefined,
      inputType === "sketch" ? input : undefined
    );

    console.log("Generated layout:", JSON.stringify(generatedLayout));

    const generatedSectionChildren = await generateSectionsChildren(
      openaiClient,
      generatedLayout,
      inputType === "text" ? input : undefined
    );

    console.log("Generated section children:", JSON.stringify(generatedSectionChildren));

    return;
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
