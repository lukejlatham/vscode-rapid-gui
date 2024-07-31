import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import {
  layoutSchema,
  generateButtonSchema,
  generateCheckboxSchema,
  generateLabelSchema,
  generateRadioButtonSchema,
  generateInputSchema,
  generateTextBoxSchema,
  generateTextSchema,
} from "../../types/editorObjectSchema";

// const schemaTypes = generateElementSchema.shape.type.options as string[];

// const generateSchemaMapping = (types) => {
//   return types.reduce((acc, type) => {
//     const schemaName = `generate${type}Schema`;
//     acc[type] = eval(schemaName); // Use eval to dynamically access the schema
//     return acc;
//   }, {});
// };

// const schemaMapping = generateSchemaMapping(schemaTypes);

// const generateSectionSchemas = (layout) => {
//   const sections = layout.sections.map((section) => {
//     const sectionName = section.name;
//     const sectionSchemas = section.children.map((child) => {
//       const typeSchema = schemaMapping[child.type];
//       return {
//         Name: child.name,
//         Type: typeSchema,
//       };
//     });

//     return { [sectionName]: sectionSchemas };
//   });

//   return z.object(sections.reduce((acc, section) => ({ ...acc, ...section }), {}));
// };

const exampleOutput = `
{
  "sections": [
    {
      "id": "Header",
      "name": "Header",
      "xPosition": 0,
      "yPosition": 0,
      "width": 4,
      "height": 1,
      "children": [
        { "type": "Label", "name": "title" },
        { "type": "Button", "name": "headerButton" }
      ]
    },
    {
      "id": "Sidebar",
      "name": "Sidebar",
      "xPosition": 0,
      "yPosition": 1,
      "width": 2,
      "height": 9,
      "children": [
        { "type": "Button", "name": "sidebarButton1" },
        { "type": "Label", "name": "sidebarLabel" }
      ]
    },
    {
      "id": "MainContent",
      "name": "MainContent",
      "xPosition": 2,
      "yPosition": 1,
      "width": 8,
      "height": 9,
      "children": [
        { "type": "TextBox", "name": "mainTextBox" },
        { "type": "Image", "name": "mainImage" }
      ]
    },
    {
      "id": "Footer",
      "name": "Footer",
      "xPosition": 0,
      "yPosition": 10,
      "width": 10,
      "height": 1,
      "children": [
        { "type": "Label", "name": "footerLabel" },
        { "type": "Button", "name": "footerButton" }
      ]
    }
  ]
}
`;

// const systemMessage = {
//   role: "system",
//   content: `You are a UI designer who creates perfect designs from a given sketch or description of a UI. You create your designs in terms of sections, each section containing elements like buttons, labels, images, and textboxes.\n An example of an output is ${exampleOutput}.`,
// };

const allowedSchemas = [
  generateButtonSchema,
  generateInputSchema,
  generateLabelSchema,
  generateTextBoxSchema,
  generateTextSchema,
  generateCheckboxSchema,
  generateRadioButtonSchema,
];

// const schemaToString = (schema) => {
//   const shape = schema._def.shape();
//   return Object.keys(shape)
//     .map((key) => {
//       const def = shape[key]._def;
//       const type = def.typeName;
//       const defaultValue = def.defaultValue ? `(default: ${def.defaultValue()})` : "";
//       return `- ${key}: ${type} ${defaultValue}`;
//     })
//     .join("\n");
// };

// const generateSystemMessage = (allowedSchemas) => {
//   return (
//     `You are a UI designer who creates perfect designs from a given sketch or description of a UI. You create your designs in terms of sections, each section containing elements.\n Allowed element types and properties are as follows:` +
//     allowedSchemas.map(({ name, schema }) => `**${name}**:\n${schemaToString(schema)}`).join("\n\n")
//   );
// };

const systemMessage = {
  role: "system",
  // content: generateSystemMessage(allowedSchemas),
  content: `You ared the dog`,
};

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

  console.log("in getLayout - Messages:", messages);

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

    console.log("in getLayout - Layout Response:", layout);

    return JSON.stringify(layout);
  } catch (error) {
    throw error;
  }
}

export { getLayout };
