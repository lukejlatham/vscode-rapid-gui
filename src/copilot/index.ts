import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import * as vscode from "vscode";
import { formatMessages } from "./messageFormatting";
import { postMessagesToAzure } from "./sendMessageToAzure";
import { ChatCompletionMessageParam } from "openai/resources";

type ChatMessage = ChatCompletionMessageParam;

async function processCopilotMessages(
  messages: string,
  context: vscode.ExtensionContext
): Promise<string> {
  const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

  if (apiKey === undefined || apiEndpoint === undefined || deploymentName === undefined) {
    throw new Error("One or more required Azure OpenAI API keys or endpoints are undefined.");
  }

  const formattedMessages: ChatMessage[] = formatMessages(messages);

  const newMessages = await postMessagesToAzure(
    formattedMessages,
    apiEndpoint,
    apiKey,
    deploymentName
  );

  const stringifiedMessages = JSON.stringify(newMessages);

  return stringifiedMessages;
}

export { processCopilotMessages };
export type { ChatMessage };
