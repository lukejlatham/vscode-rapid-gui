import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import * as VscIcons from "react-icons/vsc";
import { IconProps, iconSchema } from "../../types";
import { IconSettings } from "./Settings/IconSettings";
import { useSelected } from "../../hooks/useSelected";
import { makeStyles } from "@fluentui/react-components";

const useIconStyles = makeStyles({
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
  },
});

export const Icon: UserComponent<IconProps> = (props) => {
  const styles = useIconStyles();
  const validatedProps = iconSchema.parse(props);
  const { vscIcon, iconSize, iconColor } = validatedProps;

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const select = useSelected();

  const IconComponent = VscIcons[vscIcon] as React.ComponentType<any> | undefined;

  if (!IconComponent) {
    console.warn(`Icon component for ${String(vscIcon)} is not a valid React component.`);
    return null;
  }

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`${selected ? select.select : ""}`}>
      <div className={styles.iconContainer}>
        <IconComponent size={iconSize} style={{ color: iconColor }} />
      </div>
    </div>
  );
};

export const IconDefaultProps = iconSchema.parse({});

Icon.craft = {
  displayName: "Icon",
  props: IconDefaultProps,
  related: {
    settings: IconSettings,
  },
};
