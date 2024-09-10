import { Node } from "../JSONParser";
import { generateIconHtml, generateIconCss } from "./Icon";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateLabelHtml(node: Node): string {
  const props = node.props;
  let content = props.text;
  console.log("Label props:", props);

  if (props.vscIcon) {
    const iconHtml = generateIconHtml({ ...node, props: { ...props, iconSize: props.fontSize } });
    content = props.iconPosition === "left" ? `${iconHtml} ${content}` : `${content} ${iconHtml}`;
  }

  return `
  <label id="${generateCssClassName(node.custom.id)}" class="custom-label ${generateCssClassName(
    node.custom.id
  )}">
    ${content}
  </label>
  `;
}

export function generateLabelCss(node: Node): string {
  const props = node.props;

  let labelCss = `
  .custom-label.${generateCssClassName(node.custom.id)} {
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
  
  .custom-label.${generateCssClassName(node.custom.id)} .icon {
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
