import React from 'react';
import { useEditor } from '@craftjs/core';
import { BackgroundProps } from '../../../../../types';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';
import {  SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData } from '@fluentui/react-components';



export const BackgroundSettings: React.FC = () => {
    const { query, actions: { setProp } } = useEditor();
    const props = query.node("ROOT").get().data.props as BackgroundProps;

    const nodeID = query.node('ROOT').get().id;
    const styles = usePropertyInspectorStyles();

    return (
        <div className={styles.settingsContainer}>
            <input
                className={styles.colorInput}
                type="color"
                defaultValue='#000000'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProp(nodeID, (props: BackgroundProps) => {
                        (props.backgroundColor) = e.target.value;
                    })}
            />
            <SpinButton
                className={styles.spinButton}
                defaultValue={props.rows}
                onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                    const value = data.value ? data.value : 0;
                    setProp(nodeID, (props: BackgroundProps) => {
                        (props.rows as number) = value;
                    });
                }}
            />
        </div>

    )
}