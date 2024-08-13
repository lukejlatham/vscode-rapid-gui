import { Node } from "../JSONParser";

let buttonCounter = 0;

export function generateButtonHtml(node: Node, indent: string = ""): string {
  const props = node.props;
  buttonCounter++;
  const buttonId = `button${buttonCounter}`;

  const iconHtml =
    props.icon !== "none"
      ? `<i class="icon ${props.icon === "left" ? "icon-left" : "icon-right"}"></i>`
      : "";

  const content = `${props.icon === "left" ? iconHtml : ""}${props.text}${
    props.icon === "right" ? iconHtml : ""
  }`;

  const button = `<button id="${buttonId}" class="custom-button ${buttonId}">
      ${content}
    </button>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="button-link">${button}</a>`;
  }

  return button;
}

export function generateButtonCss(node: Node): string {
  const props = node.props;
  buttonCounter++;
  const buttonId = `button${buttonCounter}`;

  return `
  .custom-button.${buttonId} {
    color: ${props.fontColor};
    background-color: ${props.backgroundColor};
    font-size: ${props.fontSize}px;
    width: ${props.width}px;
    height: ${props.height}px;
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
  
  .custom-button.${buttonId} .icon {
    ${props.icon === "left" ? "margin-right: 5px;" : ""}
    ${props.icon === "right" ? "margin-left: 5px;" : ""}
  }
  
  .button-link {
    text-decoration: none;
  }
  `;
}
