import Instructor from "@instructor-ai/instructor";
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { layoutSchema, uiExample, uiFinisher, uiPrompt } from "./editorObjectSchemas";
import * as vscode from "vscode";

export async function getSimpleNodeTree(
  textualDescription: string,
  context: vscode.ExtensionContext
) {
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
              text: `Create a UI layout from this sketch and the following textual description: ${textualDescription}.`,
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
