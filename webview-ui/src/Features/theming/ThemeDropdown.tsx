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
  colorPreviewContainer: {
    display: "flex",
    gap: "10px", // Space between the two previews
    alignItems: "center",
    marginTop: "10px", // Space between dropdown and previews
  },
  colorBlock: {
    width: "16px",
    height: "16px",
    borderRadius: "3px", // Rounded corners
    border: "2px solid", // Border thickness
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
    gap: "7px", // Space between the color block and the text
  },
});

// Helper function to handle both array and string values
const getColor = (color: string | string[]): string =>
  Array.isArray(color) ? color[0] : color;

export const ThemeDropdown: React.FC<Partial<DropdownProps>> = (props) => {
  const dropdownId = useId("dropdown");
  const { actions, query } = useEditor();
  const [selectedTheme, setSelectedTheme] = React.useState<string | null>(null);
  const styles = useStyles();

  const theme = React.useMemo(
    () => themeList.find((theme) => theme.name === selectedTheme)?.scheme,
    [selectedTheme]
  );

  const handleApplyTheme = () => {
    if (!selectedTheme || !theme) return;

    const nodes = query.getNodes();
    Object.keys(nodes).forEach((id) => {
      const node = query.node(id).get();

      if (node.data.displayName === "Background") {
        actions.setProp(id, (props) => {
          props.backgroundColor = getColor(theme.sectionColors.darkaccent);
        });
      }

      if (node.data.displayName === "Container") {
        const nodeParentId = node.data.parent;
        if (nodeParentId) {
          const parent = query.node(nodeParentId).get();
          if (parent?.data.displayName === "Container") {
            actions.setProp(id, (props) => {
              props.backgroundColor = getColor(theme.elementColors.lightaccent);
              props.borderColor = getColor(theme.elementBorderColors.lightaccent);
            });
          } else {
            actions.setProp(id, (props) => {
              props.backgroundColor = getColor(theme.sectionColors.main);
              props.borderColor = getColor(theme.sectionBorderColors.main);
            });
          }
        } else {
          actions.setProp(id, (props) => {
            props.backgroundColor = getColor(theme.sectionColors.darkaccent);
            props.borderColor = getColor(theme.sectionBorderColors.darkaccent);
          });
        }
      }

      if (node.data.props && !node.data.isCanvas) {
        if (node.data.props.backgroundColor) {
          actions.setProp(id, (props) => {
            props.backgroundColor = getColor(theme.elementColors.main);
          });
        }
        if (node.data.props.borderColor) {
          actions.setProp(id, (props) => {
            props.borderColor = getColor(theme.elementBorderColors.main);
          });
        }
        if (node.data.props.fontColor) {
          actions.setProp(id, (props) => {
            props.fontColor = getColor(theme.fontColors.main);
          });
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <Dropdown
        size="medium"
        aria-labelledby={dropdownId}
        onOptionSelect={(event, data) => {
          if (data.optionValue) {
            setSelectedTheme(data.optionValue);
          }
        }}
        {...props}
      >
        {themeList.map((theme) => {
          const sectionColor = getColor(theme.scheme.sectionColors.main);
          const sectionBorderColor = getColor(theme.scheme.sectionBorderColors.main);
          const elementColor = getColor(theme.scheme.elementColors.main);
          const elementBorderColor = getColor(theme.scheme.elementBorderColors.main);

          return (
            <Option key={theme.name} text={theme.name} value={theme.name}>
              <div className={styles.optionContainer}>
                <span
                  className={styles.colorBlock}
                  style={{
                    backgroundColor: sectionColor,
                    borderColor: sectionBorderColor,
                  }}
                ></span>
                <span
                  className={styles.colorBlock}
                  style={{
                    backgroundColor: elementColor,
                    borderColor: elementBorderColor,
                  }}
                ></span>
                {theme.name}
              </div>
            </Option>
          );
        })}
      </Dropdown>

      <Button
        icon={<WindowBrushFilled />}
        size="medium"
        appearance="primary"
        onClick={handleApplyTheme}
      >
        Apply Theme
      </Button>
    </div>
  );
};
