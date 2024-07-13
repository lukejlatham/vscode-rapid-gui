import Instructor from "@instructor-ai/instructor";
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { hierarchySchema } from "./editorObjectSchemas";
import * as vscode from "vscode";

// Create a function to set up the Azure OpenAI client and extract layout information
async function getUIDescription(sketchAsUrl: string, context: vscode.ExtensionContext) {
  const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

  const AZURE_OPENAI_API_ENDPOINT = apiEndpoint || "";
  const AZURE_OPENAI_API_KEY = apiKey || "";
  const GPT4O_DEPLOYMENT_NAME = deploymentName || "";

  console.log("Azure OpenAI API endpoint:", AZURE_OPENAI_API_ENDPOINT);
  console.log("Azure OpenAI API key:", AZURE_OPENAI_API_KEY);
  console.log("GPT-4-OpenAI deployment name:", GPT4O_DEPLOYMENT_NAME);
  console.log(
    "full client url:",
    `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`
  );

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
              type: "text",
              text: "Create a layout from this sketch.",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${sketchAsUrl}`, detail: "auto" },
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
    throw error;
  }
}

export async function processSketch(sketchAsUrl: string, context: vscode.ExtensionContext) {
  try {
    const description = await getUIDescription(sketchAsUrl, context);
    return description;
  } catch (error) {
    throw error;
  }
}
