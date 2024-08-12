import { Node } from "../JSONParser";

export function generateSliderHtml(node: Node): string {
  const props = node.props;
  return `
  <div class="slider-container ${node.custom.id}">
    <label for="${node.custom.id}">${props.label}</label>
    <input type="range" id="${node.custom.id}" min="${props.min}" max="${props.max}" step="${props.step}" value="${props.value}">
    <output for="${node.custom.id}">${props.value}</output>
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
    background: ${props.sliderColor};
    outline: none;
    margin: 10px 0;
  }
  
  .slider-container.${node.custom.id} input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props.sliderColor};
    cursor: pointer;
  }
  
  .slider-container.${node.custom.id} output {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-top: 5px;
  }
  `;
}
