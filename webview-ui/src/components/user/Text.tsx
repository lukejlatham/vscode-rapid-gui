import { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { makeStyles } from "@fluentui/react-components";
import { TextProps, ContentEditableEvent } from "../../../../types";
import { TextSettings } from "./Settings/TextSettings";

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

export const Text: UserComponent<TextProps> = ({ text, fontSize, fontColor, textAlign, userEditable, bold, italic, underline, hyperlink, placeholder }) => {
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
      className={styles.textContainer}
      onClick={() => selected && userEditable && setEditable(true)}
    >
      {userEditable ? (
        <ContentEditable
          html={text}
          disabled={!editable}
          onChange={(e: ContentEditableEvent) =>
            setProp(
              (props: TextProps) =>
                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
              500
            )
          }
          tagName="p"
          className={`${styles.textContent} ${textAlign === 'left' ? styles.alignLeft :
            textAlign === 'center' ? styles.alignCenter :
              textAlign === 'right' ? styles.alignRight :
                styles.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: fontColor }}
        />
      ) : (
        <p
          className={`${styles.textContent} ${textAlign === 'left' ? styles.alignLeft :
            textAlign === 'center' ? styles.alignCenter :
              textAlign === 'right' ? styles.alignRight :
                styles.alignJustify} 
                ${bold ? styles.bold : ""}
                ${italic ? styles.italic : ""}
                ${underline ? styles.underline : ""}`}
          style={{ fontSize: `${fontSize}px`, color: fontColor }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export const TextDefaultProps: TextProps = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  fontSize: 16,
  fontColor: "white",
  userEditable: true,
  textAlign: "left",
  bold: false,
  italic: false,
  underline: false,
  hyperlink: "",
  placeholder: "Text",
};

(Text as any).craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
