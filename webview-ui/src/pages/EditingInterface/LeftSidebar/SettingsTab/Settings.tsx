import React, { useContext, useState } from "react";
import {
  Theme,
  Label,
  Select,
  Switch,
  makeStyles,
  Breadcrumb,
  BreadcrumbItem,
  Body2,
} from "@fluentui/react-components";
import {
  teamsDarkTheme,
  teamsLightTheme,
  teamsHighContrastTheme,
  Caption1,
} from "@fluentui/react-components";
import { LanguageContext } from "../../../../Features/languages/LanguageWrapper";
import { AccessibilityContext } from "../../EditingInterface";
import { FormattedMessage } from "react-intl";

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
    color: "#d6d6d6",
    marginBottom: "5px",
  },
});

const Settings: React.FC<{
  classes: any;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}> = ({ classes, setTheme, theme }) => {
  const styles = useStyles();
  const language = useContext(LanguageContext);
  const accessibility = useContext(AccessibilityContext);
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

  const handleAccessibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.checked ? "yes" : "no";
    accessibility.setSelectedAccessibility(selected as "yes" | "no");
    if (selected === "yes") {
      setTheme(teamsHighContrastTheme);
    } else {
      setTheme(teamsDarkTheme);
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
          value={language.locale}
          onChange={language.changeLanguage}
          className={styles.select}>
          <option value="en">English</option>
          <option value="fr">Français</option>
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
          onChange={handleAccessibilityChange}
        />
      </div>
    </div>
  );
};

export default Settings;
