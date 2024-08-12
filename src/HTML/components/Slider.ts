// components/Slider.ts

interface SliderProps {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  label: string;
  fontColor: string;
  fontSize: number;
  sliderColor: string;
}

export function generateSliderHtml(props: SliderProps): string {
  return `
  <div class="slider-container ${props.id}">
    <label for="${props.id}">${props.label}</label>
    <input type="range" id="${props.id}" min="${props.min}" max="${props.max}" step="${props.step}" value="${props.value}">
    <output for="${props.id}">${props.value}</output>
  </div>
  `;
}

export function generateSliderCss(props: SliderProps): string {
  return `
  .slider-container.${props.id} {
    display: flex;
    flex-direction: column;
  }
  
  .slider-container.${props.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .slider-container.${props.id} input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: ${props.sliderColor};
    outline: none;
    margin: 10px 0;
  }
  
  .slider-container.${props.id} input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props.sliderColor};
    cursor: pointer;
  }
  
  .slider-container.${props.id} output {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-top: 5px;
  }
  `;
}
