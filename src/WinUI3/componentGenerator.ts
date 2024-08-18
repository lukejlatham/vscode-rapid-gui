import { Node, PageStructure } from "./JsonParser";
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

export async function generateComponentXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = ""
): Promise<string> {
  let xaml = await generateSingleComponentXaml(node, content, indent);

  if (node.nodes) {
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode) {
        xaml += await generateComponentXaml(childNode, content, indent);
      }
    }
  }

  return xaml;
}

export async function generateSingleComponentXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = "",
  projectPath?: string
): Promise<string> {
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
      return generateContainerXaml(node, content, indent);
    case "Checkboxes":
      return generateCheckboxXaml(node, indent);
    case "Slider":
      return generateSliderXaml(node, indent);
    case "TextBox":
      return generateTextBoxXaml(node, indent);
    case "Image":
      return await generateImageXaml(node, indent, projectPath);
    default:
      return `${indent}<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
  }
}
