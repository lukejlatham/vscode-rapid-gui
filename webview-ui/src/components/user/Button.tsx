import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label } from "@fluentui/react-components";

interface ButtonProps {
    backgroundColor: string;
    fontSize: number;
    fontColor: string;
    borderRadius: number;
    width: number;
    height: number;
    text: string;
}

export const Button: UserComponent<ButtonProps> = ({ backgroundColor, fontSize, borderRadius, text, fontColor, width, height }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <button ref={(ref: HTMLButtonElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ padding: "10px", color: fontColor, border: 'none', backgroundColor, fontSize: `${fontSize}px`, borderRadius: `${borderRadius}px`, width: `${width}px`, height: `${height}px` }}>
            {text}
        </button>
    );
}

const ButtonSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as ButtonProps
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px' }}>
            <Label>
                Font Color
                <input
                    style={{ width: "100%", borderRadius: "4px", height: "35px" }}
                    type="color"
                    defaultValue={props.fontColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => props.fontColor = e.target.value)} />
            </Label>
            <Label>
                Background Color
                <input
                    style={{ width: "100%", borderRadius: "4px", height: "35px" }}
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => props.backgroundColor = e.target.value)} />
            </Label>
            <Label>
                Font Size
                <Input
                    type="number"
                    value={props.fontSize.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </Label>
            <Label>
                Border Radius
                <Input
                    type="number"
                    min={0}
                    defaultValue={props.borderRadius.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.borderRadius = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </Label>
            <Label>
                Width
                <Input
                    style={{ width: "100%"}}
                    type="number"
                    min={0}
                    max={900}
                    defaultValue={props.width.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.width = parseInt(e.target.value, 10)), 1000);
                    }}
                />
                </Label>
            <Label>
                Height
                <Input
                    style={{ width: "100%"}}
                    type="number"
                    min={0}
                    max={800}
                    defaultValue={props.height.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.height = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </Label>
            <Label>
                Text
                <Input
                    type="text"
                    defaultValue={props.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.text = e.target.value), 1000);
                    }}
                />
            </Label>
        </div>
    );
};

export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#0047AB",
    fontColor: "white",
    fontSize: 20,
    borderRadius: 4,
    text: "New Button",
    width: 150,
    height: 80
};

Button.craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};