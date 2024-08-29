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
import { generateDropdownXaml } from "./components/dropdownTranslator";

export async function generateComponentXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = "",
  processedNodes: Set<string>,
  projectPath: string
): Promise<string> {
  const nodeId = node.custom.id || Object.keys(content).find((key) => content[key] === node) || "";
  if (processedNodes.has(nodeId)) {
    return "";
  }
  processedNodes.add(nodeId);

  let xaml = await generateSingleComponentXaml(node, content, indent, processedNodes, projectPath);
  if (node.nodes) {
    for (const childId of node.nodes) {
      const childNode = content[childId];
      if (childNode && !processedNodes.has(childNode.custom.id || "")) {
        xaml += await generateComponentXaml(
          childNode,
          content,
          indent + "  ",
          processedNodes,
          projectPath
        );
      }
    }
  }

  if (node.linkedNodes) {
    for (const [key, linkedNodeId] of Object.entries(node.linkedNodes)) {
      const linkedNode = content[linkedNodeId];
      if (linkedNode && !processedNodes.has(linkedNode.custom.id || "")) {
        xaml += await generateComponentXaml(
          linkedNode,
          content,
          indent + "  ",
          processedNodes,
          projectPath
        );
      }
    }
  }

  return xaml;
}

export async function generateSingleComponentXaml(
  node: Node,
  content: { [key: string]: Node },
  indent: string = "",
  processedNodes: Set<string> = new Set(),
  projectPath: string
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
      return generateContainerXaml(node, content, indent, processedNodes);
    case "Checkboxes":
      return generateCheckboxXaml(node, indent);
    case "Slider":
      return generateSliderXaml(node, indent);
    case "TextBox":
      return generateTextBoxXaml(node, indent);
    case "Image":
      return await generateImageXaml(node, indent, projectPath);
    case "Dropdown":
      return generateDropdownXaml(node, indent);
    default:
      console.log(`Unknown component type encountered: ${node.type.resolvedName}`);
      return "";
  }
}
