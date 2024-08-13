import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { ZodObject } from "zod";

const exampleLayout = `[{"section":"Toolbar","children":[{"type":"Icon","props":{"selectedIcon":"VscAdd","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscSearch","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscSave","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscEdit","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscTrash","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscSave","iconSize":24}},{"type":"Icon","props":{"selectedIcon":"VscHome","iconSize":24}}]},{"section":"SheetTabs","children":[{"type":"Button","props":{"width":80,"height":60,"text":"Sheet 1","backgroundColor":"DarkAccent"}},{"type":"Button","props":{"width":80,"height":60,"text":"Sheet 2","backgroundColor":"DarkAccent"}},{"type":"Button","props":{"width":80,"height":60,"text":"Add Sheet","backgroundColor":"DarkAccent"}}]},{"section":"Spreadsheet","children":[{"type":"TextBox","props":{"text":"Cell A1","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell A2","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell A3","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B1","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B2","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B3","fontColor":"Main"}},{"type":"Label","props":{"text":"Column A","bold":true,"italic":false,"fontColor":"Main"}},{"type":"Label","props":{"text":"Column B","bold":true,"italic":false,"fontColor":"Main"}}]}]`;

const createSystemMessage = (layout: string, childElements: string) => {
  return {
    role: "system",
    content: `You are a UI designer who provides properties for these child elements: \n\n.${childElements}\n\n The elements and their order are fixed. Only use Main, LightAccent, or DarkAccent for backgroundColors. An example of the format is: ${exampleLayout}`,
  };
};

const sketchMessage = (childElements: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Provide properties for the child elements.`,
    },
  ],
});

const textMessage = (input: string, childElements: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Provide properties for the layout. The goal is to make: ${input}`,
    },
  ],
});

async function getChildrenWithProps(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  layout: string,
  childElements: string,
  outputSchema: ZodObject<any>,
  inputType: string,
  input: string | undefined
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

  const systemMessage = createSystemMessage(layout, childElements);

  const userMessage =
    inputType === "text"
      ? textMessage(input as string, childElements)
      : sketchMessage(childElements);

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
