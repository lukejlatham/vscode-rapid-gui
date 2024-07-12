"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchySchema = void 0;
var zod_1 = require("zod");
// Define the schema for node properties
// Define the schema for the type of a node
var NodeTypePropsSchema = zod_1.z.object({
    resolvedName: zod_1.z.enum(["Container", "Column", "Row", "Columns", "Rows", "Label", "Button"]),
});
// Define the schema for a single node
var NodeSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .describe("Unique identifier for the node - format can be type and number (e.g. button1). Must be unique within the tree"),
    type: NodeTypePropsSchema,
    children: zod_1.z
        .array(zod_1.z.string())
        .describe("List of child node IDs - empty if no children (labels and buttons cannot have children)"),
});
// Define the schema for the entire hierarchy
var HierarchySchema = zod_1.z.object({
    nodes: zod_1.z
        .array(NodeSchema)
        .describe("List of all nodes in the tree, describing the overall layout of the UI"),
});
exports.HierarchySchema = HierarchySchema;
