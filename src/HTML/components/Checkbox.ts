// Checkbox

interface CheckboxProps {
  id: string;
  label: string;
  fontColor: string;
  fontSize: number;
  checked?: boolean;
}

export function generateCheckboxHtml(props: CheckboxProps): string {
  return `
  <div class="checkbox-container ${props.id}">
    <input type="checkbox" id="${props.id}" ${props.checked ? "checked" : ""}>
    <label for="${props.id}">${props.label}</label>
  </div>
  `;
}

export function generateCheckboxCss(props: CheckboxProps): string {
  return `
  .checkbox-container.${props.id} {
    display: flex;
    align-items: center;
  }
  
  .checkbox-container.${props.id} input[type="checkbox"] {
    margin-right: 5px;
  }
  
  .checkbox-container.${props.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    cursor: pointer;
  }
  `;
}
