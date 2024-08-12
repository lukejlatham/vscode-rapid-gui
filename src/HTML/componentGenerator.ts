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
import { generateBackgroundHtml, generateBackgroundCss } from "./components/Background";
import { generateGridCellHtml, generateGridCellCss } from "./components/GridCell";

export function generateComponentHtml(
  parsedJSON: ParsedJSON,
  pageName: string,
  projectPath?: string
): string {
  const page = parsedJSON.pages[pageName];
  let html = "";

  for (const node of Object.values(page.components)) {
    if (node.type.resolvedName !== "GridCell") {
      html += generateSingleComponentHtml(node, page.components, projectPath);
    }
  }
  return html;
}

export function generateComponentCss(parsedJSON: ParsedJSON, pageName: string): string {
  const page = parsedJSON.pages[pageName];
  let css = "";

  for (const node of Object.values(page.components)) {
    if (node.type.resolvedName !== "GridCell") {
      css += generateSingleComponentCss(node, page.components);
    }
  }
  return css;
}

function generateSingleComponentHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonHtml(node);
    case "Input":
      return generateInputHtml(node);
    case "Text":
      return generateTextHtml(node);
    case "Label":
      return generateLabelHtml(node);
    case "Icon":
      return generateIconHtml(node);
    case "RadioButton":
      return generateRadioButtonHtml(node);
    case "Container":
      return generateContainerHtml(node, content);
    case "Checkbox":
      return generateCheckboxHtml(node);
    case "Slider":
      return generateSliderHtml(node);
    case "TextBox":
      return generateTextBoxHtml(node);
    case "Image":
      return generateImageHtml(node, projectPath);
    case "Background":
      return generateBackgroundHtml(node, content, projectPath);
    case "GridCell":
      return generateGridCellHtml(node, content, projectPath);
    default:
      return `<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
  }
}

function generateSingleComponentCss(node: Node, content: { [key: string]: Node }): string {
  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonCss(node);
    case "Input":
      return generateInputCss(node);
    case "Text":
      return generateTextCss(node);
    case "Label":
      return generateLabelCss(node);
    case "Icon":
      return generateIconCss(node);
    case "RadioButton":
      return generateRadioButtonCss(node);
    case "Container":
      return generateContainerCss(node, content);
    case "Checkbox":
      return generateCheckboxCss(node);
    case "Slider":
      return generateSliderCss(node);
    case "TextBox":
      return generateTextBoxCss(node);
    case "Image":
      return generateImageCss(node);
    case "Background":
      return generateBackgroundCss(node, content);
    case "GridCell":
      return generateGridCellCss(node, content);
    default:
      return `/* Unknown component type: ${node.type.resolvedName} */\n`;
  }
}
