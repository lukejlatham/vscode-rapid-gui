import { Node } from "../JSONParser";

export function generateButtonHtml(node: Node): string {
  const props = node.props;
  const iconHtml =
    props.icon !== "none"
      ? `<i class="icon ${props.icon === "left" ? "icon-left" : "icon-right"}"></i>`
      : "";

  const content = `${props.icon === "left" ? iconHtml : ""}${props.text}${
    props.icon === "right" ? iconHtml : ""
  }`;

  const button = `<button id="${node.custom.id}" class="custom-button ${node.custom.id}">
      ${content}
    </button>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="button-link">${button}</a>`;
  }

  return button;
}

export function generateButtonCss(node: Node): string {
  const props = node.props;
  return `
  .custom-button.${node.custom.id} {
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
  
  .custom-button.${node.custom.id} .icon {
    ${props.icon === "left" ? "margin-right: 5px;" : ""}
    ${props.icon === "right" ? "margin-left: 5px;" : ""}
  }
  
  .button-link {
    text-decoration: none;
  }
  `;
}
