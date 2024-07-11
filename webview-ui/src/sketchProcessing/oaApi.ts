import Instructor from "@instructor-ai/instructor";
import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";

import { HierarchySchema } from "./editorObjectSchemas";

// Load environment variables from .env file
dotenv.config();

if (!process.env.AZURE_OPENAI_API_KEY) {
  throw new Error("AZURE_OPENAI_API_KEY is not set");
}
if (!process.env.AZURE_OPENAI_API_ENDPOINT) {
  throw new Error("AZURE_OPENAI_API_ENDPOINT is not set");
}
if (!process.env.GPT4O_DEPLOYMENT_NAME) {
  throw new Error("GPT4O_DEPLOYMENT_NAME is not set");
}

const AZURE_OPENAI_API_ENDPOINT = process.env.AZURE_OPENAI_API_ENDPOINT;
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const GPT4O_DEPLOYMENT_NAME = process.env.GPT4O_DEPLOYMENT_NAME;

console.log("AZURE_OPENAI_API_ENDPOINT:", AZURE_OPENAI_API_ENDPOINT);
console.log("AZURE_OPENAI_API_KEY:", AZURE_OPENAI_API_KEY);
console.log("GPT4O_DEPLOYMENT_NAME:", GPT4O_DEPLOYMENT_NAME);
console.log(
  "Full URL:",
  `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-01`
);

// Create a function to set up the Azure OpenAI client and extract layout information
async function extractLayout(userDescription: string) {
  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
    apiKey: AZURE_OPENAI_API_KEY,
  });
  const instructor = Instructor({
    client: client,
    mode: "TOOLS",
  });
  try {
    const layout = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are a layout generator. Your task is to create a JSON object representing a layout based on the user's description. Use the following element types: Container, Columns, Column, Rows, Row, Label, and Button. Each element should have a 'type' property and a 'children' property (except for Label and Button). The 'children' property should be an object where keys are unique identifiers and values are child elements.",
        },
        { role: "user", content: userDescription },
      ],
      response_model: {
        schema: HierarchySchema,
        name: "Layout",
      },
      max_retries: 1,
    });
    return layout;
  } catch (error) {
    console.error("Error extracting layout:", error);
    throw error;
  }
}

// Example usage
const userDescription = "Create a layout for a simple settings page.";

extractLayout(userDescription)
  .then((layout) => console.log("Extracted layout:", JSON.stringify(layout, null, 2)))
  .catch((error) => console.error("Error extracting layout:", error));
