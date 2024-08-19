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
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    font-weight: ${props.bold ? "bold" : "normal"};
    text-align: ${props.textAlign};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
  }
  `;
}
