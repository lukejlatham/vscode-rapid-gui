import { OpenAI } from "openai";
import { generatedLayout } from "../../webview-ui/src/types";
import { zodFunction } from "openai/helpers/zod";

async function OArefineProperties(
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
            "You are a UI designer who creates perfect app or website designs from a given sketch or text prompt. FOR EACH COMPONENT - CREATE A NEWxYou help users with layout generation by calling the layout function. The layout is on a 10x10 grid, so the height and width of each component are in grid units. Use as many sections as possible.",
        },
        {
          role: "user",
          content: JSON.stringify(userMessage),
        },
      ],
      tools: [zodFunction({ name: "layout", parameters: generatedLayout })],
    });

    const outputtedLayout = completion.choices[0].message.tool_calls[0].function.parsed_arguments;
    console.log(completion.choices[0].message.tool_calls[0].function.parsed_arguments);
    console.log(completion.usage.prompt_tokens);
    console.log(completion.usage.completion_tokens);
    return outputtedLayout;
  } catch (error) {
    throw error;
  }
}

export { OArefineProperties };
