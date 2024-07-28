import React, { useState } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { Label, Input, Radio, RadioGroup, makeStyles, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, Tooltip, useId, tokens, mergeClasses } from '@fluentui/react-components';
import { Info16Regular } from "@fluentui/react-icons";

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
type TooltipConfig = {
    label: string;
    content: string;
    propKey: keyof TextBoxProps;
    type: 'color' | 'spinButton' | 'text' | 'alignment';
};

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
        resize: "none",
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
    textInput: {
        width: "100%",
    },
    spinButton: {
        width: "95%",
    },
    visible: {
        color: tokens.colorNeutralForeground2BrandSelected,
    },
    label: {
        display: "flex",
        flexDirection: "row",
        columnGap: tokens.spacingVerticalS,
    },
});

export const TextBox: UserComponent<TextBoxProps> = ({ text, fontSize, fontColor, placeholder, cols, rows, backgroundColor, borderRadius, alignment }) => {
    const {
        connectors: { connect, drag },
    } = useNode((node) => ({
        selected: node.events.selected,
        dragged: node.events.dragged
    }));

    const styles = useStyles();

    return (
        <div
            ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
            className={`${styles.container} ${alignment === "left" ? styles.justifyLeft : alignment === "center" ? styles.justifyCenter : styles.justifyRight}`}
        >
            <textarea
                placeholder={placeholder}
                cols={cols}
                rows={rows}
                className={styles.textBox}
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

    const styles = useStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

    const tooltips: TooltipConfig[] = [
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "spinButton" },
        { label: "Font Color", content: "Change the text color.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "Change the color of the box.", propKey: "backgroundColor", type: "color" },
        { label: "Placeholder", content: "Edit the text that appears before a user inputs text.", propKey: "placeholder", type: "text" },
        { label: "Border Radius", content: "Adjust how rounded the corners of the textbox are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Rows", content: "Adjust the number of rows in your textbox.", propKey: "rows", type: "spinButton" },
        { label: "Columns", content: "Adjust the number of columns in your textbox.", propKey: "cols", type: "spinButton" },
        { label: "Alignment", content: "Set the alignment of the Texbox.", propKey: "alignment", type: "alignment" },
    ];

    return (
        <div className={styles.settingsContainer}>
            {tooltips.map((tooltip, index) => (
                <div key={index}>
                    <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={styles.label}>
                        <Label>
                            {tooltip.label}
                        </Label>
                        <Tooltip
                            content={{
                                children: tooltip.content,
                                id: contentId,
                            }}
                            positioning="above-start"
                            withArrow
                            relationship="label"
                            onVisibleChange={(e, data) => setVisibleTooltip(data.visible ? tooltip.propKey : null)}
                        >
                            <Info16Regular
                                tabIndex={0}
                                className={mergeClasses(visibleTooltip === tooltip.propKey ? styles.visible : undefined)}
                            />
                        </Tooltip>
                    </div>
                    {tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: TextBoxProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "color" ? (
                        <input
                            className={styles.colorInput}
                            type="color"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextBoxProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: TextBoxProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "alignment" && (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: TextBoxProps) => {
                                    (props[tooltip.propKey] as 'left' | 'center' | 'right') = data.value as 'left' | 'center' | 'right';
                                }, 1000);
                            }}
                        >
                            <Radio key="left" label="Left" value="left" />
                            <Radio key="center" label="Center" value="center" />
                            <Radio key="right" label="Right" value="right" />
                        </RadioGroup>
                    )}
                </div>
            ))}
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