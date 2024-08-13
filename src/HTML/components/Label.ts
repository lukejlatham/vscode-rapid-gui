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
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    font-weight: ${props.bold ? "bold" : "normal"};
    font-style: ${props.italic ? "italic" : "normal"};
    text-decoration: ${props.underline ? "underline" : "none"};
    text-align: ${props.textAlign};
    display: block;
  }
  `;
}
