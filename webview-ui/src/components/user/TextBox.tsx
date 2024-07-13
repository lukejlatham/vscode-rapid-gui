import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { Label, Input, Radio, RadioGroup } from '@fluentui/react-components';

interface TextBoxProps {
    text: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    placeholder: string;
    borderRadius: number;
    rows: number;
    cols: number;
    alignment: "left" | "center" | "right";
}

export const TextBox: UserComponent<TextBoxProps> = ({ text, fontSize, fontColor, placeholder, cols, rows, backgroundColor, borderRadius, alignment}) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((node) => ({
        selected: node.events.selected,
        dragged: node.events.dragged
    }));

    const style = {
        fontSize: `${fontSize}px`,
        color: fontColor,
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius}px`
    };

    return (
        <div ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))} style={{display: "flex", justifyContent: alignment}}>
            <textarea placeholder={placeholder} cols={cols} rows={rows} style={style}>
                {text}
            </textarea>
        </div>
    );
}

const TextBoxSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as TextBoxProps
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px' }}>
            <Label>
                Font Color
                <input
                    style={{ width: "100%", borderRadius: "4px", height: "35px" }}
                    type="color"
                    defaultValue={props.fontColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextBoxProps) => props.fontColor = e.target.value)} />
            </Label>
            <Label>
                Background
                <input
                    style={{ width: "100%", borderRadius: "4px", height: "35px" }}
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextBoxProps) => props.backgroundColor = e.target.value)} />
            </Label>
            <Label>
                Font Size
                <Input
                    type="number"
                    value={props.fontSize.toString()} // Convert the number to a string
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: TextBoxProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
                    }}
                />
            </Label>
            <Label>
                Placeholder
                <Input
                    type="text"
                    defaultValue={props.placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: TextBoxProps) => (props.placeholder = e.target.value), 1000);
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
                    setProp((props: TextBoxProps) => (props.borderRadius = parseInt(e.target.value, 10)), 1000);
                }}
            />
            </Label>
            <Label>
            Rows
            <Input
                type="number"
                min={0}
                max={43}
                defaultValue={props.rows.toString()} // Convert the number to a string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setProp((props: TextBoxProps) => (props.rows = parseInt(e.target.value, 10)), 1000);
                }}
            />
            </Label>
            <Label>
            Columns
            <Input
                type="number"
                min={0}
                max={100}
                defaultValue={props.cols.toString()} // Convert the number to a string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setProp((props: TextBoxProps) => (props.cols = parseInt(e.target.value, 10)), 1000);
                }}
            />
            </Label>
            <Label>
                Alignment
                <RadioGroup
                    defaultValue={props.alignment}
                    layout="horizontal-stacked"
                    onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                        setProp((props: TextBoxProps) => (props.alignment = data.value as 'left' | 'center' | 'right'), 1000);
                      }}
                >
                    <Radio key="left" label="Left" value="left" />
                    <Radio key="center" label="Center" value="center" />
                    <Radio key="right" label="Right" value="right" />
                </RadioGroup>
            </Label>
        </div>
    );
}

export const TextboxDefaultProps: TextBoxProps = {
    text: '',
    fontSize: 16,
    fontColor: 'black',
    backgroundColor: 'white',
    placeholder: 'Placeholder...',
    rows: 5,
    cols: 20,
    borderRadius: 5,
    alignment: "left"
}

TextBox.craft = {
    displayName: 'TextBox',
    props: TextboxDefaultProps,
    related: {
        settings: TextBoxSettings
    }
}


