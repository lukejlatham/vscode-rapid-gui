import { Node } from "../JSONParser";

export function generateRadioButtonHtml(node: Node): string {
  const props = node.props;
  const options = props.options
    .map(
      (option, index) => `
      <div class="radio-option">
        <input type="radio" id="${node.custom.id}-${index}" name="${props.name}" value="${option}">
        <label for="${node.custom.id}-${index}">${option}</label>
      </div>
    `
    )
    .join("\n");

  return `
  <div class="radio-group-container ${node.custom.id}">
    <label class="radio-group-label">${props.label}</label>
    <div class="radio-options ${props.direction}">
      ${options}
    </div>
  </div>
  `;
}

export function generateRadioButtonCss(node: Node): string {
  const props = node.props;
  return `
  .radio-group-container.${node.custom.id} {
    display: flex;
    flex-direction: column;
  }
  
  .radio-group-container.${node.custom.id} .radio-group-label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .radio-group-container.${node.custom.id} .radio-options {
    display: flex;
    flex-direction: ${props.direction};
  }
  
  .radio-group-container.${node.custom.id} .radio-option {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  
  .radio-group-container.${node.custom.id} .radio-option label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-left: 5px;
  }
  `;
}
