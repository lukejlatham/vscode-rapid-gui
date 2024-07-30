import React from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { BackgroundProps } from '../../../../../types';
import { SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Label, Input, Button, useId, Tooltip, mergeClasses } from '@fluentui/react-components';
import { Info16Regular } from '@fluentui/react-icons';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';

export const GridCellSettings: React.FC = () => {
    const { gridCell } = useNode((node) => ({
        gridCell: node,
    })
    );
    const { query, actions: { setProp } } = useEditor();
    const props = query.node("ROOT").get().data.props as BackgroundProps;
    const backgroundId = query.node('ROOT').get().id;

    const gridCellId = gridCell.data.custom?.id
    const handleRemoveItem = (i: string) => {
        setProp('ROOT', (props: BackgroundProps) => {
            console.log(props.layout)
          props.layout = props.layout.filter((item) => item.i !== i);
        });
      };

    const styles = usePropertyInspectorStyles();

    return (
        <div className={styles.settingsContainer}>
            <Button
                onClick={() => handleRemoveItem(gridCellId)}
            >
                Delete
            </Button>
        </div>
    )
}