import { Button } from '@fluentui/react-components';
import { useEditor, UserComponent } from '@craftjs/core';
import { BackgroundSettings } from './user/Settings/BackgroundSettings';
import { TableEditRegular } from '@fluentui/react-icons';

export const EditBackgroundButton: UserComponent = () => {
    const { connectors: { select } } = useEditor();
    // const { query } = useEditor();

    // const value = query.node("ROOT").get().data.props.backgroundColor;

    return (
        <Button
            icon={<TableEditRegular />}
            size='large' 
            appearance='secondary'
            ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                    select(ref, "ROOT");
                }
            }}
        >
            Edit Background
        </Button>
    );
};


EditBackgroundButton.craft = {
    displayName: "Background",
    related: {
        settings: BackgroundSettings
    }
};

