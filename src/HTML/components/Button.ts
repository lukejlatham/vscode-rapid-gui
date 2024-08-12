interface ButtonProps {
  id: string;
  text: string;
  fontColor: string;
  backgroundColor: string;
  fontSize: number;
  width: number;
  height: number;
  borderRadius: number;
  borderColor: string;
  icon?: "none" | "left" | "right";
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  hyperlink?: string;
}

export function generateButtonHtml(props: ButtonProps): string {
  const iconHtml =
    props.icon !== "none"
      ? `<i class="icon ${props.icon === "left" ? "icon-left" : "icon-right"}"></i>`
      : "";

  const content = `${props.icon === "left" ? iconHtml : ""}${props.text}${
    props.icon === "right" ? iconHtml : ""
  }`;

  const button = `<button id="${props.id}" class="custom-button ${props.id}">
      ${content}
    </button>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="button-link">${button}</a>`;
  }

  return button;
}

export function generateButtonCss(props: ButtonProps): string {
  return `
  .custom-button.${props.id} {
    color: ${props.fontColor};
    background-color: ${props.backgroundColor};
    font-size: ${props.fontSize}px;
    width: ${props.width}%;
    height: ${props.height}%;
    border-radius: ${props.borderRadius}px;
    border: 2px solid ${props.borderColor};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    ${
      props.shadowColor && props.shadowBlur
        ? `box-shadow: ${props.shadowOffsetX}px ${props.shadowOffsetY}px ${props.shadowBlur}px ${props.shadowColor};`
        : ""
    }
  }
  
  .custom-button.${props.id} .icon {
    ${props.icon === "left" ? "margin-right: 5px;" : ""}
    ${props.icon === "right" ? "margin-left: 5px;" : ""}
  }
  
  .button-link {
    text-decoration: none;
  }
  `;
}
