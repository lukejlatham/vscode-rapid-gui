import { Node } from "../JSONParser";

export function generateLabelHtml(node: Node): string {
  const props = node.props;
  return `
  <label id="${node.custom.id}" class="custom-label ${node.custom.id}">
    ${props.text}
  </label>
  `;
}
// the issue is that generateLabelCss is somehow being called twice for each label, so then the css is applied incorrectly
export function generateLabelCss(node: Node): string {
  const props = node.props;
  console.log("Label PROPS: ", props);
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
