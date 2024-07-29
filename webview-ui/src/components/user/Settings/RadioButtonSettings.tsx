import React, { useCallback, useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import { RadioButtonProps, TooltipConfigRadio } from '../../../../../types';
import { Info16Regular } from "@fluentui/react-icons";
import { Label, Input, SpinButton, Tooltip, useId, mergeClasses, SpinButtonChangeEvent, SpinButtonOnChangeData, RadioGroup, Radio } from '@fluentui/react-components';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';


export const RadioButtonSettings: React.FC = () => {
    const defaultOptionLabels = (count: number) =>
        Array.from({ length: count }, (_, i) => `Option ${i + 1}`);
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as RadioButtonProps
    }));

    const styles = usePropertyInspectorStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigRadio[] = [
        { label: "Label", content: "Edit the label for the radio buttons.", propKey: "header", type: "text" },
        { label: "Number of Buttons", content: "Adjust the number of buttons to display.", propKey: "numberOfButtons", type: "spinButton" },
        { label: "Button Labels", content: "Edit the label for each radio button option.", propKey: "optionLabels", type: "options" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
        { label: "Direction", content: "Set if you want the buttons to be displayed in a row or a column.", propKey: "direction", type: "direction" },
    ];

    const updateOptionLabels = useCallback((numberOfButtons: number) => {
        setProp((props: RadioButtonProps) => {
            const currentLabels = props.optionLabels || [];
            const updatedLabels = defaultOptionLabels(numberOfButtons);

            if (currentLabels.length >= numberOfButtons) {
                props.optionLabels = currentLabels.slice(0, numberOfButtons);
            } else {
                props.optionLabels = [...currentLabels, ...updatedLabels.slice(currentLabels.length)];
            }
        });
    }, [setProp]);

    useEffect(() => {
        updateOptionLabels(props.numberOfButtons);
    }, [props.numberOfButtons, updateOptionLabels]);

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: RadioButtonProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: RadioButtonProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                    if (tooltip.propKey === 'numberOfButtons') {
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
                                setProp((props: RadioButtonProps) => {
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
                                            setProp((props: RadioButtonProps) => {
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
                                setProp((props: RadioButtonProps) => {
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
};
