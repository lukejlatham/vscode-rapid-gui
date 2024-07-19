import { AzureOpenAI } from "openai";
import { getDescriptionTool } from "./tools/toolDescribeLayout";
import { ChatMessage } from "./index";
import { MainWebviewPanel } from "../panels/MainWebviewPanel";

const initializeClient = (apiKey: string, apiEndpoint: string, deploymentName: string) => {
  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${apiEndpoint}/openai/deployments/${deploymentName}`,
    apiKey: apiKey,
  });

  return client;
};

const sendMessage = async (
  client: AzureOpenAI,
  messages: ChatMessage[],
  deploymentName: string
) => {
  const initialResponse = await client.chat.completions.create({
    model: deploymentName,
    messages: messages,
    tools: [
      {
        type: "function",
        function: {
          name: "getLayoutDescription",
          description: "Get a description of the current UI layout",
          parameters: {
            type: "object",
            properties: {},
          },
        },
      },
    ],
  });

  const responseMessage = initialResponse.choices[0].message;

  messages.push(responseMessage);

  const toolCalls = responseMessage.tool_calls;

  if (toolCalls && toolCalls.length > 0) {
    const toolCallID = toolCalls[0].id;

    if (MainWebviewPanel.currentPanel) {
      const toolCallMessage = `Calling tool... {id: ${toolCallID}}`;

      MainWebviewPanel.currentPanel.postMessage({
        command: "aiCopilotToolCall",
        content: toolCallMessage,
      });
    }

    const messagesWithFunctionCall = await handleFunctionCall(
      client,
      messages,
      deploymentName,
      toolCallID
    );

    return messagesWithFunctionCall;
  }

  return messages;
};

const handleFunctionCall = async (
  client: AzureOpenAI,
  messages: ChatMessage[],
  deploymentName: string,
  toolCallID: string
) => {
  const layout = await getDescriptionTool();

  messages.push({
    role: "tool",
    tool_call_id: toolCallID,
    content: layout,
  });

  const functionResponse = await client.chat.completions.create({
    model: deploymentName,
    messages: messages,
  });

  messages.push(functionResponse.choices[0].message);

  const messagesWithFunctionCall = messages;

  return messagesWithFunctionCall;
};

async function postMessagesToAzure(
  messages: ChatMessage[],
  apiEndpoint: string,
  apiKey: string,
  deploymentName: string
): Promise<ChatMessage[]> {
  const client = initializeClient(apiKey, apiEndpoint, deploymentName);

  try {
    const processedResponse = await sendMessage(client, messages, deploymentName);
    return processedResponse;
  } catch (error) {
    throw error;
  }
}

export { postMessagesToAzure };
