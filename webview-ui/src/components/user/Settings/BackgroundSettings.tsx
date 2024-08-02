import React from 'react';
import { useEditor } from '@craftjs/core';
import { BackgroundProps } from '../../../../../types';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';
import { SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Label, Input, Button, useId, Tooltip, mergeClasses } from '@fluentui/react-components';
import { Info16Regular, LockClosedRegular, LockOpenRegular , AddSquareRegular} from '@fluentui/react-icons';


export const BackgroundSettings: React.FC = () => {
    const { query, actions: { setProp } } = useEditor();
    const props = query.node("ROOT").get().data.props as BackgroundProps;

    const nodeID = query.node('ROOT').get().id;
    const styles = usePropertyInspectorStyles();

    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

    const tooltips = [
        { label: "Background Color", content: "Change the color of the background.", propKey: "backgroundColor", type: "color" },
        { label: "Rows", content: "Change the number of rows the grid.", propKey: "rows", type: "spinButton" },
        { label: "Columns", content: "Change the number of columns in the grid.", propKey: "columns", type: "spinButton" },
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
                            defaultValue={props.backgroundColor}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp(nodeID, (props: BackgroundProps) => {
                                (props.backgroundColor) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            min={1}
                            defaultValue={props[tooltip.propKey as keyof typeof props]}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp(nodeID, (props: BackgroundProps) => {
                                    (props[tooltip.propKey as keyof BackgroundProps] as number) = value;
                                });
                            }}
                        />
                    ) : tooltip.type === "text" && (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey as keyof typeof props]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp(nodeID, (props: BackgroundProps) => {
                                    (props[tooltip.propKey as keyof BackgroundProps] as string) = e.target.value;
                                });
                            }}
                        />
                    )}
                </div>
            ))}
            <div className={styles.addAndLockButtons}>
            <Button
                // add tooltip to explain this button
                icon={props.lockedGrid ? <LockClosedRegular /> : <LockOpenRegular />}
                onClick={() => setProp(nodeID, (props: BackgroundProps) => {
                    props.lockedGrid = !props.lockedGrid;
                })}>
                {props.lockedGrid ? 'Unlock Grid' : 'Lock Grid'}
            </Button>
            <Button
            icon={<AddSquareRegular/>}
            onClick={() => setProp(nodeID, (props: BackgroundProps) => {
                const newItem = {
                    i: (props.layout.length > 0 ? (parseInt(props.layout[props.layout.length - 1].i) + 1).toString() : '0'),
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    maxW: props.rows,
                    maxH: props.columns
                  };
                  props.layout = [...props.layout, newItem];
            }
            )}
            >
                Add Item
            </Button>
            </div>
        </div>

    )
}