import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";
import { generateCssClassName } from "../componentGenerator";

export function generateTextBoxHtml(node: Node): string {
  const props = node.props || {};
  const label = props.label || "";
  const placeholder = props.placeholder || "Enter text here...";
  return `
  <div class="textbox-container ${generateCssClassName(node.custom.id)}">
    <label for="${generateCssClassName(node.custom.id)}">${label}</label>
    <textarea id="${generateCssClassName(node.custom.id)}" placeholder="${placeholder}"></textarea>
  </div>
  `;
}

export function generateTextBoxCss(node: Node): string {
  const props = node.props;
  return `
  .textbox-container.${generateCssClassName(node.custom.id)} {
    display: flex;
    flex-direction: column;
  }
  
  .textbox-container.${generateCssClassName(node.custom.id)} label {
    color: ${convertColor(props.fontColor)};
    font-size: ${props.fontSize}px;
    margin-bottom: 5px;
  }
  
  .textbox-container.${generateCssClassName(node.custom.id)} textarea {
    color: ${convertColor(props.fontColor)};
    font-size: ${props.fontSize}px;
    background-color: ${convertColor(props.backgroundColor)};
    border: 1px solid ${convertColor(props.borderColor)};
    border-radius: ${props.borderRadius}px;
    width: ${props.width}px;
    height: ${props.height}px;
    padding: 5px;
    resize: vertical;
  }
  `;
}
