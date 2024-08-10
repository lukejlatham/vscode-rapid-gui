import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { layoutSchema } from "../../webview-ui/src/types";

// const exampleLayout = {
//   sections: [
//     {
//       name: "Header",
//       xPosition: 0,
//       yPosition: 0,
//       width: 10,
//       height: 2,
//       flexDirection: "row",
//       backgroundColor: "LightAccent",
//       contents:
//         "This is the header section, containing the site logo, header text and navigation buttons.",
//     },
//     {
//       name: "MainContent",
//       xPosition: 0,
//       yPosition: 2,
//       width: 7,
//       height: 8,
//       flexDirection: "column",
//       backgroundColor: "Main",
//       contents:
//         "This section includes the main content area where articles are displayed with pictures",
//     },
//     {
//       name: "Sidebar",
//       xPosition: 7,
//       yPosition: 2,
//       width: 3,
//       height: 8,
//       flexDirection: "column",
//       backgroundColor: "Main",
//       contents: "The sidebar contains links to recent posts.",
//     },
//     {
//       name: "Footer",
//       xPosition: 0,
//       yPosition: 10,
//       width: 10,
//       height: 2,
//       flexDirection: "row",
//       contents:
//         "Footer section with links to privacy policy, contact information, and social media profiles.",
//     },
//   ],
// };

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

async function getLayout(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  contentType: "text" | "sketch",
  textDescription?: string,
  sketchUrl?: string
) {
  if (!textDescription && !sketchUrl) {
    throw new Error("No textual description or sketch provided.");
  }

  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
    apiKey: AZURE_OPENAI_API_KEY,
  });

  const instructor = Instructor({
    client: client,
    mode: "TOOLS",
  });

  const userMessage =
    contentType === "text" ? textMessage(textDescription!) : sketchMessage(sketchUrl!);

  const messages = [systemMessage, userMessage];

  try {
    const layout = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: messages,
      response_model: {
        schema: layoutSchema,
        name: "Layout",
      },
      max_retries: 2,
    });

    return layout;
  } catch (error) {
    throw error;
  }
}

export { getLayout };

// OLD CODE - ATTEMPTED TO GENERATE DESCRIPTIONS DYNAMICALLY

// import {
//   generateButtonSchema,
//   generateLabelSchema,
//   generateRadioButtonSchema,
//   generateInputSchema,
//   generateTextBoxSchema,
//   generateTextSchema,
//   generateCheckboxSchema,
//   layoutSchema,
// } from "../../webview-ui/src/types/editorObjectSchema";

// import { z, ZodObject, ZodDefault, ZodTypeAny, ZodOptional } from "zod";

// // Helper function to extract the underlying ZodObject from a ZodDefault or ZodOptional
// const extractZodObject = (schema: ZodTypeAny): ZodObject<any> => {
//   if (schema instanceof ZodDefault) {
//     return schema._def.innerType as ZodObject<any>;
//   }
//   if (schema instanceof ZodOptional) {
//     return schema._def.innerType as ZodObject<any>;
//   }
//   return schema as ZodObject<any>;
// };

// // Function to describe a Zod schema
// // Function to describe a Zod schema
// const describeZodSchema = (schemaName: string, schema: ZodObject<any>): string => {
//   let description = `**${schemaName}**:\n`;

//   const shape = schema.shape;
//   for (const key in shape) {
//     const value = shape[key];
//     let type = "unknown";

//     if (value instanceof z.ZodString) type = "string";
//     else if (value instanceof z.ZodNumber) type = "number";
//     else if (value instanceof z.ZodBoolean) type = "boolean";
//     else if (value instanceof z.ZodEnum) type = `enum(${value.options.join(", ")})`;
//     else if (value instanceof z.ZodArray) type = `array`;
//     else if (value instanceof ZodOptional || value instanceof ZodDefault)
//       type = `${describeZodSchema(key, extractZodObject(value))}`;

//     description += `  - ${key}: ${type}\n`;
//   }

//   return description;
// };
// // Generate descriptions using Zod schemas
// const descriptions = [
//   describeZodSchema("Button", extractZodObject(generateButtonSchema)),
//   describeZodSchema("Checkbox", extractZodObject(generateCheckboxSchema)),
//   describeZodSchema("Label", extractZodObject(generateLabelSchema)),
//   describeZodSchema("RadioButton", extractZodObject(generateRadioButtonSchema)),
//   describeZodSchema("Input", extractZodObject(generateInputSchema)),
//   describeZodSchema("TextBox", extractZodObject(generateTextBoxSchema)),
//   describeZodSchema("Text", extractZodObject(generateTextSchema)),
// ].join("\n\n");

// // Now you can use `descriptions` in your system message or elsewhere
// const systemMessage = {
//   role: "system",
//   content: `You are a UI designer who creates perfect designs from a given sketch or description of a UI. You create your designs in terms of sections, each section containing elements.\n\nAllowed element types and properties are as follows:\n\n${descriptions}`,
// };
