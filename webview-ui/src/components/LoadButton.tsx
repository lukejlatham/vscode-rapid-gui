import React, { useEffect } from 'react';
import { Button } from "@fluentui/react-components";
import { Folder24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../utilities/vscode';

const LoadButton: React.FC = () => {
    const { actions } = useEditor();

    const handleLoad = () => {
        vscode.postMessage({
            command: 'loadFile',
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
        <Button icon={<Folder24Regular />} appearance='outline' onClick={handleLoad}>Load</Button>
    );
};

export default LoadButton;
