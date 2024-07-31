import { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Label as FLabel, Input, RadioGroup, Radio, makeStyles } from "@fluentui/react-components";
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
                styles.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: fontColor }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export const TextDefaultProps: TextProps = {
    text: "Text",
    fontSize: 16,
    fontColor: "#000000",
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
