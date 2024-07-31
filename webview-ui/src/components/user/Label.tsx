import { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Label as FLabel, Input, RadioGroup, Radio, makeStyles, Tooltip, useId, mergeClasses, tokens } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { LabelProps, ContentEditableEvent } from "../../../../types";
import { LabelSettings } from "./Settings/LabelSettings";

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

export const LabelDefaultProps: LabelProps = {
  text: "New Label",
  textAlign: 'left',
  fontSize: 20,
  fontcolor: "#FFFFFF",
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
