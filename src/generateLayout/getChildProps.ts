import {
  generateButtonSchema,
  generateInputSchema,
  generateLabelSchema,
  generateTextBoxSchema,
  generateTextSchema,
  generateCheckboxSchema,
} from "../../types/editorObjectSchema";

const allowedSchemas = [
  generateButtonSchema,
  generateInputSchema,
  generateLabelSchema,
  generateTextBoxSchema,
  generateTextSchema,
  generateCheckboxSchema,
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

const generateSystemMessage = (allowedSchemas) => {
  return `You are a UI designer who creates perfect designs from a given sketch or description of a UI. You create your designs in terms of sections, each section containing elements.\n Allowed element types and properties are as follows:`;
  // allowedSchemas.map(({ name, schema }) => `**${name}**:\n${schemaToString(schema)}`).join("\n\n")
};

export const systemMessage = generateSystemMessage(allowedSchemas);
