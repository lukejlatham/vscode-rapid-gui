import React, { ReactNode, FC } from 'react';
import { Card, Label } from '@fluentui/react-components';
import { useNode, UserComponent } from "@craftjs/core";
import './Background.css';

interface BackgroundProps {
    children?: ReactNode;
    backgroundColor: string;
}

export const Background: UserComponent<BackgroundProps> = ({ children, backgroundColor }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <Card 
            appearance='filled' 
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }} 
            className="background"
            style={{ background: backgroundColor }}
        >
            {children}
        </Card>
    );
}

const BackgroundSettings: FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as BackgroundProps
    }));

    return (
        <div className="settings-container">
            <Label>
                Background Color
                <input
                    className="input"
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
