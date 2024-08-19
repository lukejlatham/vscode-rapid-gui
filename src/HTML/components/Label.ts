import { Node } from "../JSONParser";

export function generateLabelHtml(node: Node): string {
  const props = node.props;
  return `
  <label id="${node.custom.id}" class="custom-label ${node.custom.id}">
    ${props.text}
  </label>
  `;
}

export function generateLabelCss(node: Node): string {
  const props = node.props;
  return `
  .custom-label.${node.custom.id} {
    color: ${props.fontColor || "black"};
    font-size: ${props.fontSize || 16}px;
    text-align: ${props.textAlign};
    display: block;
    font-weight: ${props.bold ? "bold" : "normal"};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
  }
  `;
}
