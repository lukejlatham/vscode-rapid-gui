import { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { makeStyles } from "@fluentui/react-components";
import { TextProps, textSchema, ContentEditableEvent } from "../../types";
import { TextSettings } from "./Settings/TextSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  textContainer: {
    cursor: "text",
  },
  textContent: {
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
  fontSize: {
    fontSize: "16px",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  underline: {
    textDecoration: "underline",
  },
});

export const Text: UserComponent<TextProps> = (props) => {
  const validatedProps = textSchema.parse(props);

  const {
    text,
    fontSize,
    fontColor,
    fontFamily,
    userEditable,
    textAlign,
    bold,
    italic,
    underline,
  } = validatedProps;

  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
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
  const select = useSelected();

  const handleInput = (e: ContentEditableEvent) => {
    setProp((props: TextProps) => (props.text = e.target.value), 500);
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
      className={`${styles.textContainer} ${selected ? select.select : ""}`}
      onClick={() => selected && userEditable && setEditable(true)}>
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={handleInput}
        tagName="div"
        className={`${styles.textContent} ${
          textAlign === "left"
            ? styles.alignLeft
            : textAlign === "center"
            ? styles.alignCenter
            : textAlign === "right"
            ? styles.alignRight
            : styles.alignJustify
        }`}
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor,
          fontFamily: fontFamily,
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
        }}
      />
    </div>
  );
};

export const TextDefaultProps = textSchema.parse({});

(Text as any).craft = {
  displayName: "Paragraph",
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
