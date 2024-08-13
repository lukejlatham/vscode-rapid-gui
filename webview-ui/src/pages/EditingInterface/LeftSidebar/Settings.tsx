import React from 'react';
import { EditBackgroundButton } from '../../../components/EditBackgroundButton';
import { LockGridSwitch } from './LockGridSwitch';
import { Select, Theme, useId } from '@fluentui/react-components';
import { teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';

const Settings: React.FC<{
    classes: any;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}> = ({ classes, theme, setTheme }) => {

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
            <label htmlFor="themeSelect">Change the extension's theme: </label>
            <Select id="themeSelect" onChange={handleThemeChange}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="highContrast">High Contrast</option>
            </Select>
        </div>
    );
};

export default Settings;