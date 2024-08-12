// components/Container.ts

import { Component } from "./Component"; // You'll need to define this interface
import { generateComponentHtml, generateComponentCss } from "../componentGenerator"; // You'll need to implement these functions

interface ContainerProps {
  id: string;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  padding: number;
  width: number;
  height: number;
  flexDirection: "row" | "column";
  justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
  alignItems: "flex-start" | "flex-end" | "center" | "stretch";
  gap: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  children: Component[];
}

export function generateContainerHtml(props: ContainerProps): string {
  let childrenHtml = "";
  props.children.forEach((child) => {
    childrenHtml += generateComponentHtml(child);
  });

  return `
<div id="${props.id}" class="container ${props.id}">
  ${childrenHtml}
</div>
`;
}

export function generateContainerCss(props: ContainerProps): string {
  let css = `
.container.${props.id} {
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
  props.children.forEach((child) => {
    css += generateComponentCss(child);
  });

  return css;
}
