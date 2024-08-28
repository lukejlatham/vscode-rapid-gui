import { Node } from "../JSONParser";
import { generateIconHtml, generateIconCss } from "./Icon";
import { convertColor } from "../../utilities/colortranslator";

export function generateButtonHtml(node: Node): string {
  const props = node.props;

  let content = "";

  if (props.vscIcon && props.text) {
    // Button with icon and text
    const iconHtml = generateIconHtml({ ...node, props: { ...props, iconSize: props.fontSize } });
    content =
      props.iconPosition === "left" ? `${iconHtml}${props.text}` : `${props.text}${iconHtml}`;
  } else if (props.vscIcon) {
    // Button with only icon
    content = generateIconHtml({ ...node, props: { ...props, iconSize: props.fontSize } });
  } else {
    // Button with only text
    content = props.text || "";
  }

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

  // Helper function to convert width/height to appropriate units
  const convertSize = (size: number, type: "width" | "height") => {
    if (size <= 1) {
      return `${size * 100}%`;
    } else if (size <= 100) {
      return `${size}%`;
    } else {
      return `${size}px`;
    }
  };

  const width = convertSize(props.width, "width");
  const height = convertSize(props.height, "height");

  let buttonCss = `
  .custom-button.${node.custom.id} {
    color: ${convertColor(props.fontColor)};
    background-color: ${convertColor(props.backgroundColor)};
    font-size: ${props.fontSize}px;
    width: ${width};
    height: ${height};
    border-radius: ${props.borderRadius}%;
    border-color: ${convertColor(props.bordercolor || "transparent")};
    cursor: pointer;
    display: flex;
    text-align: center;
    gap: 5px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 10px;
    ${convertColor(
      props.shadowColor && props.shadowBlur
        ? `box-shadow: ${props.shadowOffsetX}px ${props.shadowOffsetY}px ${props.shadowBlur}px ${props.shadowColor};`
        : ""
    )}
  }
  
  .button-link {
    text-decoration: none;
  }
  `;

  // If the button has an icon, include the icon CSS
  if (props.vscIcon) {
    buttonCss += generateIconCss({ ...node, props: { ...props, iconSize: props.fontSize } });
  }

  return buttonCss;
}
