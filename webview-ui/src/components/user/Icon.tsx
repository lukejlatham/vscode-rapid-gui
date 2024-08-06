import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
// import * as VscIcons from "react-icons/vsc";
import * as FluentIcons from "@fluentui/react-icons";
import { IconProps, iconSchema } from '../../types';
import { IconSettings } from './Settings/IconSettings';

export const Icon: UserComponent<IconProps> = (props) => {
    const validatedProps = iconSchema.parse(props);
    const { selectedIcon, iconSize, iconColor } = validatedProps;
    
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    // Fetch the icon component from VscIcons, defaulting to null if not found
    const IconComponent = FluentIcons[selectedIcon as keyof typeof FluentIcons] as React.ComponentType<any>;

    if (!IconComponent) {
        console.warn(`Icon component for ${String(selectedIcon)} is not found.`);
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
    selectedIcon: "Home24Regular",
    iconSize: 24,
    iconColor: "#lightslategray",
    hyperlink: "",
};

Icon.craft = {
    displayName: "Icon",
    props: IconDefaultProps,
    related: {
        settings: IconSettings,
    },
};
