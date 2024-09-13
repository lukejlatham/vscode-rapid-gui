import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Label, Tooltip, mergeClasses, useId } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { usePropertyInspectorStyles } from "../../hooks/usePropertyInspectorStyles";
import { BackgroundProps } from "../../types";
import { FormattedMessage } from "react-intl";

export const BackgroundColorSelector: React.FC = () => {
  const [visibleTooltip, setVisibleTooltip] = useState(false);

  const { props, actions: { setProp } } = useEditor((state) => ({
    props: state.nodes["ROOT"].data.props as BackgroundProps,
  }));

  const nodeID = "ROOT";
  const styles = usePropertyInspectorStyles();

  const colorInputId = useId("background-color-input");
  const tooltipId = useId("background-color-tooltip");

  const handleVisibilityChange = (isVisible: boolean) => {
    setVisibleTooltip(isVisible);
  };

  const handleColorSelected = (color: string) => {
    setProp(nodeID, (props: BackgroundProps) => {
      props.backgroundColor = color;
    });
  };

  return (
    <div role="group" aria-labelledby={colorInputId}>
      <div className={styles.label}>
        <Label htmlFor={colorInputId}>
          <FormattedMessage
            id="theme.backgroundColor"
            defaultMessage="Background Color"
          />
        </Label>
        <Tooltip
          content={{
            children: (
              <FormattedMessage 
                id="theme.backgroundColor.tooltip" 
                defaultMessage="Change the background color"
              />
            ),
            id: tooltipId
          }}
          positioning="above-start"
          withArrow
          relationship="label"
          onVisibleChange={(e, data) => handleVisibilityChange(data.visible)}
        >
          <Info16Regular
            tabIndex={0}
            className={mergeClasses(visibleTooltip && styles.visible)}
            aria-label="Background color information"
          />
        </Tooltip>
      </div>
      <input
        id={colorInputId}
        className={styles.colorInput}
        type="color"
        defaultValue={props.backgroundColor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleColorSelected(e.target.value)
        }
        aria-describedby={tooltipId}
      />
    </div>
  );
};