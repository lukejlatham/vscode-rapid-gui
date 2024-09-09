import { Node } from "../JSONParser";
import { generateIconHtml, generateIconCss } from "./Icon";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateButtonHtml(node: Node): string {
  const props = node.props;
  console.log("Button props:", props);

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

  const button = `<button id="${generateCssClassName(
    node.custom.id
  )}" class="custom-button ${generateCssClassName(node.custom.id)}">
      ${content}
    </button>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="button-link">${button}</a>`;
  }

  return button;
}

export function generateButtonCss(node: Node): string {
  const props = node.props;

  interface SizeScale {
    min: number;
    max: number;
    factor: number;
  }

  const sizeScales: { [key: string]: SizeScale } = {
    button: { min: 32, max: 200, factor: 4 },
    icon: { min: 16, max: 64, factor: 2 },
    text: { min: 12, max: 72, factor: 1 },
    container: { min: 50, max: 800, factor: 8 },
    default: { min: 32, max: 300, factor: 5 },
  };

  function convertSize(
    size: number | string,
    elementType: string = "default",
    dimension: "width" | "height"
  ): string {
    if (typeof size === "string") {
      return size;
    }

    const scale = sizeScales[elementType] || sizeScales.default;

    if (size <= 1) {
      return `${size * 100}%`;
    } else if (size <= 100) {
      return `${size}%`;
    } else {
      const clampedSize = Math.min(Math.max(size, scale.min), scale.max);
      return `${clampedSize}px`;
    }
  }

  const width = convertSize(props.width || 100, "button", "width");
  const height = convertSize(props.height || 40, "button", "height");

  let buttonCss = `
  .custom-button.${generateCssClassName(node.custom.id)} {
    color: ${convertColor(props.fontColor)};
    background-color: ${convertColor(props.backgroundColor || "transparent")};
    font-size: ${props.fontSize}px;
    padding: ${height}px ${width}px;
    border-radius: ${props.borderRadius}%;
    border-color: ${convertColor(props.bordercolor || "transparent")};
    cursor: pointer;
    display: flex;
    text-align: center;
    gap: 5px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
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
