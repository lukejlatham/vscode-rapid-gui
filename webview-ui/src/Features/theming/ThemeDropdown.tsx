import * as React from "react";
import {
  Dropdown,
  makeStyles,
  Option,
  useId,
  Button,
} from "@fluentui/react-components";
import { WindowBrushFilled } from "@fluentui/react-icons";
import type { DropdownProps } from "@fluentui/react-components";
import { themeList } from "./themes"; // Adjust the import path as necessary

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Space between the dropdown and the button
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  colorBlock: {
    width: "16px",
    height: "16px",
    display: "inline-block",
    marginRight: "8px",
  },
});

export const ThemeDropdown = (props: Partial<DropdownProps>) => {
  const dropdownId = useId("dropdown");
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Dropdown aria-labelledby={dropdownId} {...props}>
        {themeList.map((theme) => {
          const mainColor =
            typeof theme.scheme.sectionColors.main === "string"
              ? theme.scheme.sectionColors.main
              : theme.scheme.sectionColors.main[0]; // Use the first color if it's an array

          return (
            <Option key={theme.name} text={theme.name}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  className={styles.colorBlock}
                  style={{ backgroundColor: mainColor }}
                ></span>
                {theme.name}
              </div>
            </Option>
          );
        })}
      </Dropdown>
      <Button
        icon={<WindowBrushFilled />}
        size="large"
        appearance="primary"
        onClick={() => {
          console.log("Edit Background clicked");
        }}
      >
        Apply Theme
      </Button>
    </div>
  );
};
