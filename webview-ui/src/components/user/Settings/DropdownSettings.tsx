import React, { useCallback, useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import { DropdownProps, TooltipConfigDropdown } from '../../../types';
import { Info16Regular } from "@fluentui/react-icons";
import { Label, Input, SpinButton, Tooltip, useId, mergeClasses, SpinButtonChangeEvent, SpinButtonOnChangeData, RadioGroup, Radio } from '@fluentui/react-components';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';

export const DropdownSettings: React.FC = () => {
    const defaultOptionLabels = (count: number) =>
        Array.from({ length: count }, (_, i) => `Option ${i + 1}`);
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as DropdownProps
    }));

    const styles = usePropertyInspectorStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigDropdown[] = [
        { label: "Header", content: "Edit the header of the dropdown.", propKey: "header", type: "text" },
        { label: "Number of Options", content: "Adjust the number of options to display in the dropdown.", propKey: "numberOfOptions", type: "spinButton" },
        { label: "Option Labels", content: "Edit the label for each option.", propKey: "optionLabels", type: "options" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "slider" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
    ];

    const updateOptionLabels = useCallback((numberOfOptions: number) => {
        setProp((props: DropdownProps) => {
            const currentLabels = props.optionLabels || [];
            const updatedLabels = defaultOptionLabels(numberOfOptions);

            if (currentLabels.length >= numberOfOptions) {
                props.optionLabels = currentLabels.slice(0, numberOfOptions);
            } else {
                props.optionLabels = [...currentLabels, ...updatedLabels.slice(currentLabels.length)];
            }
        });
    }, [setProp]);

    useEffect(() => {
        updateOptionLabels(props.numberOfOptions);
    }, [props.numberOfOptions, updateOptionLabels]);

    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
        setVisibleTooltip(isVisible ? tooltipKey : null);
    };

    return (
        <div className={styles.settingsContainer}>
            {tooltips.map((tooltip, index) => (
                <div key={index}>
                    <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={styles.label}>
                        <Label>{tooltip.label}</Label>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: DropdownProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: DropdownProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                    if (tooltip.propKey === 'numberOfOptions') {
                                        updateOptionLabels(Number(value));
                                    }
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: DropdownProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                });
                            }}
                        />
                    ) : tooltip.type === "options" ? (
                        <div className={styles.optionLabels}>
                            {props.optionLabels.map((label, index) => (
                                <div key={index}>
                                    <Input
                                        className={styles.textInput}
                                        type="text"
                                        defaultValue={label}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setProp((props: DropdownProps) => {
                                                props.optionLabels[index] = e.target.value;
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : tooltip.type === "direction" && (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: DropdownProps) => {
                                    (props[tooltip.propKey] as 'row' | 'column') = data.value as 'row' | 'column';
                                }, 1000);
                            }}
                        >
                            <Radio key="row" label="Row" value="row" />
                            <Radio key="column" label="Column" value="column" />
                        </RadioGroup>
                    )
                    }
                </div>
            ))}
        </div>
    );
}
