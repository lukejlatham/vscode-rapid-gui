// components/Dropdown.ts

interface DropdownProps {
  id: string;
  options: string[];
  label: string;
  fontColor: string;
  fontSize: number;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
}

export function generateDropdownHtml(props: DropdownProps): string {
  const options = props.options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("\n");

  return `
  <div class="dropdown-container ${props.id}">
    <label for="${props.id}">${props.label}</label>
    <select id="${props.id}">
      ${options}
    </select>
  </div>
  `;
}

export function generateDropdownCss(props: DropdownProps): string {
  return `
  .dropdown-container.${props.id} {
    display: flex;
    flex-direction: column;
  }
  
  .dropdown-container.${props.id} label {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .dropdown-container.${props.id} select {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    background-color: ${props.backgroundColor};
    border: 1px solid ${props.borderColor};
    border-radius: ${props.borderRadius}px;
    padding: 5px;
  }
  `;
}
