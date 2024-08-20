// // Sample input data
// const input = `{
//   "sections": [
//     {
//       "id": "Header",
//       "name": "Header",
//       "xPosition": 0,
//       "yPosition": 0,
//       "width": 10,
//       "height": 1,
//       "children": [
//         { "type": "Button", "name": "homeButton" },
//         { "type": "Button", "name": "navButton1" },
//         { "type": "Button", "name": "navButton2" },
//         { "type": "Button", "name": "navButton3" }
//       ]
//     },
//     {
//       "id": "Sidebar",
//       "name": "Sidebar",
//       "xPosition": 0,
//       "yPosition": 1,
//       "width": 2,
//       "height": 9,
//       "children": [
//         { "type": "Label", "name": "sidebarLabel1" },
//         { "type": "Label", "name": "sidebarLabel2" },
//         { "type": "Label", "name": "sidebarLabel3" },
//         { "type": "Label", "name": "sidebarLabel4" }
//       ]
//     },
//     {
//       "id": "MainContent",
//       "name": "MainContent",
//       "xPosition": 2,
//       "yPosition": 1,
//       "width": 8,
//       "height": 7,
//       "children": [
//         { "type": "Label", "name": "stepLabel" },
//         { "type": "Image", "name": "mainImage" },
//         { "type": "Label", "name": "possibleLabel" },
//         { "type": "TextBox", "name": "mainTextBox" }
//       ]
//     },
//     {
//       "id": "Footer",
//       "name": "Footer",
//       "xPosition": 0,
//       "yPosition": 10,
//       "width": 10,
//       "height": 1,
//       "children": [
//         { "type": "Button", "name": "searchButton" },
//         { "type": "Label", "name": "contactLabel" },
//         { "type": "Button", "name": "footerButton1" },
//         { "type": "Button", "name": "footerButton2" },
//         { "type": "Button", "name": "footerButton3" }
//       ]
//     }
//   ],
//   "_meta": { "usage": { "completion_tokens": 295, "prompt_tokens": 1461, "total_tokens": 1756 } }
// }`;
// import { z } from "zod";
// import {
//   backgroundNodeLayout,
//   nodeTreeRootSchema,
//   craftjsNodeSchema,
//   buttonSchema,
//   fullLayoutSchema,
//   checkboxesSchema,
//   containerSchema,
//   inputSchema,
//   labelSchema,
//   radioButtonSchema,
//   textBoxSchema,
//   iconSchema,
//   imageSchema,
//   gridCellSchema,
//   fullSectionSchema,
//   textSchema,
//   ThemedLayoutSchema,
//   dropdownSchema,
//   sliderSchema,
// } from "../../webview-ui/src/types";
// import { applyThemeToSchema } from "./applyTheming";

// type LayoutType = z.infer<typeof backgroundNodeLayout>;
// type NodeTreeRootType = z.infer<typeof nodeTreeRootSchema>;
// type LayoutSchema = z.infer<typeof fullLayoutSchema>;
// type NodeSection = z.infer<typeof craftjsNodeSchema>;
// type FullSectionSchema = z.infer<typeof fullSectionSchema>;

// interface LayoutDimensions {
//   rows: number;
//   columns: number;
//   ids: string[];
// }

// const overwriteContents = (parsedLayout: string, parsedFullChildren: string): LayoutSchema => {
//   const layout1Parsed = JSON.parse(parsedLayout);
//   const layout2Parsed = JSON.parse(parsedFullChildren);

//   const layout2Dict = layout2Parsed.reduce((acc: { [key: string]: any }, item: any) => {
//     acc[item.section] = item.children;
//     return acc;
//   }, {});

//   const updatedLayout1 = layout1Parsed.map((item: any) => {
//     if (layout2Dict[item.section]) {
//       return {
//         ...item,
//         children: layout2Dict[item.section], // Replace contents with children
//       };
//     }
//     return item;
//   });

//   return updatedLayout1;
// };

// function calculateLayoutDimensions(layout: LayoutSchema): LayoutDimensions {
//   let maxX = 0;
//   let maxY = 0;
//   const ids: string[] = layout.map((section) => {
//     const sectionRight = section.xPosition + section.width;
//     const sectionBottom = section.yPosition + section.height;

//     if (sectionRight > maxX) maxX = sectionRight;
//     if (sectionBottom > maxY) maxY = sectionBottom;

//     return section.section;
//   });

//   return { rows: 10, columns: 10, ids };
// }

