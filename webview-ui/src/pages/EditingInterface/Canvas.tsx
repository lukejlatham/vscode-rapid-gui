import React from 'react';
import { Frame, Element } from "@craftjs/core";
import { Background, BackgroundDefaultProps } from '../../components/user/Background';
import { Container } from '../../components/user/Container';
import { useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import { vscode } from '../../utilities/vscode';

const Canvas: React.FC<{ classes: any }> = ({ classes }) => {

   const { query, actions } = useEditor();

    useEffect(() => {

    const deserializeNodes = (serializedNodes: string) => {
        actions.deserialize(serializedNodes);
    };

    const serializeNodes = () => {
        return query.serialize();
    };
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;

            switch (message.command) {
                case 'loadTree':
                    deserializeNodes(message.data);
                    vscode.postMessage({ command: 'treeLoaded', success: true });
                    break;
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
    }, [query, actions]);


    return (
        <div className={classes.canvas}>
            <Frame>
                <Element is={Background} id="background" {...BackgroundDefaultProps}>
                    <Element is={Container} id="root" canvas>
                        {/* Your editable components go here */}
                    </Element>
                </Element>
            </Frame>
        </div>
    );
};

export default Canvas;
