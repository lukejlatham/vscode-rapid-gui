import { z } from "zod";

// Define the schema for node properties
// Define the schema for the type of a node
const NodeTypePropsSchema = z.object({
  resolvedName: z.enum(["Container", "Column", "Row", "Columns", "Rows", "Label", "Button"]),
});

// Define the schema for a single node
const NodeSchema = z.object({
  id: z
    .string()
    .describe(
      "Unique identifier for the node - format can be type and number (e.g. button1). Must be unique within the tree"
    ),
  type: NodeTypePropsSchema,
  children: z
    .array(z.string())
    .describe(
      "List of child node IDs - empty if no children (labels and buttons cannot have children)"
    ),
});

// Define the schema for the entire hierarchy
const HierarchySchema = z.object({
  nodes: z
    .array(NodeSchema)
    .describe("List of all nodes in the tree, describing the overall layout of the UI"),
});

export { HierarchySchema };
