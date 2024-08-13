import { Node } from "../JSONParser";

export function generateIconHtml(node: Node): string {
  const props = node.props;
  const iconHtml = `<i id="${node.custom.id}" class="icon ${props.iconName} ${node.custom.id}"></i>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(node: Node): string {
  const props = node.props;
  return `
  .icon.${node.custom.id} {
    color: ${props.color || "inherit"};
    font-size: ${props.size || 16}px;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }
  
  .icon-link {
    text-decoration: none;
    color: inherit;
  }
  `;
}

export const iconPaths: { [key: string]: string } = {
  home: '<path d="M8.5 1.5L3.5 6.5V14.5H6.5V9.5H10.5V14.5H13.5V6.5L8.5 1.5Z" />',
  gear: '<path d="M9.1 4.4L8.6 2H7.4L6.9 4.4L6.2 4.6L4.2 3.2L3.3 4.1L4.7 6.1L4.5 6.9L2 7.4V8.6L4.4 9.1L4.6 9.8L3.2 11.8L4.1 12.7L6.1 11.3L6.9 11.5L7.4 14H8.6L9.1 11.6L9.8 11.4L11.8 12.8L12.7 11.9L11.3 9.9L11.5 9.1L14 8.6V7.4L11.6 6.9L11.4 6.2L12.8 4.2L11.9 3.3L9.9 4.7L9.1 4.5V4.4Z M8 10.5C6.6 10.5 5.5 9.4 5.5 8C5.5 6.6 6.6 5.5 8 5.5C9.4 5.5 10.5 6.6 10.5 8C10.5 9.4 9.4 10.5 8 10.5Z" />',
  bell: '<path d="M8 1.5C6.8 1.5 5.8 2.5 5.8 3.7V4.8C4.6 5.9 3.8 7.4 3.8 9.1V11.1L2.5 13.7H13.5L12.2 11.1V9.1C12.2 7.4 11.4 5.9 10.2 4.8V3.7C10.2 2.5 9.2 1.5 8 1.5ZM8 15.5C9.1 15.5 10 14.6 10 13.5H6C6 14.6 6.9 15.5 8 15.5Z" />',
  account:
    '<path d="M8 2C6.3 2 5 3.3 5 5C5 6.7 6.3 8 8 8C9.7 8 11 6.7 11 5C11 3.3 9.7 2 8 2ZM3 13.5C3 11 5.2 9 8 9C10.8 9 13 11 13 13.5V14H3V13.5Z" />',
  vscode:
    '<path d="M2.5 2L9.5 9L2.5 16L3.5 17L11.5 9L3.5 1L2.5 2Z M5.5 4L10.5 9L5.5 14L6.5 15L12.5 9L6.5 3L5.5 4Z" />',
  mail: '<path d="M1.5 3.5V12.5H14.5V3.5H1.5ZM13.5 4.5L8 8.5L2.5 4.5H13.5ZM2.5 11.5V5.5L8 9.5L13.5 5.5V11.5H2.5Z" />',
  primitivesquare: '<path d="M3.5 3.5H12.5V12.5H3.5V3.5Z M2.5 2.5V13.5H13.5V2.5H2.5Z" />',
  add: '<path d="M7.5 2.5V7.5H2.5V8.5H7.5V13.5H8.5V8.5H13.5V7.5H8.5V2.5H7.5Z" />',
};
