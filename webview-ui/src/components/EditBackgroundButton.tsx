import React from 'react';
import { Button, Input, Label } from '@fluentui/react-components';
import { useEditor, UserComponent, useNode } from '@craftjs/core';
import { BackgroundProps } from './user/Background';

interface EditBackgroundButtonProps {
    nodeId: string;
}

export const EditBackgroundButton: UserComponent<EditBackgroundButtonProps> = ({ nodeId }) => {
    const { connectors: { select } } = useEditor();
    return (
        <Button
            ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                    select(ref, nodeId);
                }
            }}
        >
            Edit Background
        </Button>
    );
};

export const BackgroundSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props as BackgroundProps
    }));

    return (
        <div>
            <h2>Background Settings</h2>
            <Label>
                Background Color
                <input
                    type="color"
                    value={props.backgroundColor}
                    onChange={(e) => setProp((props: BackgroundProps) => props.backgroundColor = e.target.value)}
                />
            </Label>
            <Label>
                Rows
                <Input
                    type="number"
                    value={props.rows.toString()}
                    onChange={(e) => setProp((props: BackgroundProps) => props.rows = parseInt(e.target.value, 10))}
                />
            </Label>
            <Label>
                Columns
                <Input
                    type="number"
                    value={props.columns.toString()}
                    onChange={(e) => setProp((props: BackgroundProps) => props.columns = parseInt(e.target.value, 10))}
                />
            </Label>
        </div>
    );
};



EditBackgroundButton.craft = {
    related: {
        settings: BackgroundSettings
    }
};