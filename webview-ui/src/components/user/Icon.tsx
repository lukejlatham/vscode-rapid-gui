import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import * as VscIcons from "react-icons/vsc"; // Import all icons from Material Design
import { IconProps } from '../../../../types';
import { IconSettings } from './Settings/IconSettings';

export const Icon: UserComponent<IconProps> = ({ selectedIcon, iconSize, iconColor, hyperlink }) => {
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    // Fetch the icon component from VscIcons, defaulting to null if not found
    const IconComponent = VscIcons[selectedIcon] as React.ComponentType<any> | undefined;

    if (!IconComponent) {
        console.warn(`Icon component for ${String(selectedIcon)} is not a valid React component.`);
        return null; // Handle the case where the component doesn't exist
    }

    return (
        <div ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} >       
                <IconComponent size={iconSize} style={{ color: iconColor }} />
        </div>
    );
};

export const IconDefaultProps: IconProps = {
    selectedIcon: "VscHome", // Replace with a default Material Design icon name
    iconSize: 24,
    iconColor: "#FFFFFF",
    hyperlink: "",
};

Icon.craft = {
    displayName: "Icon",
    props: IconDefaultProps,
    related: {
        settings: IconSettings,
    },
};
