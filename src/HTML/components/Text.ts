// components/Text.ts

interface TextProps {
  id: string;
  text: string;
  fontColor: string;
  fontSize: number;
  fontWeight: "normal" | "bold" | "lighter";
  textAlign: "left" | "center" | "right" | "justify";
  italic?: boolean;
  underline?: boolean;
}

export function generateTextHtml(props: TextProps): string {
  return `
  <p id="${props.id}" class="custom-text ${props.id}">
    ${props.text}
  </p>
  `;
}

export function generateTextCss(props: TextProps): string {
  return `
  .custom-text.${props.id} {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    ${props.italic ? "font-style: italic;" : ""}
    ${props.underline ? "text-decoration: underline;" : ""}
  }
  `;
}
