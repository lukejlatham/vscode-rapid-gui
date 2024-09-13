import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateSliderHtml(node: Node): string {
  const props = node.props || {};
  const optionLabels = Array.isArray(props.optionLabels) ? props.optionLabels : [];
  const header = props.header || "Slider";
  const min = props.min || 1;
  const max = props.max || 100;
  const step = props.step || 1;

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
  <div class="slider-container ${generateCssClassName(node.custom.id)}">
    <label>${header}</label>
    <input type="range" id="${generateCssClassName(
      node.custom.id
    )}" min="${min}" max="${max}" step="${step}">
    <output for="${generateCssClassName(node.custom.id)}"></output>
  </div>
  `;
}

export function generateSliderCss(node: Node): string {
  const props = node.props;
  const backgroundColor = convertColor(props.backgroundColor || "#FFEDD5");
  const trackColor = convertColor(props.backgroundColor || "#FFD700");

  return `
  .slider-container.${generateCssClassName(node.custom.id)} {
    display: flex;
    flex-direction: column;
  }
  
  .slider-container.${generateCssClassName(node.custom.id)} label {
    color: ${convertColor(props.fontColor)};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .slider-container.${generateCssClassName(node.custom.id)} input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: ${trackColor}; /* Color of the unfilled track */
    outline: none;
    margin: 10px 0;
    accent-color: ${backgroundColor}; /* Color of the filled portion */
  }
  
  .slider-container.${generateCssClassName(
    node.custom.id
  )} input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} var(--value), ${trackColor} var(--value), ${trackColor} 100%);
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .slider-container.${generateCssClassName(
    node.custom.id
  )} input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${backgroundColor}; /* Thumb color */
    cursor: pointer;
    margin-top: -6px; /* Align thumb with track */
  }
  
  .slider-container.${generateCssClassName(node.custom.id)} input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${backgroundColor}; /* Thumb color */
    cursor: pointer;
  }
  
  .slider-container.${generateCssClassName(node.custom.id)} input[type="range"]::-ms-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${backgroundColor}; /* Thumb color */
    cursor: pointer;
  }
  
  .slider-container.${generateCssClassName(node.custom.id)} output {
    color: ${convertColor(props.fontColor)};
    font-size: ${props.fontSize}px;
    margin-top: 5px;
  }
  `;
}
