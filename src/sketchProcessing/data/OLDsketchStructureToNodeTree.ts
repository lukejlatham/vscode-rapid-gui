const simpleJson = require("./simple_sketch_layout.json");

interface CraftNode {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: { id: string };
  displayName: string;
  custom: object;
  parent: string | null;
  hidden: boolean;
  nodes: string[];
  linkedNodes: object;
}

interface UiNode {
  [key: string]: {
    id: string;
    children?: UiNode[];
  };
}

interface CraftJsNodeTree {
  [key: string]: CraftNode;
}

// Example initial JSON structure
const uiJson: UiNode = simpleJson;

// Helper function to generate unique IDs
const generateUniqueId = (): string => "_" + Math.random().toString(36).substr(2, 9);

// Recursive function to convert JSON to Craft.js node tree
const convertToCraftJsNodes = (node: UiNode, parentId: string | null = null): CraftJsNodeTree => {
  const type = Object.keys(node)[0];
  const nodeId = generateUniqueId();
  const children = node[type].children || [];
  const childNodes = children.map((child) => convertToCraftJsNodes(child, nodeId));

  const craftNode: CraftNode = {
    type: { resolvedName: type },
    isCanvas: ["Container", "Row", "Column"].includes(type),
    props: { id: node[type].id },
    displayName: type,
    custom: {},
    parent: parentId,
    hidden: false,
    nodes: childNodes.map((child) => Object.keys(child)[0]),
    linkedNodes: {},
  };

  return { [nodeId]: craftNode, ...Object.assign({}, ...childNodes) };
};

// Generate Craft.js node tree
const craftJsNodeTree: CraftJsNodeTree = {
  ROOT: {
    type: { resolvedName: "Container" },
    parent: null,
    isCanvas: true,
    props: { id: "root" },
    displayName: "Container",
    custom: {},
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
};

const rootNodeId = Object.keys(uiJson)[0];
const rootNode = convertToCraftJsNodes({ [rootNodeId]: uiJson[rootNodeId] });
const rootFirstChildId = Object.keys(rootNode)[0];
craftJsNodeTree.ROOT.nodes.push(rootFirstChildId);

Object.assign(craftJsNodeTree, rootNode);

// Fix the parent field for the first-level node
if (craftJsNodeTree[rootFirstChildId]) {
  craftJsNodeTree[rootFirstChildId].parent = "ROOT";
}

export {};
