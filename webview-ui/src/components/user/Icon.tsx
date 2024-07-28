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
    mergeClasses
} from '@fluentui/react-components';
import { EmojiEditRegular } from '@fluentui/react-icons';
import * as FaIcons from "react-icons/fa"; // Import all icons from Material Design

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
        // '&:active': {
        //     backgroundColor: tokens.colorNeutralBackground1Pressed,
        // },
    },
    selectedIconButton: {
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
    },
    dialogButton: {
        // width: '100%',
        marginTop: '10px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // border: `1px solid ${tokens.colorNeutralStroke1}`,
        // borderRadius: tokens.borderRadiusMedium,
        // cursor: 'pointer',
        // '&:hover': {
        //     backgroundColor: tokens.colorNeutralBackground1Hover,
        // },
    },
});

interface IconProps {
    selectedIcon: keyof typeof FaIcons;
}

export const Icon: UserComponent<IconProps> = ({ selectedIcon }) => {
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    // Fetch the icon component from FaIcons, defaulting to null if not found
    const IconComponent = FaIcons[selectedIcon] as React.ComponentType<any> | undefined;

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
    const [selectedIcon, setSelectedIcon] = useState<keyof typeof FaIcons>(props.selectedIcon);

    const handleIconClick = (icon: keyof typeof FaIcons) => {
        setSelectedIcon(icon);
    };

    const handleConfirm = () => {
        actions.setProp((props: any) => {
            props.selectedIcon = selectedIcon;
        });
        setIsOpen(false);
    };

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
                            <div className={styles.iconGrid}>
                                {Object.keys(FaIcons).map((icon) => {
                                    const IconComponent = FaIcons[icon as keyof typeof FaIcons];

                                    if (IconComponent && typeof IconComponent === 'function') {
                                        return (
                                            <Button
                                                size='large'
                                                key={icon}
                                                className={mergeClasses(styles.iconButton, selectedIcon === icon ? styles.selectedIconButton : '')}
                                                onClick={() => handleIconClick(icon as keyof typeof FaIcons)}
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
    selectedIcon: "FaHome", // Replace with a default Material Design icon name
};

Icon.craft = {
    displayName: "Icon",
    props: IconDefaultProps,
    related: {
        settings: IconSettings,
    },
};
