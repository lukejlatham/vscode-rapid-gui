import React, { ReactNode, FC } from 'react';
import { Card } from '@fluentui/react-components';
import { useNode } from "@craftjs/core";

interface ContainerProps {
    children: ReactNode;
    // height?: string | number;
    // width?: string | number;
}

export const Container: FC<ContainerProps> = ({ children }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ height: "100%", width: "60vw" }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {children}
            </div>
        </Card>
    );
}

// height="100%" width="80vw"