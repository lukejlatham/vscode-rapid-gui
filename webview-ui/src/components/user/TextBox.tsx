import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { Label, Input, Radio, RadioGroup, makeStyles } from '@fluentui/react-components';

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

const useStyles = makeStyles({
    container: {
        display: "flex",
    },
    justifyLeft: {
        justifyContent: "flex-start",
    },
    justifyCenter: {
        justifyContent: "center",
    },
    justifyRight: {
        justifyContent: "flex-end",
    },
    textBox: {
        width: "100%",
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '5px',
    },
    colorInput: {
        width: "100%",
        borderRadius: "4px",
        height: "35px",
    },
    numberInput: {
        width: "100%",
    },
});

export const TextBox: UserComponent<TextBoxProps> = ({ text, fontSize, fontColor, placeholder, cols, rows, backgroundColor, borderRadius, alignment}) => {
    const {
        connectors: { connect, drag },
    } = useNode((node) => ({
        selected: node.events.selected,
        dragged: node.events.dragged
    }));

    const classes = useStyles();

    return (
        <div
            ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
            className={`${classes.container} ${alignment === "left" ? classes.justifyLeft : alignment === "center" ? classes.justifyCenter : classes.justifyRight}`}
        >
            <textarea
                placeholder={placeholder}
                cols={cols}
                rows={rows}
                className={classes.textBox}
                style={{
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                    backgroundColor: backgroundColor,
                    borderRadius: `${borderRadius}px`
                }}
            >
                {text}
            </textarea>
        </div>
    );
}

const TextBoxSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as TextBoxProps
    }));

    const classes = useStyles();

    return (
        <div className={classes.settingsContainer}>
            <Label>
                Font Color
                <input
                    className={classes.colorInput}
                    type="color"
                    defaultValue={props.fontColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextBoxProps) => props.fontColor = e.target.value)} />
            </Label>
            <Label>
                Background Color
                <input
                    className={classes.colorInput}
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextBoxProps) => props.backgroundColor = e.target.value)} />
            </Label>
            <Label>
                Font Size
                <Input
                    className={classes.numberInput}
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
                    className={classes.numberInput}
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
                    className={classes.numberInput}
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
                    className={classes.numberInput}
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
                    className={classes.numberInput}
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

export const TextBoxDefaultProps: TextBoxProps = {
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
    props: TextBoxDefaultProps,
    related: {
        settings: TextBoxSettings
    }
}