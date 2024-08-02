import React from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { BackgroundProps, ContainerProps, TooltipConfigContainer as TooltipConfig } from '../../../types';
import { Input, Label, Button, makeStyles, SpinButton, Radio, RadioGroup, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from "@fluentui/react-components";
import { Info16Regular, Delete24Regular } from '@fluentui/react-icons';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';


export const ContainerSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as ContainerProps
    }));


    const styles = usePropertyInspectorStyles();

    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);
    const tooltips: TooltipConfig[] = [
        { label: "Background Color", content: "Change the background color of the container.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the border color of the container.", propKey: "borderColor", type: "color" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the container are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Height", content: "Set the height of the container.", propKey: "height", type: "spinButton" },
        { label: "Width", content: "Set the width of the container.", propKey: "width", type: "spinButton" },
        { label: "Padding", content: "Adjust the padding of the container.", propKey: "padding", type: "spinButton" },
        { label: "Direction", content: "Set the direction of the contents of the container.", propKey: "flexDirection", type: "direction"},
        { label: "Justify Content", content: "Set how the contents of the container should be justified.", propKey: "justifyContent", type: "justifyContent"},
        { label: "Align Items", content: "Set how the contents of the container should be aligned.", propKey: "alignItems", type: "alignItems"},
        { label: "Gap", content: "Adjust the gap between components within the container.", propKey: "gap", type: "spinButton"},
        { label: "Shadow Color", content: "Change the color of the shadow.", propKey: "shadowColor", type: "color" },
        { label: "Shadow Offset X", content: "Set the horizontal offset of the shadow.", propKey: "shadowOffsetX", type: "spinButton" },
        { label: "Shadow Offset Y", content: "Set the vertical offset of the shadow.", propKey: "shadowOffsetY", type: "spinButton" },
        { label: "Shadow Blur", content: "Set the blur radius of the shadow.", propKey: "shadowBlur", type: "spinButton" },
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ContainerProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            min={0}
                            max={100}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: ContainerProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: ContainerProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "alignItems" ? (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: ContainerProps) => {
                                    (props[tooltip.propKey] as 'flex-start' | 'center' | 'flex-end') = data.value as 'flex-start' | 'center' | 'flex-end';
                                }, 1000);
                            }}
                        >
                            <Radio key="start" label="Start" value="flex-start" />
                            <Radio key="center" label="Center" value="center" />
                            <Radio key="end" label="end" value="flex-end" />
                        </RadioGroup>
                    ) : tooltip.type === "justifyContent" ? (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: ContainerProps) => {
                                    (props[tooltip.propKey] as "flex-start" | "center" | "flex-end" | "space-between" | "space-around") = data.value as "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
                                }, 1000);
                            }}
                        >
                            <Radio key="start" label="Start" value="flex-start" />
                            <Radio key="center" label="Center" value="center" />
                            <Radio key="end" label="End" value="flex-end" />
                            <Radio key="space-between" label="Space Between" value="space-between" />
                            <Radio key="space-around" label="Space Around" value="space-around" />
                        </RadioGroup>
                    ) : tooltip.type === "direction" && (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: ContainerProps) => {
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
    )
}