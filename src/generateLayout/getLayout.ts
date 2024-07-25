import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";

const elements = ["Button", "Label", "Image", "TextBox"];

const elementSchema = z.object({
  type: z.enum([elements[0], elements[1], elements[2], elements[3]]),
  name: z.string(),
});

const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  xPosition: z.number().max(10),
  yPosition: z.number().max(10),
  width: z.number().max(10),
  height: z.number().max(10),
  children: z.array(elementSchema),
});

const layoutSchema = z.object({
  sections: z.array(sectionSchema),
});

const exampleOutput = `
{
  "sections": [
    {
      "id": "Header",
      "name": "Header",
      "xPosition": 0,
      "yPosition": 0,
      "width": 4,
      "height": 1,
      "children": [
        { "type": "Label", "name": "title" },
        { "type": "Button", "name": "headerButton" }
      ]
    },
    {
      "id": "Sidebar",
      "name": "Sidebar",
      "xPosition": 0,
      "yPosition": 1,
      "width": 2,
      "height": 9,
      "children": [
        { "type": "Button", "name": "sidebarButton1" },
        { "type": "Label", "name": "sidebarLabel" }
      ]
    },
    {
      "id": "MainContent",
      "name": "MainContent",
      "xPosition": 2,
      "yPosition": 1,
      "width": 8,
      "height": 9,
      "children": [
        { "type": "TextBox", "name": "mainTextBox" },
        { "type": "Image", "name": "mainImage" }
      ]
    },
    {
      "id": "Footer",
      "name": "Footer",
      "xPosition": 0,
      "yPosition": 10,
      "width": 10,
      "height": 1,
      "children": [
        { "type": "Label", "name": "footerLabel" },
        { "type": "Button", "name": "footerButton" }
      ]
    }
  ]
}
`;

const systemMessage = {
  role: "system",
  content: `You are a UI designer who creates perfect designs from a given sketch or description of a UI. You create your designs in terms of sections, each section containing elements like buttons, labels, images, and textboxes.\n An example of an output is ${exampleOutput}.`,
};

const textMessage = (textualDescription: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Create a UI layout from the following textual description: ${textualDescription}`,
    },
  ],
});

const sketchMessage = (sketchUrl: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: "Create a UI layout from this sketch: ",
    },
    {
      type: "image",
      url: sketchUrl,
    },
  ],
});

async function getLayout(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  contentType: "text" | "sketch",
  textDescription?: string,
  sketchUrl?: string
) {
  if (!textDescription && !sketchUrl) {
    throw new Error("No textual description or sketch provided.");
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

  const messages = [
    systemMessage,
    contentType === "text" ? textMessage(textDescription!) : sketchMessage(sketchUrl!),
  ];

  try {
    const layout = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: messages,
      response_model: {
        schema: layoutSchema,
        name: "Layout",
      },
      max_retries: 2,
    });

    return JSON.stringify(layout);
  } catch (error) {
    throw error;
  }
}

export { getLayout };
