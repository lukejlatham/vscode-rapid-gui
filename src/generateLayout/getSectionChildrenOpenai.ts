import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { ZodObject } from "zod";

const systemMessage = {
  role: "system",
  content: `You are a UI designer who fills in provided layouts. You will provide the child elements and a description of each one. Try to be as detailed as possible and avoid generic names.`,
};

const textMessage = (textDescription: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Provide the child elements with descriptions for the following layout:\n\n ${textDescription}`,
    },
  ],
});

async function getSectionChildren(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  layout: string,
  outputSchema: ZodObject<any>
) {
  if (!layout) {
    throw new Error("No layout provided.");
  }

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

  const userMessage = textMessage(layout);

  const messages = [systemMessage, userMessage];

  try {
    const children = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: messages,
      response_model: {
        schema: outputSchema,
        name: "Layout",
      },
      max_retries: 2,
    });

    return children;
  } catch (error) {
    throw error;
  }
}

export { getSectionChildren };
