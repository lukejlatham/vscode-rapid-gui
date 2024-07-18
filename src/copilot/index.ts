import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import * as vscode from "vscode";
import { AzureOpenAI } from "openai";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

async function sendMessagesAzure(
  conversationHistory: string, // Now this is a string
  apiKey: string,
  apiEndpoint: string,
  deploymentName: string
) {
  const AZURE_OPENAI_API_ENDPOINT = apiEndpoint || "";
  const AZURE_OPENAI_API_KEY = apiKey || "";
  const GPT4O_DEPLOYMENT_NAME = deploymentName || "";

  let parsedConversationHistory: Message[];
  try {
    parsedConversationHistory = JSON.parse(conversationHistory);
    if (!Array.isArray(parsedConversationHistory)) {
      throw new Error("Parsed conversation history is not an array");
    }
  } catch (error) {
    throw new Error("Invalid conversation history format: " + error.message);
  }

  parsedConversationHistory.unshift({
    role: "system",
    content: "You are a helpful assistant.",
  });

  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
    apiKey: AZURE_OPENAI_API_KEY,
  });

  try {
    const layout = await client.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: parsedConversationHistory.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return JSON.stringify(layout);
  } catch (error) {
    throw error;
  }
}

async function processMessages(messages: string, context: vscode.ExtensionContext) {
  const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);
  console.log("messages sent to azure openai:", messages);
  const copilotResponse = await sendMessagesAzure(messages, apiKey, apiEndpoint, deploymentName);
  console.log("response from azure openai:", copilotResponse);
  return copilotResponse;
}

export { processMessages };
