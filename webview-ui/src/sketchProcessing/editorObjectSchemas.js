"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchySchema = exports.NodeSchema = void 0;
var zod_1 = require("zod");
// Define the schema for node properties
// Define the schema for the type of a node
var NodeTypePropsSchema = zod_1.z.object({
    resolvedName: zod_1.z.enum(["Container", "Column", "Row", "Columns", "Rows", "Label", "Button"]),
});
// Define the schema for a single node
var NodeSchema = zod_1.z.object({
    id: zod_1.z.string().describe("Unique identifier for the node"),
    type: NodeTypePropsSchema,
    nodes: zod_1.z.array(zod_1.z.string()).describe("List of child node IDs"),
    linkedNodes: zod_1.z.record(zod_1.z.string()).describe("List of linked node IDs"),
});
exports.NodeSchema = NodeSchema;
// Define the schema for the entire hierarchy
var HierarchySchema = zod_1.z.object({
    nodes: zod_1.z.array(NodeSchema).describe("List of all nodes in the tree "),
});
exports.HierarchySchema = HierarchySchema;
