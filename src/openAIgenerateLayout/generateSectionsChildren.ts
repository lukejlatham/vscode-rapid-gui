import { OpenAI } from "openai";
import { zodFunction, zodResponseFormat } from "openai/helpers/zod";
import { generatedLayout, generateLayoutSchema } from "../../webview-ui/src/types";
import { z, ZodObject } from "zod";

async function generateSectionsChildren(
  client: OpenAI,
  inputLayout: z.infer<typeof generatedLayout>,
  textDescription?: string
) {
  if (!inputLayout) {
    throw new Error("No generated layout provided.");
  }

  const outputSchema = await generateLayoutSchema(inputLayout);

  const baseMessage = `Generate the child elements.`;

  const baseMessageWithDescription = `Generate the child elements to make this ${textDescription}`;

  const userMessage = textDescription ? baseMessage : baseMessageWithDescription;

  console.log(zodResponseFormat(outputSchema, "layoutChildren"));

  try {
    const completion = await client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are a UI designer who chooses elements for a given layout. Use a wide variety of elements",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      response_format: zodResponseFormat(outputSchema, "layoutChildren"),
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

export { generateSectionsChildren };
