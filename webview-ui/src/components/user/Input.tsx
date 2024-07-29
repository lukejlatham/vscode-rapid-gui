import React, {useState} from 'react';
import {useNode, UserComponent} from '@craftjs/core';
import {Label, Input, Radio, RadioGroup, makeStyles, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, tokens, mergeClasses} from '@fluentui/react-components';
import {Info16Regular} from "@fluentui/react-icons";
import {InputProps, TooltipConfigInput} from '../../../../types';

const useStyles = makeStyles({
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '5px',
    },
    colorInput: {
        width: "100%",
        borderRadius: "4px",
        height: "35px",
    },
    textInput: {
        width: "100%",
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
});

export const UserInput: UserComponent<InputProps> = ({ fontSize, fontColor, backgroundColor, placeholder, borderRadius}) => {
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    return (
        <input
        ref={(ref: HTMLInputElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }}
        placeholder={placeholder}
        style={{
            fontSize: fontSize,
            color: fontColor,
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            border: 'none',
        }}
        />
    );
};

const InputSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as InputProps
    }));

    const styles = useStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigInput[] = [
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Change the text color.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Change the background color.", propKey: "backgroundColor", type: "color" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the textbox are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Placeholder", content: "Edit the text that appears before a user inputs text", propKey: "placeholder", type: "text" },
    ];
    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
        setVisibleTooltip(isVisible ? tooltipKey : null);
    };

    return (
        <div className={styles.settingsContainer}>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: InputProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: InputProps) => {
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
                                setProp((props: InputProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export const InputDefaultProps: InputProps = {
    fontSize: 16,
    fontColor: '#000000',
    backgroundColor: '#FFFFFF',
    placeholder: 'Enter text here...',
    borderRadius: 2,
};

UserInput.craft = {
    displayName: 'Input',
    props: InputDefaultProps,
    related: {
        settings: InputSettings,
    },
};