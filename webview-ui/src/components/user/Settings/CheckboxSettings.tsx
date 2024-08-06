import React, { useCallback, useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import { CheckboxProps, TooltipConfigCheckbox } from '../../../types';
import { Input, Label, RadioGroup, Radio, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from '@fluentui/react-components';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';
import { Info16Regular } from "@fluentui/react-icons";

export const CheckboxSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as CheckboxProps
    }));

    const defaultOptionLabels = (count: number) =>
        Array.from({ length: count }, (_, i) => `Option ${i + 1}`);
    const styles = usePropertyInspectorStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigCheckbox[] = [
        { label: "Header", content: "Edit the header for the checkboxes.", propKey: "header", type: "text" },
        { label: "Number of Options", content: "Adjust the number of checkboxes to display.", propKey: "numberOfBoxes", type: "spinButton" },
        { label: "Checkbox Labels", content: "Edit the label for each checkbox.", propKey: "optionLabels", type: "options" },
        { label: "Font Size", content: "Adjust the font size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Adjust the color of the text.", propKey: "fontColor", type: "color" },
        { label: "Direction", content: "Set if you want the checkboxes to be displayed in a row or a column.", propKey: "direction", type: "direction" },
    ];

    const updateOptionLabels = useCallback((numberOfBoxes: number) => {
        setProp((props: CheckboxProps) => {
          const currentLabels = props.optionLabels || [];
          const updatedLabels = defaultOptionLabels(numberOfBoxes);
    
          if (currentLabels.length >= numberOfBoxes) {
            props.optionLabels = currentLabels.slice(0, numberOfBoxes);
          } else {
            props.optionLabels = [...currentLabels, ...updatedLabels.slice(currentLabels.length)];
          }
        });
      }, [setProp]);
    
      useEffect(() => {
        updateOptionLabels(props.numberOfBoxes);
      }, [props.numberOfBoxes, updateOptionLabels]);

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: CheckboxProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: CheckboxProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                    if (tooltip.propKey === 'numberOfBoxes') {
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
                                setProp((props: CheckboxProps) => {
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
                                  setProp((props: CheckboxProps) => {
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
                                setProp((props: CheckboxProps) => {
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