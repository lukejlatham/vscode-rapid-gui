import { Button } from "@fluentui/react-components";
import { DocumentSave24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";

const SaveButton: React.FC<{ classes: any, pages: Page[], currentPageIndex: number;}> = ({ classes, pages, currentPageIndex }) => {
    const { query } = useEditor();

    const handleSave = async () => {
        

        // Serialize the current state of the editor
        const serializedData = query.serialize();
        console.log('Saved serialized result:', serializedData);

        // Serializes the content of each page
        const pagesContents = pages.map((page, index) => 
            index === currentPageIndex 
                ? serializedData  // Use serializedData for the current page
                : JSON.stringify(page.content)  // Use existing content for other pages
        );

        //Creates array of the names of each page
        const pagesNames = pages.map(page => page.name);

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
