import { Node } from "../JSONParser";
import { convertColor } from "../../utilities/colortranslator";

export function generateInputHtml(node: Node): string {
  const props = node.props;
  return `
  <input id="${node.custom.id}" class="custom-input ${node.custom.id}" placeholder="${
    props.placeholder || ""
  }">
  `;
}

export function generateInputCss(node: Node): string {
  const props = node.props;
  return `
  .custom-input.${node.custom.id} {
    color: ${convertColor(props.fontColor || "black")};
    font-size: ${props.fontSize || 16}px;
    background-color: ${convertColor(props.backgroundColor || "white")};
    border: 1px solid ${convertColor(props.borderColor || "black")};
    border-radius: ${props.borderRadius || 0}px;
  }
  `;
}
