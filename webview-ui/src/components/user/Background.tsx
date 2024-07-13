import React, { ReactNode, FC } from 'react';
import { Card, Input, Label } from '@fluentui/react-components';
import { useNode, UserComponent } from "@craftjs/core";

interface BackgroundProps {
    children?: ReactNode;
    backgroundColor: string;
    width: number;
    height: number;
}

export const Background: UserComponent<BackgroundProps> = ({ children, backgroundColor, width, height }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ background: backgroundColor, width: `${width}vw`, height: `${height}%` }}>
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
            <Label>
                Width
                <Input
                    style={{ width: "100%"}}
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={props.width.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: BackgroundProps) => (props.width = parseInt(e.target.value, 10)), 1000);
                    }}
                />
                </Label>
            <Label>
                Height
                <Input
                    style={{ width: "100%"}}
                    type="number"
                    min={0}
                    max={200}
                    defaultValue={props.height.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: BackgroundProps) => (props.height = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </Label>
        </div>
    );
};
export const BackgroundDefaultProps: BackgroundProps = {
    backgroundColor: '#333',
    height: 100,
    width: 60
}

Background.craft = {
    displayName: "Background",
    props: BackgroundDefaultProps,
    related: {
        settings: BackgroundSettings
    }
};