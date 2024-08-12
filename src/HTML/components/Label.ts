// components/Label.ts

interface LabelProps {
  id: string;
  text: string;
  fontColor: string;
  fontSize: number;
  fontWeight: "normal" | "bold" | "lighter";
  textAlign: "left" | "center" | "right";
}

export function generateLabelHtml(props: LabelProps): string {
  return `
  <label id="${props.id}" class="custom-label ${props.id}">
    ${props.text}
  </label>
  `;
}

export function generateLabelCss(props: LabelProps): string {
  return `
  .custom-label.${props.id} {
    color: ${props.fontColor};
    font-size: ${props.fontSize}px;
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    display: block;
  }
  `;
}
