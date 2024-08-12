import { Node } from "../JSONParser";
import { generateComponentHtml, generateComponentCss } from "../componentGenerator";

export function generateContainerHtml(node: Node, content: { [key: string]: Node }): string {
  const props = node.props;
  let childrenHtml = "";
  node.nodes.forEach((childId) => {
    const childNode = content[childId];
    if (childNode) {
      childrenHtml += generateComponentHtml({ [childId]: childNode }, "", "");
    }
  });

  return `
<div id="${node.custom.id}" class="container ${node.custom.id}">
  ${childrenHtml}
</div>
`;
}

export function generateContainerCss(node: Node, content: { [key: string]: Node }): string {
  const props = node.props;
  let css = `
.container.${node.custom.id} {
  background-color: ${props.backgroundColor};
  border: 2px solid ${props.borderColor};
  border-radius: ${props.borderRadius}px;
  padding: ${props.padding}px;
  width: ${props.width}%;
  height: ${props.height}%;
  display: flex;
  flex-direction: ${props.flexDirection};
  justify-content: ${props.justifyContent};
  align-items: ${props.alignItems};
  gap: ${props.gap}px;
`;

  if (props.shadowColor && props.shadowBlur) {
    css += `  box-shadow: ${props.shadowOffsetX}px ${props.shadowOffsetY}px ${props.shadowBlur}px ${props.shadowColor};\n`;
  }

  css += "}\n";

  // Generate CSS for child components
  node.nodes.forEach((childId) => {
    const childNode = content[childId];
    if (childNode) {
      css += generateComponentCss({ [childId]: childNode });
    }
  });

  return css;
}
