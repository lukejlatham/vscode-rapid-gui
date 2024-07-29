import React, { useState } from "react";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { useNode } from "@craftjs/core";
import { makeStyles, tokens, mergeClasses, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Input, Label, SearchBox, SpinButton, Tooltip, useId, SpinButtonChangeEvent, SpinButtonOnChangeData } from "@fluentui/react-components";
import { IconProps, TooltipConfigIcon as TooltipConfig } from "../../../../../types";
import * as VscIcons from "react-icons/vsc"; // Import all icons from Material Design
import { EmojiEditRegular, Info16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
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
});

export const IconSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props as IconProps,
    }));
    const styles = useStyles();
    const propInspector = usePropertyInspectorStyles(); 

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
        <div className={propInspector.settingsContainer}>
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
                    <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={propInspector.label}>
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
                                className={mergeClasses(visibleTooltip === tooltip.propKey && propInspector.visible)}
                            />
                        </Tooltip>
                    </div>

                    {tooltip.type === "color" ? (
                        <input
                            className={propInspector.colorInput}
                            type="color"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: IconProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={propInspector.spinButton}
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
                            className={propInspector.textInput}
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