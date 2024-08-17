import React, { useState } from "react";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { LabelProps } from "../../../types";
import { Info16Regular, TextBoldFilled, TextItalicFilled, TextUnderlineFilled } from "@fluentui/react-icons";
import { useNode } from "@craftjs/core";

import { Input, Label as FLabel, RadioGroup, Radio, Tooltip, useId, Button } from "@fluentui/react-components";


export const LabelSettings: React.FC = () => {
  const { actions: { setProp }, props } = useNode(node => ({
    props: node.data.props as LabelProps
  }));

  const styles = usePropertyInspectorStyles();

  const tooltips: TooltipConfig[] = [
    { label: "Text", content: "Edit the text of the label.", propKey: "text", type: "text" },
    { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize", type: "slider" },
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
      <div className={styles.settingsContainer}>
        {tooltips.map((tooltip, index) => (
          <div key={index}>
            <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={styles.label}>
          <FLabel>
            {tooltip.label}
            </FLabel>
            <Tooltip
              content={tooltip.content}
              positioning="above-start"
              withArrow
              relationship="label" 
              onVisibleChange={(e, data) => setVisibleTooltip(data.visible ? tooltip.propKey : null)}
            >
              <Info16Regular
                tabIndex={0}
                className={visibleTooltip === tooltip.propKey ? styles.visible : undefined}
              />
            </Tooltip>
          </div>
            {tooltip.propKey === "fontSize" ? (
              <Input
                className={styles.numberInput}
                type="number"
                value={fontSize.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProp((props: LabelProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
                }}
              />
            ) : tooltip.propKey === "fontColor" ? (
              <input
                className={styles.colorInput}
                type="color"
                defaultValue={fontColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: LabelProps) => props.fontColor = e.target.value)}
              />
            ) : tooltip.propKey === "text" ? (
              <Input
                className={styles.textInput}
                type="text"
                defaultValue={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProp((props: LabelProps) => (props.text = e.target.value), 1000);
                }}
              />
            ) : tooltip.propKey === "textAlign" ? (
              <RadioGroup
                defaultValue={textAlign}
                layout="horizontal-stacked"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: LabelProps) => (props.textAlign = data.value as 'left' | 'center' | 'right' | 'justify'), 1000);
                }}
              >
                <Radio value="left" label="Left" />
                <Radio value="center" label="Center" />
                <Radio value="right" label="Right" />
                <Radio value="justify" label="Justify" />
              </RadioGroup>
            ) : tooltip.propKey === "hyperlink" ? (
              <Input
                className={styles.textInput}
                type="text"
                defaultValue={""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProp((props: LabelProps) => (props.hyperlink = e.target.value), 1000);
                }}
              />
            ) : tooltip.propKey === "icon" && (
              <RadioGroup
                defaultValue="none"
                layout="horizontal-stacked"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: LabelProps) => (props.icon = data.value as 'none' | 'left' | 'right'), 1000);
                }}
              >
                <Radio value="none" label="None" />
                <Radio value="left" label="Left" />
                <Radio value="right" label="Right" />
              </RadioGroup>
            )}
          </div>
        ))}
        <div className={styles.buttonContainer}>
            <Button 
            icon={<TextBoldFilled />}
            className={styles.activeButton} onClick={() => applyStyle("bold")}>
            </Button> 
            <Button 
            icon={<TextItalicFilled />}
            className={styles.activeButton} onClick={() => applyStyle("italic")}>
            </Button> 
            <Button 
            icon={<TextUnderlineFilled />}
            className={styles.activeButton} onClick={() => applyStyle("underline")}>
            </Button>
        </div>
      </div>
    );
  };