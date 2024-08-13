import React, { useContext } from 'react';
import { EditBackgroundButton } from '../../../components/EditBackgroundButton';
import { LockGridSwitch } from './LockGridSwitch';
import { Select, Theme, useId } from '@fluentui/react-components';
import { teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import { LanguageContext } from '../../../components/Wrapper';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-router-dom';

const Settings: React.FC<{
    classes: any;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}> = ({ classes, theme, setTheme }) => {
    const language = useContext(LanguageContext);


    // 
    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTheme = event.target.value;
        switch (selectedTheme) {
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
                setTheme(teamsDarkTheme); // Default to dark theme
        }
    };

    return (
        <div>
            <label htmlFor="themeSelect">
                <FormattedMessage id="settings.changeTheme" defaultMessage="Change the extension's theme: " />
            </label>
            <Select id="themeSelect" onChange={handleThemeChange}>
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

            <label htmlFor="languageSelect">
                <FormattedMessage id="settings.changeLanguage" defaultMessage="Change the extension's language: " />
            </label>
            <Select id="languageSelect" defaultValue={language.value} onChange={language.changeLanguage}>
                <option value="fr">French</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </Select>
                
        </div>
    );
};

export default Settings;