import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { InputProps, inputSchema } from "../../types";
import { InputSettings } from "./Settings/InputSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  inputContainer: {
    padding: "2px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "5px 10px",
  },
});

export const Input: UserComponent<InputProps> = (props) => {
  const validatedProps = inputSchema.parse(props);
  const {
    fontSize,
    fontFamily,
    fontColor,
    backgroundColor,
    placeholder,
    borderRadius,
    borderColor,
  } = validatedProps;

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const select = useSelected();
  const styles = useStyles();

  return (
    <div
      className={`${styles.inputContainer} ${selected ? select.select : ""}`}
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}>
      <input
        className={styles.input}
        placeholder={placeholder}
        style={{
          fontSize,
          fontFamily,
          color: fontColor,
          backgroundColor,
          borderRadius,
          borderColor,
        }}
      />
    </div>
  );
};

export const InputDefaultProps = inputSchema.parse({});

Input.craft = {
  displayName: "Single Line Input",
  props: InputDefaultProps,
  related: {
    settings: InputSettings,
  },
};
