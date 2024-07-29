import React, { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Label as FLabel, Input, RadioGroup, Radio, makeStyles, Tooltip, useId, mergeClasses, tokens } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { LabelProps, ContentEditableEvent } from "../../../../types";

const useStyles = makeStyles({
  labelContainer: {
    cursor: "pointer",
  },
  labelContent: {
    margin: 0,
  },
  alignLeft: {
    textAlign: "left",
  },
  alignCenter: {
    textAlign: "center",
  },
  alignRight: {
    textAlign: "right",
  },
  alignJustify: {
    textAlign: "justify",
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '5px',
  },
  numberInput: {
    width: "100%",
  },
  colorInput: {
    width: "100%",
    borderRadius: "4px",
    height: "35px",
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

export const Label: UserComponent<LabelProps> = ({ text, fontSize, fontcolor, textAlign, userEditable = true, height, width }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
    dragged: node.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }
    if (userEditable) {
      setEditable(false);
    }
  }, [selected, userEditable]);

  const styles = useStyles();

  return (
    <div
      ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
      className={styles.labelContainer}
      onClick={() => selected && userEditable && setEditable(true)}
    >
      {userEditable ? (
        <ContentEditable
          html={text}
          disabled={!editable}
          onChange={(e: ContentEditableEvent) =>
            setProp(
              (props: LabelProps) =>
                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
              500
            )
          }
          tagName="p"
          className={`${styles.labelContent} ${textAlign === 'left' ? styles.alignLeft :
            textAlign === 'center' ? styles.alignCenter :
              textAlign === 'right' ? styles.alignRight :
                styles.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: fontcolor }}
        />
      ) : (
        <p
          className={`${styles.labelContent} ${textAlign === 'left' ? styles.alignLeft :
            textAlign === 'center' ? styles.alignCenter :
              textAlign === 'right' ? styles.alignRight :
                styles.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: fontcolor }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

const LabelSettings: React.FC = () => {
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

  const styles = useStyles();
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
              type="fontcolor"
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

export const LabelDefaultProps: LabelProps = {
  text: "New Label",
  textAlign: 'left',
  fontSize: 20,
  fontcolor: "#000000",
  userEditable: true,
  width: 100,
  height: 100,
};

(Label as any).craft = {
  props: LabelDefaultProps,
  related: {
    settings: LabelSettings,
  },
};
