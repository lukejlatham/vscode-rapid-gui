import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { ZodObject } from "zod";

const systemMessage = {
  role: "system",
  content: `You are a UI designer who refines properties for a given layout with predefined elements. Provide properties for the child elements of each section. The width/height represents the percentage of the parent container. For example, a width of 10 means 10% of the parent container.`,
};

const textMessage = (layout: string, childElements: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `You are working on this layout: ${layout}. Provide properties for the following child elements: ${childElements}. You must retain all the child elements in the same section.`,
    },
  ],
});

async function getChildrenWithProps(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  layout: string,
  childElements: string,
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

  const userMessage = textMessage(layout, childElements);

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

export { getChildrenWithProps };
