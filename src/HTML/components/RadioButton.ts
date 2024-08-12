// components/RadioButton.ts

interface RadioButtonProps {
  id: string;
  name: string;
  options: string[];
  label: string;
  fontColor: string;
  fontSize: number;
  direction: "row" | "column";
}

export function generateRadioButtonHtml(props: RadioButtonProps): string {
  const options = props.options
    .map(
      (option, index) => `
      <div class="radio-option">
        <input type="radio" id="${props.id}-${index}" name="${props.name}" value="${option}">
        <label for="${props.id}-${index}">${option}</label>
      </div>
    `
    )
    .join("\n");

  return `
  <div class="radio-group-container ${props.id}">
    <label class="radio-group-label">${props.label}</label>
    <div class="radio-options ${props.direction}">
      ${options}
    </div>
  </div>
  `;
}

export function generateRadioButtonCss(props: RadioButtonProps): string {
  return `
  .radio-group-container.${props.id} {
    display: flex;
    flex-direction: column;
  }
  
  .radio-group-container.${props.id} .radio-group-label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .radio-group-container.${props.id} .radio-options {
    display: flex;
    flex-direction: ${props.direction};
  }
  
  .radio-group-container.${props.id} .radio-option {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  
  .radio-group-container.${props.id} .radio-option label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-left: 5px;
  }
  `;
}
