import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { Label, Input, Radio, RadioGroup, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from '@fluentui/react-components';
import { Info16Regular } from "@fluentui/react-icons";
import { TooltipConfigText, TextBoxProps } from '../../../types';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';


export const TextBoxSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as TextBoxProps
    }));

    const styles = usePropertyInspectorStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigText[] = [
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Change the text color.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Change the color of the box.", propKey: "backgroundColor", type: "color" },
        { label: "Placeholder", content: "Edit the text that appears before a user inputs text.", propKey: "placeholder", type: "text" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the textbox are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Height", content: "Adjust the number of height of your textbox", propKey: "height", type: "spinButton" },
        { label: "Width", content: "Adjust the number of width in your textbox.", propKey: "width", type: "spinButton" },
        { label: "Alignment", content: "Set the alignment of the Texbox.", propKey: "alignment", type: "alignment" },
    ];

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
                            onVisibleChange={(e, data) => setVisibleTooltip(data.visible ? tooltip.propKey : null)}
                        >
                            <Info16Regular
                                tabIndex={0}
                                className={mergeClasses(visibleTooltip === tooltip.propKey ? styles.visible : undefined)}
                            />
                        </Tooltip>
                    </div>
                    {tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: TextBoxProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "color" ? (
                        <input
                            className={styles.colorInput}
                            type="color"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextBoxProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: TextBoxProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "alignment" && (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: TextBoxProps) => {
                                    (props[tooltip.propKey] as 'left' | 'center' | 'right') = data.value as 'left' | 'center' | 'right';
                                }, 1000);
                            }}
                        >
                            <Radio key="left" label="Left" value="left" />
                            <Radio key="center" label="Center" value="center" />
                            <Radio key="right" label="Right" value="right" />
                        </RadioGroup>
                    )}
                </div>
            ))}
        </div>
    );
}
