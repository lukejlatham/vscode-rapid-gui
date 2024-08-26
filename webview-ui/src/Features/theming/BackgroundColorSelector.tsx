import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Label, Tooltip, mergeClasses } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { usePropertyInspectorStyles } from "../../hooks/usePropertyInspectorStyles";
import { BackgroundProps } from "../../types";

export const BackgroundColorSelector: React.FC = () => {
  const [visibleTooltip, setVisibleTooltip] = useState(false);

  const { props, actions: { setProp } } = useEditor((state) => ({
    props: state.nodes["ROOT"].data.props as BackgroundProps,
  }));

  const nodeID = "ROOT";
  const styles = usePropertyInspectorStyles();

  const handleVisibilityChange = (isVisible: boolean) => {
    setVisibleTooltip(isVisible);
  };

  const handleColorSelected = (color: string) => {
    setProp(nodeID, (props: BackgroundProps) => {
      props.backgroundColor = color;
    });
  };

  return (
    <div>
      <div className={styles.label} >
        <Label>Background Color</Label>
        <Tooltip
          content="Change the color of the background."
          positioning="above-start"
          withArrow
          relationship="label"
          onVisibleChange={(e, data) => handleVisibilityChange(data.visible)}
        >
          <Info16Regular
            tabIndex={0}
            className={mergeClasses(visibleTooltip && styles.visible)}
          />
        </Tooltip>
      </div>
      <input
        style={{width: "90%"}}
        className={styles.colorInput}
        type="color"
        defaultValue={props.backgroundColor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleColorSelected(e.target.value)
        }
      />
    </div>
  );
};
