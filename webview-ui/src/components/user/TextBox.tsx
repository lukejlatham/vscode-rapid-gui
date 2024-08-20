import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { TextBoxProps, textBoxSchema } from "../../types";
import { TextBoxSettings } from "./Settings/TextboxSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  textBox: {
    resize: "both",
    fontFamily: "inherit",
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
    <div className={`${selected ? select.select : ""}`}>
      <textarea
        ref={(ref: HTMLTextAreaElement | null) => ref && connect(drag(ref))}
        placeholder={placeholder}
        className={styles.textBox}
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          color: fontColor,
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadius}px`,
          borderColor: `${borderColor}`,
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
  related: {
    settings: TextBoxSettings,
  },
};