// function createNode(
//   resolvedName: string,
//   isCanvas: boolean,
//   parent: string,
//   custom: { [key: string]: any } = {},
//   props: { [key: string]: any } = {},
//   children: string[] = []
// ): NodeSection {
//   return {
//     type: { resolvedName },
//     isCanvas,
//     props,
//     displayName: resolvedName,
//     custom,
//     parent,
//     hidden: false,
//     nodes: children,
//     linkedNodes: {},
//   };
// }
// function generateSectionNodes(sections: ThemedLayoutSchema[]): { [key: string]: NodeSection } {
//   const nodes: { [key: string]: NodeSection } = {};

//   sections.forEach((section, index) => {
//     const sanitizedSectionName = section.section.replace(/\s+/g, "");
//     const gridCellId = `${sanitizedSectionName}GridCell`;
//     const containerId = `${sanitizedSectionName}Container`;
//     const sectionIndex = index.toString();

//     const gridCellDefaultsOverride = gridCellSchema.parse({});

//     nodes[gridCellId] = createNode(
//       "GridCell",
//       true,
//       "ROOT",
//       { id: sectionIndex },
//       gridCellDefaultsOverride,
//       [containerId]
//     );

//     const containerDefaultsOverride = containerSchema.parse({
//       flexDirection: section.props.flexDirection,
//       backgroundColor: section.props.backgroundColor,
//       borderColor: section.props.borderColor,
//     });

//     nodes[containerId] = createNode(
//       "Container",
//       true,
//       gridCellId,
//       {},
//       containerDefaultsOverride,
//       []
//     );

//     const childIds = section.children.map((child, childIndex) => {
//       const childId = `${sanitizedSectionName}${child.type}${childIndex}`;
//       let childProps: any = {};
//       switch (child.type) {
//         case "Button":
//           childProps = buttonSchema.parse(child.props);
//           break;
//         case "Checkboxes":
//           childProps = checkboxesSchema.parse(child.props);
//           break;
//         case "Input":
//           childProps = inputSchema.parse(child.props);
//           break;
//         case "Label":
//           childProps = labelSchema.parse(child.props);
//           break;
//         case "RadioButtons":
//           childProps = radioButtonSchema.parse(child.props);
//           break;
//         case "TextBox":
//           childProps = textBoxSchema.parse(child.props);
//           break;
//         case "Icon":
//           childProps = iconSchema.parse(child.props);
//           break;
//         case "Image":
//           childProps = imageSchema.parse(child.props);
//           break;
//         case "Text":
//           childProps = textSchema.parse(child.props);
//           break;
//         case "Dropdown":
//           childProps = dropdownSchema.parse(child.props);
//           break;
//         case "Slider":
//           childProps = sliderSchema.parse(child.props);
//           break;
//       }

//       nodes[childId] = createNode(child.type, false, containerId, {}, childProps);
//       return childId;
//     });

//     nodes[containerId].nodes = childIds;
//   });

//   return nodes;
// }

// function createBackgroundNode(
//   dimensions: LayoutDimensions,
//   layout: LayoutType[],
//   backgroundColor: string
// ): NodeTreeRootType {
//   const linkedNodes = dimensions.ids.reduce((acc, id, index) => {
//     const sanitizedId = id.replace(/\s+/g, "");
//     acc[String(index)] = sanitizedId + "GridCell";
//     return acc;
//   }, {} as Record<string, string>);

//   return {
//     type: { resolvedName: "Background" },
//     isCanvas: true,
//     props: {
//       rows: dimensions.rows,
//       columns: dimensions.columns,
//       lockedGrid: true,
//       backgroundColor,
//       layout,
//     },
//     displayName: "Background",
//     custom: {},
//     parent: null,
//     hidden: false,
//     nodes: [],
//     linkedNodes,
//   };
// }

// function buildLayoutNodes(parsedLayout: string, parsedFullChildren: string): string {
//   const combinedLayout = overwriteContents(parsedLayout, parsedFullChildren);

//   const parsedData = fullLayoutSchema.parse(combinedLayout);

//   const layoutDimensions = calculateLayoutDimensions(combinedLayout);

//   const layout = parsedData.map((section, index) => ({
//     i: String(index),
//     x: section.xPosition,
//     y: section.yPosition,
//     w: section.width,
//     h: section.height,
//     // moved: false,
//     // static: false,
//     // maxW: layoutDimensions.columns,
//     // maxH: layoutDimensions.rows,
//   }));

//   const themedNodes = applyThemeToSchema(parsedData);

//   const sectionNodes = generateSectionNodes(themedNodes);

//   const backgroundNode = createBackgroundNode(layoutDimensions, layout, "#292929");

//   const combinedNodes = { ROOT: backgroundNode, ...sectionNodes };

//   const stringifiedNodes = JSON.stringify(combinedNodes);

//   return stringifiedNodes;
// }

// export { buildLayoutNodes };

export {};