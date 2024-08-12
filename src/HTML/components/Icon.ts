import { Node } from "../JSONParser";

export function generateIconHtml(node: Node): string {
  const props = node.props;
  const iconHtml = `<i id="${node.custom.id}" class="icon ${props.iconName}"></i>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(node: Node): string {
  const props = node.props;
  return `
  .icon.${props.iconName} {
    color: ${props.color};
    font-size: ${props.size}px;
  }
  
  .icon-link {
    text-decoration: none;
  }
  `;
}
