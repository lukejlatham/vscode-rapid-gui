import React from "react";
import { FontDropdown } from "./FontDropdown"; // Adjust the import path as necessary
import { BackgroundColorSelector } from "./BackgroundColorSelector";
import { ThemeSwatchPicker } from "./ThemePicker";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
});

export const ThemingDropdowns: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <FontDropdown />

      <BackgroundColorSelector />

      <ThemeSwatchPicker />
    </div>
  );
};

export default ThemingDropdowns;
