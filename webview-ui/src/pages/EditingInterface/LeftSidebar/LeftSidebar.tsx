import React, { useState } from 'react';
import { makeStyles, Divider, Subtitle2, Card, Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionToggleEventHandler } from "@fluentui/react-components";
import Header from './Header';
import ComponentButtons from './ComponentButtons';
import ProjectManagement from './ProjectManagementButtons';
import { Page } from "../../../types";

const useStyles = makeStyles({
    componentRoot: {
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignContent: 'center',
        gap: '10px',
        padding: '5px'
    },
    header: {
        display: 'flex',
        justifyContent: 'start',
    },
    projectManagement: {
        paddingTop: '20px',
        textAlign: 'center',
    },
    button: {
        // fontSize: '10px',
        // padding: '20px'
    },
});

const LeftSidebar: React.FC<{ classes: any, pages: Page[], setPages: React.Dispatch<React.SetStateAction<Page[]>>, currentPageIndex: number; }> = ({ classes, pages, setPages, currentPageIndex }) => {
    const localClasses = useStyles();
    const [openItems, setOpenItems] = useState(["ComponentLibrary", "ProjectManagement"]);
    const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
        setOpenItems(data.openItems);
    };

    return (
        <Card className={`${classes.componentRoot} ${localClasses.componentRoot}`}>
            <Header classes={localClasses} />
            <div className={localClasses.subtitleCentered}><Subtitle2>Component Library</Subtitle2></div>
            <Divider className={localClasses.divider} />
            {/* <ComponentButtons classes={localClasses} /> */}
            <ProjectManagement classes={localClasses} pages={pages} setPages={setPages} currentPageIndex={currentPageIndex}/>
        </Card>
    );
};

export default LeftSidebar;
 