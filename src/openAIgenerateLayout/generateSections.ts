import { OpenAI } from "openai";
import {
  layoutSchema,
  themeGenerationNames,
  fontGenerationNames,
} from "../../webview-ui/src/types";
import { z } from "zod";

const outputSchema = {
  type: "object",
  properties: {
    theme: {
      type: "string",
      enum: themeGenerationNames,
    },
    fontFamily: {
      type: "string",
      enum: fontGenerationNames,
    },
    sections: {
      type: "array",
      describe:
        "Each row or column of elements needs its own section. Make menus, sidebars, headers/footers 1 width or height",
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
                  description: "Button for controls",
                  properties: {
                    element: { type: "string", enum: ["Button"] },
                    vscIcon: {
                      type: "string",
                    },
                    backgroundColor: {
                      type: "string",
                      enum: ["Main", "LightAccent", "DarkAccent"],
                    },
                    width: { type: "number", enum: [10, 20, 30] },
                    height: { type: "number", enum: [5, 10] },
                  },
                  required: ["element", "vscIcon", "backgroundColor", "width", "height"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Label for titles or links",
                  properties: {
                    element: { type: "string", enum: ["Label"] },
                    text: { type: "string" },
                    bold: { type: "boolean" },
                    fontColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                    fontSize: {
                      type: "string",
                      enum: ["Title", "Subtitle", "SmallSubtitle", "Link", "Label"],
                    },
                  },
                  required: ["element", "text", "bold", "fontColor", "fontSize"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Series of checkboxes for selecting multiple options",
                  properties: {
                    element: { type: "string", enum: ["Checkboxes"] },
                    optionLabels: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["element", "optionLabels"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Text input field",
                  properties: {
                    element: { type: "string", enum: ["Input"] },
                    placeholder: { type: "string" },
                  },
                  required: ["element", "placeholder"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Series of radio buttons for selecting between options",
                  properties: {
                    element: { type: "string", enum: ["RadioButtons"] },
                    optionLabels: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["element", "optionLabels"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Image with alt text",
                  properties: {
                    element: { type: "string", enum: ["Image"] },
                    alt: { type: "string" },
                  },
                  required: ["element", "alt"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Large paragraph of text",
                  properties: {
                    element: { type: "string", enum: ["Text"] },
                    fontColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                  },
                  required: ["element", "fontColor"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Slider control for volume, brightness etc with header to left",
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
                  description: "Dropdown for settings etc - try to use a few together",
                  properties: {
                    element: { type: "string", enum: ["Dropdown"] },
                    optionLabels: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["element", "optionLabels"],
                  additionalProperties: false,
                },
                {
                  type: "object",
                  description: "Logo icons",
                  properties: {
                    element: { type: "string", enum: ["Icon"] },
                    vscIcon: {
                      type: "string",
                    },
                    iconSize: { type: "number", enum: [32, 40] },
                    iconColor: { type: "string", enum: ["Main", "LightAccent", "DarkAccent"] },
                  },
                  required: ["element", "vscIcon", "iconSize", "iconColor"],
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
  required: ["sections", "theme", "fontFamily"],
  additionalProperties: false,
};

type LayoutType = z.infer<typeof layoutSchema>;

const currentModel = "gpt-4o-2024-08-06";

async function generateFromText(client: OpenAI, textDescription: string): Promise<LayoutType> {
  try {
    const completion = await client.beta.chat.completions.parse({
      model: currentModel,
      messages: [
        {
          role: "system",
          content: `You are a UI designer who creates complex app or website designs on a 10x10 grid, starting at 0. You use as many sections as possible (6 or more) and a wide variety of elements.`,
        },
        {
          role: "user",
          content: `Create a complex layout for this textual description: ${textDescription}. Interpret prompt creatively.`,
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

async function generateFromSketch(client: OpenAI, sketchUrl: string): Promise<LayoutType> {
  try {
    const completion = await client.beta.chat.completions.parse({
      model: currentModel,
      messages: [
        {
          role: "system",
          content: `You are a UI designer who creates perfect app or website designs from a given sketch. The layout is a 10x10 grid, starting at 0.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Create a UI layout from this sketch: ",
            },
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${sketchUrl}`, detail: "auto" },
            },
          ],
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

export { generateFromSketch, generateFromText };
