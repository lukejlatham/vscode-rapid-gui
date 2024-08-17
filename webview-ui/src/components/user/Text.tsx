import { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { makeStyles } from "@fluentui/react-components";
import { TextProps, textSchema, ContentEditableEvent } from "../../types";
import { TextSettings } from "./Settings/TextSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  textContainer: {
    cursor: "pointer",
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

  const { text, fontSize, fontColor, fontFamily, userEditable, textAlign, bold, italic, underline } = validatedProps;

  const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((node) => ({
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
      onClick={() => selected && userEditable && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={handleInput}
        tagName="div"
        className={`${styles.textContent} ${textAlign === "left" ? styles.alignLeft : textAlign === "center" ? styles.alignCenter : textAlign === "right" ? styles.alignRight : styles.alignJustify}`}
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

export const TextDefaultProps: TextProps = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  fontSize: 16,
  fontColor: "white",
  fontFamily: "helvetica",
  userEditable: true,
  textAlign: "left",
  bold: false,
  italic: false,
  underline: false,
  hyperlink: "",
};

(Text as any).craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
