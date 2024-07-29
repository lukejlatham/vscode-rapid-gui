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
// Default properties
const TextboxDefaultProps = {
  text: "",
  fontSize: 16,
  fontColor: "black",
  backgroundColor: "white",
  placeholder: "Placeholder...",
  rows: 5,
  cols: 20,
  borderRadius: 5,
  alignment: "center",
};

const LabelDefaultProps = {
  text: "New Label",
  textAlign: "left",
  fontSize: 20,
  color: "#FFFFFF",
  userEditable: true,
};

const ButtonDefaultProps = {
  backgroundColor: "#0047AB",
  fontColor: "white",
  fontSize: 20,
  borderRadius: 4,
  text: "New Button",
  width: 150,
  height: 50,
  alignment: "center",
};

const ImageDefaultProps = {
  src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
  alt: "New image",
  width: 480,
  height: 320,
  alignment: "center",
};

// Parsing input JSON data
function parseInput(jsonData) {
  const parsedData = JSON.parse(jsonData);
  return parsedData.sections;
}

// Generating child nodes with default properties
function generateChildNodes(sections) {
  const childNodes = {};

  sections.forEach((section) => {
    section.children.forEach((child) => {
      let defaultProps = {};

      switch (child.type) {
        case "TextBox":
          defaultProps = TextboxDefaultProps;
          break;
        case "Label":
          defaultProps = LabelDefaultProps;
          break;
        case "Button":
          defaultProps = ButtonDefaultProps;
          break;
        case "Image":
          defaultProps = ImageDefaultProps;
          break;
        default:
          break;
      }

      const childNode = {
        type: { resolvedName: child.type },
        isCanvas: false,
        props: defaultProps,
        displayName: child.type,
        custom: {},
        parent: section.id + "Contents",
        hidden: false,
        nodes: [],
        linkedNodes: {},
      };

      childNodes[child.name] = childNode;
    });
  });

  return childNodes;
}

// Main function to generate the child nodes
function buildChildNodes(input) {
  const sections = parseInput(input);
  const childNodes = generateChildNodes(sections);

  return childNodes;
}
// Output the result
console.log(JSON.stringify(buildChildNodes(input), null, 2));

export { buildChildNodes };
