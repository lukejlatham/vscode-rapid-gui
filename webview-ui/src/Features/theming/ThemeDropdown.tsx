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
import { QueryMethods, useEditor } from "@craftjs/core";
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

      Object.keys(nodes).forEach((id) => {
        const node = query.node(id).get();


        if (node.data.displayName === "Background") {
          actions.setProp(id, (props) => {
            props.backgroundColor = theme.scheme.sectionColors.darkaccent;
          });
        }

        // This applies the theme to the container - depending on the parent  
        if (node.data.displayName === "Container") {
          const nodeParentId = node.data.parent;

          if (nodeParentId) {
            const parent = query.node(nodeParentId).get();

            if (parent.data.displayName === "Container") {
              actions.setProp(id, (props) => {
                props.backgroundColor = theme.scheme.elementColors.lightaccent;
                props.borderColor = theme.scheme.elementBorderColors.lightaccent;
              });
            } else {
              actions.setProp(id, (props) => {
                props.backgroundColor = theme.scheme.sectionColors.main;
                props.borderColor = theme.scheme.sectionBorderColors.main;
              });
            }
          } else {
            actions.setProp(id, (props) => {
              props.backgroundColor = theme.scheme.sectionColors.darkaccent;
              props.borderColor = theme.scheme.sectionBorderColors.darkaccent;
            });
          }
        }

        if (node.data.props && !node.data.isCanvas) {
          if (node.data.props.backgroundColor) {
            actions.setProp(id, (props) => {
              props.backgroundColor = theme.scheme.elementColors.main;
            });
          }
          if (node.data.props.borderColor) {
            actions.setProp(id, (props) => {
              props.borderColor = theme.scheme.elementBorderColors.main;
            });
          }
          if (node.data.props.fontColor) {
            actions.setProp(id, (props) => {
              props.fontColor = theme.scheme.fontColors.main;
            });
          }
        }
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
