// JSONParser.ts, change anything that is not a type definition?

export interface ParsedJSON {
  pages: {
    [pageName: string]: PageStructure;
  };
}

export interface PageStructure {
  root: Node;
  layout: LayoutItem[];
  components: { [key: string]: Node };
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  moved?: boolean;
  static?: boolean;
}

export interface NodeProps {
  rows?: number;
  columns?: number;
  backgroundColor?: string;
  layout?: LayoutItem[];
  [key: string]: any;
}

export interface Node {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: NodeProps;
  displayName: string;
  custom: { id?: string };
  parent: string | null;
  hidden: boolean;
  nodes: string[];
  linkedNodes: { [key: string]: string };
}

export function parseJSON(jsonString: string): ParsedJSON {
  try {
    const json = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
    console.log("Parsed JSON:", JSON.stringify(json, null, 2));

    const components: { [key: string]: Node } = {};
    Object.entries(json).forEach(([key, value]) => {
      components[key] = value as Node;
    });

    setParentReferences(components);

    const rootNode = components.ROOT;
    const pageStructure: PageStructure = {
      root: rootNode,
      layout: rootNode.props.layout || [],
      components: components,
    };

    return {
      pages: {
        default: pageStructure,
      },
    };
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Error parsing JSON");
  }
}

function setParentReferences(components: { [key: string]: Node }) {
  Object.values(components).forEach((node) => {
    if (node.nodes) {
      node.nodes.forEach((childId) => {
        if (components[childId]) {
          components[childId].parent = node.custom.id || null;
        }
      });
    }
    if (node.linkedNodes) {
      Object.values(node.linkedNodes).forEach((childId) => {
        if (components[childId]) {
          components[childId].parent = node.custom.id || null;
        }
      });
    }
  });
}

// function validatePageStructure(pageData: any) {
//   if (!pageData.ROOT) {
//     console.error("Full page data:", JSON.stringify(pageData, null, 2));
//     throw new Error("Page JSON is missing ROOT node");
//   }
//   if (!pageData.ROOT.props) {
//     throw new Error("Missing props in ROOT node");
//   }
// }

// function parseRootLayout(root: Node): LayoutItem[] {
//   return root.props.layout || [];
// }

// function extractComponents(json: { [key: string]: Node }): { [key: string]: Node } {
//   return json;
// }

export function getComponentById(parsedJSON: ParsedJSON, id: string): Node | undefined {
  for (const page of Object.values(parsedJSON.pages)) {
    if (page.components[id]) {
      return page.components[id];
    }
  }
  return undefined;
}

export function getRootProperties(parsedJSON: ParsedJSON): NodeProps {
  return parsedJSON.pages[Object.keys(parsedJSON.pages)[0]].root.props;
}
