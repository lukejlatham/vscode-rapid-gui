import React, { useState } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import {
    Button,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogContent,
    DialogActions,
    makeStyles,
    tokens,
    mergeClasses,
    SearchBox,
} from '@fluentui/react-components';
import { EmojiEditRegular } from '@fluentui/react-icons';
import * as VscIcons from "react-icons/vsc"; // Import all icons from Material Design

const useStyles = makeStyles({
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '5px',
    },
    iconGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        maxHeight: '400px',
        overflowY: 'auto',
    },
    iconButton: {
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    selectedIconButton: {
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
    },
    dialogButton: {
        marginTop: '10px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbox: {
        width: '100%',
        marginBottom: '10px',
    }
});

interface IconProps {
    selectedIcon: keyof typeof VscIcons;
}

export const Icon: UserComponent<IconProps> = ({ selectedIcon }) => {
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
            <IconComponent />
        </div>
    );
};

const IconSettings: React.FC = () => {
    const { actions, props } = useNode((node) => ({
        props: node.data.props,
    }));
    const styles = useStyles();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<keyof typeof VscIcons>(props.selectedIcon);
    const [searchQuery, setSearchQuery] = useState("");

    const handleIconClick = (icon: keyof typeof VscIcons) => {
        setSelectedIcon(icon);
    };

    const handleConfirm = () => {
        actions.setProp((props: any) => {
            props.selectedIcon = selectedIcon;
        });
        setIsOpen(false);
        console.log(searchQuery);
        setSearchQuery("");
        console.log(searchQuery);
    };

    const handleSearchChange = (event: any, data: any) => {
        setSearchQuery(data.value || "");
    };

    const filteredIcons = Object.keys(VscIcons).filter(icon =>
        icon.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.settingsContainer}>
            <Dialog
                open={isOpen}
                onOpenChange={(event, data) => setIsOpen(data.open)}
            >
                <DialogTrigger disableButtonEnhancement>
                    <Button icon={<EmojiEditRegular/>}className={styles.dialogButton} appearance='secondary' size='large' onClick={() => setIsOpen(true)}>Change Icon</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Select an Icon</DialogTitle>
                        <DialogContent>
                        <SearchBox
                                className={styles.searchbox}
                                size='large'
                                placeholder="Search icons..."
                                onChange={handleSearchChange}
                            />
                            <div className={styles.iconGrid}>
                                {filteredIcons.map((icon) => {
                                    const IconComponent = VscIcons[icon as keyof typeof VscIcons];
                                    if (IconComponent && typeof IconComponent === 'function') {
                                        return (
                                            <Button
                                                size='large'
                                                key={icon}
                                                className={mergeClasses(styles.iconButton, selectedIcon === icon ? styles.selectedIconButton : '')}
                                                onClick={() => handleIconClick(icon as keyof typeof VscIcons)}
                                            >
                                                <IconComponent />
                                            </Button>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                            </DialogTrigger>
                            <Button appearance="primary" onClick={handleConfirm}>Confirm</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    );
}

export const IconDefaultProps: IconProps = {
    selectedIcon: "VscHome", // Replace with a default Material Design icon name
};

Icon.craft = {
    displayName: "Icon",
    props: IconDefaultProps,
    related: {
        settings: IconSettings,
    },
};
