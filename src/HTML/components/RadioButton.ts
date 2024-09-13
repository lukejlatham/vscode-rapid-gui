import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateRadioButtonHtml(node: Node): string {
  const props = node.props || {};
  const optionLabels = Array.isArray(props.optionLabels) ? props.optionLabels : [];
  const header = props.header || "Radio Buttons";
  const direction = props.direction || "column";

  const options = optionLabels
    .map(
      (option, index) => `
      <div class="radio-option">
        <input type="radio" id="${generateCssClassName(
          node.custom.id
        )}-${index}" name="${header}" value="${option}">
        <label for="${generateCssClassName(node.custom.id)}-${index}">${option}</label>
      </div>
    `
    )
    .join("\n");

  return `
  <div class="radio-group-container ${generateCssClassName(node.custom.id)}">
    <label class="radio-group-label">${header}</label>
    <div class="radio-options ${direction}">
      ${options}
    </div>
  </div>
  `;
}

export function generateRadioButtonCss(node: Node): string {
  const props = node.props || {};
  const fontColor = convertColor(props.fontColor || "#000000");
  const fontSize = props.fontSize || 16;
  const direction = props.direction || "column";

  return `
  .radio-group-container.${generateCssClassName(node.custom.id)} {
    display: flex;
    flex-direction: column;
  }
  
  .radio-group-container.${generateCssClassName(node.custom.id)} .radio-group-label {
    color: ${fontColor};
    font-size: ${fontSize}px;
    margin-bottom: 5px;
  }
  
  .radio-group-container.${generateCssClassName(node.custom.id)} .radio-options {
    display: flex;
    flex-direction: ${direction};
  }
  
  .radio-group-container.${generateCssClassName(node.custom.id)} .radio-option {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  
  .radio-group-container.${generateCssClassName(node.custom.id)} .radio-option label {
    color: ${fontColor};
    font-size: ${fontSize}px;
    margin-left: 5px;
  }
  `;
}
