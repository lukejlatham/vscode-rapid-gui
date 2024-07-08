import React from "react";
import { useNode, UserComponent } from "@craftjs/core";

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
        <div>
            <label>
                Color
                <input
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => props.backgroundColor = e.target.value)} />
            </label>
            <label>
                Font Size
                <input
                    type="range"
                    defaultValue={props.fontSize}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </label>
            <label>
                Border Radius
                <input
                    type="range"
                    defaultValue={props.borderRadius}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.borderRadius = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </label>
            <label>
                Text
                <input
                    type="text"
                    defaultValue={props.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.text = e.target.value), 1000);
                    }}
                />
            </label>
        </div>
    );
};

export const ButtonDefaultProps: ButtonProps = {
    backgroundColor: "#0047AB",
    fontSize: 20,
    borderRadius: 4,
    text: "Click Me"
};

Button.craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};