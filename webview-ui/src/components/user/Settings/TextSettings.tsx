import React, { useState } from "react";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { TextProps } from "../../../../../types";
import { Info16Regular } from "@fluentui/react-icons";
import { useNode } from "@craftjs/core";
import { Input, Label as FLabel, RadioGroup, Radio, Tooltip, useId, Button } from "@fluentui/react-components";

export const TextSettings: React.FC = () => {
    const {
      actions: { setProp },
      text,
      fontSize,
      fontColor,
      textAlign,
      bold,
      italic, 
      underline,
      hyperlink,
    } = useNode((node) => ({
      fontSize: node.data.props.fontSize,
      text: node.data.props.text,
      fontColor: node.data.props.fontColor,
      textAlign: node.data.props.textAlign,
      bold: node.data.props.bold,
      italic: node.data.props.italic,
      underline: node.data.props.underline,
      hyperlink: node.data.props.hyperlink,
    }));
  
    const styles = usePropertyInspectorStyles();
    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  
    const tooltips = [
      { label: "Font Size", content: "Adjust the size of the text.", propKey: "fontSize"},
      { label: "Font Color", content: "Change the text color of the label.", propKey: "fontColor"},
      { label: "Text", content: "Edit the text", propKey: "text" },
      { label: "Alignment", content: "Set the text alignment.", propKey: "textAlign" },
      { label: "Bold", content: "Make the text bold.", propKey: "bold"},
      { label: "Italic", content: "Make the text italic.", propKey: "italic"},
      { label: "Underline", content: "Underline the text.", propKey: "underline"},
      { label: "Hyperlink", content: "Add a hyperlink to the text.", propKey: "hyperlink" },
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
              onVisibleChange={(_, data) => setVisibleTooltip(data.visible ? tooltip.propKey : null)}
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
                  setProp((props: TextProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
                }}
              />
            ) : tooltip.propKey === "fontColor" ? (
              <input
                className={styles.colorInput}
                type="color"
                defaultValue={fontColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: TextProps) => props.fontColor = e.target.value)}
              />
            ) : tooltip.propKey === "text" ? (
              <Input
                className={styles.textInput}
                type="text"
                defaultValue={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProp((props: TextProps) => (props.text = e.target.value), 1000);
                }}
              />
            ) : tooltip.propKey === "textAlign" ? (
              <RadioGroup
                defaultValue={textAlign}
                layout="horizontal-stacked"
                onChange={(_, data: { value: string }) => {
                  setProp((props: TextProps) => (props.textAlign = data.value as 'left' | 'center' | 'right' | 'justify'), 1000);
                }}
              >
                <Radio value="left" label="Left" />
                <Radio value="center" label="Center" />
                <Radio value="right" label="Right" />
                <Radio value="justify" label="Justify" />
                </RadioGroup>
            ) : tooltip.propKey === "bold" ? (
                <Button
                    onClick={() => {
                        setProp((props: TextProps) => {
                            props.bold = !bold;
                            return props;
                        }, 1000);
                    }}
                >
                    {bold ? "Unbold" : "Bold"}
                </Button>
            ) : tooltip.propKey === "italic" ? (
                <RadioGroup
                    defaultValue={italic}
                    layout="horizontal-stacked"
                    onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                        setProp((props: TextProps) => {
                            props.italic = data.value === "true";
                            return props;
                        }, 1000);
                    }}
                >
                    <Radio value="true" label="Italic" />
                    <Radio value="false" label="Normal" />
                </RadioGroup>
            ) : tooltip.propKey === "underline" ? (
                <RadioGroup
                    defaultValue={underline}
                    layout="horizontal-stacked"
                    onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                        setProp((props: TextProps) => {
                            props.underline = data.value === "true";
                            return props;
                        }, 1000);
                    }}
                >
                    <Radio value="true" label="Underline" />
                    <Radio value="false" label="Normal" />
                </RadioGroup>
            ) : tooltip.propKey === "hyperlink" && (
                <Input
                    className={styles.textInput}
                    type="text"
                    defaultValue={hyperlink}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: TextProps) => {
                            props.hyperlink = e.target.value;
                            return props;
                        }, 1000);
                    }}
                />
            )
        }
          </div>
        ))}
      </div>
    );
  };