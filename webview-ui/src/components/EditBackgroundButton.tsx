import React from 'react';
import { Button, Input, Label, makeStyles, SpinButton, tokens, SpinButtonChangeEvent, SpinButtonOnChangeData } from '@fluentui/react-components';
import { useEditor, UserComponent, useNode } from '@craftjs/core';
import { BackgroundProps, EditBackgroundButtonProps } from '../../../types';

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
    spinButton: {
        width: "95%",
    },
    textInput: {
        width: "100%",
    },
    visible: {
        color: tokens.colorNeutralForeground2BrandSelected,
    },
    label: {
        display: "flex",
        flexDirection: "row",
        columnGap: tokens.spacingVerticalS,
    },
});

export const EditBackgroundButton: UserComponent<EditBackgroundButtonProps> = ({ nodeId }) => {
    const { connectors: { select } } = useEditor();
    const { query, actions: { setProp } } = useEditor();

    const value = query.node(nodeId).get().data.props.backgroundColor;

    return (
        <Button
            ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                    select(ref, nodeId);
                }
            }}
        >
            {value ? `Edit Background: ${value}` : 'Edit Background'}
        </Button>
    );
};

export const BackgroundSettings: React.FC = () => {
    const { query, actions: { setProp } } = useEditor();
    const props = query.node("ROOT").get().data.props as BackgroundProps;

    const nodeID = query.node('ROOT').get().id;
    const styles = useStyles();
    // const selectedNodeIdString = Array.from(selectedNodeId).join(',')

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
//     return (
//         <div>
//             <h2>Background Settings</h2>
//             <Label>
//                 Background Color
//                 <input
//                     type="color"
//                     value={props.backgroundColor}
//                     onChange={(e) => setProp((props: BackgroundProps) => props.backgroundColor = e.target.value)}
//                 />
//             </Label>
//             <Label>
//                 Rows
//                 <Input
//                     type="number"
//                     value={props.rows.toString()}
//                     onChange={(e) => setProp((props: BackgroundProps) => props.rows = parseInt(e.target.value, 10))}
//                 />
//             </Label>
//             <Label>
//                 Columns
//                 <Input
//                     type="number"
//                     value={props.columns.toString()}
//                     onChange={(e) => setProp((props: BackgroundProps) => props.columns = parseInt(e.target.value, 10))}
//                 />
//             </Label>
//         </div>
//     );
// };



EditBackgroundButton.craft = {
    displayName: "Background",
    related: {
        settings: BackgroundSettings
    }
};