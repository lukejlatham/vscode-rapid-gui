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
    id: "container1",
    type: {
      resolvedName: "Container",
    },
    children: ["columns1"],
  },
  {
    id: "columns1",
    type: {
      resolvedName: "Columns",
    },
    children: ["column1", "column2"],
  },
  {
    id: "column1",
    type: {
      resolvedName: "Column",
    },
    children: ["label1", "label2"],
  },
  {
    id: "column2",
    type: {
      resolvedName: "Column",
    },
    children: ["button1", "button2"],
  },
  {
    id: "label1",
    type: {
      resolvedName: "Label",
    },
    children: [],
  },
  {
    id: "label2",
    type: {
      resolvedName: "Label",
    },
    children: [],
  },
  {
    id: "button1",
    type: {
      resolvedName: "Button",
    },
    children: [],
  },
  {
    id: "button2",
    type: {
      resolvedName: "Button",
    },
    children: [],
  },
];

export const fullNodes = convertToFullVersion(simplifiedNodes);
