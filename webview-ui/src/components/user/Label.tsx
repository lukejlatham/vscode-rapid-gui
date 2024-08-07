import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { makeStyles} from "@fluentui/react-components";
import { LabelProps,labelSchema, ContentEditableEvent } from "../../types";
import { LabelSettings } from "./Settings/LabelSettings";
import { Icon, IconDefaultProps } from "./Icon";

const useStyles = makeStyles({
  labelContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
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

  const {
    connectors: { connect, drag },
    // selected,
    // actions: { setProp },
  } = useNode((node) => ({
    // selected: node.events.selected,
    // dragged: node.events.dragged,
  }));

  // const [editable, setEditable] = useState(false);

  // useEffect(() => {
  //   if (selected) {
  //     return;
  //   }
  //   if (userEditable) {
  //     setEditable(false);
  //   }
  // }, [selected, userEditable]);

  const styles = useStyles();

  return (
    <div
      className={styles.labelContainer}
    >
      {icon === "left" && <Icon {...IconDefaultProps} />}
      {/* {userEditable ? (
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
          tagName="span"
          className={`${textAlign === 'left' ? styles.alignLeft :
            textAlign === 'center' ? styles.alignCenter :
              textAlign === 'right' ? styles.alignRight :
                styles.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: fontcolor }}
        />
       ) : ( */}
        <span
        ref={(ref: HTMLSpanElement | null) => ref && connect(drag(ref))}
          className={`${textAlign === 'left' ? styles.alignLeft :
            textAlign === 'center' ? styles.alignCenter :
              textAlign === 'right' ? styles.alignRight :
                styles.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, 
          color: fontColor,
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
        }}
        >
          {text}
        </span>
       {/* )} */}
      {icon === "right" && <Icon {...IconDefaultProps} />}
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
