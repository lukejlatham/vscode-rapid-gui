import React, { ReactNode, FC } from 'react';
import { Card, Label } from '@fluentui/react-components';
import { useNode, UserComponent } from "@craftjs/core";

interface BackgroundProps {
    children?: ReactNode;
    backgroundColor: string;
}

export const Background: UserComponent<BackgroundProps> = ({ children, backgroundColor }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ background: backgroundColor, width: '100%', height: '100%' }}>
            <div>
                {children}
            </div>
        </Card>
    );
}

const BackgroundSettings: FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as BackgroundProps
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px' }}>
            <Label>
                Background Color
                <input
                    style={{ width: "100%", borderRadius: "4px", height: "35px" }}
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: BackgroundProps) => props.backgroundColor = e.target.value)} />
            </Label>
        </div>
    );
};

export const BackgroundDefaultProps: BackgroundProps = {
    backgroundColor: '#333',
}

Background.craft = {
    displayName: "Background",
    props: BackgroundDefaultProps,
    related: {
        settings: BackgroundSettings
    }
};
