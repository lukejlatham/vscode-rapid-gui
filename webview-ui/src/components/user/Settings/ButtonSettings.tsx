import React from "react";
import { Input, Label, SpinButton, Radio, RadioGroup, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { useNode } from "@craftjs/core";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { ButtonProps, TooltipConfigButton as TooltipConfig } from "../../../types";

export const ButtonSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as ButtonProps
    }));
    const propInspector = usePropertyInspectorStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

    const tooltips: TooltipConfig[] = [
        { label: "Font Color", content: "Changed the color of the text on the button.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Changed the color of the button.", propKey: "backgroundColor", type: "color" },
        { label: "Border Color", content: "Change the color of the border.", propKey: "bordercolor", type: "color" },
        { label: "Text", content: "Edit the text that appears in the button.", propKey: "text", type: "text" },
        { label: "Font Size", content: "Adjust the size of the text on the button.", propKey: "fontSize", type: "spinButton" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the button are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Width", content: "Set how wide the button is.", propKey: "width", type: "spinButton" },
        { label: "Height", content: "Set how tall the button is.", propKey: "height", type: "spinButton" },
        { label: "Icon", content: "Add an icon to the button. Choosing 'Left' or 'Right' will add an icon at that position.", propKey: "icon", type: "icon" },
        { label: "Shadow Color", content: "Change the color of the shadow.", propKey: "shadowColor", type: "color" },
        { label: "Shadow Offset X", content: "Set the horizontal offset of the shadow.", propKey: "shadowOffsetX", type: "spinButton" },
        { label: "Shadow Offset Y", content: "Set the vertical offset of the shadow.", propKey: "shadowOffsetY", type: "spinButton" },
        { label: "Shadow Blur", content: "Set the blur radius of the shadow.", propKey: "shadowBlur", type: "spinButton" },
        { label: "Hyperlink", content: "Add a hyperlink to the button.", propKey: "hyperlink", type: "text" },
      ];

    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
        setVisibleTooltip(isVisible ? tooltipKey : null);
    };

    return (
        <div className={propInspector.settingsContainer}>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={propInspector.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: ButtonProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={propInspector.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: ButtonProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "icon" && (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: ButtonProps) => {
                                    (props[tooltip.propKey] as 'none' | 'left' | 'right') = data.value as 'none' | 'left' | 'right';
                                }, 1000);
                            }}
                        >
                            <Radio key="none" label="None" value="none" />
                            <Radio key="left" label="Left" value="left" />
                            <Radio key="right" label="Right" value="right" />
                        </RadioGroup>
                    )}
                </div>
            ))}
        </div>
    );
};