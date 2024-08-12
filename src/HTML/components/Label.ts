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
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    display: block;
  }
  `;
}
