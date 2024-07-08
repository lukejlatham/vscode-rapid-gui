import React, { ReactNode, FC } from 'react';
import { Card } from '@fluentui/react-components';
import { useNode } from "@craftjs/core";

interface CanvasProps {
    children?: ReactNode;

}

export const Canvas: FC<CanvasProps> = ({ children }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ height: "100%", width: "60vw", background: "none" }}>
            <div>
                {children}
            </div>
        </Card>
    );
}