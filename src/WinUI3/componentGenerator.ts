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
import { SerializedNodes } from "@craftjs/core";

export function generateComponentXaml(content: SerializedNodes, indent: string = ""): string {
  let xaml = "";
  for (const [id, node] of Object.entries(content)) {
    if (id !== "ROOT") {
      xaml += generateSingleComponentXaml(node, indent);
    }
  }
  return xaml;
}
function generateSingleComponentXaml(node: any, indent: string = ""): string {
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
    case "RadioButton":
      return generateRadioButtonXaml(node, indent);
    case "Container":
      return generateContainerXaml(node, indent);
    case "Checkbox":
      return generateCheckboxXaml(node, indent);
    case "Slider":
      return generateSliderXaml(node, indent);
    case "TextBox":
      return generateTextBoxXaml(node, indent);
    case "Image":
      return generateImageXaml(node, indent);
    default:
      return `${indent}<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
  }
}
