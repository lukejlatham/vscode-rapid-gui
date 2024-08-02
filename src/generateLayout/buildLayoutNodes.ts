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
type ContainerProps = z.infer<typeof containerSchema>;
type GridCellProps = z.infer<typeof gridCellSchema>;

// Function to parse and validate input JSON
function parseAndValidateInput(rawJson: string): LayoutSchema {
  return layoutSchema.parse(JSON.parse(rawJson));
}

// Interface for layout dimensions
interface LayoutDimensions {
  rows: number;
  columns: number;
  ids: string[];
}

// Function to calculate layout dimensions
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

// Function to create a node
function createNode(
  id: string,
  resolvedName: string,
  isCanvas: boolean,
  parent: string,
  props: { [key: string]: any } = {},
  children: string[] = []
): NodeSection {
  return {
    type: { resolvedName },
    isCanvas,
    props,
    displayName: resolvedName,
    custom: {},
    parent,
    hidden: false,
    nodes: children,
    linkedNodes: {},
  };
}

// Function to generate section nodes
function generateSectionNodes(sections: Section[]): { [key: string]: NodeSection } {
  const nodes: { [key: string]: NodeSection } = {};

  sections.forEach((section) => {
    // Create the GridCell node
    nodes[section.name] = createNode(section.name, "GridCell", false, "ROOT");

    const containerId = section.name + "Container";

    // Create the Container node within the GridCell node
    const containerProps: ContainerProps = {
      height: section.height,
      width: section.width,
      flexDirection: section.flexDirection,
      justifyContent: section.justifyContent,
      alignItems: section.alignItems,
      backgroundColor: section.color,
    };

    nodes[containerId] = createNode(
      containerId,
      "Container",
      true,
      section.name,
      containerProps,
      section.children.map((child) => child.name)
    );

    // Create child nodes within the Container node
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

      nodes[child.name] = createNode(child.name, child.type, false, containerId, childProps);
    });
  });

  return nodes;
}

// Function to create the background node
function createBackgroundNode(
  dimensions: LayoutDimensions,
  layout: LayoutType[],
  backgroundColor: string
): NodeTreeRootType {
  const linkedNodes = dimensions.ids.reduce((acc, id, index) => {
    acc[String(index)] = id;
    return acc;
  }, {} as Record<string, string>);

  return {
    type: { resolvedName: "Background" },
    isCanvas: false,
    props: {
      backgroundColor,
      layout,
      rows: dimensions.rows,
      columns: dimensions.columns,
    },
    displayName: "Background",
    custom: {},
    hidden: false,
    nodes: dimensions.ids,
    linkedNodes,
  };
}

// Function to assemble the final layout
function assembleFinalLayout(
  backgroundNode: NodeTreeRootType,
  sectionNodes: { [key: string]: NodeSection }
): { [key: string]: NodeSection } {
  return {
    ROOT: backgroundNode,
    ...sectionNodes,
  };
}

// Main function to build layout nodes
function buildLayoutNodes(rawLayoutResponse: string) {
  const parsedData = parseAndValidateInput(rawLayoutResponse);
  const layoutDimensions = calculateLayoutDimensions(parsedData);

  const layout = parsedData.sections.map((section, index) => ({
    w: section.width,
    h: section.height,
    x: section.xPosition,
    y: section.yPosition,
    i: String(index),
    moved: false,
    static: false,
    maxW: layoutDimensions.columns,
    maxH: layoutDimensions.rows,
  }));

  const backgroundNode = createBackgroundNode(layoutDimensions, layout, "#292929");
  const sectionNodes = generateSectionNodes(parsedData.sections);

  return assembleFinalLayout(backgroundNode, sectionNodes);
}

export { buildLayoutNodes };
