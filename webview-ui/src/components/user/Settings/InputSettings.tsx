import React, {useState} from 'react';
import { useNode } from '@craftjs/core';
import { InputProps, TooltipConfigInput } from '../../../types';
import { Input, Label, mergeClasses, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, useId, Tooltip } from '@fluentui/react-components';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';
import { Info16Regular } from "@fluentui/react-icons";


export const InputSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as InputProps
    }));

    const styles = usePropertyInspectorStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigInput[] = [
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "slider" },
        { label: "Font Color", content: "Change the text color.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Change the background color.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the border color.", propKey: "borderColor", type: "color" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the textbox are.", propKey: "borderRadius", type: "slider" },
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