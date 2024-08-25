import React, { useContext } from 'react';
import { AccessibilityContext } from '../EditingInterface';
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowHookUpLeft24Regular, ArrowHookUpRight24Regular } from '@fluentui/react-icons';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import { useEditor } from "@craftjs/core";
import { Page } from '../../../types';
import DownloadCodeButton from './DownloadCodeButton';
import { FormattedMessage } from 'react-intl';

const ProjectManagement: React.FC<{ classes: any, pages: Page[], setPages: React.Dispatch<React.SetStateAction<Page[]>>, currentPageIndex: number; }> = ({ classes, pages, setPages, currentPageIndex }) => {
    const { actions } = useEditor();
    const accessibility = useContext(AccessibilityContext);

    const handleUndo = () => {
        actions.history.undo();
    };

    const handleRedo = () => {
        actions.history.redo();
    };

    return (
        <div className={classes.bottomButtons}>
            <Tooltip content={<FormattedMessage id="leftSidebar.undo" defaultMessage="Undo" />} relationship="label" positioning="after" appearance="inverted">
                <Button
                    style={{ width: "100%" }}
                    size={
                        accessibility.selectedAccessibility === 'yes' ? 'large' : 'medium'
                    } className={classes.button} icon={<ArrowHookUpLeft24Regular />} onClick={handleUndo}>
                    {accessibility.selectedAccessibility === 'yes' && (<FormattedMessage id="leftSidebar.undo" defaultMessage="Undo" />)}
                </Button>
            </Tooltip>
            <Tooltip content={<FormattedMessage id="leftSidebar.redo" defaultMessage="Redo" />} relationship="label" positioning="after" appearance="inverted">
                <Button
                    style={{ width: "100%" }}
                    size={
                        accessibility.selectedAccessibility === 'yes' ? 'large' : 'medium'
                    } className={classes.button} icon={<ArrowHookUpRight24Regular />} onClick={handleRedo}>
                    {accessibility.selectedAccessibility === 'yes' && (<FormattedMessage id="leftSidebar.redo" defaultMessage="Redo" />)}
                </Button>
            </Tooltip>
            <SaveButton classes={classes} pages={pages} currentPageIndex={currentPageIndex} />
            <LoadButton classes={classes} pages={pages} setPages={setPages} />
            <DownloadCodeButton classes={classes} pages={pages} currentPageIndex={currentPageIndex} />

        </div>
    );
};

export default ProjectManagement;
