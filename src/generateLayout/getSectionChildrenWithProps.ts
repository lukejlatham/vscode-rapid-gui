import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { ZodObject } from "zod";

const exampleLayout = `[{"section":"Toolbar","children":[{"type":"Icon","props":{"selectedIcon":"VscAdd","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscSearch","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscSave","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscEdit","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscTrash","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscSave","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscHome","iconSize":24}}]},{"section":"SheetTabs","children":[{"type":"Button","props":{"width":80,"height":60,"text":"Sheet 1","backgroundColor":"DarkAccent"}},{"type":"Button","props":{"width":80,"height":60,"text":"Sheet 2","backgroundColor":"DarkAccent"}},{"type":"Button","props":{"width":80,"height":60,"text":"Add Sheet","backgroundColor":"DarkAccent"}}]},{"section":"Spreadsheet","children":[{"type":"TextBox","props":{"text":"Cell A1","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell A2","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell A3","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B1","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B2","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B3","fontColor":"Main"}},{"type":"Label","props":{"text":"Column A","bold":true,"italic":false,"fontColor":"Main"}},{"type":"Label","props":{"text":"Column B","bold":true,"italic":false,"fontColor":"Main"}}]}]`;

const systemMessage = {
  role: "system",
  content: `You are a UI designer who refines properties for a given layout with predefined elements. Provide properties for the child elements of each section. The width/height represents the percentage of the parent container. For backgroundColors, you can only use Main, LightAccent, or DarkAccent. An example layout is shown below:\n\n${exampleLayout}`,
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
