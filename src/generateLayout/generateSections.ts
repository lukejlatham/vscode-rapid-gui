import { OpenAI } from "openai";
import { generatedLayout } from "../../webview-ui/src/types";
import { zodResponseFormat } from "openai/helpers/zod";
import { z, ZodObject } from "zod";

async function generateSections(
  client: OpenAI,
  contentType: "text" | "sketch",
  textDescription?: string,
  sketchUrl?: string
) {
  if (!textDescription && !sketchUrl) {
    throw new Error("No textual description or sketch provided.");
  }

  const sketchMessage = [
    {
      type: "text",
      text: "Create a UI layout from this sketch: ",
    },
    {
      type: "image_url",
      image_url: { url: `data:image/png;base64,${sketchUrl}`, detail: "low" },
    },
  ];

  const textMessage = `Create a UI layout from the following textual description: ${textDescription}. Be creative in your interpretation of the prompt - use many sections`;

  const userMessage = contentType === "text" ? textMessage : sketchMessage;

  try {
    const completion = await client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are a UI designer who creates perfect app or website designs from a given sketch or text prompt. The layout is a 10x10 grid, so the height and width of each component are in grid units. Use as many sections as possible.",
        },
        {
          role: "user",
          content: JSON.stringify(userMessage),
        },
      ],
      response_format: zodResponseFormat(generatedLayout, "layout"),
    });

    const outputtedLayout = completion.choices[0].message.parsed;
    console.log(outputtedLayout);
    console.log(completion.usage.prompt_tokens);
    console.log(completion.usage.completion_tokens);
    return outputtedLayout;
  } catch (error) {
    throw error;
  }
}

export { generateSections };
