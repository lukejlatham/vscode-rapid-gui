import Instructor from "@instructor-ai/instructor";
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { hierarchySchema } from "./editorObjectSchemas";
import * as vscode from "vscode";

// Create a function to set up the Azure OpenAI client and extract layout information
async function getUIDescription(sketchAsUrl: string, context: vscode.ExtensionContext) {
  console.log("Processing sketch:", sketchAsUrl);
  const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);
  console.log("Azure OpenAI API keys:", apiKey, apiEndpoint, deploymentName);

  const AZURE_OPENAI_API_ENDPOINT = apiEndpoint || "";
  const AZURE_OPENAI_API_KEY = apiKey || "";
  const GPT4O_DEPLOYMENT_NAME = deploymentName || "";

  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
    apiKey: AZURE_OPENAI_API_KEY,
  });
  const instructor = Instructor({
    client: client,
    mode: "TOOLS",
  });

  try {
    const layout = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are a layout generator. You create JSON objects representing a UI layout from sketches. Use the following element types: Container, Columns, Column, Rows, Row, Label, and Button. Each element should have a 'type' property and a 'children' property (except for Label and Button). The 'children' property should be an object where keys are unique identifiers and values are child elements.",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${sketchAsUrl}` },
            },
            {
              type: "text",
              text: "Create a layout from this sketch.",
            },
          ],
        },
      ],
      response_model: {
        schema: hierarchySchema,
        name: "Layout",
      },
      max_retries: 1,
    });

    return JSON.stringify(layout);
  } catch (error) {
    console.error("Error extracting layout:", error);
    throw error;
  }
}

export async function processSketch(sketchAsUrl: string, context: vscode.ExtensionContext) {
  try {
    console.log("Sketch encoded as URL:", sketchAsUrl);
    console.log("Processing sketch layout...");
    const description = await getUIDescription(sketchAsUrl, context);
    return description;
  } catch (error) {
    console.error("Error processing sketch upload:", error);
    throw error;
  }
}
