import React from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { BackgroundProps, GridCellProps, TooltipConfigGridCell as TooltipConfig } from '../../../../../types';
import { Input, Label, Button, makeStyles, SpinButton, Radio, RadioGroup, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, mergeClasses } from "@fluentui/react-components";
import { Info16Regular, Delete24Regular } from '@fluentui/react-icons';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';


const useStyles = makeStyles({
    deleteButton: {
        marginTop: '10px',
    }
});

export const GridCellSettings: React.FC = () => {
    const { gridCell, gridProps, actions } = useNode((node) => ({
        gridCell: node,
        gridProps: node.data.props as GridCellProps,
    }));
    const { query, actions: { setProp } } = useEditor();
    const props = query.node("ROOT").get().data.props as BackgroundProps;
    console.log('Grid Cell props: ', gridProps);

    const gridCellId = gridCell.data.custom?.id
    
    // function to remove GridCell from layout
    const handleRemoveItem = (i: string) => {
        setProp('ROOT', (props: BackgroundProps) => {
            console.log(props.layout)
            props.layout = props.layout.filter((item) => item.i !== i);
        });
    };

    const styles = usePropertyInspectorStyles();
    const styles2 = useStyles();

    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);
    const tooltips: TooltipConfig[] = [
        { label: "Direction", content: "Set the direction of the grid cell.", propKey: "flexDirection", type: "direction"},
        { label: "Justify Content", content: "Set how the contents of the cell should be justified.", propKey: "justifyContent", type: "justifyContent"},
        { label: "Align Items", content: "Set how the contents of the cell should be aligned.", propKey: "alignItems", type: "alignItems"},
        { label: "Gap", content: "Adjust the gap between components within the cell.", propKey: "gap", type: "spinButton"},
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
                    {tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            min={0}
                            defaultValue={gridProps[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                actions.setProp((props: GridCellProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={gridProps[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                actions.setProp((props: GridCellProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "alignItems" ? (
                        <RadioGroup
                            defaultValue={gridProps[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                actions.setProp((props: GridCellProps) => {
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
                            defaultValue={gridProps[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                actions.setProp((props: GridCellProps) => {
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
                            defaultValue={gridProps[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                actions.setProp((props: GridCellProps) => {
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
            <Button
                size='large'
                className={styles2.deleteButton}
                appearance='primary'
                icon={<Delete24Regular />}
                onClick={() => handleRemoveItem(gridCellId)}
            >
                Delete
            </Button>
        </div>
    )
}