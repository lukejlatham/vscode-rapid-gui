import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import * as vscode from "vscode";

// Define the schema for button properties
const buttonPropsSchema = z.object({
  backgroundColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
  fontSize: z.number().int().min(1),
  fontColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
  borderRadius: z.number().int().min(0),
  width: z.number(),
  height: z.number(),
  text: z.string(),
  alignment: z.enum(["left", "center", "right"]),
});

// Define the schema for textbox properties
const textBoxPropsSchema = z.object({
  text: z.string(),
  fontSize: z.number().int().min(1),
  fontColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
  backgroundColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
  placeholder: z.string(),
  borderRadius: z.number().int().min(0),
  rows: z.number().int().min(1),
  cols: z.number().int().min(1),
  alignment: z.enum(["left", "center", "right"]),
});

const imagePropsSchema = z.object({
  src: z.string().url().optional(),
  alt: z.string(),
  width: z.number().int().min(1),
  height: z.number().int().min(1),
  alignment: z.enum(["left", "center", "right"]),
});

const labelPropsSchema = z.object({
  text: z.string(),
  textAlign: z.enum(["left", "center", "right"]),
  fontSize: z.number().int().min(1),
  color: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
  userEditable: z.boolean(),
});

const rowsPropsSchema = z.object({
  numberOfRows: z.number().int().min(1).max(10),
  gap: z.number().int().min(0).max(10),
});

const columnsPropsSchema = z.object({
  numberOfColumns: z.number().int().min(1).max(10),
  gap: z.number().int().min(0).max(10),
});

// Define base element types
const baseElementTypes = ["Button", "Image", "TextBox", "Label", "Rows", "Columns"] as const;
const elementIDPattern = new RegExp(`(${baseElementTypes.join("|")})\\d+`);
const elementID = z.string().regex(elementIDPattern);

// Define the discriminated union schema for node properties
const elementSchema = z.object({
  id: elementID,
  props: z.union([
    buttonPropsSchema,
    textBoxPropsSchema,
    imagePropsSchema,
    labelPropsSchema,
    rowsPropsSchema,
    columnsPropsSchema,
  ]),
});

const responseSchema = z.object({
  nodes: z.array(elementSchema),
});

const example = JSON.stringify({
  nodes: [
    {
      id: "Button1",
      props: {
        backgroundColor: "#0047AB",
        fontSize: 20,
        fontColor: "#FFFFFF",
        borderRadius: 4,
        width: 150,
        height: 50,
        text: "New Button",
        alignment: "center",
      },
    },
    {
      id: "Label1",
      props: {
        text: "New Label",
        textAlign: "left",
        fontSize: 20,
        color: "#FFFFF",
        userEditable: true,
      },
    },
    {
      id: "Image1",
      props: {
        src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
        alt: "New image",
        width: 480,
        height: 320,
        alignment: "center",
      },
    },
    {
      id: "Rows1",
      props: {
        numberOfRows: 5,
        gap: 10,
      },
    },
    {
      id: "Columns1",
      props: {
        numberOfColumns: 3,
        gap: 10,
      },
    },
  ],
});

const prompt: string = `Generate a JSON object that contains a list of nodes with their properties based on the textual description given and a given json layout. Ensure that the nodes in your response match all of those present in the json layout.\n`;

export async function getNodesWithProperties(
  simpleNodeTree: string,
  textualDescription: string,
  context: vscode.ExtensionContext
) {
  const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

  const AZURE_OPENAI_API_ENDPOINT = apiEndpoint || "";
  const AZURE_OPENAI_API_KEY = apiKey || "";
  const GPT4O_DEPLOYMENT_NAME = deploymentName || "";

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

  try {
    const properties = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content: `${prompt}\n\n This is an example of the expected response: ${example}`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Here is the layout of the UI elements in the sketch: ${simpleNodeTree}. Please provide the properties of each element in the layout based on the following textual description: ${textualDescription}.`,
            },
          ],
        },
      ],
      response_model: {
        schema: responseSchema,
        name: "nodesWithProperties",
      },
      max_retries: 2,
    });

    return JSON.stringify(properties);
  } catch (error) {
    throw error;
  }
}
