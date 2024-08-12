// components/Icon.ts

interface IconProps {
  id: string;
  iconName: string;
  color: string;
  size: number;
  hyperlink?: string;
}

export function generateIconHtml(props: IconProps): string {
  const iconHtml = `<i id="${props.id}" class="icon ${props.iconName}"></i>`;

  if (props.hyperlink) {
    return `<a href="${props.hyperlink}" class="icon-link">${iconHtml}</a>`;
  }

  return iconHtml;
}

export function generateIconCss(props: IconProps): string {
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
