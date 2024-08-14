import * as vscode from "vscode";
import OpenAI from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getLayout } from "./getLayoutOpenai";
import { buildLayoutNodes } from "./convertLayoutToNodes";
import { getSectionChildren } from "./getSectionChildrenOpenai";
import {
  generateSectionChildrenSchema,
  generateSectionChildrenFullSchema,
} from "./createZodSchema";
import { getChildrenWithProps } from "./getSectionChildrenWithProps";
import { getOpenaiApiKeys } from "../utilities/OAApiKeyStorage";
import { OArefineProperties } from "./OArefineProperties";

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

    const openAItest = await OArefineProperties(
      openaiClient,
      inputType,
      inputType === "text" ? input : undefined,
      inputType === "sketch" ? input : undefined
    );

    const testOutput = JSON.stringify(openAItest);

    return testOutput;
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
