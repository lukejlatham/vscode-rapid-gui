import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label, SpinButton, Radio, RadioGroup, SpinButtonChangeEvent, SpinButtonOnChangeData, makeStyles, Tooltip, TooltipProps, useId, mergeClasses, tokens } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";

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

type TooltipConfig = {
    label: string;
    content: string;
    propKey: keyof ButtonProps;
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
    button: {
        border: "none",
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
    spinButton: {
        width: "95%",
    },
    textInput: {
        width: "100%",
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

export const Button: UserComponent<ButtonProps> = ({ backgroundColor, fontSize, borderRadius, text, fontColor, width, height, alignment }) => {
    const { connectors: { connect, drag } } = useNode();
    const styles = useStyles();

    return (
        <div className={`${styles.container} ${alignment === "left" ? styles.justifyLeft : alignment === "center" ? styles.justifyCenter : styles.justifyRight}`}>
            <button
                ref={(ref: HTMLButtonElement | null) => {
                    if (ref) {
                        connect(drag(ref));
                    }
                }}
                className={styles.button}
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
    const styles = useStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

    const tooltips: TooltipConfig[] = [
        { label: "Font Color", content: "This is the color of the text on the button.", propKey: "fontColor", type: "color" },
        { label: "Background Color", content: "This is the color of the button.", propKey: "backgroundColor", type: "color" },
        { label: "Font Size", content: "This is the size of the text on the button.", propKey: "fontSize", type: "spinButton" },
        { label: "Border Radius", content: "This is how rounded the corners of the button are.", propKey: "borderRadius", type: "spinButton" },
        { label: "Width", content: "This is how wide the button is.", propKey: "width", type: "spinButton" },
        { label: "Height", content: "This is how tall the button is.", propKey: "height", type: "spinButton" },
        { label: "Text", content: "This is the text that appears in the button.", propKey: "text", type: "text" },
        { label: "Alignment", content: "This is how you want your button to be aligned.", propKey: "alignment", type: "alignment" },
    ];

    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
        setVisibleTooltip(isVisible ? tooltipKey : null);
    };

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
                            onVisibleChange={(e, data) => handleVisibilityChange(tooltip.propKey, data.visible)}
                        >
                            <Info16Regular
                                tabIndex={0}
                                className={mergeClasses(visibleTooltip === tooltip.propKey && styles.visible)}
                            />
                        </Tooltip>
                    </div>
                    {tooltip.type === "color" ? (
                        <input
                            className={styles.colorInput}
                            type="color"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: ButtonProps) => {
                                (props[tooltip.propKey] as string) = e.target.value;
                            })}
                        />
                    ) : tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: ButtonProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" ? (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: ButtonProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "alignment" && (
                        <RadioGroup
                            defaultValue={props[tooltip.propKey] as string}
                            layout="horizontal-stacked"
                            onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                                setProp((props: ButtonProps) => {
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

(Button as any).craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    }
};
