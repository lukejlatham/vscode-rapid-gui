import * as vscode from "vscode";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { getLayout } from "./getLayout";

async function processSketch(sketchUrl: string, context: vscode.ExtensionContext) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "sketch",
      undefined, // textualDescription is undefined
      sketchUrl // sketch URL
    );

    console.log("Layout Response:", layout);

    return layout;
  } catch (error) {
    console.error("Error processing sketch:", error);
    throw error;
  }
}

async function processTextDescription(
  textualDescription: string,
  context: vscode.ExtensionContext
) {
  try {
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const layout = await getLayout(
      apiEndpoint,
      apiKey,
      deploymentName,
      "text",
      textualDescription,
      undefined
    );

    console.log("Processed text:", layout);

    return layout;
  } catch (error) {
    console.error("Error processing text description:", error);
    throw error;
  }
}

export { processSketch, processTextDescription };
