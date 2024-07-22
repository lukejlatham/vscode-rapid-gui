import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label, SpinButton, Radio, RadioGroup, SpinButtonChangeEvent, SpinButtonOnChangeData } from "@fluentui/react-components";
import "./Button.css";

interface ButtonProps {
    backgroundColor: string;
    fontSize: number;
    fontColor: string;
    borderRadius: number;
    width: number;
    height: number;
    text: string;
    alignment: "left" | "center" | "right";
}

export const Button: UserComponent<ButtonProps> = ({ backgroundColor, fontSize, borderRadius, text, fontColor, width, height, alignment }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <div className={`element-container align-${alignment}`}>
            <button
                ref={(ref: HTMLButtonElement | null) => {
                    if (ref) {
                        connect(drag(ref));
                    }
                }}
                className="custom-button"
                style={{
                    color: fontColor,
                    backgroundColor,
                    fontSize: `${fontSize}px`,
                    borderRadius: `${borderRadius}px`,
                    width: `${width}%`,
                    height: `${height}%`,
                }}
            >
                {text}
            </button>
        </div>
    );
}

const ButtonSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as ButtonProps
    }));

    return (
        <div className="settings-container">
            <Label>
                Font Color
                <input
                    className="color-input"
                    type="color"
                    defaultValue={props.fontColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => props.fontColor = e.target.value)} />
            </Label>
            <Label>
                Background Color
                <input
                    className="color-input"
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => props.backgroundColor = e.target.value)} />
            </Label>
            <Label>
                Font Size
                <SpinButton
                    className="spin-button"
                    defaultValue={props.fontSize}
                    onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                        const fontSize = data.value ? data.value : 0;
                        setProp((props: ButtonProps) => props.fontSize = fontSize, 1000);
                    }}
                />
            </Label>
            <Label>
                Border Radius
                <SpinButton
                    className="spin-button"
                    min={0}
                    defaultValue={props.borderRadius}
                    onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                        const borderRadius = data.value ? data.value : 0;
                        setProp((props: ButtonProps) => props.borderRadius = borderRadius, 1000);
                    }}
                />
            </Label>
            <Label>
                Width
                <SpinButton
                    className="spin-button"
                    min={1}
                    max={100}
                    step={5}
                    defaultValue={props.width}
                    onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                        const width = data.value ? data.value : 0;
                        setProp((props: ButtonProps) => props.width = width, 1000);
                    }}
                />
            </Label>
            <Label>
                Height
                <SpinButton
                    className="spin-button"
                    min={1}
                    max={100}
                    step={5}
                    defaultValue={props.height}
                    onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                        const height = data.value ? data.value : 0;
                        setProp((props: ButtonProps) => props.height = height, 1000);
                    }}
                />
            </Label>
            <Label>
                Text
                <Input
                    className="text-input"
                    type="text"
                    defaultValue={props.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: ButtonProps) => (props.text = e.target.value), 1000);
                    }}
                />
            </Label>
            <Label>
                Alignment
                <RadioGroup
                    defaultValue={props.alignment}
                    layout="horizontal-stacked"
                    onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                        setProp((props: ButtonProps) => (props.alignment = data.value as 'left' | 'center' | 'right'), 1000);
                    }}
                >
                    <Radio key="left" label="Left" value="left" />
                    <Radio key="center" label="Center" value="center" />
                    <Radio key="right" label="Right" value="right" />
                </RadioGroup>
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
    width: 50,
    height: 100,
    alignment: "left"
};

Button.craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};
