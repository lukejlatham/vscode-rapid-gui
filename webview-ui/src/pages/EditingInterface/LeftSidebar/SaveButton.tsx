import { Button } from "@fluentui/react-components";
import { DocumentSave24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";

// const LOCAL_STORAGE_KEY = 'userPages';

const SaveButton: React.FC<{ classes: any, pages: Page[], updateCurrentPage: () => void, currentPageIndex: number;}> = ({ classes, pages, updateCurrentPage, currentPageIndex }) => {
    const { query } = useEditor();

    const handleSave = async () => {
        

        // array of the content of each page
        updateCurrentPage();

        const serializedData = query.serialize();
        console.log('Saved serialized result:', serializedData);

        const pagesContents = pages.map((page, index) => 
            index === currentPageIndex 
                ? serializedData  // Use serializedData for the current page
                : JSON.stringify(page.content)  // Use existing content for other pages
        );
        console.log('pages content:', pagesContents);
        //array of the names of each page
        const pagesNames = pages.map(page => page.name);

        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
        vscode.postMessage({
            command: 'saveFile',
            contents: pagesContents,
            fileNames: pagesNames,
        });
    };

    return (
        <>
            <Button className={classes.button} icon={<DocumentSave24Regular />} appearance='outline'
                onClick={handleSave}>Save</Button>
        </>
    );
};

export default SaveButton;
