import React, { useState } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { RadioButtonProps, radioButtonSchema } from "../../types";
import { RadioButtonSettings } from "./Settings/RadioButtonSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  radioButtonsContainer: {
    padding: "2px",
  },
  radioButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    paddingTop: "2px",
  },
  radioButtonItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
});

export const RadioButtons: UserComponent<RadioButtonProps> = (props) => {
  const validatedProps = radioButtonSchema.parse(props);
  const { header, optionLabels, fontFamily, fontSize, fontColor, direction } = validatedProps;
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const styles = useStyles();
  const select = useSelected();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButton(Number(event.target.value));
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`${selected ? select.select : ""}`}>
      <div className={styles.radioButtonsContainer}>
        <label style={{ fontFamily: fontFamily, fontSize: `${fontSize}px`, color: fontColor }}>
          {header}
        </label>
        <div
          className={styles.radioButtons}
          style={{ flexDirection: direction as "row" | "column" }}>
          {optionLabels.map((optionLabel, index) => (
            <div key={index} className={styles.radioButtonItem}>
              <input
                type="radio"
                id={`radio-${index}`}
                name="radioGroup"
                value={index}
                checked={selectedButton === index}
                onChange={handleRadioChange}
              />
              <label
                htmlFor={`radio-${index}`}
                style={{ fontFamily: fontFamily, fontSize: `${fontSize}px`, color: fontColor }}>
                {optionLabel}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RadioButtonsDefaultProps = radioButtonSchema.parse({});

RadioButtons.craft = {
  displayName: "Radio Buttons",
  props: RadioButtonsDefaultProps,
  related: {
    settings: RadioButtonSettings,
  },
};
