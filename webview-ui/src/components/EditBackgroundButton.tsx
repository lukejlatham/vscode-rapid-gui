import { Button } from '@fluentui/react-components';
import { useEditor, UserComponent } from '@craftjs/core';
import { EditBackgroundButtonProps } from '../../../types';
import { BackgroundSettings } from './user/Settings/BackgroundSettings';

export const EditBackgroundButton: UserComponent<EditBackgroundButtonProps> = ({ nodeId }) => {
    const { connectors: { select } } = useEditor();
    const { query } = useEditor();

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


EditBackgroundButton.craft = {
    displayName: "Background",
    related: {
        settings: BackgroundSettings
    }
};

