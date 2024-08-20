import { z } from "zod";
import {
  backgroundNodeLayout,
  nodeTreeRootSchema,
  craftjsNodeSchema,
  buttonSchema,
  sectionsSchema,
  checkboxesSchema,
  containerSchema,
  inputSchema,
  labelSchema,
  radioButtonSchema,
  textBoxSchema,
  iconSchema,
  imageSchema,
  gridCellSchema,
  textSchema,
  ThemedLayoutSchema,
  dropdownSchema,
  sliderSchema,
  fontList,
  themeList,
  fontGenerationNames,
} from "../../webview-ui/src/types";
import { applyThemeToSchema } from "./applyTheming";

type BackgroundType = z.infer<typeof backgroundNodeLayout>;
type NodeTreeRootType = z.infer<typeof nodeTreeRootSchema>;
type SectionsSchema = z.infer<typeof sectionsSchema>;
type NodeSection = z.infer<typeof craftjsNodeSchema>;

interface LayoutDimensions {
  rows: number;
  columns: number;
  ids: string[];
}

function calculateLayoutDimensions(layout: SectionsSchema): LayoutDimensions {
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

function buildNodeTree(
  generatedLayout: SectionsSchema,
  themeName: string,
  chosenFont: string
): string {
  const layout = generatedLayout.map((section, index) => ({
    i: String(index),
    x: section.xPosition,
    y: section.yPosition,
    w: section.width,
    h: section.height,
  }));

  const layoutDimensions = calculateLayoutDimensions(generatedLayout);

  const chosenTheme = themeList.find(
    (theme) => theme.name.toLowerCase() === themeName.toLowerCase()
  );

  if (!chosenTheme) {
    throw new Error(`Theme "${chosenTheme}" not found`);
  }

  const themedNodes = applyThemeToSchema(generatedLayout, chosenTheme.scheme);

  const sectionNodes = generateSectionNodes(themedNodes);

  const font = fontList.find((font) => font.name === chosenFont);

  const selectedFont = font.displayName;

  if (selectedFont) {
    Object.values(sectionNodes).forEach((node) => {
      if ("fontFamily" in node.props) {
        node.props.fontFamily = `${selectedFont}`;
      }
    });
  }

  const shadows = chosenTheme.scheme.shadows;

  if (shadows) {
    Object.values(sectionNodes).forEach((node) => {
      if ("shadowColor" in node.props) {
        node.props.shadowColor = "black";
      }
    });
  }

  const backgroundNode = createBackgroundNode(
    layoutDimensions,
    layout,
    chosenTheme.scheme.backgroundColor
  );

  const combinedNodes = { ROOT: backgroundNode, ...sectionNodes };

  const stringifiedNodes = JSON.stringify(combinedNodes);

  return stringifiedNodes;
}

export { buildNodeTree };
