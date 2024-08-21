import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { ZodObject } from "zod";

const exampleLayout = `[{"section":"Toolbar","children":[{"type":"Icon","props":{"vscIcon":"VscAdd","iconSize":24}},{"type":"Icon","props":{"vscIcon":"VscSearch","iconSize":24}},{"type":"Icon","props":{"vscIcon":"VscSave","iconSize":24}},{"type":"Icon","props":{"vscIcon":"VscEdit","iconSize":24}},{"type":"Icon","props":{"vscIcon":"VscTrash","iconSize":24}},{"type":"Icon","props":{"vscIcon":"VscSave","iconSize":24}},{"type":"Icon","props":{"vscIcon":"VscHome","iconSize":24}}]},{"section":"SheetTabs","children":[{"type":"Button","props":{"width":80,"height":60,"text":"Sheet 1","backgroundColor":"DarkAccent"}},{"type":"Button","props":{"width":80,"height":60,"text":"Sheet 2","backgroundColor":"DarkAccent"}},{"type":"Button","props":{"width":80,"height":60,"text":"Add Sheet","backgroundColor":"DarkAccent"}}]},{"section":"Spreadsheet","children":[{"type":"TextBox","props":{"text":"Cell A1","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell A2","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell A3","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B1","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B2","fontColor":"Main"}},{"type":"TextBox","props":{"text":"Cell B3","fontColor":"Main"}},{"type":"Label","props":{"text":"Column A","bold":true,"italic":false,"fontColor":"Main"}},{"type":"Label","props":{"text":"Column B","bold":true,"italic":false,"fontColor":"Main"}}]}]`;

const createSystemMessage = (layout: string, childElements: string) => {
  return {
    role: "system",
    content: `You are a UI designer who provides properties for a fixed layout. Only use Main, LightAccent, or DarkAccent for backgroundColors.`,
  };
};

const sketchMessage = (childElements: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Provide properties for the child elements shown here: ${childElements}`,
    },
  ],
});

const textMessage = (input: string, childElements: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Provide properties for this: ${childElements}. The goal is to make: ${input}`,
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
