import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateTextHtml(node: Node): string {
  const props = node.props;
  return `
  <p id="${generateCssClassName(node.custom.id)}" class="custom-text ${generateCssClassName(
    node.custom.id
  )}">
    ${props.text}
  </p>
  `;
}

export function generateTextCss(node: Node): string {
  const props = node.props;
  return `
  .custom-text.${generateCssClassName(node.custom.id)} {
    color: ${convertColor(props.fontColor)};
    font-size: ${props.fontSize}px;
    font-weight: ${props.bold ? "bold" : "normal"};
    text-align: ${props.textAlign};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
  }
  `;
}
