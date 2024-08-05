import React from 'react';
import { Subtitle2, Divider, Button } from "@fluentui/react-components";
import { ArrowHookUpLeft24Regular, ArrowHookUpRight24Regular } from '@fluentui/react-icons';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import { useEditor } from "@craftjs/core";
import { Page } from '../../../types';

const ProjectManagement: React.FC<{ classes: any, pages: Page[], currentPageIndex: number }> = ({ classes, pages, currentPageIndex }) => {
    const { actions } = useEditor();

    const handleUndo = () => {
        actions.history.undo();
    };

    const handleRedo = () => {
        actions.history.redo();
    };

    return (
        <>
            <div className={classes.projectManagement}><Subtitle2>Project Management</Subtitle2></div>
            <Divider className={classes.divider}></Divider>
            <SaveButton classes={classes} pages={pages} currentPageIndex={currentPageIndex}/>
            <LoadButton classes={classes} pages={pages} currentPageIndex={currentPageIndex}/>
            <Button className={classes.button} icon={<ArrowHookUpRight24Regular />} appearance='outline' onClick={handleRedo}>Redo</Button>
            <Button className={classes.button} icon={<ArrowHookUpLeft24Regular />} appearance='outline' onClick={handleUndo}>Undo</Button>
        </>
    );
};

export default ProjectManagement;
