import { Node } from "../JSONParser";
import { generateIconHtml, generateIconCss } from "./Icon";
import { convertColor } from "../../utilities/colortranslator";
import { getComponentId } from "../componentGenerator";

export function generateLabelHtml(node: Node, pageName: string): string {
  const props = node.props;
  let content = props.text;
  console.log("Label props:", props);

  if (props.vscIcon) {
    const iconHtml = generateIconHtml(
      { ...node, props: { ...props, iconSize: props.fontSize } },
      pageName
    );
    content = props.iconPosition === "left" ? `${iconHtml} ${content}` : `${content} ${iconHtml}`;
  }

  const labelId = getComponentId("label", pageName);
  node.custom.id = labelId;

  return `
  <label id="${labelId}" class="custom-label ${labelId}">
    ${content}
  </label>
  `;
}

const processedLabels = new Set();

export function generateLabelCss(node: Node, pageName: string): string {
  const props = node.props;
  const labelId = node.custom.id;

  // Check if this label has already been processed
  if (processedLabels.has(node.custom.id)) {
    return ""; // Return empty string if already processed
  }

  // Mark this label as processed
  processedLabels.add(node.custom.id);

  let labelCss = `
  .custom-label.${labelId} {
    color: ${convertColor(props.fontColor || "black")};
    font-size: ${props.fontSize || 16}px;
    text-align: ${props.textAlign};
    display: inline-flex;
    align-items: center;
    font-weight: ${props.bold ? "bold" : "normal"};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
    ${props.iconPosition === "left" ? "flex-direction: row;" : "flex-direction: row-reverse;"}
  }
  
  .custom-label.${labelId} .icon {
    margin: ${props.iconPosition === "left" ? "0 5px 0 0" : "0 0 0 5px"};
  }
  `;

  console.log("Label:", convertColor(props.fontColor), convertColor(props.backgroundColor));

  if (props.vscIcon) {
    labelCss += generateIconCss(
      { ...node, props: { ...props, iconSize: props.fontSize } },
      pageName
    );
  }

  return labelCss;
}
