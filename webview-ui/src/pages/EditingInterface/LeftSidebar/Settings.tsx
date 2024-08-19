import React, { useContext, useState } from 'react';
import { Select, Theme, useId, Label } from '@fluentui/react-components';
import { teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import { LanguageContext } from '../../../components/Wrapper';
import { AccessibilityContext } from '../EditingInterface';
import { FormattedMessage } from 'react-intl';
import { set } from 'lodash';

const Settings: React.FC<{
    classes: any;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}> = ({ classes, setTheme, theme }) => {
    const language = useContext(LanguageContext);
    const accessibility = useContext(AccessibilityContext);
    const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'highContrast' >('dark');
    const themeDropdownId = useId('themeDropdown');
    const languageDropdownId = useId('languageDropdown');
    const accessibilityDropdownId = useId('accessibilityDropdown');


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
                setTheme(teamsDarkTheme); // Default to dark theme
        }
    };

    const handleAccessibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        accessibility.setSelectedAccessibility(selected as 'yes' | 'no');
        if (selected === 'yes') {
            setTheme(teamsHighContrastTheme);
        } else if (selected === 'no') {
            setTheme(teamsDarkTheme);
        }
    };

    return (
        <div style={{maxWidth: '100%'}}>
            <Label htmlFor={themeDropdownId}>
                <FormattedMessage id="settings.changeTheme" defaultMessage="Change the extension's theme: " />
            </Label>
            <Select id={themeDropdownId} value={selectedTheme} onChange={handleThemeChange}>
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

            <Label htmlFor={languageDropdownId}>
                <FormattedMessage id="settings.changeLanguage" defaultMessage="Change the extension's language: " />
            </Label>
            <Select id={languageDropdownId} value={language.locale} onChange={language.changeLanguage}>
                <option value="en">English</option>
                <option value="fr">French</option>
            </Select>

            <Label htmlFor={accessibilityDropdownId}>
                <FormattedMessage id="settings.accessibility" defaultMessage="Enable accessibility features" />
            </Label>
            <Select id={accessibilityDropdownId} value={accessibility.selectedAccessibility as string} onChange={handleAccessibilityChange}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </Select>
            {/* { accessibility.selectedAccessibility === 'yes' ? (
                <p> Accessibility on</p>
            )
            : accessibility.selectedAccessibility === 'no' ? (
                <p> Accessibility off</p>)
            : null} */}

                
        </div>
    );
};

export default Settings;