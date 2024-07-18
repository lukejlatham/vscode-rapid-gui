const TextboxDefaultProps = {
    text: "",
    fontSize: 16,
    fontColor: "black",
    backgroundColor: "white",
    placeholder: "Placeholder...",
    rows: 5,
    cols: 20,
    borderRadius: 5,
    alignment: "centre",
  };
  
  const LabelDefaultProps = {
    text: "New Label",
    textAlign: "left",
    fontSize: 20,
    color: "#FFFFF",
    userEditable: true,
  };
  
  const ButtonDefaultProps = {
    backgroundColor: "#0047AB",
    fontColor: "white",
    fontSize: 20,
    borderRadius: 4,
    text: "New Button",
    width: 150,
    height: 50,
    alignment: "centre",
  };
  
  const ImageDefaultProps = {
    src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
    alt: "New image",
    width: 480,
    height: 320,
    alignment: "center",
  };
  
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
    linkedNodes: object;
    parent?: string;
  }
  
  interface FullNodes {
    [key: string]: FullNode;
  }
  
  export async function convertToFullVersion(simplifiedNodes: SimplifiedNode[]): Promise<FullNodes> {
    const fullNodes: FullNodes = {};
  
    const createFullNode = (node: SimplifiedNode, parentId?: string): FullNode => {
      const isCanvas = ["Container", "Columns", "Column", "Rows", "Row"].includes(node.type);
  
      let props: any = {};
      if (node.type === "Columns" && node.linked_nodes) {
        props = { numberOfCols: Object.keys(node.linked_nodes).length, gap: 0 };
      } else if (node.type === "Rows" && node.numberOfRows !== undefined) {
        props = { numberOfRows: node.numberOfRows, gap: 0 };
      } else if (node.type === "Textbox") {
        props = TextboxDefaultProps;
      } else if (node.type === "Label") {
        props = LabelDefaultProps;
      } else if (node.type === "Button") {
        props = ButtonDefaultProps;
      } else if (node.type === "Image") {
        props = ImageDefaultProps;
      }
  
      const fullNode: FullNode = {
        type: { resolvedName: node.type },
        isCanvas: isCanvas,
        props: props,
        displayName: node.type,
        custom: {},
        hidden: false,
        nodes: node.nodes || [],
        linkedNodes: node.linked_nodes || {},
        ...(parentId && { parent: parentId }),
      };
  
      return fullNode;
    };
  
    for (const node of simplifiedNodes) {
      fullNodes[node.id] = createFullNode(node);
    }
  
    for (const node of simplifiedNodes) {
      for (const childId of node.nodes) {
        if (fullNodes[childId]) {
          fullNodes[childId].parent = node.id;
        }
      }
    }
  
    return fullNodes;
  }