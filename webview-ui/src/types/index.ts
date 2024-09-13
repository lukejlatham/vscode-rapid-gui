import { SerializedNodes } from "@craftjs/core";
import { ReactNode } from "react";
import French from "./../Features/languages/fr.json";
import English from "./../Features/languages/en.json";
import Japanese from "./../Features/languages/jp.json";
import Russian from "./../Features/languages/ru.json";

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

export type Locale = "fr" | "en" | "jp" | "ru";
export type Messages = typeof French | typeof English | typeof Japanese | typeof Russian;

export interface LanguageContextType {
  locale: Locale;
  changeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface LanguageWrapperProps {
  children: ReactNode;
}

export * from "./generateLayoutTypes";

export * from "./editorComponentTypes";

export * from "../Features/theming/themes";
