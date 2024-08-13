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

// SVG definitions for VSC icons add more
export const iconSprite = `
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="vsc-primitive-square" viewBox="0 0 16 16">
    <path d="M3.5 3.5v9h9v-9h-9zM12 12H4V4h8v8z" />
  </symbol>

  <symbol id="vsc-chevron-right" viewBox="0 0 16 16">
    <path d="M6 3l6 5-6 5V3z" />
  </symbol>

  <symbol id="vsc-chevron-down" viewBox="0 0 16 16">
    <path d="M12 6l-5 6-5-6h10z" />
  </symbol>

  <symbol id="vsc-check" viewBox="0 0 16 16">
    <path d="M6.667 11.333L3.333 8l1.06-1.06L6.667 9.213l5.94-5.94 1.06 1.06z" />
  </symbol>

  <symbol id="vsc-close" viewBox="0 0 16 16">
    <path d="M12 4.6L11.4 4 8 7.4 4.6 4 4 4.6 7.4 8 4 11.4l.6.6L8 8.6l3.4 3.4.6-.6L8.6 8z" />
  </symbol>

  <symbol id="vsc-settings-gear" viewBox="0 0 16 16">
    <path d="M9.5 4.5h1v1h-1v-1zm-1-1h1v1h-1v-1zm1 7h-1v1h1v-1zm-1-1h-1v1h1v-1zm2.4 2.1L10.5 11H7.5l-.4 1.6 1.4.9.5-.4.5.4 1.4-.9zM6 12h4v1H6v-1zm6-1.2L10.5 11h-5l-.5.8-1.4-.9.4-1.6h6.4l.4 1.6 1.4.9zM6 11v-1h4v1H6zm4-1H6v-4h4v4z" />
  </symbol>

  <symbol id="vsc-arrow-right" viewBox="0 0 16 16">
    <path d="M10.5 7.5H5.5v1h5l-2.5 2.5L9 11l4-4-4-4-1 1 2.5 2.5z" />
  </symbol>

  <symbol id="vsc-arrow-left" viewBox="0 0 16 16">
    <path d="M5.5 7.5h5v1h-5l2.5 2.5L7 11l-4-4 4-4 1 1-2.5 2.5z" />
  </symbol>

  <symbol id="vsc-trash" viewBox="0 0 16 16">
    <path d="M6 6v5h1V6H6zm3 0v5h1V6H9zm1-3H6l-.5.5H4v1h8v-1h-1.5L9 3zM4 13v-7H3v7c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-7h-1v7H4z" />
  </symbol>

  <symbol id="vsc-circle-filled" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="6" />
  </symbol>

  <symbol id="vsc-file" viewBox="0 0 16 16">
    <path d="M4 2h5l3 3v9H4V2zm5 0v3h3H9zm-1 3V3h-3v10h7V5H9z" />
  </symbol>

  <symbol id="vsc-folder" viewBox="0 0 16 16">
    <path d="M7 4L6 3H3v10h10V4H7zm6 8H3V4h3l1 1h6v7z" />
  </symbol>

  <symbol id="vsc-search" viewBox="0 0 16 16">
    <path d="M6.5 11c-2.485 0-4.5-2.015-4.5-4.5S4.015 2 6.5 2s4.5 2.015 4.5 4.5S8.985 11 6.5 11zM6.5 3c-1.933 0-3.5 1.567-3.5 3.5S4.567 10 6.5 10s3.5-1.567 3.5-3.5S8.433 3 6.5 3z" />
    <path d="M12 12l-3-3" />
  </symbol>

  <symbol id="vsc-star-full" viewBox="0 0 16 16">
    <path d="M8 11.328l-3.314 2.018.995-4.21L2.74 5.954l4.264-.35L8 2l.996 3.604 4.264.35-2.94 3.182.995 4.21z" />
  </symbol>

  <symbol id="vsc-warning" viewBox="0 0 16 16">
    <path d="M8.5 11h-1v-1h1v1zm0-2h-1V5h1v4zM7.07 2.93L0.5 13.5h13L7.07 2.93zM7 3.846L12.733 13H1.267L7 3.846z" />
  </symbol>

  <symbol id="vsc-folder-opened" viewBox="0 0 16 16">
    <path d="M7 4L6 3H3v1h10V4H7zm6 1H3v2h10V5z" />
    <path d="M3 8v5h10V8H3z" />
  </symbol>

</svg>
`;
