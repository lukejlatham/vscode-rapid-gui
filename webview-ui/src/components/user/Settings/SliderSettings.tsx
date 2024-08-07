import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { SliderProps, TooltipConfigSlider } from '../../../types';
import { Input, Label, RadioGroup, Radio, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from '@fluentui/react-components';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';
import { Info16Regular } from "@fluentui/react-icons";

export const SliderSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as SliderProps
    }));

    const styles = usePropertyInspectorStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigSlider[] = [
        { label: "Header", content: "Edit the header for the slider.", propKey: "header", type: "text" },
        { label: "Minimum Value", content: "Set the minimum value for the slider.", propKey: "min", type: "spinButton" },
        { label: "Maximum Value", content: "Set the maximum value for the slider.", propKey: "max", type: "spinButton" },
        { label: "Step", content: "Set the step value for the slider.", propKey: "step", type: "spinButton" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
        { label: "Slider Color", content: "Adjust the color of the slider.", propKey: "backgroundColor", type: "color" },
    ];

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: SliderProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: SliderProps) => {
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
                                setProp((props: SliderProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                });
                            }}
                        />
                    )
                    }
                </div>
            ))}
        </div>
    );
};