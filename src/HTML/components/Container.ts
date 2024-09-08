import { Node, LayoutItem } from "../JSONParser";
import { generateComponentHtml, generateComponentCss } from "../componentGenerator";
import { convertColor } from "../../utilities/colortranslator";
//best version yet

export function generateContainerHtml(
  node: Node,
  content: { [key: string]: Node },
  projectPath?: string
): string {
  // extract the props
  const props = node.props;
  let childrenHtml = "";

  // generate HTML for child components
  node.nodes.forEach((childId) => {
    const childNode = content[childId];
    if (childNode) {
      childrenHtml += generateComponentHtml(
        {
          pages: {
            [node.custom.id || ""]: {
              root: content[childId],
              components: content,
              layout: [] as LayoutItem[],
            },
          },
        },
        node.custom.id || "",
        projectPath
      );
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
      display: flex;
      flex-direction: ${props.flexDirection || "row"};
      justify-content: ${props.justifyContent || "flex-start"};
      align-items: ${props.alignItems || "stretch"};
      flex-wrap: ${props.flexWrap || "nowrap"};
      gap: ${props.gap || 0}px;
      width: ${props.width ? props.width + "%" : "auto"};
      height: ${props.height ? props.height + "%" : "auto"};
      background-color: ${props.backgroundColor || "transparent"};
      border: 2px solid ${convertColor(props.borderColor)};
      border-radius: ${props.borderRadius || 0} px;
      padding: ${props.padding || 0}px;
      margin: ${props.margin || 0}px;
      box-sizing: border-box;
      ${
        props.shadowColor
          ? `box-shadow: ${props.shadowOffsetX || 0}px ${props.shadowOffsetY || 0}px ${
              props.shadowBlur || 0
            }px ${props.shadowColor};`
          : ""
      }
      transition: all 0.3s ease;
    }

    .container.${node.custom.id}:hover {
      ${props.hoverBackgroundColor ? `background-color: ${props.hoverBackgroundColor};` : ""}
      ${props.hoverBorderColor ? `border-color: ${props.hoverBorderColor};` : ""}
    }
  `; // why do we have the hover effect here? it's not in the component

  // Generate CSS for child components
  node.nodes.forEach((childId) => {
    const childNode = content[childId];
    if (childNode) {
      css += generateComponentCss(
        {
          pages: {
            [node.custom.id || ""]: {
              root: content[childId],
              components: content,
              layout: [] as LayoutItem[],
            },
          },
        },
        node.custom.id || ""
      );
    }
  });

  return css;
}
