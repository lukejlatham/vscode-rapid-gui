import { ParsedJSON, Node } from "./JSONParser";
import { generateButtonHtml } from "./components/Button";
import { generateLabelHtml } from "./components/Label";
import { generateIconHtml } from "./components/Icon";
import { generateInputHtml } from "./components/Input";
import { generateTextHtml } from "./components/Text";
import { generateRadioButtonHtml } from "./components/RadioButton";
import { generateContainerHtml } from "./components/Container";
import { generateCheckboxHtml } from "./components/Checkbox";
import { generateSliderHtml } from "./components/Slider";
import { generateTextBoxHtml } from "./components/TextBox";
import { generateImageHtml } from "./components/Image";

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

function generateSingleComponentHtml(node: Node, indent: string = "", projectPath: string): string {
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
