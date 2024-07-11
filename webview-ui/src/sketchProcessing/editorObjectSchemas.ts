import { z } from "zod";

// Define the schema for node properties
// Define the schema for the type of a node
const NodeTypePropsSchema = z.object({
  resolvedName: z.enum(["Container", "Column", "Row", "Columns", "Rows", "Label", "Button"]),
});

// Define the schema for a single node
const NodeSchema = z.object({
  id: z.string().describe("Unique identifier for the node"),
  type: NodeTypePropsSchema,
  nodes: z.array(z.string()).describe("List of child node IDs"),
  linkedNodes: z.record(z.string()).describe("List of linked node IDs"),
});

// Define the schema for the entire hierarchy
const HierarchySchema = z.object({
  nodes: z.array(NodeSchema).describe("List of all nodes in the tree "),
});

export { NodeSchema, HierarchySchema };
