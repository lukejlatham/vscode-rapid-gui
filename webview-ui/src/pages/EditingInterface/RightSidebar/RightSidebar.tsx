import React from 'react';
import PropertyInspector from './PropertyInspector';
import AiChat from './ChatComponent';
import { Card, makeStyles } from '@fluentui/react-components';
import { ThemeDropdown } from '../../../Features/theming/ThemeDropdown';

const useLocalStyles = makeStyles({
    sidebar: {
        flexDirection: 'column',
        height: '100%',
        gap: '10px',
    },
    propertyInspector: {
        display: 'flex',
    },
    copilotItem: {
        flexGrow: 1,
        display: 'flex',
    },
});


const RightSidebar: React.FC<{ classes: any }> = ({ classes }) => {
    const localClasses = useLocalStyles();

    return (
        // <div className={`${classes.rightSidebar} ${localClasses.sidebar}`}>
                <PropertyInspector />
            //  <Card className={`${localClasses.propertyInspector} ${localClasses.copilotItem}`}>
                // <ThemeDropdown />
            // </Card>
        // </div>
    );
};

export default RightSidebar;
