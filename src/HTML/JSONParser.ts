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

export function parseJSON(jsonData: any): ParsedJSON {
  try {
    // Assuming jsonData is already an object, not a string
    const pages: { [pageName: string]: PageStructure } = {};

    // Use a default page name if not provided
    const pageName = "default";

    validatePageStructure(jsonData);
    pages[pageName] = {
      root: jsonData.ROOT as Node,
      layout: parseRootLayout(jsonData.ROOT as Node),
      components: extractComponents(jsonData as { [key: string]: Node }),
    };

    return { pages };
  } catch (error) {
    console.error("Failed to process JSON", error);
    throw new Error(`Failed to process JSON: ${(error as Error).message}`);
  }
}

function validatePageStructure(pageData: any) {
  if (!pageData.ROOT) {
    throw new Error("Page JSON is missing ROOT node");
  }
  if (!pageData.ROOT.props) {
    throw new Error("Missing props in ROOT node");
  }
}

function parseRootLayout(root: Node): LayoutItem[] {
  return root.props.layout || [];
}

function extractComponents(json: { [key: string]: Node }): { [key: string]: Node } {
  const components: { [key: string]: Node } = {};
  for (const [key, value] of Object.entries(json)) {
    if (key !== "ROOT") {
      components[key] = value;
    }
  }
  return components;
}

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
