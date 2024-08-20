import React, { useState, useMemo } from "react";
import {
  makeStyles,
  Tooltip,
  SwatchPicker,
  ColorSwatch,
  renderSwatchPickerGrid,
  Button,
} from "@fluentui/react-components";
import { useEditor } from "@craftjs/core";
import { NodeThemeType, themeList, ColorScheme, themePreviews } from "../../types/themes"; // Adjust the import path as necessary
import type {
  ColorSwatchProps,
  SwatchProps,
  SwatchPickerOnSelectEventHandler,
} from "@fluentui/react-components";
import { FormattedMessage } from "react-intl";
import { WindowFilled } from "@fluentui/react-icons";
import { use } from "i18next";

const useStyles = makeStyles({
  "container": {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  "swatchContainer": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  "swatchLabel": {
    fontWeight: "bold",
  },
  "@media (forced-colors: active)": {
    forcedColorAdjust: "none",
  },
});

const getColor = (color: string | string[]): string => {
  if (Array.isArray(color)) {
    return color[0]; // Use the first color in the array for preview
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

export const ThemeSwatchPicker: React.FC = () => {
  const { actions, query } = useEditor();

  const styles = useStyles();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const theme = useMemo(
    () => themeList.find((theme) => theme.name === selectedValue)?.scheme,
    [selectedValue]
  );

  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    setSelectedValue(data.selectedValue);
    console.log(data.selectedSwatch);
    setSelectedColor(data.selectedSwatch);
    console.log(data.selectedValue);
  };

  const handleApplyTheme = () => {
    if (!selectedValue || !theme) return;
    console.log("Applying theme", selectedValue);
    console.log("Theme", theme);

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

  const ColorSwatchWithTooltip = (props: ColorSwatchProps) => {
    const { color, value } = props;
    const label = props["aria-label"] ?? "color swatch";
    return (
      <Tooltip withArrow content={label} relationship="label">
        <ColorSwatch color={color} value={value} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.swatchContainer}>
      <h3>Grid layout</h3>

      <SwatchPicker
        layout="grid"
        aria-label="SwatchPicker grid layout"
        selectedValue={selectedValue ?? ""}
        onSelectionChange={handleSelect}>
        {renderSwatchPickerGrid({
          items: themePreviews,
          columnCount: 3,
          renderSwatch: (item: SwatchProps) => {
            console.log("renderSwatchPickerGrid called with item:", item);
            return <ColorSwatchWithTooltip key={item.name} color={item.color ?? ""} {...item} />;
          },
        })}
      </SwatchPicker>
      <Button
        icon={<WindowFilled />}
        size="medium"
        appearance="primary"
        onClick={handleApplyTheme}
        disabled={!selectedColor}>
        <FormattedMessage id="theme.applyTheme" defaultMessage="Apply Theme" />
      </Button>
    </div>
  );
};
