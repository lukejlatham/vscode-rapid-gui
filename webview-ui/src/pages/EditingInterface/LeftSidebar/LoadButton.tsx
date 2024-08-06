import React, { useEffect } from 'react';
import { Button } from "@fluentui/react-components";
import { Folder24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";

const LoadButton: React.FC<{classes: any, pages: Page[], currentPageIndex: number}> = ({classes, pages, currentPageIndex}) => {
    const { actions } = useEditor();

    const handleLoad = () => {
        vscode.postMessage({
            command: 'loadFile',
            fileName: pages[currentPageIndex].name,
        });
    };

    useEffect(() => {
        const handleMessage = (event: { data: any; }) => {
            const message = event.data;

            if (message.command === 'loadFile') {
                actions.deserialize(JSON.stringify(message.data));
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [actions]);

    return (
        <Button className={classes.button} icon={<Folder24Regular />} appearance='outline' onClick={handleLoad}>Load</Button>
    );
};

export default LoadButton;

