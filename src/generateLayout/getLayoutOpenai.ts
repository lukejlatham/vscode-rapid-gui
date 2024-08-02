import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { layoutSchema } from "../../webview-ui/src/types";

const exampleLayout = {
  sections: [
    {
      name: "Header",
      xPosition: 0,
      yPosition: 0,
      width: 10,
      height: 2,
      color: "Main",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      children: [
        {
          type: "Label",
          name: "Title",
          text: "Welcome to My App",
          size: "large",
          color: "Accent",
        },
        {
          type: "Button",
          name: "LoginButton",
          text: "Login",
          size: "medium",
          color: "Main",
        },
      ],
    },
    {
      name: "MainContent",
      xPosition: 0,
      yPosition: 2,
      width: 10,
      height: 6,
      color: "Main",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      children: [
        {
          type: "TextBox",
          name: "Username",
          size: "medium",
          color: "Main",
        },
        {
          type: "TextBox",
          name: "Password",
          size: "medium",
          color: "Main",
        },
        {
          type: "Checkbox",
          name: "RememberMe",
          text: "Remember Me",
          size: "small",
          color: "Main",
        },
        {
          type: "Button",
          name: "SubmitButton",
          text: "Submit",
          size: "medium",
          color: "Accent",
        },
      ],
    },
    {
      name: "Footer",
      xPosition: 0,
      yPosition: 8,
      width: 10,
      height: 2,
      color: "Main",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      children: [
        {
          type: "Text",
          name: "FooterText",
          text: "© 2024 My Company",
          size: "small",
          color: "Main",
        },
        {
          type: "Icon",
          name: "SocialMediaIcon",
          size: "small",
          color: "Accent",
        },
      ],
    },
  ],
};

const systemMessage = {
  role: "system",
  content: `You are a UI designer who creates perfect designs from a given sketch or description of a UI. You create your designs in terms of sections, each section containing elements like buttons, labels, images, and textboxes.\n An example of an output is ${exampleLayout}.`,
};

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

const textMessage = (textDescription: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Create a UI layout from the following textual description: ${textDescription}`,
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
    debug: true,
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

    return JSON.stringify(layout);
  } catch (error) {
    throw error;
  }
}

export { getLayout };
