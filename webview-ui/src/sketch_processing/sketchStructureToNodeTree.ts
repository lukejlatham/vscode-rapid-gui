interface CraftNode {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: { id: string };
  displayName: string;
  custom: object;
  parent: string | null;
  hidden: boolean;
  nodes: string[];
  linkedNodes: object;
}

interface UiNode {
  [key: string]: {
    id: string;
    children?: UiNode[];
  };
}

interface CraftJsNodeTree {
  [key: string]: CraftNode;
}

// Example initial JSON structure
const uiJson: UiNode = {
  "Container": {
    "id": "container1",
    "children": [
      {
        "Menu": {
          "id": "menu1",
          "children": [
            { "Form": { "id": "form1" } },
            { "Form": { "id": "form2" } },
            { "Form": { "id": "form3" } },
            { "Form": { "id": "form4" } }
          ]
        }
      },
      {
        "Column": {
          "id": "column1",
          "children": [
            {
              "Row": {
                "id": "row1",
                "children": [
                  { "TextBox": { "id": "textbox1" } }
                ]
              }
            },
            {
              "Row": {
                "id": "row2",
                "children": [
                  { "TextBox": { "id": "textbox2" } }
                ]
              }
            },
            {
              "Row": {
                "id": "row3",
                "children": [
                  { "TextBox": { "id": "textbox3" } }
                ]
              }
            },
            {
              "Row": {
                "id": "row4",
                "children": [
                  { "TextBox": { "id": "textbox4" } }
                ]
              }
            },
            {
              "Row": {
                "id": "row5",
                "children": [
                  { "TextBox": { "id": "textbox5" } }
                ]
              }
            }
          ]
        }
      },
      {
        "Row": {
          "id": "row6",
          "children": [
            { "Label": { "id": "label1" } },
            { "Picture": { "id": "picture1" } }
          ]
        }
      },
      {
        "Row": {
          "id": "row7",
          "children": [
            { "Label": { "id": "label2" } },
            { "Button": { "id": "button1" } }
          ]
        }
      }
    ]
  }
};

// Helper function to generate unique IDs
const generateUniqueId = (): string => '_' + Math.random().toString(36).substr(2, 9);

// Recursive function to convert JSON to Craft.js node tree
const convertToCraftJsNodes = (node: UiNode, parentId: string | null = null): CraftJsNodeTree => {
  const type = Object.keys(node)[0];
  const nodeId = generateUniqueId();
  const children = node[type].children || [];
  const childNodes = children.map(child => convertToCraftJsNodes(child, nodeId));

  const craftNode: CraftJsNodeTree = {
    [nodeId]: {
      type: { resolvedName: type },
      isCanvas: ['Container', 'Column', 'Row'].includes(type),
      props: { id: node[type].id },
      displayName: type,
      custom: {},
      parent: parentId,
      hidden: false,
      nodes: childNodes.map(child => Object.keys(child)[0]),
      linkedNodes: {}
    }
  };

  return { ...craftNode, ...Object.assign({}, ...childNodes) };
};

// Generate Craft.js node tree
const craftJsNodeTree: CraftJsNodeTree = {
  ROOT: {
    type: { resolvedName: "Container" },
    parent: null,
    isCanvas: true,
    props: { id: "root" },
    displayName: "Container",
    custom: {},
    hidden: false,
    nodes: [],
    linkedNodes: {}
  }
};

const rootNodeId = Object.keys(uiJson)[0];
craftJsNodeTree.ROOT.nodes.push(rootNodeId);

const convertedNodes = convertToCraftJsNodes(uiJson);
Object.assign(craftJsNodeTree, convertedNodes);

console.log(JSON.stringify(craftJsNodeTree, null, 2));

export {}