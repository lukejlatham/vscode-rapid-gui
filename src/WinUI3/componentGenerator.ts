import { Node } from "./JsonParser";
import { generateButtonXaml } from "./components/buttonTranslator";
import { generateLabelXaml } from "./components/labelTranslator";
import { generateIconXaml } from "./components/iconTranslator";
import { generateInputXaml } from "./components/inputTranslator";
import { generateTextXaml } from "./components/paragraphTranslator";
import { generateRadioButtonXaml } from "./components/radioButtonTranslator";
import { generateContainerXaml } from "./components/containerTranslator";
import { generateCheckboxXaml } from "./components/checkboxTranslator";
import { generateSliderXaml } from "./components/sliderTranslator";
import { generateTextBoxXaml } from "./components/textBoxGenerator";
import { generateImageXaml } from "./components/imageTranslator";
import { Page } from "../../webview-ui/src/types";

export function generateComponentXaml(
  content: { [key: string]: Node },
  indent: string = "",
  projectPath?: string
): string {
  let xaml = "";
  for (const [id, node] of Object.entries(content)) {
    if (node.type.resolvedName !== "GridCell") {
      xaml += generateSingleComponentXaml(node, indent, projectPath);
    }
  }
  return xaml;
}

function generateSingleComponentXaml(node: Node, indent: string = "", projectPath: string): string {
  switch (node.type.resolvedName) {
    case "Button":
      return generateButtonXaml(node, indent);
    case "Input":
      return generateInputXaml(node, indent);
    case "Text":
      return generateTextXaml(node, indent);
    case "Label":
      return generateLabelXaml(node, indent);
    case "Icon":
      return generateIconXaml(node, indent);
    case "RadioButtons":
      return generateRadioButtonXaml(node, indent);
    case "Container":
      return generateContainerXaml({ [node.custom.id || ""]: node }, indent);
    case "Checkboxes":
      return generateCheckboxXaml(node, indent);
    case "Slider":
      return generateSliderXaml(node, indent);
    case "TextBox":
      return generateTextBoxXaml(node, indent);
    case "Image":
      return generateImageXaml(node, indent, projectPath);
    default:
      return `${indent}<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
  }
}
