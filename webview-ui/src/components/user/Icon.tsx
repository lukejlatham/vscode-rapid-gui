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
    useId,
    Tooltip,
    Label,
    SpinButton,
    SpinButtonOnChangeData,
    SpinButtonChangeEvent,
    Input
} from '@fluentui/react-components';
import { EmojiEditRegular, Info16Regular } from '@fluentui/react-icons';
import * as VscIcons from "react-icons/vsc"; // Import all icons from Material Design
import { IconProps, InputTooltipConfig as TooltipConfig } from '../../../../types';


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
    },
    colorInput: {
        width: "100%",
        borderRadius: "4px",
        height: "35px",
    },
    spinButton: {
        width: "95%",
    },
    visible: {
        color: tokens.colorNeutralForeground2BrandSelected,
    },
    label: {
        display: "flex",
        flexDirection: "row",
        columnGap: tokens.spacingVerticalS,
    },
    textInput: {
        width: "100%",
    },
});

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

const IconSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props,
    }));
    const styles = useStyles();

    // State for the dialog open state
    const [isOpen, setIsOpen] = useState(false);
    // State for the selected icon
    const [selectedIcon, setSelectedIcon] = useState<keyof typeof VscIcons>(props.selectedIcon);
    // State for the search query in the search box
    const [searchQuery, setSearchQuery] = useState("");

    // Function to handle icon click in the dialog
    const handleIconClick = (icon: keyof typeof VscIcons) => {
        setSelectedIcon(icon);
    };

    // Function to handle the confirm button click in the dialog
    const handleConfirm = () => {
        setProp((props: any) => {
            props.selectedIcon = selectedIcon;
        });
        setIsOpen(false);
        console.log(searchQuery);
        setSearchQuery("");
        console.log(searchQuery);
    };

    // Function to handle user input in the search box
    const handleSearchChange = (event: any, data: any) => {
        setSearchQuery(data.value || "");
    };

    // function to filter the icons based on the search
    const filteredIcons = Object.keys(VscIcons).filter(icon =>
        icon.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Generate a unique ID for the content of the tooltips
    const contentId = useId("content");
    // State for the tooltip visibility
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

    // Tooltip configuration
    const tooltips: TooltipConfig[] = [
        { label: "Icon Size", content: "Adjust the size of the icon.", propKey: "iconSize", type: "spinButton" },
        { label: "Icon Color", content: "Change the color of the icon.", propKey: "iconColor", type: "color" },
        { label: "Hyperlink", content: "Add a hyperlink to the icon.", propKey: "hyperlink", type: "text" },
    ];

    // Function to handle visibility change of the tooltip
    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
        setVisibleTooltip(isVisible ? tooltipKey : null);
    };

    return (
        <div className={styles.settingsContainer}>
            <Dialog
                open={isOpen}
                onOpenChange={(event, data) => setIsOpen(data.open)}
            >
                <DialogTrigger disableButtonEnhancement>
                    <Button icon={<EmojiEditRegular />} className={styles.dialogButton} appearance='secondary' size='large' onClick={() => setIsOpen(true)}>Change Icon</Button>
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
            {tooltips.map((tooltip, index) => (
                <div key={index}>
                    <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={styles.label}>
                        <Label>
                            {tooltip.label}
                        </Label>
                        <Tooltip
                            content={{
                                children: tooltip.content,
                                id: contentId,
                            }}
                            positioning="above-start"
                            withArrow
                            relationship="label"
                            onVisibleChange={(e, data) => handleVisibilityChange(tooltip.propKey, data.visible)}
                        >
                            <Info16Regular
                                tabIndex={0}
                                className={mergeClasses(visibleTooltip === tooltip.propKey && styles.visible)}
                            />
                        </Tooltip>
                    </div>

                    {tooltip.type === "color" ? (
                        <input
                            className={styles.colorInput}
                            type="color"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: IconProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            step={5}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: IconProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" && (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: IconProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) 
                }

                </div>
            ))}
        </div>
    );
}

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
