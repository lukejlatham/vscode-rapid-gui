import { ParsedJSON, Node } from "./JSONParser";
import { generateButtonHtml, generateButtonCss } from "./components/Button";
import { generateLabelHtml, generateLabelCss } from "./components/Label";
import { generateIconHtml, generateIconCss } from "./components/Icon";
import { generateInputHtml, generateInputCss } from "./components/Input";
import { generateTextHtml, generateTextCss } from "./components/Text";
import { generateRadioButtonHtml, generateRadioButtonCss } from "./components/RadioButton";
import { generateContainerHtml, generateContainerCss } from "./components/Container";
import { generateCheckboxHtml, generateCheckboxCss } from "./components/Checkbox";
import { generateSliderHtml, generateSliderCss } from "./components/Slider";
import { generateTextBoxHtml, generateTextBoxCss } from "./components/TextBox";
import { generateImageHtml, generateImageCss } from "./components/Image";
import { generateDropdownHtml, generateDropdownCss } from "./components/Dropdown";

let componentCounters: { [key: string]: { [key: string]: number } } = {};

let processedNodes = new Set<string>();

export function resetProcessedNodes() {
  processedNodes.clear();
}

export function getComponentId(type: string, pageName: string): string {
  if (!componentCounters[pageName]) {
    componentCounters[pageName] = {};
  }
  if (!componentCounters[pageName][type]) {
    componentCounters[pageName][type] = 0;
  }
  componentCounters[pageName][type]++;
  return `${type.toLowerCase()}${pageName}${componentCounters[pageName][type]}`;
}

export function resetComponentCounters() {
  componentCounters = {};
}

export function generateComponentHtml(
  parsedJSON: ParsedJSON,
  pageName: string,
  projectPath?: string
): string {
  const page = parsedJSON.pages[pageName];
  const node = page.root;

  return generateSingleComponentHtml(node, page.components, projectPath, pageName);
}

export function generateComponentCss(parsedJSON: ParsedJSON, pageName: string): string {
  const page = parsedJSON.pages[pageName];
  const node = page.root;

  return generateSingleComponentCss(node, page.components, pageName);
}

function generateSingleComponentHtml(
  node: Node,
  content: { [key: string]: Node },
  pageName: string,
  projectPath?: string
): string {
  // console.log("Generating single component HTML with projectPath:", projectPath);
  if (!node || !node.type || !node.type.resolvedName) {
    console.error("Invalid node structure:", node);
    return "<!-- Error: Invalid component structure -->";
  }

  const componentId = getComponentId(node.type.resolvedName, pageName);
  node.custom = node.custom || {};
  node.custom.id = componentId;

  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonHtml(node, pageName);
    case "Input":
      return generateInputHtml(node);
    case "Text":
      return generateTextHtml(node);
    case "Label":
      return generateLabelHtml(node, pageName);
    case "Icon":
      return generateIconHtml(node, pageName);
    case "RadioButtons":
      return generateRadioButtonHtml(node);
    case "Container":
      return generateContainerHtml(node, content, projectPath);
    case "Checkboxes":
      return generateCheckboxHtml(node);
    case "Slider":
      return generateSliderHtml(node);
    case "TextBox":
      return generateTextBoxHtml(node);
    case "Image":
      // console.log("Generating Image HTML with projectPath:", projectPath);
      return generateImageHtml(node, projectPath);
    case "Dropdown":
      return generateDropdownHtml(node);
    default:
      console.error(`Unknown component type: ${node.type.resolvedName}`);
  }
}

export function generateSingleComponentCss(
  node: Node,
  content: { [key: string]: Node },
  pageName: string,
  projectPath?: string
): string {
  if (!node || !node.type || !node.type.resolvedName) {
    console.error("Invalid node structure:", node);
    return "/* Error: Invalid component structure */";
  }

  let css = "";

  if (!processedNodes.has(node.custom.id)) {
    const componentId = getComponentId(node.type.resolvedName, pageName);
    node.custom = node.custom || {};
    node.custom.id = componentId;

    processedNodes.add(node.custom.id);

    css += generateComponentCssSwitch(node, content, projectPath);
  }

  // Process child nodes
  if (node.nodes) {
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode) {
        css += generateSingleComponentCss(childNode, content, projectPath);
      }
    }
  }

  return css;
}

function generateComponentCssSwitch(
  node: Node,
  content: { [key: string]: Node },
  pageName: string,
  projectPath?: string
): string {
  processedNodes.add(node.custom.id);

  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonCss(node, pageName);
    case "Input":
      return generateInputCss(node);
    case "Text":
      return generateTextCss(node);
    case "Label":
      return generateLabelCss(node, pageName);
    case "Icon":
      return generateIconCss(node, pageName);
    case "RadioButtons":
      return generateRadioButtonCss(node);
    case "Container":
      return generateContainerCss(node, pageName, content);
    case "Checkboxes":
      return generateCheckboxCss(node);
    case "Slider":
      return generateSliderCss(node);
    case "TextBox":
      return generateTextBoxCss(node);
    case "Image":
      return generateImageCss(node);
    case "Dropdown":
      return generateDropdownCss(node);
    default:
      return `/* Unknown component type: ${node.type.resolvedName} */\n`;
  }
}
