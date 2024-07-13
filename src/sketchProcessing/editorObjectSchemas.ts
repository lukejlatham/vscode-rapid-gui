import { z } from "zod";

// Define the schema for node properties
// Define the schema for the type of a node
const nodeTypePropsSchema = z.object({
  resolvedName: z.enum(["Container", "Column", "Row", "Columns", "Rows", "Label", "Button"]),
});

// Define the schema for a single node
const nodeSchema = z.object({
  id: z.string(),
  type: nodeTypePropsSchema,
  children: z.array(z.string()),
});

// Define the schema for the entire hierarchy
const hierarchySchema = z.object({
  nodes: z.array(nodeSchema),
});

export { hierarchySchema };
