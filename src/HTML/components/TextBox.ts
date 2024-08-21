import { Node } from "../JSONParser";

export function generateTextBoxHtml(node: Node): string {
  const props = node.props || {};
  const label = props.label || "";
  const placeholder = props.placeholder || "Enter text here...";
  return `
  <div class="textbox-container ${node.custom.id}">
    <label for="${node.custom.id}">${label}</label>
    <textarea id="${node.custom.id}" placeholder="${placeholder}"></textarea>
  </div>
  `;
}

export function generateTextBoxCss(node: Node): string {
  const props = node.props;
  return `
  .textbox-container.${node.custom.id} {
    display: flex;
    flex-direction: column;
  }
  
  .textbox-container.${node.custom.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .textbox-container.${node.custom.id} textarea {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    background-color: ${props.backgroundColor};
    border: 1px solid ${props.borderColor};
    border-radius: ${props.borderRadius}px;
    width: ${props.width}px;
    height: ${props.height}px;
    padding: 5px;
    resize: vertical;
  }
  `;
}
