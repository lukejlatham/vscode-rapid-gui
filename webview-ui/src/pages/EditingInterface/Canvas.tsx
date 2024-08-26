import React from 'react';
import { Frame } from "@craftjs/core";
import { Background, BackgroundDefaultProps } from '../../components/user/Background';
import { useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { vscode } from '../../utilities/vscode';
import { CanvasProps } from '../../types';



const Canvas: React.FC<CanvasProps> = ({ classes }) => {

    const { query } = useEditor();

    useEffect(() => {

        const serializeNodes = () => {
            return query.serialize();
        };
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;

            switch (message.command) {
                case 'sendTree':
                    const serializedNodes = serializeNodes();
                    vscode.postMessage({ command: 'treeData', data: serializedNodes });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [query]);

    return (
            <Frame>
                <Background {...BackgroundDefaultProps} />
            </Frame>
    );
};

export default Canvas;
