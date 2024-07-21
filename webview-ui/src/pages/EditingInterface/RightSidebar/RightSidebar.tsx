import React from 'react';
import PropertyInspector from './PropertyInspector';
import AiChat from './ChatComponent';
import { Card, makeStyles } from '@fluentui/react-components';

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
        <div className={`${classes.rightSidebar} ${localClasses.sidebar}`}>
            <Card className={localClasses.propertyInspector}>
                <PropertyInspector />
            </Card>
            <Card className={`${localClasses.propertyInspector} ${localClasses.copilotItem}`}>
                <AiChat />
            </Card>
        </div>
    );
};

export default RightSidebar;
