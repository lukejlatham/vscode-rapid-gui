import OpenAI from "openai";
import * as vscode from "vscode";
import { getOpenaiApiKeys } from "../utilities/openaiUtilities";

export async function generateImage(
  alt: string,
  context: vscode.ExtensionContext
): Promise<string> {
  const { openaiApiKey } = await getOpenaiApiKeys(context);

  const client = new OpenAI({
    apiKey: openaiApiKey,
  });

  const currentModel = "dall-e-3";

  const imageSize = "1024x1024";

  try {
    const response = await client.images.generate({
      model: currentModel,
      prompt: alt,
      n: 1,
      size: imageSize,
      response_format: "b64_json",
      style: "natural",
    });
    const base64EncodedImageString = response.data[0].b64_json;

    console.log("Generated image:", base64EncodedImageString);
    console.log("Image size:", imageSize);
    console.log("Prompt:", alt);
    console.log("Tokens", response.data[0]);

    return base64EncodedImageString;
  } catch (error) {
    throw error;
  }
}
