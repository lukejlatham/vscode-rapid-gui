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
} from "../../webview-ui/src/types";
import { adjustLayoutToFitGrid } from "./gridLayoutCorrection";
import { applyThemeToSchema } from "./applyTheming";

type BackgroundType = z.infer<typeof backgroundNodeLayout>;
type NodeTreeRootType = z.infer<typeof nodeTreeRootSchema>;
type SectionsSchema = z.infer<typeof sectionsSchema>;
type NodeSection = z.infer<typeof craftjsNodeSchema>;

const elementSchemas = {
  Button: buttonSchema,
  Checkboxes: checkboxesSchema,
  Input: inputSchema,
  Label: labelSchema,
  RadioButtons: radioButtonSchema,
  TextBox: textBoxSchema,
  Icon: iconSchema,
  Image: imageSchema,
  Text: textSchema,
  Dropdown: dropdownSchema,
  Slider: sliderSchema,
};

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

function calculateImageScale(containerWidth: number, containerHeight: number): number {
  const aspectRatio = containerWidth / containerHeight;

  if (aspectRatio >= 1) {
    // Landscape or square container
    return containerHeight / containerWidth;
  } else {
    // Portrait container
    return containerWidth / containerHeight;
  }
}

function generateSectionNodes(sections: ThemedLayoutSchema[]): { [key: string]: NodeSection } {
  const nodes: { [key: string]: NodeSection } = {};

  sections.forEach((section, index) => {
    const sanitizedSectionName = section.section.replace(/\s+/g, "");
    const gridCellId = `${sanitizedSectionName}GridCell`;
    const containerId = `${sanitizedSectionName}Container`;

    nodes[gridCellId] = createNode(
      "GridCell",
      true,
      "ROOT",
      { id: index.toString() },
      gridCellSchema.parse({}),
      [containerId]
    );

    const flexDirectionOverride = section.width > section.height ? "row" : "column";

    nodes[containerId] = createNode(
      "Container",
      true,
      gridCellId,
      {},
      containerSchema.parse({
        flexDirection: flexDirectionOverride,
        backgroundColor: section.backgroundColor,
        borderColor: section.borderColor,
        width: 100,
        height: 100,
        shadowColor: "transparent",
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 1,
      }),
      []
    );

    const childIds = section.children.map((child, childIndex) => {
      const childId = `${sanitizedSectionName}${child.element}${childIndex}`;
      const schema = elementSchemas[child.element as keyof typeof elementSchemas];

      if (!schema) {
        throw new Error(`Unknown element type: ${child.element}`);
      }

      let childProps = schema.parse(child);

      if (child.element === "Image") {
        const scaledWidth = Math.floor(calculateImageScale(section.width, section.height) * 40);
        childProps = { ...childProps, width: scaledWidth };
      }

      if (child.element === "Checkboxes" || child.element === "RadioButtons") {
        childProps = { ...childProps, direction: flexDirectionOverride };
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
  const initialGrid = generatedLayout.map((section, index) => ({
    i: String(index),
    x: section.xPosition,
    y: section.yPosition,
    w: section.width,
    h: section.height,
  }));

  const adjustedLayout = adjustLayoutToFitGrid(initialGrid);

  const updatedGeneratedLayout = generatedLayout.map((section, index) => {
    const adjustedCell = adjustedLayout.find((cell) => cell.i === String(index));
    if (adjustedCell) {
      return {
        ...section,
        xPosition: adjustedCell.x,
        yPosition: adjustedCell.y,
        width: adjustedCell.w,
        height: adjustedCell.h,
      };
    }
    return section;
  });

  const layoutDimensions = calculateLayoutDimensions(updatedGeneratedLayout);

  const chosenTheme = themeList.find(
    (theme) => theme.themeGenerationName.toLowerCase() === themeName.toLowerCase()
  );

  if (!chosenTheme) {
    throw new Error(`Theme "${chosenTheme}" not found`);
  }

  const themedNodes = applyThemeToSchema(updatedGeneratedLayout, chosenTheme.scheme);

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

  console.log("applying shadows?", chosenTheme.scheme.shadows);

  const shadows = chosenTheme.scheme.shadows;

  if (shadows) {
    Object.values(sectionNodes).forEach((node) => {
      if ("shadowColor" in node.props) {
        node.props.shadowColor = "rgba(0, 0, 0, 0.6)";
        node.props.shadowOffsetX = 2;
        node.props.shadowOffsetY = 2;
        node.props.shadowBlur = 2;
      }
    });
  }

  const backgroundNode = createBackgroundNode(
    layoutDimensions,
    adjustedLayout,
    chosenTheme.scheme.backgroundColor
  );

  const combinedNodes = { ROOT: backgroundNode, ...sectionNodes };

  const stringifiedNodes = JSON.stringify(combinedNodes);

  return stringifiedNodes;
}

export { buildNodeTree, calculateLayoutDimensions, generateSectionNodes, createBackgroundNode };
