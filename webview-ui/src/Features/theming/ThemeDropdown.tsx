import * as React from "react";
import { Dropdown, makeStyles, Option, useId, Button } from "@fluentui/react-components";
import { WindowFilled } from "@fluentui/react-icons";
import type { DropdownProps } from "@fluentui/react-components";
import { useEditor } from "@craftjs/core";
import { NodeThemeType, themeList, ColorScheme } from "./themes"; // Adjust the import path as necessary
import { FormattedMessage } from "react-intl";
import { useState, useMemo } from "react";

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
const getColor = (color: string | string[]): string => {
  if (Array.isArray(color)) {
    const randomIndex = Math.floor(Math.random() * color.length);
    return color[randomIndex];
  }
  return color;
};

const getNodeType = (node: any): NodeThemeType => {
  if (node.data.displayName === "Background") return "Background";
  if (node.data.displayName === "Container") return "Container";
  return "Other";
};

const applyThemeToBackground = (actions: any, id: string, theme: ColorScheme) => {
  actions.setProp(id, (props: any) => {
    props.backgroundColor = getColor(theme.backgroundColor);
  });
};

const applyThemeToContainer = (
  actions: any,
  id: string,
  theme: ColorScheme,
  isDarkAccent: boolean
) => {
  const colorType = isDarkAccent ? "darkaccent" : "main";
  actions.setProp(id, (props: any) => {
    props.backgroundColor = getColor(theme.sectionColors[colorType]);
    props.borderColor = getColor(theme.sectionBorderColors[colorType]);
  });
};

const applyThemeToNestedContainer = (actions: any, id: string, theme: ColorScheme) => {
  actions.setProp(id, (props: any) => {
    props.backgroundColor = getColor(theme.elementColors.lightaccent);
    props.borderColor = getColor(theme.elementBorderColors.lightaccent);
  });
};

const applyThemeToOtherNodes = (actions: any, id: string, theme: ColorScheme) => {
  actions.setProp(id, (props: any) => {
    if (props.backgroundColor) props.backgroundColor = getColor(theme.elementColors.main);
    if (props.borderColor) props.borderColor = getColor(theme.elementBorderColors.main);
    if (props.fontColor) props.fontColor = getColor(theme.fontColors.main);
  });
};

export const ThemeDropdown: React.FC<Partial<DropdownProps>> = (props) => {
  const dropdownId = useId();
  const { actions, query } = useEditor();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const styles = useStyles();

  const theme = useMemo(
    () => themeList.find((theme) => theme.name === selectedTheme)?.scheme,
    [selectedTheme]
  );

  const handleApplyTheme = () => {
    if (!selectedTheme || !theme) return;

    let darkAccentApplied = false;
    const nodes = query.getNodes();

    Object.entries(nodes).forEach(([id, node]) => {
      const nodeType = getNodeType(node);

      switch (nodeType) {
        case "Background":
          applyThemeToBackground(actions, id, theme);
          break;
        case "Container":
          if (!darkAccentApplied) {
            applyThemeToContainer(actions, id, theme, true);
            darkAccentApplied = true;
          } else {
            if (node.data.parent) {
              const parent = query.node(node.data.parent).get();

              if (parent?.data.displayName === "Container") {
                applyThemeToNestedContainer(actions, id, theme);
              } else {
                applyThemeToContainer(actions, id, theme, false);
              }
            }
          }
          break;
        case "Other":
          if (
            node.data.props &&
            !node.data.isCanvas &&
            node.data.displayName !== "Single Line Input"
          ) {
            applyThemeToOtherNodes(actions, id, theme);
          }
          break;
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
        placeholder="Select a theme">
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
                  }}></span>
                <span
                  className={styles.colorBlock}
                  style={{
                    backgroundColor: elementColor,
                    borderColor: elementBorderColor,
                  }}></span>
                {theme.name}
              </div>
            </Option>
          );
        })}
      </Dropdown>

      <Button icon={<WindowFilled />} size="medium" appearance="primary" onClick={handleApplyTheme}>
        <FormattedMessage id="theme.applyTheme" defaultMessage="Apply Theme" />
      </Button>
    </div>
  );
};
