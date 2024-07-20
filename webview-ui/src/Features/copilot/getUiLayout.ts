type NodeType =
  | "Background"
  | "Container"
  | "Columns"
  | "Column"
  | "Rows"
  | "Row"
  | "Label"
  | "Button"
  | "Image"
  | "Textbox";

interface SimplifiedNode {
  id: string;
  type: NodeType;
  nodes: string[];
  linked_nodes?: { [key: string]: string };
  numberOfRows?: number;
  numberOfCols?: number;
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
  linkedNodes: { [key: string]: string };
  parent?: string;
}

interface FullNodes {
  [key: string]: FullNode;
}

async function convertToSimplifiedVersion(fullNodes: FullNodes): Promise<SimplifiedNode[]> {
  const simplifiedNodes: SimplifiedNode[] = [];

  const createSimplifiedNode = (id: string, node: FullNode): SimplifiedNode => {
    const simplifiedNode: SimplifiedNode = {
      id: node.props.id,
      type: node.type.resolvedName,
      nodes: node.nodes || [],
      linked_nodes: node.linkedNodes || {},
    };

    if (node.type.resolvedName === "Columns") {
      simplifiedNode.numberOfCols = node.props.numberOfCols;
    } else if (node.type.resolvedName === "Rows") {
      simplifiedNode.numberOfRows = node.props.numberOfRows;
    }

    return simplifiedNode;
  };

  for (const id in fullNodes) {
    const node = fullNodes[id];
    const simplifiedNode = createSimplifiedNode(id, node);
    simplifiedNodes.push(simplifiedNode);
  }

  return simplifiedNodes;
}

export { convertToSimplifiedVersion };
