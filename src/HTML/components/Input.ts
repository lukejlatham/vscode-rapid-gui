import { Node } from "../JSONParser";

export function generateInputHtml(node: Node): string {
  const props = node.props;
  return `
  <div class="input-container ${node.custom.id}">
    <input type="${props.type || "text"}" id="${node.custom.id}" placeholder="${
    props.placeholder || ""
  }" ${props.required ? "required" : ""}>
  </div>
  `;
}

export function generateInputCss(node: Node): string {
  const props = node.props;
  return `
  .input-container.${node.custom.id} {
    display: flex;
    flex-direction: column;
    margin-bottom: ${props.marginBottom || "10px"};
  }
  
  .input-container.${node.custom.id} input {
    color: ${props.fontColor || "black"};
    font-size: ${props.fontSize || "14px"};
    background-color: ${props.backgroundColor || "white"};
    border: 1px solid ${props.borderColor || "#ccc"};
    border-radius: ${props.borderRadius || "4px"};
    padding: ${props.padding || "5px"};
    width: ${props.width || "100%"};
  }
  
  .input-container.${node.custom.id} input:focus {
    outline: none;
    border-color: ${props.focusBorderColor || props.borderColor || "#007bff"};
  }
  `;
}
