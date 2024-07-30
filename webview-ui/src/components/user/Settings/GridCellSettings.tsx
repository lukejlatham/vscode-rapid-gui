import React from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { BackgroundProps } from '../../../../../types';
import { makeStyles, Button } from '@fluentui/react-components';
import { Delete24Regular } from '@fluentui/react-icons';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';


const useStyles = makeStyles({
    deleteButton: {
        marginTop: '10px',
    }
});

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
    const styles2 = useStyles();

    return (
        <div className={styles.settingsContainer}>
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