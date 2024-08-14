import React, { useCallback, useEffect } from "react";
import { Input, Label, SpinButton, Radio, Slider, SliderOnChangeData, RadioGroup, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { useNode } from "@craftjs/core";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { ComponentSettingsProps, CheckboxesProps, RadioButtonProps, DropdownProps, ImageProps } from "../../../types";
import { UserImageUploadButton } from "../../UserImageUploadButton";
import { Hover } from "vscode";

export const ComponentSettings: React.FC<ComponentSettingsProps> = ({ componentProps, tooltips }) => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as typeof componentProps
    }));


    const propsWithOptions = (props as CheckboxesProps || props as RadioButtonProps || props as DropdownProps);
    const propInspector = usePropertyInspectorStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
        setVisibleTooltip(isVisible ? tooltipKey : null);
    };

    // Default option labels for checkboxes, radio buttons, and dropdowns
    const defaultOptionLabels = (count: number) =>
        Array.from({ length: count }, (_, i) => `Option ${i + 1}`);

    // Update option labels based on the number of options
    const updateOptionLabels = useCallback((numberOfOptions: number) => {
        setProp((props: typeof propsWithOptions) => {
            const currentLabels = props.optionLabels || [];
            const updatedLabels = defaultOptionLabels(numberOfOptions);

            if (currentLabels.length >= numberOfOptions) {
                props.optionLabels = currentLabels.slice(0, numberOfOptions);
            } else {
                props.optionLabels = [...currentLabels, ...updatedLabels.slice(currentLabels.length)];
            }
        });
    }, [setProp]);

    // Update option labels when the number of options changes
    useEffect(() => {
        if ('numberOfBoxes' in props) {
            updateOptionLabels((props as CheckboxesProps).numberOfBoxes);
        }
        else if ('numberOfButtons' in props) {
            updateOptionLabels((props as RadioButtonProps).numberOfButtons);
        } else if ('numberOfOptions' in props) {
            updateOptionLabels((props as DropdownProps).numberOfOptions);
        }
    }, [props, updateOptionLabels]);

    // Handle image upload
    const handleImageUpload = (filePath: string) => {
        setProp((props: ImageProps) => {
            props.src = filePath;
        }, 1000);
    };


    return (
        <div className={propInspector.settingsContainer}>
            { // Display image upload button if the component has an 'src' prop
                'src' in props && (
                    <UserImageUploadButton onUpload={handleImageUpload} />
                )}
            {tooltips.map((tooltip, index) => {
                const propValue = props[tooltip.propKey as keyof typeof props];

                return (
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
                                defaultValue={propValue as string}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: typeof componentProps) => {
                                    (props[tooltip.propKey as keyof typeof props] as string) = e.target.value;
                                })}
                            />
                        ) : tooltip.type === "slider" ? (
                            <div className={propInspector.sliderSection}>
                                <Label>{propValue}</Label>
                                <Slider
                                    className={propInspector.slider}
                                    defaultValue={propValue as number}
                                    onChange={(e: React.FormEvent<HTMLInputElement>, data: SliderOnChangeData) => {
                                        setProp((props: typeof componentProps) => {
                                            (props[tooltip.propKey as keyof typeof props] as number) = data.value;
                                        }, 1000);
                                    }}
                                />
                            </div>
                        ) : tooltip.type === "spinButton" ? (
                            <SpinButton
                                defaultValue={propValue as number}
                                min={1}
                                max={15}
                                onChange={(e: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as number) = data.value as number;
                                    }, 1000);
                                }}
                                className={propInspector.spinButton}
                            />
                        ) : tooltip.type === "text" ? (
                            <Input
                                className={propInspector.textInput}
                                type="text"
                                defaultValue={propValue as string}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as string) = e.target.value;
                                    }, 1000);
                                }}
                            />
                        ) : tooltip.type === "icon" ? (
                            <RadioGroup
                                defaultValue={propValue as string}
                                layout="horizontal-stacked"
                                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as 'none' | 'left' | 'right') = data.value as 'none' | 'left' | 'right';
                                    }, 1000);
                                }}
                            >
                                <Radio key="none" label="None" value="none" />
                                <Radio key="left" label="Left" value="left" />
                                <Radio key="right" label="Right" value="right" />
                            </RadioGroup>
                        ) : tooltip.type === "textAlign" ? (
                            <RadioGroup
                                defaultValue={propValue as string}
                                layout="horizontal-stacked"
                                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as 'left' | 'center' | 'right' | 'justify') = data.value as 'left' | 'center' | 'right' | 'justify';
                                    }, 1000);
                                }}
                            >
                                <Radio key="left" label="Left" value="left" />
                                <Radio key="center" label="Center" value="center" />
                                <Radio key="right" label="Right" value="right" />
                                <Radio key="justify" label="Justify" value="justify" />
                            </RadioGroup>
                        ) : tooltip.type === "direction" ? (
                            <RadioGroup
                                defaultValue={props[tooltip.propKey as keyof typeof props]}
                                layout="horizontal-stacked"
                                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as 'row' | 'column') = data.value as 'row' | 'column';
                                    }, 1000);
                                }}
                            >
                                <Radio key="row" label="Row" value="row" />
                                <Radio key="column" label="Column" value="column" />
                            </RadioGroup>
                        ) : tooltip.type === "options" && 'optionLabels' in props ? (
                            <div className={propInspector.optionLabels}>
                                {propsWithOptions.optionLabels.map((label, index) => (
                                    <div key={index}>
                                        <Input
                                            className={propInspector.textInput}
                                            type="text"
                                            defaultValue={label}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setProp((props: typeof propsWithOptions) => {
                                                    props.optionLabels[index] = e.target.value;
                                                });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : tooltip.type === "justifyContent" ? (
                            <RadioGroup
                                defaultValue={props[tooltip.propKey as keyof typeof props]}
                                layout="vertical"
                                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as "flex-start" | "center" | "flex-end" | "space-between" | "space-around") = data.value as "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
                                    }, 1000);
                                }}
                            >
                                <Radio key="start" label="Start" value="flex-start" />
                                <Radio key="center" label="Center" value="center" />
                                <Radio key="end" label="End" value="flex-end" />
                                <Radio key="space-between" label="Space Between" value="space-between" />
                                <Radio key="space-around" label="Space Around" value="space-around" />
                            </RadioGroup>
                        ) : tooltip.type === "alignItems" ? (
                            <RadioGroup
                                defaultValue={props[tooltip.propKey as keyof typeof props]}
                                layout="vertical"
                                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                    setProp((props: typeof componentProps) => {
                                        (props[tooltip.propKey as keyof typeof props] as 'flex-start' | 'center' | 'flex-end') = data.value as 'flex-start' | 'center' | 'flex-end';
                                    }, 1000);
                                }}
                            >
                                <Radio key="start" label="Start" value="flex-start" />
                                <Radio key="center" label="Center" value="center" />
                                <Radio key="end" label="End" value="flex-end" />
                            </RadioGroup>
                        )

                            : null
                        }
                    </div>
                );
            })}
        </div>
    );
};