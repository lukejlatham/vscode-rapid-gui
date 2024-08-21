import React from "react";
import { FontDropdown } from "./FontDropdown"; // Adjust the import path as necessary
import { BackgroundColorSelector } from "./BackgroundColorSelector";
import { ThemeSwatchPicker } from "./ThemePicker";

export const ThemingDropdowns: React.FC = () => {
  return (
    <div>
      <FontDropdown />

      <BackgroundColorSelector />

      <ThemeSwatchPicker />
    </div>
  );
};

export default ThemingDropdowns;
