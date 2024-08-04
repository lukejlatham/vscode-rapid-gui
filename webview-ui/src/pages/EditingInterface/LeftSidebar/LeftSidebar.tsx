import React from 'react';
import { makeStyles, Divider, Subtitle2, Card } from "@fluentui/react-components";
import Header from './Header';
import ComponentButtons from './ComponentButtons';
import ProjectManagement from './ProjectManagementButtons';

const useStyles = makeStyles({
    componentRoot: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignContent: 'center',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    searchBox: {
        paddingTop: '20px',
    },
    subtitleCentered: {
        textAlign: 'center',
    },
    divider: {
        flexGrow: 0,
    },
    projectManagement: {
        paddingTop: '20px',
        textAlign: 'center',
    },
    button: {
        padding: '10px 7px',
    },
});

const LeftSidebar: React.FC<{ classes: any }> = ({ classes }) => {
    const localClasses = useStyles();

    return (
        <Card className={`${classes.componentRoot} ${localClasses.componentRoot}`}>
            <Header classes={localClasses} />
            <div className={localClasses.subtitleCentered}><Subtitle2>Component Library</Subtitle2></div>
            <Divider className={localClasses.divider} />
            <ComponentButtons classes={localClasses} />
            <ProjectManagement classes={localClasses} />
        </Card>
    );
};

export default LeftSidebar;
