import { Button } from "@fluentui/react-components";
import { DocumentSave24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";

const LOCAL_STORAGE_KEY = 'userPages';

const SaveButton: React.FC<{classes: any, pages: Page[], currentPageIndex: number}> = ({classes, pages, currentPageIndex}) => {
    const { query } = useEditor();

    const handleSave = () => {
        console.log('pages:', pages);
        console.log('currentPageIndex:', currentPageIndex);
        console.log('current page name:', pages[currentPageIndex].name);
        const serializedData = query.serialize();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
        vscode.postMessage({
            command: 'saveFile',
            content: serializedData,
            fileName: pages[currentPageIndex].name,
        });
    };

    return (
        <>
            <Button className={classes.button} icon={<DocumentSave24Regular />} appearance='outline' onClick={handleSave}>Save</Button>
        </>
    );
};

export default SaveButton;
