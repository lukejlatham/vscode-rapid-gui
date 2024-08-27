import { Node } from "../JSONParser";

// Mapping of your current icons to Font Awesome icons
const iconMapping: { [key: string]: string } = {
  home: "fa-home",
  gear: "fa-gear",
  bell: "fa-bell",
  account: "fa-user",
  vscode: "fa-code", // There's no direct VS Code icon, so we'll use a code icon
  mail: "fa-envelope",
  primitivesquare: "fa-square",
  add: "fa-plus",
};

export function generateIconHtml(node: Node): string {
  const props = node.props;
  const faIconName = iconMapping[props.iconName] || props.iconName;
  const iconHtml = `<i id="${node.custom.id}" class="fa-solid ${faIconName} ${node.custom.id}"></i>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(node: Node): string {
  const props = node.props;
  return `
  .${node.custom.id} {
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

export function generateFontAwesomeLink(): string {
  return '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';
}
