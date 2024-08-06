import React, { useEffect } from 'react';
import { Button } from "@fluentui/react-components";
import { Folder24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4


const LoadButton: React.FC<{classes: any, pages: Page[], setPages: React.Dispatch<React.SetStateAction<Page[]>>, currentPageIndex: number}> = ({classes, pages, setPages, currentPageIndex}) => {
    const { actions } = useEditor();


    const handleLoad = () => {
        vscode.postMessage({
            command: 'loadFile',
        });
    };

    useEffect(() => {
        const handleMessage = (event: { data: any; }) => {
            const message = event.data;

            if (message.command === 'loadFiles') {
                const loadedPages = message.data.map((file: { fileName: string, fileData: string }) => {
                    try {
                        // const content = JSON.parse(file.fileData);
                        const content = JSON.parse(file.fileData);
                        return {
                            id: uuidv4(), // Generate a new random ID
                            name: file.fileName,
                            content: content
                        };
                    } catch (error) {
                        console.error("Error deserializing page content:", error);
                        return null;
                    }
                }).filter((page: any) => page !== null);
                setPages(loadedPages);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [setPages]);

    return (
        <Button className={classes.button} icon={<Folder24Regular />} appearance='outline' onClick={handleLoad}>Load</Button>
    );
};

export default LoadButton;

