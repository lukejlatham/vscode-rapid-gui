import { Node } from "../JSONParser";

export function generateDropdownHtml(node: Node): string {
  const props = node.props;
  const options = props.options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("\n");

  return `
  <div class="dropdown-container ${node.custom.id}">
    <label for="${node.custom.id}">${props.label}</label>
    <select id="${node.custom.id}">
      ${options}
    </select>
  </div>
  `;
}

export function generateDropdownCss(node: Node): string {
  const props = node.props;
  return `
  .dropdown-container.${node.custom.id} {
    display: flex;
    flex-direction: column;
  }
  
  .dropdown-container.${node.custom.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .dropdown-container.${node.custom.id} select {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    background-color: ${props.backgroundColor};
    border: 1px solid ${props.borderColor};
    border-radius: ${props.borderRadius}px;
    padding: 5px;
  }
  `;
}
