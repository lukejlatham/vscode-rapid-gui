// components/TextBox.ts

interface TextBoxProps {
  id: string;
  label: string;
  placeholder: string;
  fontColor: string;
  fontSize: number;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  width: number;
  height: number;
}

export function generateTextBoxHtml(props: TextBoxProps): string {
  return `
  <div class="textbox-container ${props.id}">
    <label for="${props.id}">${props.label}</label>
    <textarea id="${props.id}" placeholder="${props.placeholder}"></textarea>
  </div>
  `;
}

export function generateTextBoxCss(props: TextBoxProps): string {
  return `
  .textbox-container.${props.id} {
    display: flex;
    flex-direction: column;
  }
  
  .textbox-container.${props.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .textbox-container.${props.id} textarea {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    background-color: ${props.backgroundColor};
    border: 1px solid ${props.borderColor};
    border-radius: ${props.borderRadius}px;
    width: ${props.width}px;
    height: ${props.height}px;
    padding: 5px;
    resize: vertical;
  }
  `;
}
