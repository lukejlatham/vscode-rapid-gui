import React from "react";
import { LabelProps, TooltipConfigLabel as TooltipConfig } from "../../../types";
import { useNode } from "@craftjs/core";
import { ComponentSettings } from "./ComponentSettings";
import { Button } from "@fluentui/react-components";
import { TextBoldFilled, TextItalicFilled, TextUnderlineFilled } from "@fluentui/react-icons";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";


export const LabelSettings: React.FC = () => {
  const { actions: { setProp }, props } = useNode(node => ({
    props: node.data.props as LabelProps
  }));

  const styles = usePropertyInspectorStyles();

  const tooltips: TooltipConfig[] = [
    { label: "Text", content: "Edit the text of the label.", propKey: "text", type: "text" },
    { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "text" },
    { label: "Font Color", content: "Change the text color of the label.", propKey: "fontColor", type: "color" },
    { label: "Alignment", content: "Set the text alignment.", propKey: "textAlign", type: "textAlign" },
    { label: "Hyperlink", content: "Add a hyperlink to the label.", propKey: "hyperlink", type: "text" },
    { label: "Icon", content: "Add an icon to the label. Choosing 'Left' or 'Right' will add an icon at that position.", propKey: "icon", type: "icon" },
  ];

  type StyleKeys = 'bold' | 'italic' | 'underline';

  const applyStyle = (style: StyleKeys) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      setProp((props: LabelProps) => {
        props[style] = !props[style];
      }, 1000);
    } else {
      document.execCommand(style);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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