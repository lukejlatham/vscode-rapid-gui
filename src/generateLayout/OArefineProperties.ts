import { OpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { layoutSchema } from "../../webview-ui/src/types";
import { zodFunction } from "openai/helpers/zod";
import { z } from "zod";

const systemMessage = {
  role: "system",
  content: `You are a UI designer who creates perfect app or website designs from a given sketch or text prompt. FOR EACH COMPONENT - CREATE A NEW SECTION. For backgroundColors prop, you can only use Main, LightAccent, or DarkAccent.' `,
};

const textMessage = (textDescription: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Create a UI layout from the following textual description: ${textDescription}. Be creative in your interpretation of the prompt - use many sections`,
    },
  ],
});

const sketchMessage = (sketch: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: "Create a UI layout from this sketch: ",
    },
    {
      type: "image_url",
      image_url: { url: `data:image/png;base64,${sketch}`, detail: "auto" },
    },
  ],
});

async function OArefineProperties(
  client: OpenAI,
  contentType: "text" | "sketch",
  textDescription?: string,
  sketchUrl?: string
) {
  if (!textDescription && !sketchUrl) {
    throw new Error("No textual description or sketch provided.");
  }

  const userMessage =
    contentType === "text" ? textMessage(textDescription!) : sketchMessage(sketchUrl!);

  const messages = [systemMessage, userMessage];

  const Table = z.enum(["orders", "customers", "products"]);
  const Column = z.enum([
    "id",
    "status",
    "expected_delivery_date",
    "delivered_at",
    "shipped_at",
    "ordered_at",
    "canceled_at",
  ]);
  const Operator = z.enum(["=", ">", "<", "<=", ">=", "!="]);
  const OrderBy = z.enum(["asc", "desc"]);

  const DynamicValue = z.object({
    column_name: z.string(),
  });

  const Condition = z.object({
    column: z.string(),
    operator: Operator,
    value: z.union([z.string(), z.number(), DynamicValue]),
  });

  const QueryArgs = z.object({
    table_name: Table,
    columns: z.array(Column),
    conditions: z.array(Condition),
    order_by: OrderBy,
  });

  try {
    // const models = await client.models.list();
    // console.log(models.data);
    const completion = await client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. The current date is August 6, 2024. You help users query for the data they are looking for by calling the query function.",
        },
        {
          role: "user",
          content:
            "look up all my orders in may of last year that were fulfilled but not delivered on time",
        },
      ],
      tools: [zodFunction({ name: "query", parameters: QueryArgs })],
    });
    console.log(completion.choices[0].message.tool_calls[0].function.parsed_arguments);
    return;
  } catch (error) {
    throw error;
  }
}

export { OArefineProperties };
