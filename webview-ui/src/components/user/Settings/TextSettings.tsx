import React from "react";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { TextProps, TooltipConfigText as TooltipConfig } from "../../../types";
import { useNode } from "@craftjs/core";
import { Button } from "@fluentui/react-components";
import { TextBoldFilled, TextItalicFilled, TextUnderlineFilled } from "@fluentui/react-icons";
import { ComponentSettings } from "./ComponentSettings";

export const TextSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
        props: node.data.props as TextProps
    }));

    const styles = usePropertyInspectorStyles();

    const tooltips: TooltipConfig[] = [
        { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "slider" },
        { label: "Font Color", content: "Change the text colour of the label.", propKey: "fontColor", type: "color" },
        { label: "Text", content: "Edit the text", propKey: "text", type: "text" },
        { label: "Alignment", content: "Set the text alignment.", propKey: "textAlign", type: "textAlign" },
        { label: "Hyperlink", content: "Add a hyperlink to the text.", propKey: "hyperlink", type: "text" },
    ];

    type StyleKeys = 'bold' | 'italic' | 'underline';

    const applyStyle = (style: StyleKeys) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            setProp((props: TextProps) => {
                props[style] = !props[style];
            }, 1000);
        } else {
            document.execCommand(style);
        }
    };

    return (
        <div>
            <ComponentSettings componentProps={props} tooltips={tooltips} />
            <div className={styles.buttonContainer}>
                <Button
                    icon={<TextBoldFilled />}
                    size="large"
                    onClick={() => applyStyle("bold")}>
                </Button>
                <Button
                    icon={<TextItalicFilled />}
                    size="large"
                    onClick={() => applyStyle("italic")}>
                </Button>
                <Button
                    icon={<TextUnderlineFilled />}
                    size="large"
                    onClick={() => applyStyle("underline")}>
                </Button>
            </div>
        </div>
    );
};