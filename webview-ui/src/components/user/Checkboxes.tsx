import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { checkboxesSchema, CheckboxesProps } from "../../types";
import { CheckboxesSettings } from "./Settings/CheckboxesSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  checkboxes: {
    display: "flex",
    gap: "5px",
    paddingTop: "2px",
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
      <label style={{ fontFamily: fontFamily, fontSize: fontSize, color: fontColor }}>
        {header}
      </label>
      <div className={styles.checkboxes} style={{ flexDirection: direction }}>
        {optionLabels.map((optionLabel, index) => (
          <div key={index}>
            <input type="checkbox" id={optionLabel} name={optionLabel} />
            <label style={{ fontFamily: fontFamily, fontSize: `${fontSize}px`, color: fontColor }}>
              {optionLabel}
            </label>
          </div>
        ))}
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
