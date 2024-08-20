import React, { useContext, useState } from 'react';
import { Theme, useId, Label, Select, Switch, makeStyles } from '@fluentui/react-components';
import { teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import { LanguageContext } from '../../../components/Wrapper';
import { AccessibilityContext } from '../EditingInterface';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '100%',
  },
  settingItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  select: {
    width: '100%', 
    maxWidth: '200px', 
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
    const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'highContrast'>('dark');

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value as 'dark' | 'light' | 'highContrast';
        setSelectedTheme(selected);
        switch (selected) {
            case 'light':
                setTheme(teamsLightTheme);
                break;
            case 'dark':
                setTheme(teamsDarkTheme);
                break;
            case 'highContrast':
                setTheme(teamsHighContrastTheme);
                break;
            default:
                setTheme(teamsDarkTheme);
        }
    };

    const handleAccessibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.checked ? 'yes' : 'no';
        accessibility.setSelectedAccessibility(selected as 'yes' | 'no');
        if (selected === 'yes') {
            setTheme(teamsHighContrastTheme);
        } else {
            setTheme(teamsDarkTheme);
        }
    };

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settingItem}>
                <Label htmlFor="themeSelect">
                    <FormattedMessage id="settings.changeTheme" defaultMessage="Theme:" />
                </Label>
                <Select 
                    id="themeSelect"
                    value={selectedTheme}
                    onChange={handleThemeChange}
                    className={styles.select}
                >
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
                    className={styles.select}
                >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                </Select>
            </div>

            <div className={styles.settingItem}>
                <Switch
                    label={<FormattedMessage id="settings.accessibility" defaultMessage="Enable accessibility features" />}
                    checked={accessibility.selectedAccessibility === 'yes'}
                    onChange={handleAccessibilityChange}
                />
            </div>
        </div>
    );
};

export default Settings;