import Instructor from "@instructor-ai/instructor";
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { layoutSchema, uiExample, uiFinisher, uiPrompt } from "./editorObjectSchemas";
import { convertToFullVersion } from "./index";
import * as vscode from "vscode";
import { getTextualDescription } from "./textualDescription";

async function getSimpleNodeTree(sketchAsUrl: string, context: vscode.ExtensionContext) {
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
    debug: true,
  });

  try {
    const layout = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content: `${uiPrompt}\n\n${uiExample}\n\n${uiFinisher}`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Create a UI layout from this sketch.",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${sketchAsUrl}`, detail: "auto" },
            },
          ],
        },
      ],
      response_model: {
        schema: layoutSchema,
        name: "Layout",
      },
      max_retries: 2,
    });

    return JSON.stringify(layout);
  } catch (error) {
    throw error;
  }
}

export async function processSketch(sketchAsUrl: string, context: vscode.ExtensionContext) {
  try {
    const textualDescription = await getTextualDescription(sketchAsUrl, context);
    const layoutResponse = await getSimpleNodeTree(sketchAsUrl, context);
    const layoutData = JSON.parse(layoutResponse);
    const nodes = layoutData.nodes;

    nodes.forEach((node: any) => {
      if (!Array.isArray(node.nodes)) {
        node.nodes = [];
      }
    });

    const fullNodeTree = await convertToFullVersion(nodes);

    const fullDescription = JSON.stringify(fullNodeTree, null, 2);

    return fullDescription;
  } catch (error) {
    console.error("Error processing sketch:", error);
    throw error;
  }
}
