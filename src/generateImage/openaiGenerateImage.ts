import * as vscode from "vscode";
import { getOpenaiApiKeys } from "../utilities/openaiUtilities";
import { OpenAI } from "openai";
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

const metaSafetyPrompt =
  "Generate an image that is safe, ethical, and appropriate for all audiences. Do not create any harmful, offensive, or explicit content.";

export async function generateImage(
  alt: string,
  context: vscode.ExtensionContext
): Promise<string> {
  try {
    const matcher = new RegExpMatcher({
      ...englishDataset.build(),
      ...englishRecommendedTransformers,
    });

    if (matcher.hasMatch(alt)) {
      throw new Error(
        "Potentially offensive content detected in the alt text. Image generation aborted."
      );
    }

    const { openaiApiKey } = await getOpenaiApiKeys(context);
    const client = new OpenAI({
      apiKey: openaiApiKey,
    });

    const currentModel = "dall-e-3";
    const imageSize = "1024x1024";

    const safePrompt = `${metaSafetyPrompt} ${alt}`;

    const response = await client.images.generate({
      model: currentModel,
      prompt: safePrompt,
      n: 1,
      size: imageSize,
      response_format: "b64_json",
      style: "natural",
    });

    const base64EncodedImageString = response.data[0].b64_json;

    console.log("Image generated. Please ensure the content is appropriate.");

    return base64EncodedImageString;
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw error;
  }
}
