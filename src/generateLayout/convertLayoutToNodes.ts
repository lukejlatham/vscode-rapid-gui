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
import { z } from "zod";
import {
  layoutSchema,
  sectionSchema,
  backgroundNodeLayout,
  nodeTreeRootSchema,
  craftjsNodeSchema,
  buttonSchema,
  checkboxSchema,
  containerSchema,
  gridCellSchema,
  inputSchema,
  labelSchema,
  radioButtonSchema,
  textBoxSchema,
  iconSchema,
  imageSchema,
} from "../../webview-ui/src/types"; // Assuming schemas are exported from a separate file

// Define types using z.infer
type LayoutType = z.infer<typeof backgroundNodeLayout>;
type NodeTreeRootType = z.infer<typeof nodeTreeRootSchema>;
type Section = z.infer<typeof sectionSchema>;
type LayoutSchema = z.infer<typeof layoutSchema>;
type NodeSection = z.infer<typeof craftjsNodeSchema>;

// Function to parse and validate input JSON
function parseAndValidateInput(rawJson: string): LayoutSchema {
  return layoutSchema.parse(JSON.parse(rawJson));
}

interface LayoutDimensions {
  rows: number;
  columns: number;
  ids: string[];
}

function calculateLayoutDimensions(layout: LayoutSchema): LayoutDimensions {
  let maxX = 0;
  let maxY = 0;
  const ids: string[] = layout.sections.map((section) => {
    const sectionRight = section.xPosition + section.width;
    const sectionBottom = section.yPosition + section.height;

    if (sectionRight > maxX) maxX = sectionRight;
    if (sectionBottom > maxY) maxY = sectionBottom;

    return section.name;
  });

  return { rows: maxY, columns: maxX, ids };
}

function createNode(
  id: string,
  resolvedName: string,
  isCanvas: boolean,
  parent: string,
  custom: { [key: string]: any } = {},
  props: { [key: string]: any } = {},
  children: string[] = []
): NodeSection {
  return {
    type: { resolvedName },
    isCanvas,
    props,
    displayName: resolvedName,
    custom,
    parent,
    hidden: false,
    nodes: children,
    linkedNodes: {},
  };
}

function generateSectionNodes(sections: Section[]): { [key: string]: NodeSection } {
  const nodes: { [key: string]: NodeSection } = {};

  sections.forEach((section, index) => {
    const gridCellId = section.name + "GridCell";
    const containerId = section.name + "Container";
    const sectionIndex = index.toString();

    //  const gridCellProps: GridCellProps = {
    //    flexDirection: "column",
    //    justifyContent: "flex-start",
    //    alignItems: "center",
    //    gap: 1,
    //  };

    const gridCellDefaultsOveride = gridCellSchema.parse({});

    nodes[gridCellId] = createNode(
      gridCellId,
      "GridCell",
      true,
      "ROOT",
      { id: sectionIndex },
      gridCellDefaultsOveride,
      [containerId]
    );

    const containerDefaultsOveride = containerSchema.parse({
      flexDirection: section.flexDirection,
      backgroundColor: section.backgroundColor,
    });

    nodes[containerId] = createNode(
      containerId,
      "Container",
      true,
      gridCellId,
      {},
      containerDefaultsOveride,
      section.children.map((child) => child.name)
    );

    section.children.forEach((child) => {
      let childProps: any = {};
      switch (child.type) {
        case "Button":
          childProps = buttonSchema.parse(child);
          break;
        case "Checkbox":
          childProps = checkboxSchema.parse(child);
          break;
        case "Input":
          childProps = inputSchema.parse(child);
          break;
        case "Label":
          childProps = labelSchema.parse(child);
          break;
        case "RadioButton":
          childProps = radioButtonSchema.parse(child);
          break;
        case "TextBox":
          childProps = textBoxSchema.parse(child);
          break;
        case "Icon":
          childProps = iconSchema.parse(child);
          break;
        case "Image":
          childProps = imageSchema.parse(child);
          break;
      }

      nodes[child.name] = createNode(child.name, child.type, false, containerId, {}, childProps);
    });
  });

  return nodes;
}
function createBackgroundNode(
  dimensions: LayoutDimensions,
  layout: LayoutType[],
  backgroundColor: string
): NodeTreeRootType {
  const linkedNodes = dimensions.ids.reduce((acc, id, index) => {
    acc[String(index)] = id + "GridCell";
    return acc;
  }, {} as Record<string, string>);

  return {
    type: { resolvedName: "Background" },
    isCanvas: true,
    props: {
      rows: dimensions.rows,
      columns: dimensions.columns,
      lockedGrid: false,
      backgroundColor,
      layout,
    },
    displayName: "Background",
    custom: {},
    parent: null,
    hidden: false,
    nodes: [],
    linkedNodes,
  };
}

function buildLayoutNodes(rawLayoutResponse: string) {
  const parsedData = parseAndValidateInput(rawLayoutResponse);
  const layoutDimensions = calculateLayoutDimensions(parsedData);

  const layout = parsedData.sections.map((section, index) => ({
    i: String(index),
    x: section.xPosition,
    y: section.yPosition,
    w: section.width,
    h: section.height,
    // moved: false,
    // static: false,
    // maxW: layoutDimensions.columns,
    // maxH: layoutDimensions.rows,
  }));

  const backgroundNode = createBackgroundNode(layoutDimensions, layout, "#6f787d");

  const sectionNodes = generateSectionNodes(parsedData.sections);

  const combinedNodes = { ROOT: backgroundNode, ...sectionNodes };

  const stringifiedNodes = JSON.stringify(combinedNodes);

  console.log("buildLayoutNodes - Combined Nodes:", stringifiedNodes);

  return stringifiedNodes;
}

export { buildLayoutNodes };
