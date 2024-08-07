import React from 'react';
import { Button } from "@fluentui/react-components";
import { CodeRegular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";

const DownloadCodeButton: React.FC<{ classes: any, pages: Page[], currentPageIndex: number; }> = ({ classes, pages, currentPageIndex }) => {
    const { query } = useEditor();

    const handleDownloadCode = async () => {
        const serializedData = query.serialize();
        console.log('Current serialized state:', serializedData);

        const pagesContents = pages.map((page, index) => 
            index === currentPageIndex 
                ? JSON.stringify(serializedData)  // Stringify serializedData for consistency
                : JSON.stringify(page.content)
        );

        const pagesNames = pages.map(page => page.name);

        console.log('Contents to be sent:', pagesContents);
        console.log('FileNames to be sent:', pagesNames);

        vscode.postMessage({
            command: 'downloadCode',
            contents: pagesContents,
            fileNames: pagesNames,
        });
    };

    return (
        <Button className={classes.button} icon={<CodeRegular />} appearance='outline'
            onClick={handleDownloadCode}>Download Code</Button>
    );
};

export default DownloadCodeButton;