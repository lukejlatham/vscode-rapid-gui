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
    font-weight: ${props.fontWeight || "normal"};
    text-align: ${props.textAlign || "left"};
    display: block;
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
    margin: ${props.margin || "0"};
    padding: ${props.padding || "0"};
  }
  `;
}
