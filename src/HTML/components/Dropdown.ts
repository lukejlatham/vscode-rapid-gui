import { Node } from "../JSONParser";

export function generateDropdownHtml(node: Node): string {
  const props = node.props;
  const options = props.optionLabels
    .map((option: any) => `<option value="${option}">${option}</option>`)
    .join("\n");

  return `
  <div class="dropdown-container ${node.custom.id}">
    <label for="${node.custom.id}">${props.header}</label>
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
    background-color: white;
    border: 1px solid ${props.fontColor};
    border-radius: 4px;
    padding: 5px;
  }
  `;
}
