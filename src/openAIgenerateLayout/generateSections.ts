import { OpenAI } from "openai";
import { layoutSchema } from "../../webview-ui/src/types";
import { z } from "zod";

const outputSchema = {
  type: "object",
  properties: {
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          section: {
            type: "string",
          },
          xPosition: {
            type: "number",
          },
          yPosition: {
            type: "number",
          },
          width: {
            type: "number",
          },
          height: {
            type: "number",
          },
          flexDirection: {
            type: "string",
            enum: ["row", "column"],
          },
          backgroundColor: {
            type: "string",
            enum: ["Main", "LightAccent", "DarkAccent"],
          },
          children: {
            type: "array",
            items: {
              anyOf: [
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Button"] },
                    vscIcon: { type: "string" },
                    backgroundColor: {
                      type: "string",
                      enum: ["Main", "LightAccent", "DarkAccent"],
                    },
                    fontColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                  },
                  required: ["element", "vscIcon", "backgroundColor", "fontColor"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Label"] },
                    text: { type: "string" },
                    bold: { type: "boolean" },
                    fontColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                    fontSize: { type: "number" },
                  },
                  required: ["element", "text", "bold", "fontColor", "fontSize"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Checkboxes"] },
                  },
                  required: ["element"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Input"] },
                    fontColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                  },
                  required: ["element", "fontColor"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["RadioButtons"] },
                    header: { type: "string" },
                  },
                  required: ["element", "header"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Image"] },
                    alt: { type: "string" },
                    width: { type: "number" },
                  },
                  required: ["element", "alt", "width"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Text"] },
                    fontColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                  },
                  required: ["element", "fontColor"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Slider"] },
                    header: { type: "string" },
                    backgroundColor: {
                      type: "string",
                      enum: ["Main", "LightAccent", "DarkAccent"],
                    },
                  },
                  required: ["element", "header", "backgroundColor"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Dropdown"] },
                    header: { type: "string" },
                  },
                  required: ["element", "header"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  properties: {
                    element: { type: "string", enum: ["Icon"] },
                    vscIcon: { type: "string" },
                  },
                  required: ["element", "vscIcon"],
                  additionalProperties: false,
                },
              ],
            },
            additionalProperties: false,
          },
        },
        required: [
          "section",
          "xPosition",
          "yPosition",
          "width",
          "height",
          "flexDirection",
          "backgroundColor",
          "children",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["sections"],
  additionalProperties: false,
};

type LayoutType = z.infer<typeof layoutSchema>;

async function generateSections(
  client: OpenAI,
  contentType: "text" | "sketch",
  textDescription?: string,
  sketchUrl?: string
): Promise<LayoutType> {
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
            "You are a UI designer who creates perfect app or website designs from a given sketch or text prompt. The layout is a 10x10 grid (starting at 0). Use as many sections as possible, and make your descriptions detailed.",
        },
        {
          role: "user",
          content: JSON.stringify(userMessage),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "UI_Schema",
          strict: true,
          schema: outputSchema,
        },
      },
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
