import React, { useEffect, useState, useCallback } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { Label, Input, SpinButton, Tooltip, useId, mergeClasses, SpinButtonChangeEvent, SpinButtonOnChangeData, makeStyles, tokens, RadioGroup, Radio } from '@fluentui/react-components';
import { Info16Regular } from "@fluentui/react-icons";
import {TooltipConfigCheckbox, CheckboxProps } from '../../../../types';

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
    checkboxes: {
        display: "flex",
        gap: "5px",
        paddingTop: "2px",
    },
    checkboxLabels: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
});

export const Checkbox: UserComponent<CheckboxProps> = ({ header, optionLabels, numberOfBoxes, fontSize, fontColor, direction }) => {
    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    const styles = useStyles();

    return (
        <div
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
        >
            <label style={{ fontSize: fontSize, color: fontColor }}>{header}</label>
            <div className={styles.checkboxes} style={{flexDirection: direction}}>
                {optionLabels.map((optionLabel, index) => (
                    <div key={index}>
                        <input type="checkbox" id={optionLabel} name={optionLabel} />
                        <label style={{ fontSize: `${fontSize}px`, color: fontColor }}>{optionLabel}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CheckboxSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as CheckboxProps
    }));

    const styles = useStyles();
    const contentId = useId('content');
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfigCheckbox[] = [
        { label: "Label", content: "Edit the label for the checkboxes.", propKey: "header", type: "text" },
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
                        <div className={styles.checkboxLabels}>
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

const defaultOptionLabels = (count: number) =>
    Array.from({ length: count }, (_, i) => `Option ${i + 1}`);

export const CheckboxDefaultProps: CheckboxProps = {
    header: 'Checkboxes',
    numberOfBoxes: 2,
    optionLabels: ['Option 1', 'Option 2'],
    fontSize: 14,
    fontColor: '#FFFFFF',
    direction: "row"
};

Checkbox.craft = {
    displayName: 'Checkbox',
    props: CheckboxDefaultProps,
    related: {
        settings: CheckboxSettings,
    },
};
