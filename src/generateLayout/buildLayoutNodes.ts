// Sample input data
const input = `{
  "sections": [
    {
      "id": "Header",
      "name": "Header",
      "xPosition": 0,
      "yPosition": 0,
      "width": 10,
      "height": 1,
      "children": [
        { "type": "Button", "name": "homeButton" },
        { "type": "Button", "name": "navButton1" },
        { "type": "Button", "name": "navButton2" },
        { "type": "Button", "name": "navButton3" }
      ]
    },
    {
      "id": "Sidebar",
      "name": "Sidebar",
      "xPosition": 0,
      "yPosition": 1,
      "width": 2,
      "height": 9,
      "children": [
        { "type": "Label", "name": "sidebarLabel1" },
        { "type": "Label", "name": "sidebarLabel2" },
        { "type": "Label", "name": "sidebarLabel3" },
        { "type": "Label", "name": "sidebarLabel4" }
      ]
    },
    {
      "id": "MainContent",
      "name": "MainContent",
      "xPosition": 2,
      "yPosition": 1,
      "width": 8,
      "height": 7,
      "children": [
        { "type": "Label", "name": "stepLabel" },
        { "type": "Image", "name": "mainImage" },
        { "type": "Label", "name": "possibleLabel" },
        { "type": "TextBox", "name": "mainTextBox" }
      ]
    },
    {
      "id": "Footer",
      "name": "Footer",
      "xPosition": 0,
      "yPosition": 10,
      "width": 10,
      "height": 1,
      "children": [
        { "type": "Button", "name": "searchButton" },
        { "type": "Label", "name": "contactLabel" },
        { "type": "Button", "name": "footerButton1" },
        { "type": "Button", "name": "footerButton2" },
        { "type": "Button", "name": "footerButton3" }
      ]
    }
  ],
  "_meta": { "usage": { "completion_tokens": 295, "prompt_tokens": 1461, "total_tokens": 1756 } }
}`;

interface Section {
  id: string;
  name: string;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  children: Array<{ type: string; name: string }>;
}

interface LayoutDimensions {
  rows: number;
  columns: number;
  ids: string[];
}
interface NodeTreeRoot {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: {
    backgroundColor: string;
    id: string;
    rows: number;
    columns: number;
  };
  displayName: string;
  custom: object;
  hidden: boolean;
  nodes: string[];
  linkedNodes: { [key: string]: string };
}

interface NodeSection {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  displayName: string;
  custom: object;
  parent: string;
  hidden: boolean;
  nodes: string[];
  linkedNodes: object;
}

function removeMetadata(jsonData: string): Section[] {
  const parsedData = JSON.parse(jsonData);
  return parsedData.sections;
}

function getLayoutDimensions(sections: Section[]): LayoutDimensions {
  let maxX = 0;
  let maxY = 0;
  const ids: string[] = [];

  sections.forEach((section) => {
    const sectionRight = section.xPosition + section.width;
    const sectionBottom = section.yPosition + section.height;

    if (sectionRight > maxX) {
      maxX = sectionRight;
    }

    if (sectionBottom > maxY) {
      maxY = sectionBottom;
    }

    ids.push(section.id);
  });

  return { rows: maxY, columns: maxX, ids };
}

function createNodeTreeRoot(
  rows: number,
  columns: number,
  backgroundColor: string,
  ids: string[]
): NodeTreeRoot {
  const linkedNodes = ids.reduce((acc, id) => {
    acc[id] = id;
    return acc;
  }, {});

  return {
    type: { resolvedName: "Background" },
    isCanvas: false,
    props: {
      backgroundColor: backgroundColor,
      id: "background",
      rows: rows,
      columns: columns,
    },
    displayName: "Background",
    custom: {},
    hidden: false,
    nodes: [],
    linkedNodes: linkedNodes,
  };
}

function generateSectionLayout(sections: Section[]): { [key: string]: NodeSection } {
  const layout: { [key: string]: NodeSection } = {};

  sections.forEach((section) => {
    const node: NodeSection = {
      type: { resolvedName: "Container" },
      isCanvas: true,
      props: {
        id: section.id,
        x: section.xPosition,
        y: section.yPosition,
        w: section.width,
        h: section.height,
      },
      displayName: "Container",
      custom: {},
      parent: "ROOT",
      hidden: false,
      nodes: section.children.map((child) => child.name),
      linkedNodes: {},
    };

    layout[section.id] = node;
  });

  return layout;
}

function buildLayoutNodes(rawLayoutResponse: string) {
  const sections = removeMetadata(rawLayoutResponse);

  const layoutDimensions = getLayoutDimensions(sections);

  const backgroundNode = createNodeTreeRoot(
    layoutDimensions.rows,
    layoutDimensions.columns,
    "#333",
    layoutDimensions.ids
  );
  const sectionLayout = generateSectionLayout(sections);

  backgroundNode.nodes = layoutDimensions.ids;

  const output = {
    ROOT: backgroundNode,
    ...sectionLayout,
  };

  const stringifiedOutput = JSON.stringify(output, null, 2);

  return stringifiedOutput;
}

export { buildLayoutNodes };
