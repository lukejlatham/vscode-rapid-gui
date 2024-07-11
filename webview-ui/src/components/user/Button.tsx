import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label } from "@fluentui/react-components";

interface ButtonProps {
    backgroundColor: string;
    fontSize: number;
    borderRadius: number;
    text: string;
}

export const Button: UserComponent<ButtonProps> = ({ backgroundColor, fontSize, borderRadius, text }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <button ref={(ref: HTMLButtonElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ padding: "10px", color: 'white', border: 'none', backgroundColor, fontSize: `${fontSize}px`, borderRadius: `${borderRadius}px` }}>
            {text}
        </button>
    );
}

const ButtonSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as ButtonProps
    }));

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px'}}>
            <Label>
                Color
                <input
                    style={{ width: "100%", borderRadius: "4px", height: "35px"}}
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
    fontSize: 20,
    borderRadius: 4,
    text: "New Button"
};

Button.craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};