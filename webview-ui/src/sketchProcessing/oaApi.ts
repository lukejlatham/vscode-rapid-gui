import Instructor from "@instructor-ai/instructor";
import { AzureOpenAI } from "openai";
import { z } from "zod";
import * as dotenv from "dotenv";

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

// Define the UserSchema using Zod
const UserSchema = z.object({
  age: z.number(),
  name: z.string().refine((name) => name.includes(" "), {
    message: "Name must contain a space",
  }),
});

// Create a function to set up the Azure OpenAI client and extract user information
async function extractUser() {
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
    const user = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: [{ role: "user", content: "Jason Liu is 30 years old" }],
      response_model: {
        schema: UserSchema,
        name: "User",
      },
      max_retries: 4,
    });

    return user;
  } catch (error) {
    console.error("Error extracting user:", error);
    throw error;
  }
}

// Example usage
extractUser()
  .then((user) => console.log("Extracted user:", user))
  .catch((error) => console.error("Error extracting user:", error));
