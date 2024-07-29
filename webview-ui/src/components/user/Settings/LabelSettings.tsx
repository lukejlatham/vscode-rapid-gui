import React, { useState } from "react";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { LabelProps } from "../../../../../types";
import { Info16Regular } from "@fluentui/react-icons";
import { useNode } from "@craftjs/core";

import { Input, Label as FLabel, RadioGroup, Radio, Tooltip, useId } from "@fluentui/react-components";


export const LabelSettings: React.FC = () => {
    const {
      actions: { setProp },
      fontSize,
      fontcolor,
      text,
      textAlign,
    } = useNode((node) => ({
      fontSize: node.data.props.fontSize,
      fontcolor: node.data.props.fontcolor,
      text: node.data.props.text,
      textAlign: node.data.props.textAlign,
    }));
  
    const styles = usePropertyInspectorStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  
    const tooltips = [
      { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize" },
      { label: "Font Color", content: "Change the text color of the label.", propKey: "fontcolor" },
      { label: "Text", content: "Edit the text of the label.", propKey: "text" },
      { label: "Alignment", content: "Set the text alignment.", propKey: "textAlign" },
    ];
  
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
            ) : tooltip.propKey === "fontcolor" ? (
              <input
                className={styles.colorInput}
                type="color"
                defaultValue={fontcolor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: LabelProps) => props.fontcolor = e.target.value)}
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
            ) : tooltip.propKey === "textAlign" && (
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
            )}
          </div>
        ))}
      </div>
    );
  };