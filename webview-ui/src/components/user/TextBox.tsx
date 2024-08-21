import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { TextBoxProps, textBoxSchema } from "../../types";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  textBoxContainer: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  textBox: {
    width: "100%",
    boxSizing: "border-box",
    padding: "5px 10px",
    resize: "both",
    minHeight: "80px",
    minWidth: "120px",
  },
});

export const TextBox: UserComponent<TextBoxProps> = (props) => {
  const validatedProps = textBoxSchema.parse(props);
  const {
    text,
    fontSize,
    fontColor,
    fontFamily,
    backgroundColor,
    borderColor,
    placeholder,
    borderRadius,
  } = validatedProps;

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const styles = useStyles();
  const select = useSelected();

  return (
    <div
      className={`${styles.textBoxContainer} ${selected ? select.select : ""}`}
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}>
      <textarea
        placeholder={placeholder}
        className={styles.textBox}
        style={{
          fontSize: `${fontSize}px`,
          fontFamily,
          color: fontColor,
          backgroundColor,
          borderRadius: `${borderRadius}px`,
          borderColor,
        }}>
        {text}
      </textarea>
    </div>
  );
};

export const TextBoxDefaultProps = textBoxSchema.parse({});

TextBox.craft = {
  displayName: "Multi-line Input",
  props: TextBoxDefaultProps,
};
