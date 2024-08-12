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

export function generateComponentHtml(
  parsedJSON: ParsedJSON,
  pageName: string,
  indent: string = "",
  projectPath?: string
): string {
  const page = parsedJSON.pages[pageName];
  let html = "";

  for (const [id, node] of Object.entries(page.components)) {
    if (node.type.resolvedName !== "GridCell") {
      html += generateSingleComponentHtml(node, indent, projectPath);
    }
  }
  return html;
}

export function generateComponentCss(
  parsedJSON: ParsedJSON,
  pageName: string,
  indent: string = ""
): string {
  const page = parsedJSON.pages[pageName];
  let css = "";

  for (const [id, node] of Object.entries(page.components)) {
    if (node.type.resolvedName !== "GridCell") {
      css += generateSingleComponentCss(node, indent);
    }
  }
  return css;
}

function generateSingleComponentHtml(
  node: Node,
  indent: string = "",
  projectPath?: string
): string {
  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonHtml(node, indent);
    case "Input":
      return generateInputHtml(node, indent);
    case "Text":
      return generateTextHtml(node, indent);
    case "Label":
      return generateLabelHtml(node, indent);
    case "Icon":
      return generateIconHtml(node, indent);
    case "RadioButton":
      return generateRadioButtonHtml(node, indent);
    case "Container":
      return generateContainerHtml({ [node.custom.id || ""]: node }, indent);
    case "Checkbox":
      return generateCheckboxHtml(node, indent);
    case "Slider":
      return generateSliderHtml(node, indent);
    case "TextBox":
      return generateTextBoxHtml(node, indent);
    case "Image":
      return generateImageHtml(node, indent, projectPath);
    default:
      return `${indent}<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
  }
}

function generateSingleComponentCss(node: Node, indent: string = ""): string {
  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonCss(node, indent);
    case "Input":
      return generateInputCss(node, indent);
    case "Text":
      return generateTextCss(node, indent);
    case "Label":
      return generateLabelCss(node, indent);
    case "Icon":
      return generateIconCss(node, indent);
    case "RadioButton":
      return generateRadioButtonCss(node, indent);
    case "Container":
      return generateContainerCss({ [node.custom.id || ""]: node }, indent);
    case "Checkbox":
      return generateCheckboxCss(node, indent);
    case "Slider":
      return generateSliderCss(node, indent);
    case "TextBox":
      return generateTextBoxCss(node, indent);
    case "Image":
      return generateImageCss(node, indent);
    default:
      return `${indent}/* Unknown component type: ${node.type.resolvedName} */\n`;
  }
}
