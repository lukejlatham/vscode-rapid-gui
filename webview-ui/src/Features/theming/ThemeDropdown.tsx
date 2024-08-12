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
import { useEditor } from "@craftjs/core";
import { themeList } from "./themes"; // Adjust the import path as necessary

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px", // Space between the dropdown and the button
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
  const { actions, query } = useEditor();
  const [selectedTheme, setSelectedTheme] = React.useState<string | null>(null);

  const handleApplyTheme = () => {
    if (!selectedTheme) return;

    const theme = themeList.find((theme) => theme.name === selectedTheme);

    if (theme) {
      const nodes = query.getNodes();

      const containerNodeIds = Object.keys(nodes).filter((id) => {
        const node = query.node(id).get();
        return node.data.displayName === "Container";
      });

      containerNodeIds.forEach((id) => {
        actions.setProp(id, (props) => {
          props.backgroundColor = theme.scheme.sectionColors.main;
        });
      });
    }
  };

  return (
    <div className={styles.container}>
      <Dropdown
        aria-labelledby={dropdownId}
        onOptionSelect={(event, data) => {
          if (data.optionValue) {
            setSelectedTheme(data.optionValue);
          }
        }}
        {...props}
      >
        {themeList.map((theme) => {
          const mainColor =
            typeof theme.scheme.sectionColors.main === "string"
              ? theme.scheme.sectionColors.main
              : theme.scheme.sectionColors.main[0]; // Use the first color if it's an array

          return (
            <Option key={theme.name} text={theme.name} value={theme.name}>
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
        onClick={handleApplyTheme}
      >
        Apply Theme
      </Button>
    </div>
  );
};
