import React, { useEffect, useState } from "react";
import { useNode, UserComponent, Element } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { LabelProps, labelSchema, ContentEditableEvent } from "../../types";
import { LabelSettings } from "./Settings/LabelSettings";
import { Icon, IconDefaultProps } from "./Icon";
import ContentEditable from "react-contenteditable";

const useStyles = makeStyles({
  labelContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  labelContent: {
    cursor: "text",
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
});

export const Label: UserComponent<LabelProps> = (props) => {
  const validatedProps = labelSchema.parse(props);

  const { text, textAlign, fontSize, fontColor, userEditable, icon, hyperlink, bold, italic, underline } = validatedProps;

  const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((node) => ({
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

  const handleInput = (e: ContentEditableEvent) => {
    setProp((props: LabelProps) => (props.text = e.target.value), 500);
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
      className={styles.labelContainer}
      onClick={() => selected && userEditable && setEditable(true)}
    >
      {icon === "left" && <Element id="label_icon" is={Icon} {...IconDefaultProps} />}
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={handleInput}
        tagName="div"
        className={`${styles.labelContent} ${textAlign === "left" ? styles.alignLeft : textAlign === "center" ? styles.alignCenter : textAlign === "right" ? styles.alignRight : styles.alignJustify}`}
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor,
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
        }}
      />
      {icon === "right" && <Element id="label_icon" is={Icon} {...IconDefaultProps} />}
    </div>
  );
};

export const LabelDefaultProps: LabelProps = {
  text: "New Label",
  textAlign: 'left',
  fontSize: 20,
  fontColor: "black",
  userEditable: true,
  icon: "none",
  hyperlink: "",
  bold: false,
  italic: false,
  underline: false,
};

(Label as any).craft = {
  displayName: "Label",
  props: LabelDefaultProps,
  related: {
    settings: LabelSettings,
  },
};
