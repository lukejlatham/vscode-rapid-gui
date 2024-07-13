type NodeType = "Container" | "Columns" | "Column" | "Rows" | "Row" | "Label" | "Button";

interface SimplifiedNode {
  id: string;
  type: {
    resolvedName: NodeType;
  };
  children: string[];
}

interface FullNode {
  type: {
    resolvedName: NodeType;
  };
  isCanvas: boolean;
  props: any;
  displayName: NodeType;
  custom: object;
  hidden: boolean;
  nodes: string[];
  linkedNodes: object;
  parent?: string;
}

interface FullNodes {
  [key: string]: FullNode;
}

const convertToFullVersion = (simplifiedNodes: SimplifiedNode[]): FullNodes => {
  const fullNodes: FullNodes = {};

  const createFullNode = (node: SimplifiedNode, parentId?: string): FullNode => {
    const isCanvas = ["Container", "Columns", "Column", "Rows", "Row"].includes(
      node.type.resolvedName
    );
    const props = node.type.resolvedName === "Columns" ? { numberOfCols: 2, gap: 0 } : {};

    const fullNode: FullNode = {
      type: node.type,
      isCanvas: isCanvas,
      props: props,
      displayName: node.type.resolvedName,
      custom: {},
      hidden: false,
      nodes: node.children,
      linkedNodes: {},
      ...(parentId && { parent: parentId }),
    };

    return fullNode;
  };

  simplifiedNodes.forEach((node) => {
    fullNodes[node.id] = createFullNode(node);
  });

  simplifiedNodes.forEach((node) => {
    node.children.forEach((childId) => {
      if (fullNodes[childId]) {
        fullNodes[childId].parent = node.id;
      }
    });
  });

  return fullNodes;
};

// Example usage:
const simplifiedNodes: SimplifiedNode[] = [
  {
    id: "container_root",
    type: { resolvedName: "Container" },
    children: ["row_header", "columns_body", "row_footer"],
  },
  {
    id: "row_header",
    type: { resolvedName: "Row" },
    children: ["label_home", "button_1", "button_2", "button_3", "button_4"],
  },
  { id: "label_home", type: { resolvedName: "Label" }, children: [] },
  { id: "button_1", type: { resolvedName: "Button" }, children: [] },
  { id: "button_2", type: { resolvedName: "Button" }, children: [] },
  { id: "button_3", type: { resolvedName: "Button" }, children: [] },
  { id: "button_4", type: { resolvedName: "Button" }, children: [] },
  {
    id: "columns_body",
    type: { resolvedName: "Columns" },
    children: ["column_left", "column_right"],
  },
  {
    id: "column_left",
    type: { resolvedName: "Column" },
    children: ["label_1", "label_2", "label_3", "label_4", "label_5"],
  },
  { id: "label_1", type: { resolvedName: "Label" }, children: [] },
  { id: "label_2", type: { resolvedName: "Label" }, children: [] },
  { id: "label_3", type: { resolvedName: "Label" }, children: [] },
  { id: "label_4", type: { resolvedName: "Label" }, children: [] },
  { id: "label_5", type: { resolvedName: "Label" }, children: [] },
  {
    id: "column_right",
    type: { resolvedName: "Column" },
    children: ["label_step1", "container_image", "label_possible", "container_possible_image"],
  },
  { id: "label_step1", type: { resolvedName: "Label" }, children: [] },
  { id: "container_image", type: { resolvedName: "Container" }, children: [] },
  { id: "label_possible", type: { resolvedName: "Label" }, children: [] },
  { id: "container_possible_image", type: { resolvedName: "Container" }, children: [] },
  {
    id: "row_footer",
    type: { resolvedName: "Row" },
    children: [
      "button_search",
      "button_circle1",
      "button_circle2",
      "button_circle3",
      "label_contact",
    ],
  },
  { id: "button_search", type: { resolvedName: "Button" }, children: [] },
  { id: "button_circle1", type: { resolvedName: "Button" }, children: [] },
  { id: "button_circle2", type: { resolvedName: "Button" }, children: [] },
  { id: "button_circle3", type: { resolvedName: "Button" }, children: [] },
  { id: "label_contact", type: { resolvedName: "Label" }, children: [] },
];

const result = convertToFullVersion(simplifiedNodes);
console.log(result);

export { convertToFullVersion, SimplifiedNode, FullNode, FullNodes };
