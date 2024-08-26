import { SerializedNodes } from "@craftjs/core";

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

export * from "./generateLayoutTypes";

export * from "./editorComponentTypes";

export * from "../Features/theming/themes";
