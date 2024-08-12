import { Node } from "../JSONParser";

export function generateCheckboxHtml(node: Node): string {
  const props = node.props;
  return `
  <div class="checkbox-container ${node.custom.id}">
    <input type="checkbox" id="${node.custom.id}" ${props.checked ? "checked" : ""}>
    <label for="${node.custom.id}">${props.label}</label>
  </div>
  `;
}

export function generateCheckboxCss(node: Node): string {
  const props = node.props;
  return `
  .checkbox-container.${node.custom.id} {
    display: flex;
    align-items: center;
  }
  
  .checkbox-container.${node.custom.id} input[type="checkbox"] {
    margin-right: 5px;
  }
  
  .checkbox-container.${node.custom.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    cursor: pointer;
  }
  `;
}
