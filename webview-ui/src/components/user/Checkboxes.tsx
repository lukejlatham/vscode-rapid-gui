import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { checkboxesSchema, CheckboxesProps } from "../../types";
import { CheckboxesSettings } from "./Settings/CheckboxesSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  checkboxesContainer: {
    padding: "2px",
  },
  checkboxes: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    paddingTop: "2px",
  },
  checkboxItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
});

export const Checkboxes: UserComponent<CheckboxesProps> = (props) => {
  const validatedProps = checkboxesSchema.parse(props);
  const { header, numberOfBoxes, fontFamily, optionLabels, fontSize, fontColor, direction } =
    validatedProps;
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
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`${selected ? select.select : ""}`}>
      <div className={styles.checkboxesContainer}>
        <label style={{ fontFamily: fontFamily, fontSize: fontSize, color: fontColor }}>
          {header}
        </label>
        <div className={styles.checkboxes} style={{ flexDirection: direction as "row" | "column" }}>
          {optionLabels.map((optionLabel, index) => (
            <div key={index} className={styles.checkboxItem}>
              <input type="checkbox" id={`checkbox-${index}`} name={optionLabel} />
              <label
                htmlFor={`checkbox-${index}`}
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

export const CheckboxesDefaultProps = checkboxesSchema.parse({});

Checkboxes.craft = {
  displayName: "Checkboxes",
  props: CheckboxesDefaultProps,
  related: {
    settings: CheckboxesSettings,
  },
};
