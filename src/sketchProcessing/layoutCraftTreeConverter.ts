// Define the default props
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
      nodes: node.nodes,
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

// Example usage
const simplifiedNodes: SimplifiedNode[] = [
  { id: "ROOT", type: "Background", nodes: ["ContainerID"] },
  { id: "ContainerID", type: "Container", nodes: ["Rows1"] },
  {
    id: "Rows1",
    type: "Rows",
    numberOfRows: 3,
    nodes: [],
    linked_nodes: { "row-0": "Row1", "row-1": "Row2", "row-2": "Row3" },
  },
  { id: "Row1", type: "Row", nodes: ["Columns1"] },
  {
    id: "Columns1",
    type: "Columns",
    nodes: [],
    linked_nodes: {
      "column-0": "Column1",
      "column-1": "Column2",
      "column-2": "Column3",
      "column-3": "Column4",
      "column-4": "Column5",
    },
  },
  { id: "Column1", type: "Column", nodes: ["Button1"] },
  { id: "Button1", type: "Button", nodes: [] },
  { id: "Column2", type: "Column", nodes: ["Button2"] },
  { id: "Button2", type: "Button", nodes: [] },
  { id: "Column3", type: "Column", nodes: ["Button3"] },
  { id: "Button3", type: "Button", nodes: [] },
  { id: "Column4", type: "Column", nodes: ["Button4"] },
  { id: "Button4", type: "Button", nodes: [] },
  { id: "Column5", type: "Column", nodes: ["Button5"] },
  { id: "Button5", type: "Button", nodes: [] },
  { id: "Row2", type: "Row", nodes: ["Columns2"] },
  {
    id: "Columns2",
    type: "Columns",
    nodes: [],
    linked_nodes: { "column-0": "Column6", "column-1": "Column7" },
  },
  { id: "Column6", type: "Column", nodes: ["Textbox1"] },
  { id: "Textbox1", type: "Textbox", nodes: [] },
  { id: "Column7", type: "Column", nodes: ["Image1"] },
  { id: "Image1", type: "Image", nodes: [] },
  { id: "Row3", type: "Row", nodes: ["Columns3"] },
  {
    id: "Columns3",
    type: "Columns",
    nodes: [],
    linked_nodes: {
      "column-0": "Column8",
      "column-1": "Column9",
      "column-2": "Column10",
      "column-3": "Column11",
      "column-4": "Column12",
    },
  },
  { id: "Column8", type: "Column", nodes: ["Textbox2"] },
  { id: "Textbox2", type: "Textbox", nodes: [] },
  { id: "Column9", type: "Column", nodes: ["Image2"] },
  { id: "Image2", type: "Image", nodes: [] },
  { id: "Column10", type: "Column", nodes: ["Textbox3"] },
  { id: "Textbox3", type: "Textbox", nodes: [] },
  { id: "Column11", type: "Column", nodes: ["Button6"] },
  { id: "Button6", type: "Button", nodes: [] },
  { id: "Column12", type: "Column", nodes: ["Label1"] },
  { id: "Label1", type: "Label", nodes: [] },
];
