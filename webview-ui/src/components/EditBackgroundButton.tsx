import { Button } from '@fluentui/react-components';
import { useEditor, UserComponent } from '@craftjs/core';
import { BackgroundSettings } from './user/Settings/BackgroundSettings';
import { TableEditRegular } from '@fluentui/react-icons';
import { FormattedMessage } from 'react-intl';

export const EditBackgroundButton: UserComponent<{classes: any}> = ({classes}) => {
    const { connectors: { select } } = useEditor();


    return (
        <Button
            className={classes.button}
            icon={<TableEditRegular />}
            size='medium' 
            appearance='primary'
            ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                    select(ref, "ROOT");
                }
            }}
        >
            <FormattedMessage 
                id="layout.editGrid"
                defaultMessage="Edit Grid"
            />
        </Button>
    );
};


EditBackgroundButton.craft = {
    displayName: "Background",
    related: {
        settings: BackgroundSettings
    }
};

