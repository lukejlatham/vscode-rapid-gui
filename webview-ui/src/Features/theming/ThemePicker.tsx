import React, { useState, useMemo } from 'react';
import {
  makeStyles,
  Tooltip,
  SwatchPicker,
  ColorSwatch,
  renderSwatchPickerGrid,
  Button,
} from "@fluentui/react-components";
import { WindowFilled } from "@fluentui/react-icons";
import { useEditor } from "@craftjs/core";
import { NodeThemeType, themeList, ColorScheme } from "../../types/themes"; // Adjust the import path as necessary
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  swatchContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  swatchLabel: {
    fontWeight: 'bold',
  },
});

const getColor = (color: string | string[]): string => {
  if (Array.isArray(color)) {
    return color[0]; // Use the first color in the array for preview
  }
  if (!color) return 'rgba(0, 0, 0, 0)';
  return color;
};

const getNodeType = (node: any): NodeThemeType => {
  if (node.data.displayName === 'Background') return 'Background';
  if (node.data.displayName === 'Container') return 'Container';
  return 'Other';
};

const applyThemeToBackground = (actions: any, id: string, theme: ColorScheme) => {
  actions.setProp(id, (props: any) => {
    props.backgroundColor = getColor(theme.backgroundColor);
  });
};

const applyThemeToContainer = (actions: any, id: string, theme: ColorScheme, isDarkAccent: boolean) => {
  const colorType = isDarkAccent ? 'darkaccent' : 'main';
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
        case 'Background':
          applyThemeToBackground(actions, id, theme);
          break;
        case 'Container':
          if (!darkAccentApplied) {
            applyThemeToContainer(actions, id, theme, true);
            darkAccentApplied = true;
          } else {
            if (node.data.parent) {
              const parent = query.node(node.data.parent).get();
              
              if (parent?.data.displayName === 'Container') {
                applyThemeToNestedContainer(actions, id, theme);
              } else {
                applyThemeToContainer(actions, id, theme, false);
              }
            }
          }
          break;
        case 'Other':
          if (node.data.props && !node.data.isCanvas && node.data.displayName !== 'Single Line Input') {
            applyThemeToOtherNodes(actions, id, theme);
          }
          break;
      }
    });
  };

  const ColorSwatchWithTooltip = (props: { color: string; value: string; label: string }) => {
    const { color, value, label } = props;
    return (
      <Tooltip withArrow content={label} relationship="label">
        <ColorSwatch color={color} value={value} />
      </Tooltip>
    );
  };

const swatchItems = themeList.map(theme => ({
key : theme.name,
  color: getColor(theme.scheme.sectionColors.main ?? 'rgba(0, 0, 0, 0)'),
  value: theme.name,
  label: theme.name,
}));

  return (
    <div className={styles.container}>
      <div className={styles.swatchContainer}>
        <span className={styles.swatchLabel}>Select a theme:</span>
        <SwatchPicker
          layout="grid"
          aria-label="Theme SwatchPicker"
          selectedValue={selectedTheme ?? themeList[0].name}
          onSelectionChange={(_, data) => setSelectedTheme(data.selectedValue)}
        >
          {renderSwatchPickerGrid({
            items: swatchItems,
            columnCount: 3,
            renderSwatch: (item) => (
              <ColorSwatchWithTooltip
                value={item.value}
                color={item.color ?? 'rgba(0, 0, 0, 0)'} 
                label={item.name ?? ''}
              />
            ),
          })}
        </SwatchPicker>
      </div>

      <Button
        icon={<WindowFilled />}
        size="medium"
        appearance="primary"
        onClick={handleApplyTheme}
        disabled={!selectedTheme}
      >
        <FormattedMessage id="theme.applyTheme" defaultMessage="Apply Theme" />
      </Button>
    </div>
  );
};