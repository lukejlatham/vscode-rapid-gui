import { z } from "zod";
import {
  backgroundNodeLayout,
  nodeTreeRootSchema,
  craftjsNodeSchema,
  buttonSchema,
  fullLayoutSchema,
  checkboxesSchema,
  containerSchema,
  inputSchema,
  labelSchema,
  radioButtonSchema,
  textBoxSchema,
  iconSchema,
  imageSchema,
  gridCellSchema,
  fullSectionSchema,
  textSchema,
  ThemedLayoutSchema,
  dropdownSchema,
  sliderSchema,
} from "../../webview-ui/src/types";
import { applyThemeToSchema } from "./applyTheming";

type BackgroundType = z.infer<typeof backgroundNodeLayout>;
type NodeTreeRootType = z.infer<typeof nodeTreeRootSchema>;
type LayoutSchema = z.infer<typeof fullLayoutSchema>;
type NodeSection = z.infer<typeof craftjsNodeSchema>;
type FullSectionSchema = z.infer<typeof fullSectionSchema>;

interface LayoutDimensions {
  rows: number;
  columns: number;
  ids: string[];
}

function calculateLayoutDimensions(layout: LayoutSchema): LayoutDimensions {
  let maxX = 0;
  let maxY = 0;
  const ids: string[] = layout.map((section) => {
    const sectionRight = section.xPosition + section.width;
    const sectionBottom = section.yPosition + section.height;

    if (sectionRight > maxX) maxX = sectionRight;
    if (sectionBottom > maxY) maxY = sectionBottom;

    return section.section;
  });

  return { rows: 10, columns: 10, ids };
}

function createNode(
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

function generateSectionNodes(sections: ThemedLayoutSchema[]): { [key: string]: NodeSection } {
  const nodes: { [key: string]: NodeSection } = {};

  sections.forEach((section, index) => {
    const sanitizedSectionName = section.section.replace(/\s+/g, "");
    const gridCellId = `${sanitizedSectionName}GridCell`;
    const containerId = `${sanitizedSectionName}Container`;
    const sectionIndex = index.toString();

    const gridCellDefaultsOverride = gridCellSchema.parse({});

    nodes[gridCellId] = createNode(
      "GridCell",
      true,
      "ROOT",
      { id: sectionIndex },
      gridCellDefaultsOverride,
      [containerId]
    );

    const containerDefaultsOverride = containerSchema.parse({
      flexDirection: section.flexDirection,
      backgroundColor: section.backgroundColor,
      borderColor: section.borderColor,
    });

    nodes[containerId] = createNode(
      "Container",
      true,
      gridCellId,
      {},
      containerDefaultsOverride,
      []
    );

    const childIds = section.children.map((child, childIndex) => {
      const childId = `${sanitizedSectionName}${child.element}${childIndex}`;
      let childProps: any = {};
      switch (child.element) {
        case "Button":
          childProps = buttonSchema.parse(child);
          break;
        case "Checkboxes":
          childProps = checkboxesSchema.parse(child);
          break;
        case "Input":
          childProps = inputSchema.parse(child);
          break;
        case "Label":
          childProps = labelSchema.parse(child);
          break;
        case "RadioButtons":
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
        case "Text":
          childProps = textSchema.parse(child);
          break;
        case "Dropdown":
          childProps = dropdownSchema.parse(child);
          break;
        case "Slider":
          childProps = sliderSchema.parse(child);
          break;
      }

      nodes[childId] = createNode(child.element, false, containerId, {}, childProps);
      return childId;
    });

    nodes[containerId].nodes = childIds;
  });

  return nodes;
}

function createBackgroundNode(
  dimensions: LayoutDimensions,
  layout: BackgroundType[],
  backgroundColor: string
): NodeTreeRootType {
  const linkedNodes = dimensions.ids.reduce((acc, id, index) => {
    const sanitizedId = id.replace(/\s+/g, "");
    acc[String(index)] = sanitizedId + "GridCell";
    return acc;
  }, {} as Record<string, string>);

  return {
    type: { resolvedName: "Background" },
    isCanvas: true,
    props: {
      rows: dimensions.rows,
      columns: dimensions.columns,
      lockedGrid: true,
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

function buildNodeTree(generatedLayout: LayoutSchema): string {
  console.log("Starting buildNodeTree with generatedLayout:", generatedLayout);

  const layout = generatedLayout.map((section, index) => ({
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
  console.log("Generated layout array:", layout);

  const layoutDimensions = calculateLayoutDimensions(generatedLayout);

  const themedNodes = applyThemeToSchema(generatedLayout);
  console.log("Applied theme to schema, themedNodes:", themedNodes);

  const sectionNodes = generateSectionNodes(themedNodes);
  console.log("Generated section nodes:", sectionNodes);

  const backgroundNode = createBackgroundNode(layoutDimensions, layout, "#292929");
  console.log("Created background node:", backgroundNode);

  const combinedNodes = { ROOT: backgroundNode, ...sectionNodes };
  console.log("Combined nodes:", combinedNodes);

  const stringifiedNodes = JSON.stringify(combinedNodes);
  console.log("Stringified nodes:", stringifiedNodes);

  return stringifiedNodes;
}

export { buildNodeTree };
