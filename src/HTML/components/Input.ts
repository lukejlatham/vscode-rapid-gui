import { Node } from "../JSONParser";

export function generateInputHtml(node: Node): string {
  const props = node.props;
  return `
  <input id="${node.custom.id}" class="custom-input ${node.custom.id}" placeholder="${
    props.placeholder || ""
  }">
  `;
}

export function generateInputCss(node: Node): string {
  const props = node.props;
  return `
  .custom-input.${node.custom.id} {
    color: ${props.fontColor || "black"};
    font-size: ${props.fontSize || 16}px;
    background-color: ${props.backgroundColor || "white"};
    border: 1px solid ${props.borderColor || "black"};
    border-radius: ${props.borderRadius || 0}px;
  }
  `;
}
