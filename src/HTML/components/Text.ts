import { Node } from "../JSONParser";

export function generateTextHtml(node: Node): string {
  const props = node.props;
  return `
  <p id="${node.custom.id}" class="custom-text ${node.custom.id}">
    ${props.text}
  </p>
  `;
}

export function generateTextCss(node: Node): string {
  const props = node.props;
  return `
  .custom-text.${node.custom.id} {
    color: ${props.fontColor || "black"};
    font-size: ${props.fontSize || "16"}px;
    font-weight: ${props.fontWeight || "normal"};
    text-align: ${props.textAlign || "left"};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
  }
  `;
}
