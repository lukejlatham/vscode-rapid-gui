/* eslint-disable @typescript-eslint/naming-convention */
import { Node } from "../JSONParser";

// Mapping of VSCode icons to Font Awesome icons
const iconMapping: { [key: string]: string } = {
  VscAccount: "fa-user",
  VscChip: "fa-microchip",
  VscFlame: "fa-fire",
  VscCalendar: "fa-calendar",
  VscBell: "fa-bell",
  VscCloud: "fa-cloud",
  VscAdd: "fa-plus",
  VscRefresh: "fa-sync-alt",
};

export function generateIconHtml(node: Node): string {
  const props = node.props;
  const faIconName = iconMapping[props.vscIcon] || "fa-question";
  const iconHtml = `<i id="${node.custom.id}" class="icon fa-solid ${faIconName} ${node.custom.id}"></i>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(node: Node): string {
  const props = node.props;
  return `
  .${node.custom.id} {
    color: ${props.iconColor || "inherit"};
    font-size: ${props.iconSize || 16}px;
  }
  `;
}
