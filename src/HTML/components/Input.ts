// components/Input.ts

interface InputProps {
  id: string;
  type: "text" | "password" | "email" | "number";
  label: string;
  placeholder: string;
  fontColor: string;
  fontSize: number;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
}

export function generateInputHtml(props: InputProps): string {
  return `
  <div class="input-container ${props.id}">
    <label for="${props.id}">${props.label}</label>
    <input type="${props.type}" id="${props.id}" placeholder="${props.placeholder}">
  </div>
  `;
}

export function generateInputCss(props: InputProps): string {
  return `
  .input-container.${props.id} {
    display: flex;
    flex-direction: column;
  }
  
  .input-container.${props.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .input-container.${props.id} input {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    background-color: ${props.backgroundColor};
    border: 1px solid ${props.borderColor};
    border-radius: ${props.borderRadius}px;
    padding: 5px;
  }
  `;
}
