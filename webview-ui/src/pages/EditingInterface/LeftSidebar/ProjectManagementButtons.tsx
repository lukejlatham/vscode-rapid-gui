import React from 'react';
import { Subtitle2, Divider, Button } from "@fluentui/react-components";
import { ArrowHookUpLeft24Regular, ArrowHookUpRight24Regular } from '@fluentui/react-icons';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import { useEditor } from "@craftjs/core";
import { Page } from '../../../types';
import DownloadCodeButton from './DownloadCodeButton';

const ProjectManagement: React.FC<{ classes: any, pages: Page[], setPages: React.Dispatch<React.SetStateAction<Page[]>>, currentPageIndex: number; }> = ({ classes, pages, setPages, currentPageIndex }) => {
    const { actions } = useEditor();

    const handleUndo = () => {
        actions.history.undo();
    };

    const handleRedo = () => {
        actions.history.redo();
    };

    return (
        <div className={classes.componentRoot}>
            <Button size="large" className={classes.button} icon={<ArrowHookUpLeft24Regular />} onClick={handleUndo}>Undo</Button>
            <Button size="large" className={classes.button} icon={<ArrowHookUpRight24Regular />} onClick={handleRedo}>Redo</Button>
            <SaveButton classes={classes} pages={pages} currentPageIndex={currentPageIndex}/>
            <LoadButton classes={classes} pages={pages} setPages={setPages}/>
            <DownloadCodeButton classes={classes} pages={pages} currentPageIndex={currentPageIndex}/>
            
        </div>
    );
};

export default ProjectManagement;
