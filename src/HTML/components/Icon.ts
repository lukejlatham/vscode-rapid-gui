import { Node } from "../JSONParser";
import * as FluentIcons from "@fluentui/react-icons";

export function generateIconHtml(node: Node): string {
  const props = node.props;
  const iconComponent = FluentIcons[props.selectedIcon];

  if (!iconComponent) {
    console.warn(`Icon component for ${props.selectedIcon} not found.`);
    return `<!-- Icon ${props.selectedIcon} not found -->`;
  }

  const iconSvg = iconComponent({ primaryFill: props.iconColor });
  const iconHtml = `<span class="icon ${node.custom.id}" style="font-size: ${props.iconSize}px;">${iconSvg}</span>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(node: Node): string {
  const props = node.props;
  return `
  .icon.${node.custom.id} {
    display: inline-block;
    vertical-align: middle;
  }
  
  .icon-link {
    text-decoration: none;
  }
  `;
}
