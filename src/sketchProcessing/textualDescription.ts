import { handleSketchUpload } from './handleSketchUpload';
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";



const elements = ['Button', 'Label', 'Image', 'Textbox', 'Columns', 'Column', 'Rows', 'Row'];



export async function getTextualDescription(sketchAsUrl: string, context: vscode.ExtensionContext) {
  
    const { apiKey, apiEndpoint, deploymentName } = await getAzureOpenaiApiKeys(context);

    const AZURE_OPENAI_API_ENDPOINT = apiEndpoint || "";
    const AZURE_OPENAI_API_KEY = apiKey || "";
    const GPT4O_DEPLOYMENT_NAME = deploymentName || "";

    const client = new AzureOpenAI({
        apiVersion: "2024-06-01",
        baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
        apiKey: AZURE_OPENAI_API_KEY,
      });
      try {
        const textualDescription = await client.chat.completions.create({
            model: GPT4O_DEPLOYMENT_NAME,
            messages: [
                {
                    role: "system",
                    content: `Give a textual description of the UI layout in the sketch based on these elements: ${elements}. Start by describing the general layout based on the columns and rows present in the sketch. Then, individually describe each element present in each column and row. When describing the elements, include the type of element and any relevant properties such as color, font color, text, border radius, width, height, alignment, and any other relevant properties. If there are multiple elements of the same type, make sure you describe them all separately.`,
                    },
                    {
                        role: "user",
                        content: [
                        {
                            type: "text",
                            text: "Describe the UI layout in the sketch.",
                        },
                        {
                            type: "image_url",
                            image_url: { url: `data:image/png;base64,${sketchAsUrl}`, detail: "auto" },
                        },
                        ],
                    },
                ],
            });
            console.log("Textual Description:", textualDescription);
  } catch (error) {
    console.error("Error processing sketch upload:", error);
  }
}