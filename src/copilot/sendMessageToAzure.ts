import { AzureOpenAI } from "openai";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function sendMessageToAzure(
  formattedMessages: Message[],
  apiKey: string,
  apiEndpoint: string,
  deploymentName: string
): Promise<any> {
  const AZURE_OPENAI_API_ENDPOINT = apiEndpoint || "";
  const AZURE_OPENAI_API_KEY = apiKey || "";
  const GPT4O_DEPLOYMENT_NAME = deploymentName || "";

  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
    apiKey: AZURE_OPENAI_API_KEY,
  });

  try {
    const aiResponse = await client.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: formattedMessages,
    });

    return aiResponse;
  } catch (error) {
    throw error;
  }
}
