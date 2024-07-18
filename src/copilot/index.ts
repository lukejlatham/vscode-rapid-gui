import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import * as vscode from "vscode";
import { formatMessages } from "./messageFormatting";
import { sendMessageToAzure } from "./sendMessageToAzure";
import { extractContent } from "./extractContent";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

async function processCopilotMessages(
  messages: string,
  context: vscode.ExtensionContext
): Promise<string> {
  const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);
  console.log("messages sent to azure openai:", messages);

  const formattedMessages: Message[] = formatMessages(messages);
  const rawAzureResponse = await sendMessageToAzure(
    formattedMessages,
    apiKey,
    apiEndpoint,
    deploymentName
  );
  console.log("response from azure openai:", rawAzureResponse);

  const copilotResponse = extractContent(rawAzureResponse);

  console.log("final response:", copilotResponse);

  return copilotResponse;
}

export { processCopilotMessages };
