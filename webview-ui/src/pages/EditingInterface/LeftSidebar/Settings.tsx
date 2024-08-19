import React, { useContext } from 'react';
import { Select, Theme, useId, FluentProvider } from '@fluentui/react-components';
import { teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import { LanguageContext } from '../../../components/Wrapper';
import { FormattedMessage } from 'react-intl';

const Settings: React.FC<{
    classes: any;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}> = ({ classes, setTheme }) => {
    const language = useContext(LanguageContext);
    // const theme = useContext(FluentProvider);

    const themeDropdownId = useId('themeDropdown');
    const languageDropdownId = useId('languageDropdown');

    // const [selectedTheme, setSelectedTheme] = React.useState<string>('dark');

    // 
    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        // setSelectedTheme(selected);
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
                setTheme(teamsDarkTheme); // Default to dark theme
        }
    };

    return (
        <div>
            <label htmlFor={themeDropdownId}>
                <FormattedMessage id="settings.changeTheme" defaultMessage="Change the extension's theme: " />
            </label>
            <Select id={themeDropdownId} defaultValue={"dark"} onChange={handleThemeChange}>
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

            <label htmlFor={languageDropdownId}>
                <FormattedMessage id="settings.changeLanguage" defaultMessage="Change the extension's language: " />
            </label>
            <Select id={languageDropdownId} defaultValue={language.locale} onChange={language.changeLanguage}>
                <option value="en">English</option>
                <option value="fr">French</option>
            </Select>
                
        </div>
    );
};

export default Settings;