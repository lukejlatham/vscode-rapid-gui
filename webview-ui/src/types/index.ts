import { SerializedNodes, Node } from "@craftjs/core";

export interface Page {
  id: string;
  name: string;
  content: SerializedNodes;
}

export interface CanvasProps {
  classes?: any;
}

export type AccessibilityContextType = {
  selectedAccessibility: "yes" | "no";
  setSelectedAccessibility: (selected: "yes" | "no") => void;
};

export type DraggingComponentContextType = {
  seletectedDraggingComponent: string | null;
  setDraggingComponent: (component: string | null) => void;
};

export * from "./generateLayoutTypes";

export * from "./editorComponentTypes";

export * from "../Features/theming/themes";
