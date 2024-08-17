import * as vscode from "vscode";
import { AzureOpenAI } from "openai";
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import * as fs from "fs";
import * as path from "path";

// const exampleSketchPath: string = path.join(__dirname, 'src/sketchProcessing/data/example-sketch.jpeg');

// function convertImageToBase64(imagePath: string): string | null {
//     try {
//         // Read the image file
//         const image: Buffer = fs.readFileSync(imagePath);

//         // Convert the image file to a base64 string
//         const base64Image: string = image.toString('base64');

//         return base64Image;
//     } catch (error) {
//         console.error('Error converting image to base64:', error);
//         return null;
//     }
// }

// // Call the function with the image path
// const base64String: string | null = convertImageToBase64(exampleSketchPath);

const elements = ["Button", "Label", "Image", "TextBox", "Columns", "Column", "Rows", "Row"];
// const example = `
// Here is a detailed description of the layout based on the given elements:
// General Layout:

// Columns and Rows:
// The layout has 3 columns and 2 rows.

// Elements:
// Column 1:
// Row 1:
// Label:
// Positioned near the top left of the container.
// Text: "Text"
// Font color: Black
// Alignment: Left-aligned

// TextBox:
// Positioned directly below the Label, centered horizontally.
// Border: Solid line, indicating the boundary of the textbox.
// Alignment: Centered horizontally

// Column 3:
// Row 2:
// Button:
// Positioned towards the bottom right of the container.
// Text: "Click me!"
// Font color: Black
// Border: Solid line around the button, indicating the clickable area.
// Alignment: Right-aligned within the container.
// Background: White

// Image:
// Positioned towards the bottom right of the container.

// `;

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
    let textualDescription = await client.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content: `Give a bullet point description of the UI layout in the sketch based
                     on these elements: ${elements}. Start by describing the general layout in 
                     terms of the columns and rows present in the sketch. Then, individually 
                     describe each element present in each column and row. When describing the 
                     elements, include the type of element and any relevant properties such as 
                     color, font color, text, border radius, width, height, alignment. If there are multiple elements of the same type,
                      make sure you describe them all separately. Keep your answer concise`,
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
    return JSON.stringify(textualDescription.choices[0].message.content);
  } catch (error) {
    console.error("Error processing sketch upload:", error);
  }
}
