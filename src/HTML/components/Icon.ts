import { Node } from "../JSONParser";

export function generateIconHtml(node: Node): string {
  const props = node.props || {};
  const iconName = props.selectedIcon || "vsc-primitive-square";
  const iconSize = props.iconSize || 24;
  const iconColor = props.iconColor || "#000000";
  const hyperlink = props.hyperlink || "";

  const iconSvg = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="${iconColor}">
    <use href="#${iconName}" />
  </svg>`;

  const iconHtml = `
    <span id="${node.custom.id}" class="icon ${node.custom.id}">
      ${iconSvg}
    </span>
  `;

  if (hyperlink) {
    return `<a href="${hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(node: Node): string {
  const props = node.props || {};
  const iconSize = props.iconSize || 24;
  const iconColor = props.iconColor || "#000000";

  return `
  .icon.${node.custom.id} {
    display: inline-block;
    vertical-align: middle;
    width: ${iconSize}px;
    height: ${iconSize}px;
    color: ${iconColor};
  }

  .icon.${node.custom.id} svg {
    width: 100%;
    height: 100%;
  }
    
  .icon-link {
    text-decoration: none;
  }
  `;
}

// SVG definitions for VSC icons
export const iconSprite = `
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="vsc-primitive-square" viewBox="0 0 16 16">
    <path d="M3.5 3.5v9h9v-9h-9zM12 12H4V4h8v8z" />
  </symbol>
  <!-- Add other icon symbols here -->
</svg>
`;
