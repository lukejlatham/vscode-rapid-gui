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
    componentButtons: {
        // fontSize: '10px',
        // padding: '20px'
        cursor: 'move !important',
    },
    switchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
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
            <Accordion
                openItems={openItems}
                onToggle={handleToggle}
                multiple
                collapsible
            >
                <AccordionItem value="ProjectManagement">
                    <AccordionHeader size="large">Project Management</AccordionHeader>
                    <AccordionPanel>
                        <ProjectManagement classes={localClasses} pages={pages} setPages={setPages} currentPageIndex={currentPageIndex} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="ComponentLibrary">
                    <AccordionHeader size="large">Component Library</AccordionHeader>
                    <AccordionPanel>
                        <ComponentButtons classes={localClasses} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default LeftSidebar;
