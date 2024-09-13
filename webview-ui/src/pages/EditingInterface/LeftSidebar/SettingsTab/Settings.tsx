import React, { useContext, useState } from "react";
import {
  Label,
  Select,
  Switch,
  makeStyles,
  Breadcrumb,
  BreadcrumbItem,
  Body2,
  tokens,
} from "@fluentui/react-components";
import {
  Caption1,
} from "@fluentui/react-components";
import { LanguageContext } from "../../../../Features/languages/LanguageWrapper";
import { AccessibilityContext } from "../../EditingInterface";
import { FormattedMessage } from "react-intl";
import { useTheme, teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from "../../../../hooks/useTheme";


const useStyles = makeStyles({
  settingsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  settingItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  select: {
    width: "100%",
    maxWidth: "200px",
  },
  breadcrumb: {
    marginBottom: "2px",
  },
  caption: {
    color: tokens.colorNeutralForeground2,
    marginBottom: "5px",
  },
});

const Settings: React.FC<{
  classes: any;
}> = ({ classes}) => {
  const styles = useStyles();
  const language = useContext(LanguageContext);
  const accessibility = useContext(AccessibilityContext);
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light" | "highContrast">(
    theme === teamsLightTheme ? "light" : theme === teamsDarkTheme ? "dark" : "highContrast"
  );

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as "dark" | "light" | "highContrast";
    setSelectedTheme(selected);
    switch (selected) {
      case "light":
        setTheme(teamsLightTheme);
        break;
      case "dark":
        setTheme(teamsDarkTheme);
        break;
      case "highContrast":
        setTheme(teamsHighContrastTheme);
        break;
      default:
        setTheme(teamsDarkTheme);
    }
  };

  
  const handleAccessibilityChange = (checked: boolean) => {
    const selected = checked ? "yes" : "no";
    accessibility.setSelectedAccessibility(selected as "yes" | "no");
  };

  const handleAccessibilityKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      handleAccessibilityChange(accessibility.selectedAccessibility !== "yes");
    }
  };


  return (
    <div className={styles.settingsContainer}>
      <Breadcrumb className={styles.breadcrumb}>
        <BreadcrumbItem>
          <Body2>
            <FormattedMessage id="settings.breadcrumb" defaultMessage="Settings" />
            </Body2>
        </BreadcrumbItem>
      </Breadcrumb>
      <Caption1 className={styles.caption}>
        <FormattedMessage
          id="settings.caption"
          defaultMessage="Change the theme, language, and accessibility settings
        for the editor"
        />
      </Caption1>
      <div className={styles.settingItem}>
        <Label htmlFor="themeSelect">
          <FormattedMessage id="settings.changeTheme" defaultMessage="Theme:" />
        </Label>
        <Select
          id="themeSelect"
          value={selectedTheme}
          onChange={handleThemeChange}
          className={styles.select}>
          <option value="dark">
            <FormattedMessage id="settings.dark" defaultMessage="Dark" />
          </option>
          <option value="light">
            <FormattedMessage id="settings.light" defaultMessage="Light" />
          </option>
          <option value="highContrast">
            <FormattedMessage id="settings.highContrast" defaultMessage="High Contrast" />
          </option>
        </Select>
      </div>

      <div className={styles.settingItem}>
        <Label htmlFor="languageSelect">
          <FormattedMessage id="settings.changeLanguage" defaultMessage="Language:" />
        </Label>
        <Select
          id="languageSelect"
          value={language?.locale}
          onChange={language?.changeLanguage}
          className={styles.select}>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="jp">Japanese</option>
          <option value="ru">Russian</option>
        </Select>
      </div>

      <div className={styles.settingItem}>
        <Switch
          label={
            <FormattedMessage
              id="settings.accessibility"
              defaultMessage="Enable accessibility features"
            />
          }
          checked={accessibility.selectedAccessibility === "yes"}
          onChange={(e) => handleAccessibilityChange(e.target.checked)}
          onKeyDown={handleAccessibilityKeyDown}
        />
      </div>
    </div>
  );
};

export default Settings;
