import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_API_ENDPOINT = process.env.AZURE_OPENAI_API_ENDPOINT;
const AZURE_OPENAI_API_MODEL = process.env.GPT4O_DEPLOYMENT_NAME;

console.log("AZURE_OPENAI_API_KEY:", AZURE_OPENAI_API_KEY);
console.log("AZURE_OPENAI_API_ENDPOINT:", AZURE_OPENAI_API_ENDPOINT);
console.log("AZURE_OPENAI_API_MODEL:", AZURE_OPENAI_API_MODEL);

if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_API_ENDPOINT || !AZURE_OPENAI_API_MODEL) {
  console.error("One or more environment variables are missing. Please check your .env file.");
  process.exit(1);
}

if (!fs.existsSync(path.resolve(__dirname, "./test_image_1.png"))) {
  console.error("Image file not found.");
  process.exit(1);
}

async function callOpenAI(text: any) {
  try {
    const response = await axios.post(
      `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${AZURE_OPENAI_API_MODEL}/chat/completions?api-version=2024-02-01`,
      {
        messages: text,
        temperature: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": AZURE_OPENAI_API_KEY,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in callOpenAI:", error);
    throw error;
  }
}

function encodeImage(imagePath: string) {
  const image = fs.readFileSync(imagePath);
  return Buffer.from(image).toString("base64");
}

const IMAGE_PATH = path.join(__dirname, "./test_image_1.png");
const base64Image = encodeImage(IMAGE_PATH);

// (async () => {
//   const messages = [
//     {
//       role: "system",
//       content:
//         "You are a helpful assistant that gives the layout of a UI sketch. Output a JSON object.",
//     },
//     {
//       role: "user",
//       content: [
//         { type: "text", text: "What is the layout of this UI sketch?" },
//         { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } },
//       ],
//     },
//   ];

//   const UIDescription = await callOpenAI(messages);
//   console.log(UIDescription);
// })();
