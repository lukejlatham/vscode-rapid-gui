import { Node } from "../JSONParser";

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
        <input type="radio" id="${node.custom.id}-${index}" name="${header}" value="${option}">
        <label for="${node.custom.id}-${index}">${option}</label>
      </div>
    `
    )
    .join("\n");

  return `
  <div class="slider-container ${node.custom.id}">
    <label>${header}</label>
    <input type="range" id="${node.custom.id}" min="${min}" max="${max}" step="${step}">
    <output for="${node.custom.id}"></output>
  </div>
  `;
}

export function generateSliderCss(node: Node): string {
  const props = node.props;
  return `
  .slider-container.${node.custom.id} {
    display: flex;
    flex-direction: column;
  }
  
  .slider-container.${node.custom.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .slider-container.${node.custom.id} input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: ${props.backgroundColor};
    outline: none;
    margin: 10px 0;
  }
  
  .slider-container.${node.custom.id} input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props.backgroundColor};
    cursor: pointer;
  }
  
  .slider-container.${node.custom.id} output {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-top: 5px;
  }
  `;
}
