import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { SliderProps, sliderSchema } from "../../types";
import { SliderSettings } from "./Settings/SliderSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  sliderContainer: {
    padding: "2px",
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    alignContent: "center",
  },
  sliderLabel: {
    marginBottom: "5px",
  },
  sliderInput: {
    width: "100%",
  },
});

export const Slider: UserComponent<SliderProps> = (props) => {
  const validatedProps = sliderSchema.parse(props);
  const { header, min, max, step, fontSize, fontFamily, fontColor, backgroundColor } =
    validatedProps;
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
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`${selected ? select.select : ""} ${styles.sliderContainer}`}>
      <label
        htmlFor={header}
        className={styles.sliderLabel}
        style={{ fontFamily: fontFamily, fontSize: `${fontSize}px`, color: fontColor }}>
        {header}
      </label>
      <input
        type="range"
        id={header}
        min={min}
        max={max}
        step={step}
        className={styles.sliderInput}
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor,
          accentColor: backgroundColor,
        }}
      />
    </div>
  );
};

export const SliderDefaultProps = sliderSchema.parse({});

Slider.craft = {
  displayName: "Slider",
  props: SliderDefaultProps,
  related: {
    settings: SliderSettings,
  },
};
