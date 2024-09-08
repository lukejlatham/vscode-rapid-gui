import { Node } from "../JSONParser";
import { generateIconHtml, generateIconCss } from "./Icon";
import { convertColor } from "../../utilities/colortranslator";

export function generateLabelHtml(node: Node): string {
  const props = node.props;
  let content = props.text;
  console.log("Label props:", props);

  if (props.vscIcon) {
    const iconHtml = generateIconHtml({ ...node, props: { ...props, iconSize: props.fontSize } });
    content = props.iconPosition === "left" ? `${iconHtml} ${content}` : `${content} ${iconHtml}`;
  }

  return `
  <label id="${node.custom.id}" class="custom-label ${node.custom.id}">
    ${content}
  </label>
  `;
}

const processedLabels = new Set();

export function generateLabelCss(node: Node): string {
  const props = node.props;

  // Check if this label has already been processed
  if (processedLabels.has(node.custom.id)) {
    return ""; // Return empty string if already processed
  }

  // Mark this label as processed
  processedLabels.add(node.custom.id);

  let labelCss = `
  .custom-label.${node.custom.id} {
    color: ${convertColor(props.fontColor || "black")};
    font-size: ${props.fontSize || 16}px;
    text-align: ${props.textAlign};
    display: inline-flex;
    align-items: center;
    font-family: ${props.fontFamily || "Arial"};
    font-weight: ${props.bold ? "bold" : "normal"};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
    ${props.iconPosition === "left" ? "flex-direction: row;" : "flex-direction: row-reverse;"}
  }
  
  .custom-label.${node.custom.id} .icon {
    margin: ${props.iconPosition === "left" ? "0 5px 0 0" : "0 0 0 5px"};
  }
  `;

  console.log("Label:", convertColor(props.fontColor), convertColor(props.backgroundColor));

  // If the label has an icon, include the icon CSS
  if (props.vscIcon) {
    labelCss += generateIconCss({ ...node, props: { ...props, iconSize: props.fontSize } });
  }

  return labelCss;
}
