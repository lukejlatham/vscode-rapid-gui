import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateCheckboxHtml(node: Node): string {
  const props = node.props || {};
  const optionLabels = Array.isArray(props.optionLabels) ? props.optionLabels : [];
  const header = props.header || "Checkboxes";
  const direction = props.direction || "column";

  const options = optionLabels
    .map(
      (option, index) => `
      <div class="checkbox-option">
        <input type="checkbox" id="${generateCssClassName(
          node.custom.id
        )}-${index}" name="${header}" value="${option}">
        <label for="${generateCssClassName(node.custom.id)}-${index}">${option}</label>
      </div>
    `
    )
    .join("\n");

  return `
  <div class="checkbox-group-container ${generateCssClassName(node.custom.id)}">
    <label class="checkbox-group-label">${header}</label>
    <div class="checkbox-options ${direction}">
      ${options}
    </div>
  </div>
  `;
}

export function generateCheckboxCss(node: Node): string {
  const props = node.props;
  const fontColor = convertColor(props.fontColor || "#000000");
  const fontSize = props.fontSize || 16;
  const direction = props.direction || "column";

  return `
  .checkbox-group-container.${generateCssClassName(node.custom.id)} {
    display: flex;
    flex-direction: column;
  }
  
  .checkbox-group-container.${generateCssClassName(node.custom.id)} .checkbox-group-label {
    color: ${fontColor};
    font-size: ${fontSize}px;
    margin-bottom: 5px;
  }
  
  .checkbox-group-container.${generateCssClassName(node.custom.id)} .checkbox-options {
    display: flex;
    flex-direction: ${direction};
  }
  
  .checkbox-group-container.${generateCssClassName(node.custom.id)} .checkbox-option {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  
  .checkbox-group-container.${generateCssClassName(node.custom.id)} .checkbox-option label {
    color: ${fontColor};
    font-size: ${fontSize}px;
    margin-left: 5px;
  }
  `;
}
