import { Node } from "../JSONParser";

export function generateInputHtml(node: Node): string {
  const props = node.props;
  return `
  <div class="input-container ${node.custom.id}">
    <label for="${node.custom.id}">${props.label}</label>
    <input type="${props.type}" id="${node.custom.id}" placeholder="${props.placeholder}">
  </div>
  `;
}

export function generateInputCss(node: Node): string {
  const props = node.props;
  return `
  .input-container.${node.custom.id} {
    display: flex;
    flex-direction: column;
  }
  
  .input-container.${node.custom.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .input-container.${node.custom.id} input {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    background-color: ${props.backgroundColor};
    border: 1px solid ${props.borderColor};
    border-radius: ${props.borderRadius}px;
    padding: 5px;
  }
  `;
}
